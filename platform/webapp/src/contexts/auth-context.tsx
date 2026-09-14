'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  clearAuthTokens,
  getAccessToken,
  isAuthenticated as checkAuth,
  setApiKey,
  setAuthTokens,
} from '@/services/shared/infrastructure/auth-tokens';
import { setEffectiveTenantId } from '@/services/shared/infrastructure/tenant-state';
import { apiClient } from '@/services/shared/infrastructure/api-client';
import { unwrap } from '@/services/shared/http';

type AuthContextValue = {
  ready: boolean;
  authenticated: boolean;
  signInWithApiKey: (apiKey: string, tenantLabel?: string) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(checkAuth());
    setReady(true);
  }, []);

  const signInWithApiKey = useCallback(
    async (apiKey: string, tenantLabel?: string) => {
      setApiKey(apiKey.trim());
      if (tenantLabel) setEffectiveTenantId(tenantLabel);
      // Soft probe — sandbox may not have operator me yet
      try {
        await apiClient.get('/v0/tenants/me/api-keys');
      } catch {
        // Keep key; UI will surface API errors on data screens
      }
      setAuthenticated(true);
    },
    [],
  );

  const signInWithPassword = useCallback(
    async (email: string, password: string) => {
      const data = await unwrap<{
        accessToken?: string;
        refreshToken?: string;
        token?: string;
      }>(apiClient.post('/v0/auth/login', { body: { email, password } }));
      const access = data.accessToken ?? data.token;
      if (!access) throw new Error('Login response missing access token');
      setAuthTokens({
        accessToken: access,
        refreshToken: data.refreshToken,
      });
      setAuthenticated(true);
    },
    [],
  );

  const signOut = useCallback(() => {
    clearAuthTokens();
    setEffectiveTenantId(null);
    setAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      authenticated,
      signInWithApiKey,
      signInWithPassword,
      signOut,
    }),
    [ready, authenticated, signInWithApiKey, signInWithPassword, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function useAccessTokenPresent(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(getAccessToken());
}

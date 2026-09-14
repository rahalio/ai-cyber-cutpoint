'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import {
  ErrorBanner,
  Field,
  inputClass,
  PrimaryButton,
  SecondaryButton,
  StatusChip,
} from '@/components/ui';
import { formatProblem } from '@/services/shared/http';
import { DEMO_API_KEY } from '@/lib/nav';

export default function LoginPage() {
  const { signInWithApiKey, signInWithPassword } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<'apiKey' | 'password'>('apiKey');
  const [apiKey, setApiKey] = useState(DEMO_API_KEY);
  const [tenantLabel, setTenantLabel] = useState('local');
  const [email, setEmail] = useState('analyst@cutpoint.local');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === 'apiKey') {
        if (!apiKey.trim()) throw new Error('API key required');
        await signInWithApiKey(apiKey, tenantLabel || undefined);
      } else {
        await signInWithPassword(email, password);
      }
      router.replace('/today');
    } catch (err) {
      setError(formatProblem(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-surface-canvas lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(44,74,124,0.45),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(42,111,122,0.25),transparent_40%)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-[#e8ecf2]">
          <div>
            <p className="text-3xl font-semibold tracking-tight">Cutpoint</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8b95a8]">
              Disruption planning
            </p>
            <div className="mt-4">
              <StatusChip tone="cut" label="Sandbox" />
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#c5ccd8]">
              Map which criminal purchase enables which subsequent sale, adjudicate
              every chain, and rank control changes by downstream harm severed —
              not by seller inventory.
            </p>
          </div>
          <p className="text-xs text-[#8b95a8]">
            Coverage is a floor. Recall is unmeasurable. Candidates are never findings.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-surface px-6 py-12">
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-5">
          <div>
            <h1 className="text-2xl font-semibold text-ink">Sign in</h1>
            <p className="mt-1 text-sm text-ink-muted">
              {mode === 'apiKey'
                ? 'Use the local demo API key against api-server :4001.'
                : 'Operator email and password (identity JWT).'}
            </p>
          </div>

          <div className="flex gap-2">
            <SecondaryButton
              type="button"
              className={mode === 'apiKey' ? 'border-cut text-cut' : undefined}
              onClick={() => setMode('apiKey')}
            >
              API key
            </SecondaryButton>
            <SecondaryButton
              type="button"
              className={mode === 'password' ? 'border-cut text-cut' : undefined}
              onClick={() => setMode('password')}
            >
              Password
            </SecondaryButton>
          </div>

          {error ? <ErrorBanner>{error}</ErrorBanner> : null}

          {mode === 'apiKey' ? (
            <>
              <Field label="API key">
                <input
                  className={`${inputClass} font-mono text-xs`}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  autoComplete="off"
                />
              </Field>
              <Field label="Tenant label">
                <input
                  className={inputClass}
                  value={tenantLabel}
                  onChange={(e) => setTenantLabel(e.target.value)}
                />
              </Field>
            </>
          ) : (
            <>
              <Field label="Email">
                <input
                  className={inputClass}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field label="Password">
                <input
                  className={inputClass}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
            </>
          )}

          <PrimaryButton type="submit" disabled={busy} className="w-full">
            {busy ? 'Signing in…' : 'Enter workbench'}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}

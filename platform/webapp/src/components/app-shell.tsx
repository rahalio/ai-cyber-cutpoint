'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { SideNav } from '@/components/side-nav';
import { SecondaryButton } from '@/components/ui';

export function AppShell({ children }: { children: ReactNode }) {
  const { ready, authenticated, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === '/login';

  useEffect(() => {
    if (!ready || isLogin) return;
    if (!authenticated) router.replace('/login');
  }, [ready, authenticated, isLogin, router]);

  if (isLogin) {
    return <>{children}</>;
  }

  if (!ready || !authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-ink-muted">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-ink/10 bg-surface-canvas">
        <SideNav />
        <div className="mt-auto border-t border-ink/10 p-3">
          <SecondaryButton className="w-full" type="button" onClick={signOut}>
            Sign out
          </SecondaryButton>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-6 py-6 lg:px-8">{children}</main>
    </div>
  );
}

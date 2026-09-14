'use client';

import { PageHeader, Panel, StatusChip } from '@/components/ui';
import { useListApiKeys, useListUsers } from '@/services/domains/identity';
import { DEMO_API_KEY } from '@/lib/nav';
import { formatProblem } from '@/services/shared/http';

export default function SettingsPage() {
  const keys = useListApiKeys();
  const users = useListUsers();

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Identity, API keys, and operator access for this Cutpoint tenant."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="API keys">
          <StatusChip tone="cut" label="Local demo" />
          <p className="mt-2 font-mono text-xs text-ink-muted">{DEMO_API_KEY}</p>
          {keys.isError ? (
            <p className="mt-2 text-sm text-status-fail">{formatProblem(keys.error)}</p>
          ) : (
            <p className="mt-2 text-sm text-ink-muted">
              {keys.isLoading
                ? 'Loading…'
                : `${keys.data?.length ?? 0} key(s) on tenant.`}
            </p>
          )}
        </Panel>
        <Panel title="Operators">
          {users.isError ? (
            <p className="text-sm text-status-fail">{formatProblem(users.error)}</p>
          ) : (
            <p className="text-sm text-ink-muted">
              {users.isLoading
                ? 'Loading…'
                : `${users.data?.length ?? 0} operator user(s).`}
            </p>
          )}
        </Panel>
      </div>
    </div>
  );
}

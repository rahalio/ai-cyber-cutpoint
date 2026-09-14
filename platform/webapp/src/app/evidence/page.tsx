'use client';

import { useState } from 'react';
import { PageHeader, Panel, StatusChip } from '@/components/ui';
import { useListMarkets } from '@/services/domains/markets';
import {
  useCoverageAssessment,
  useDriftAssessment,
  useListPublicationHolds,
} from '@/services/domains/governance';
import { formatProblem } from '@/services/shared/http';

function field(row: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (v != null && String(v).length) return String(v);
  }
  return '';
}

export default function EvidencePage() {
  const markets = useListMarkets();
  const marketItems = (markets.data ?? []) as Record<string, unknown>[];
  const [marketId, setMarketId] = useState('');
  const effectiveMarket =
    marketId || field(marketItems[0] ?? {}, 'marketId', 'id');

  const coverage = useCoverageAssessment(effectiveMarket);
  const drift = useDriftAssessment(effectiveMarket);
  const holds = useListPublicationHolds(
    effectiveMarket ? { marketId: effectiveMarket } : undefined,
  );

  return (
    <div>
      <PageHeader
        title="Evidence & Governance"
        subtitle="Coverage and drift holds, sealed hash-verifiable referral packages, custody logs. Counsel surfaces here — not raw corpus browse."
      />
      <div className="mb-4">
        <label className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          Market
        </label>
        <select
          className="mt-1 block w-full max-w-sm rounded-panel border border-ink/15 bg-surface-raised px-3 py-2 text-sm"
          value={effectiveMarket}
          onChange={(e) => setMarketId(e.target.value)}
        >
          {marketItems.length === 0 ? (
            <option value="">No markets</option>
          ) : (
            marketItems.map((m) => {
              const id = field(m, 'marketId', 'id');
              return (
                <option key={id} value={id}>
                  {field(m, 'name', 'displayName') || id}
                </option>
              );
            })
          )}
        </select>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Coverage & drift">
          <div className="mb-2 flex flex-wrap gap-2">
            <StatusChip tone="watch" label="Coverage floor" />
            <StatusChip tone="held" label="Drift can hold" />
          </div>
          {coverage.isError || drift.isError ? (
            <p className="text-sm text-status-fail">
              {formatProblem(coverage.error ?? drift.error)}
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              <pre className="max-h-40 overflow-auto font-mono text-[11px] text-ink-muted">
                {coverage.isLoading
                  ? 'Coverage…'
                  : JSON.stringify(coverage.data ?? {}, null, 2)}
              </pre>
              <pre className="max-h-40 overflow-auto font-mono text-[11px] text-ink-muted">
                {drift.isLoading
                  ? 'Drift…'
                  : JSON.stringify(drift.data ?? {}, null, 2)}
              </pre>
            </div>
          )}
        </Panel>
        <Panel title="Publication holds & packages">
          <StatusChip tone="trust" label="Privileged action" />
          {holds.isError ? (
            <p className="mt-2 text-sm text-status-fail">{formatProblem(holds.error)}</p>
          ) : (
            <p className="mt-2 text-sm text-ink-muted">
              {holds.isLoading
                ? 'Loading…'
                : `${holds.data?.length ?? 0} publication hold(s). Seal evidence packages via API / privileged action.`}
            </p>
          )}
        </Panel>
      </div>
    </div>
  );
}

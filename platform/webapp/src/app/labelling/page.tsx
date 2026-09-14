'use client';

import { useState } from 'react';
import { PageHeader, Panel, StatusChip } from '@/components/ui';
import { useListMarkets } from '@/services/domains/markets';
import {
  useListAnnotationBatches,
  useListClassificationRuns,
  useTaxonomy,
} from '@/services/domains/labelling';
import { formatProblem } from '@/services/shared/http';

function field(row: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (v != null && String(v).length) return String(v);
  }
  return '';
}

export default function LabellingPage() {
  const markets = useListMarkets();
  const marketItems = (markets.data ?? []) as Record<string, unknown>[];
  const [marketId, setMarketId] = useState('');
  const effectiveMarket =
    marketId || field(marketItems[0] ?? {}, 'marketId', 'id');

  const taxonomy = useTaxonomy(effectiveMarket);
  const batches = useListAnnotationBatches(
    effectiveMarket ? { marketId: effectiveMarket } : undefined,
  );
  const runs = useListClassificationRuns(
    effectiveMarket ? { marketId: effectiveMarket } : undefined,
  );

  return (
    <div>
      <PageHeader
        title="Labelling"
        subtitle="Analyst-owned taxonomy, budgeted annotation batches, and decay-triggered re-labelling — models do not transfer between markets."
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
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Taxonomy">
          <StatusChip tone="trust" label="Versioned" />
          {taxonomy.isError ? (
            <p className="mt-2 text-sm text-status-fail">
              {formatProblem(taxonomy.error)}
            </p>
          ) : (
            <pre className="mt-2 max-h-48 overflow-auto font-mono text-[11px] text-ink-muted">
              {taxonomy.isLoading
                ? 'Loading…'
                : JSON.stringify(taxonomy.data ?? {}, null, 2)}
            </pre>
          )}
        </Panel>
        <Panel title="Annotation batches">
          {batches.isError ? (
            <p className="text-sm text-status-fail">{formatProblem(batches.error)}</p>
          ) : (
            <p className="text-sm text-ink-muted">
              {batches.isLoading
                ? 'Loading…'
                : `${batches.data?.length ?? 0} batch(es) against budget.`}
            </p>
          )}
        </Panel>
        <Panel title="Classification runs">
          <StatusChip tone="watch" label="Precision-first" />
          {runs.isError ? (
            <p className="mt-2 text-sm text-status-fail">{formatProblem(runs.error)}</p>
          ) : (
            <p className="mt-2 text-sm text-ink-muted">
              {runs.isLoading
                ? 'Loading…'
                : `${runs.data?.length ?? 0} run(s). Drift breach blocks publication.`}
            </p>
          )}
        </Panel>
      </div>
    </div>
  );
}

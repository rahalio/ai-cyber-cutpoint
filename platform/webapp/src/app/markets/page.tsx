'use client';

import { useMemo, useState } from 'react';
import { PageHeader, Panel, StatusChip } from '@/components/ui';
import { useListMarkets, useListCorpora } from '@/services/domains/markets';
import { useDependencyMap, useListDependencyEdges } from '@/services/domains/discovery';
import { formatProblem } from '@/services/shared/http';

function field(row: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (v != null && String(v).length) return String(v);
  }
  return '—';
}

export default function MarketsPage() {
  const markets = useListMarkets();
  const items = (markets.data ?? []) as Record<string, unknown>[];
  const [selectedId, setSelectedId] = useState<string>('');
  const marketId = selectedId || field(items[0] ?? {}, 'marketId', 'id');

  const corpora = useListCorpora(marketId === '—' ? '' : marketId);
  const depMap = useDependencyMap(marketId === '—' ? '' : marketId);
  const edges = useListDependencyEdges(
    marketId === '—' ? undefined : { marketId },
  );

  const edgeCount = useMemo(() => edges.data?.length ?? 0, [edges.data]);

  return (
    <div>
      <PageHeader
        title="Markets & Chains"
        subtitle="Licensed corpora, retention clocks, and buy→sell dependency maps — layered left-to-right, not hairballs."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Markets">
          {markets.isError ? (
            <p className="text-sm text-status-fail">{formatProblem(markets.error)}</p>
          ) : markets.isLoading ? (
            <p className="text-sm text-ink-muted">Loading markets…</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-ink-muted">
              No markets yet. Register one via API or seed data.
            </p>
          ) : (
            <ul className="divide-y divide-ink/10">
              {items.map((m) => {
                const id = field(m, 'marketId', 'id');
                const active = id === marketId;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between px-1 py-2.5 text-left text-sm ${
                        active ? 'text-cut' : 'text-ink'
                      }`}
                      onClick={() => setSelectedId(id)}
                    >
                      <span className="font-medium">
                        {field(m, 'name', 'displayName', 'marketId')}
                      </span>
                      <span className="font-mono text-[11px] text-ink-muted">
                        {id}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {marketId !== '—' ? (
            <div className="mt-3 border-t border-ink/10 pt-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Corpora
              </p>
              {corpora.isLoading ? (
                <p className="text-sm text-ink-muted">Loading…</p>
              ) : (
                <p className="text-sm text-ink-muted">
                  {(corpora.data?.length ?? 0) || 0} corpus record(s)
                </p>
              )}
            </div>
          ) : null}
        </Panel>
        <Panel title="Dependency map">
          <div className="mb-3 flex flex-wrap gap-2">
            <StatusChip tone="trust" label={`${edgeCount} edges`} />
            {depMap.data ? (
              <StatusChip tone="cut" label="Map loaded" />
            ) : (
              <StatusChip tone="candidate" label="Select market" />
            )}
          </div>
          <div className="min-h-48 rounded-panel border border-dashed border-ink/20 bg-surface-sunken/40 p-4">
            {depMap.isError ? (
              <p className="text-sm text-status-fail">{formatProblem(depMap.error)}</p>
            ) : depMap.isLoading ? (
              <p className="text-sm text-ink-muted">Loading dependency map…</p>
            ) : (
              <pre className="max-h-64 overflow-auto font-mono text-[11px] text-ink-muted">
                {JSON.stringify(depMap.data ?? { edges: edges.data ?? [] }, null, 2)}
              </pre>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}

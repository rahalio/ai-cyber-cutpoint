'use client';

import { useMemo, useState } from 'react';
import {
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
  StatusChip,
} from '@/components/ui';
import {
  useAdjudicateChainCandidate,
  useChainCandidate,
  useListChainCandidates,
} from '@/services/domains/discovery';
import { formatProblem } from '@/services/shared/http';

function field(row: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (v != null && String(v).length) return String(v);
  }
  return '—';
}

export default function AdjudicationPage() {
  const queue = useListChainCandidates();
  const items = (queue.data ?? []) as Record<string, unknown>[];
  const [selectedId, setSelectedId] = useState('');
  const candidateId = selectedId || field(items[0] ?? {}, 'candidateId', 'id');
  const detail = useChainCandidate(candidateId === '—' ? '' : candidateId);
  const adjudicate = useAdjudicateChainCandidate();

  const detailRow = useMemo(() => {
    const d = detail.data;
    return d && typeof d === 'object' ? (d as Record<string, unknown>) : null;
  }, [detail.data]);

  async function decide(decision: 'accepted' | 'rejected') {
    if (!candidateId || candidateId === '—') return;
    await adjudicate.mutateAsync({
      candidateId,
      body: {
        decision,
        reason:
          decision === 'accepted'
            ? 'Analyst confirmed buy→sell dependency'
            : 'no_actual_purchase',
      },
    });
  }

  return (
    <div>
      <PageHeader
        title="Adjudication"
        subtitle="Mandatory dual-pane review: originating post, buy evidence, and subsequent sale side by side. Nothing downstream of this gate is a finding."
      />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Panel title="Candidate queue">
          <div className="mb-2 flex gap-2">
            <StatusChip tone="candidate" label="Unreviewed" />
            <StatusChip tone="trust" label="Accepted → finding" />
          </div>
          {queue.isError ? (
            <p className="text-sm text-status-fail">{formatProblem(queue.error)}</p>
          ) : queue.isLoading ? (
            <p className="text-sm text-ink-muted">Loading candidates…</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-ink-muted">Queue empty.</p>
          ) : (
            <ul className="max-h-[28rem] space-y-1 overflow-auto">
              {items.map((c) => {
                const id = field(c, 'candidateId', 'id');
                const active = id === candidateId;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(id)}
                      className={`w-full rounded-panel border px-2.5 py-2 text-left text-sm ${
                        active
                          ? 'border-cut bg-cut/10 text-cut'
                          : 'border-ink/10 text-ink hover:border-ink/25'
                      }`}
                    >
                      <span className="font-mono text-[11px] text-ink-muted">
                        {id}
                      </span>
                      <span className="mt-0.5 block truncate">
                        {field(c, 'sourceCategory', 'buyCategory')} →{' '}
                        {field(c, 'destCategory', 'sellCategory')}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
        <Panel title="Evidence dual-pane">
          {detail.isError ? (
            <p className="text-sm text-status-fail">{formatProblem(detail.error)}</p>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-panel border border-ink/10 bg-surface-sunken/50 p-3">
                  <p className="mb-1 font-mono text-[11px] uppercase text-ink-muted">
                    Buy evidence
                  </p>
                  <pre className="max-h-40 overflow-auto font-mono text-[11px] text-ink-muted">
                    {JSON.stringify(
                      detailRow?.buyEvidence ?? detailRow?.purchase ?? detailRow,
                      null,
                      2,
                    )}
                  </pre>
                </div>
                <div className="rounded-panel border border-ink/10 bg-surface-sunken/50 p-3">
                  <p className="mb-1 font-mono text-[11px] uppercase text-ink-muted">
                    Subsequent sale
                  </p>
                  <pre className="max-h-40 overflow-auto font-mono text-[11px] text-ink-muted">
                    {JSON.stringify(
                      detailRow?.saleEvidence ?? detailRow?.sale ?? detailRow,
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <PrimaryButton
                  type="button"
                  disabled={adjudicate.isPending || candidateId === '—'}
                  onClick={() => void decide('accepted')}
                >
                  Accept chain
                </PrimaryButton>
                <SecondaryButton
                  type="button"
                  disabled={adjudicate.isPending || candidateId === '—'}
                  onClick={() => void decide('rejected')}
                >
                  Reject
                </SecondaryButton>
                {adjudicate.isError ? (
                  <span className="text-sm text-status-fail">
                    {formatProblem(adjudicate.error)}
                  </span>
                ) : null}
              </div>
            </>
          )}
        </Panel>
      </div>
    </div>
  );
}

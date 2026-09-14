'use client';

import { PageHeader, Panel, StatusChip } from '@/components/ui';
import {
  useListInterventionCandidates,
  useListInterventions,
} from '@/services/domains/interventions';
import { formatProblem } from '@/services/shared/http';

function field(row: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (v != null && String(v).length) return String(v);
  }
  return '—';
}

export default function InterventionsPage() {
  const candidates = useListInterventionCandidates();
  const selected = useListInterventions();
  const candItems = (candidates.data ?? []) as Record<string, unknown>[];
  const selItems = (selected.data ?? []) as Record<string, unknown>[];

  return (
    <div>
      <PageHeader
        title="Interventions"
        subtitle="Ranked defender-side control changes with estimated harm severed. Failed and declined interventions stay visible."
      />
      <Panel title="Leverage scoreboard">
        <div className="mb-3 flex flex-wrap gap-2">
          <StatusChip tone="cut" label="Planned cut" />
          <StatusChip tone="trust" label="Measured outcome" />
          <StatusChip tone="fail" label="No movement" />
        </div>
        {candidates.isError ? (
          <p className="text-sm text-status-fail">{formatProblem(candidates.error)}</p>
        ) : candidates.isLoading ? (
          <p className="text-sm text-ink-muted">Loading candidates…</p>
        ) : candItems.length === 0 ? (
          <p className="text-sm text-ink-muted">No intervention candidates yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="py-2 pr-3 font-medium">Candidate</th>
                  <th className="py-2 pr-3 font-medium">Control</th>
                  <th className="py-2 pr-3 font-medium">Harm / leverage</th>
                </tr>
              </thead>
              <tbody>
                {candItems.map((row) => (
                  <tr key={field(row, 'candidateId', 'id')} className="border-b border-ink/5">
                    <td className="py-2 pr-3 font-mono text-[11px] text-ink-muted">
                      {field(row, 'candidateId', 'id')}
                    </td>
                    <td className="py-2 pr-3">
                      {field(row, 'controlChange', 'title', 'recommendation')}
                    </td>
                    <td className="py-2 pr-3 font-mono text-xs">
                      {field(row, 'harmVolume', 'leverageScore', 'estimatedHarm')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-4 border-t border-ink/10 pt-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Selected / measured
          </p>
          <p className="text-sm text-ink-muted">
            {selected.isLoading
              ? 'Loading…'
              : `${selItems.length} intervention(s) with baseline/outcome records.`}
          </p>
        </div>
      </Panel>
    </div>
  );
}

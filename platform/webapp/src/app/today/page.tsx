'use client';

import Link from 'next/link';
import { PageHeader, Panel, StatusChip } from '@/components/ui';
import { useListMarkets } from '@/services/domains/markets';
import { useListChainCandidates } from '@/services/domains/discovery';
import { useListInterventionCandidates } from '@/services/domains/interventions';
import { formatProblem } from '@/services/shared/http';

export default function TodayPage() {
  const markets = useListMarkets();
  const candidates = useListChainCandidates({ status: 'pending' });
  const interventions = useListInterventionCandidates();

  const marketCount = markets.data?.length ?? 0;
  const queueCount = candidates.data?.length ?? 0;
  const cutCount = interventions.data?.length ?? 0;

  return (
    <div>
      <PageHeader
        title="Today"
        subtitle="Role home — queues, hot chains, and open interventions. Candidates are never findings until adjudicated."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <StatusChip tone="candidate" label={`${queueCount} candidates`} />
        <StatusChip tone="trust" label={`${marketCount} markets`} />
        <StatusChip tone="cut" label={`${cutCount} cut points`} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Adjudication queue">
          {candidates.isError ? (
            <p className="text-sm text-status-fail">{formatProblem(candidates.error)}</p>
          ) : (
            <p className="text-sm text-ink-muted">
              {candidates.isLoading
                ? 'Loading…'
                : `${queueCount} chain(s) awaiting accept / reject.`}
            </p>
          )}
          <Link
            href="/adjudication"
            className="mt-3 inline-block text-sm font-semibold text-cut"
          >
            Open queue →
          </Link>
        </Panel>
        <Panel title="Hot markets">
          <div className="flex flex-wrap gap-2">
            <StatusChip tone="watch" label="Coverage floor" />
            <StatusChip tone="held" label="Drift hold possible" />
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            {markets.isLoading ? 'Loading…' : `${marketCount} monitored market(s).`}
          </p>
          <Link
            href="/markets"
            className="mt-3 inline-block text-sm font-semibold text-cut"
          >
            Markets & chains →
          </Link>
        </Panel>
        <Panel title="Open interventions">
          <p className="text-sm text-ink-muted">
            {interventions.isLoading
              ? 'Loading…'
              : `${cutCount} leverage-ranked control change(s).`}
          </p>
          <Link
            href="/interventions"
            className="mt-3 inline-block text-sm font-semibold text-cut"
          >
            Intervention board →
          </Link>
        </Panel>
      </div>
    </div>
  );
}

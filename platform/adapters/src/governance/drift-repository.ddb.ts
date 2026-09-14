/**
 * DriftRepository - sandbox / computed assessment (no persisted entity).
 */

import type { DriftRepository } from '@cutpoint/services/governance';
import { ulid } from 'ulid';

export class DriftRepositoryDdb implements DriftRepository {
  constructor(private readonly dynamoClient: any) {}

  async getDriftAssessment(
    input: Parameters<DriftRepository['getDriftAssessment']>[0]
  ): Promise<Awaited<ReturnType<DriftRepository['getDriftAssessment']>>> {
    const inputExt = (input ?? {}) as Record<string, unknown>;
    const marketId = String(inputExt.marketId ?? '');
    return {
      data: {
        marketId,
        assessedAt: new Date().toISOString(),
        holdoutF1: 1,
        thresholdF1: 0.35,
        breached: false,
        daysSinceLastRelabelling: 0,
        recommendedAction: 'none',
      },
      meta: {
        correlationId:
          (inputExt.correlationId as string) || `gov_${ulid().toLowerCase()}`,
        timestamp: new Date().toISOString(),
      },
    } as any;
  }
}

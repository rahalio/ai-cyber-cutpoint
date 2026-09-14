/**
 * CoverageRepository - sandbox / computed assessment (no persisted entity).
 * Hand-maintained: OpenAPI uses x-repository: none style assessment.
 */

import type { CoverageRepository } from '@cutpoint/services/governance';
import { ulid } from 'ulid';

export class CoverageRepositoryDdb implements CoverageRepository {
  constructor(private readonly dynamoClient: any) {}

  async getCoverageAssessment(
    input: Parameters<CoverageRepository['getCoverageAssessment']>[0]
  ): Promise<Awaited<ReturnType<CoverageRepository['getCoverageAssessment']>>> {
    const inputExt = (input ?? {}) as Record<string, unknown>;
    const marketId = String(inputExt.marketId ?? '');
    return {
      data: {
        marketId,
        assessedAt: new Date().toISOString(),
        outOfTaxonomyShare: 0,
        emergingUnnamedThemes: [],
        recallMeasurable: false,
        coverageStatement:
          'Coverage is a floor; recall is unmeasurable for this market.',
      },
      meta: {
        correlationId:
          (inputExt.correlationId as string) || `gov_${ulid().toLowerCase()}`,
        timestamp: new Date().toISOString(),
      },
    } as any;
  }
}

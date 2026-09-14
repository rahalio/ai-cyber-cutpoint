/**
 * ExecuteGetCoverageAssessment — hand-maintained (computed assurance op).
 */

import type { GetCoverageAssessmentInput, GetCoverageAssessmentOutput } from '../dto/coverage.dto';
import type { ExecutionContextService, IdGeneratorService } from '@cutpoint/services/_shared/index.js';
import type { CoverageRepository } from '../ports';

export class ExecuteGetCoverageAssessment {
  constructor(
    private readonly context: ExecutionContextService,
    private readonly idGenerator: IdGeneratorService,
    private readonly coverage: CoverageRepository
  ) {}

  async execute(input: GetCoverageAssessmentInput): Promise<GetCoverageAssessmentOutput> {
    const correlationId = this.idGenerator.govId();
    const result = await this.coverage.getCoverageAssessment({
      ...input,
      orgId: this.context.getOrgId(),
      correlationId,
    } as any);
    return result as GetCoverageAssessmentOutput;
  }
}

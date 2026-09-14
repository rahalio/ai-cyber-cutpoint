/**
 * ExecuteGetDriftAssessment — hand-maintained (computed assurance op).
 */

import type { GetDriftAssessmentInput, GetDriftAssessmentOutput } from '../dto/drift.dto';
import type { ExecutionContextService, IdGeneratorService } from '@cutpoint/services/_shared/index.js';
import type { DriftRepository } from '../ports';

export class ExecuteGetDriftAssessment {
  constructor(
    private readonly context: ExecutionContextService,
    private readonly idGenerator: IdGeneratorService,
    private readonly drift: DriftRepository
  ) {}

  async execute(input: GetDriftAssessmentInput): Promise<GetDriftAssessmentOutput> {
    const correlationId = this.idGenerator.govId();
    const result = await this.drift.getDriftAssessment({
      ...input,
      orgId: this.context.getOrgId(),
      correlationId,
    } as any);
    return result as GetDriftAssessmentOutput;
  }
}

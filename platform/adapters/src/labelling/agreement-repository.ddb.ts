/**
 * AgreementRepository - sandbox computed labeller agreement.
 */

import type { AgreementRepository } from '@cutpoint/services/labelling';
import { ulid } from 'ulid';

export class AgreementRepositoryDdb implements AgreementRepository {
  constructor(private readonly dynamoClient: any) {}

  async getLabellerAgreement(
    input: Parameters<AgreementRepository['getLabellerAgreement']>[0]
  ): Promise<Awaited<ReturnType<AgreementRepository['getLabellerAgreement']>>> {
    const inputExt = (input ?? {}) as Record<string, unknown>;
    const batchId = String(inputExt.batchId ?? '');
    return {
      data: {
        batchId,
        pairwiseAgreement: 1,
        contestedCategories: [],
        labellersBelowThreshold: [],
      },
      meta: {
        correlationId:
          (inputExt.correlationId as string) || `lbl_${ulid().toLowerCase()}`,
        timestamp: new Date().toISOString(),
      },
    } as any;
  }
}

import { useTenantQuery } from "@/services/shared/infrastructure/tenant-query";
import { labellingService } from "../labelling.service";

export function useTaxonomy(marketId: string) {
  return useTenantQuery(
    ["labelling", "taxonomy", marketId],
    async () => labellingService.getTaxonomy(marketId),
    { enabled: !!marketId },
  );
}

export function useListAnnotationBatches(params?: Record<string, any>) {
  return useTenantQuery(["labelling", "batches", params], async () =>
    labellingService.listAnnotationBatches(params),
  );
}

export function useLabellerAgreement(batchId: string) {
  return useTenantQuery(
    ["labelling", "agreement", batchId],
    async () => labellingService.getLabellerAgreement(batchId),
    { enabled: !!batchId },
  );
}

export function useListClassificationRuns(params?: Record<string, any>) {
  return useTenantQuery(["labelling", "runs", params], async () =>
    labellingService.listClassificationRuns(params),
  );
}

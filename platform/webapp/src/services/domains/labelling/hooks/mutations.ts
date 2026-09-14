import { useTenantMutation } from "@/services/shared/infrastructure/tenant-mutation";
import { labellingService } from "../labelling.service";

export function usePublishTaxonomyVersion(marketId: string) {
  return useTenantMutation(
    async (_org, body: unknown) => labellingService.publishTaxonomyVersion(marketId, body),
    { invalidateQueries: [["labelling", "taxonomy", marketId]] },
  );
}

export function useCreateAnnotationBatch() {
  return useTenantMutation(
    async (_org, body: unknown) => labellingService.createAnnotationBatch(body),
    { invalidateQueries: [["labelling", "batches"]] },
  );
}

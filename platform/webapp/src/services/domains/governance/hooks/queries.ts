import { useTenantQuery } from "@/services/shared/infrastructure/tenant-query";
import { governanceService } from "../governance.service";

export function useCoverageAssessment(marketId: string) {
  return useTenantQuery(
    ["governance", "coverage", marketId],
    async () => governanceService.getCoverageAssessment(marketId),
    { enabled: !!marketId },
  );
}

export function useDriftAssessment(marketId: string) {
  return useTenantQuery(
    ["governance", "drift", marketId],
    async () => governanceService.getDriftAssessment(marketId),
    { enabled: !!marketId },
  );
}

export function useListPublicationHolds(params?: Record<string, any>) {
  return useTenantQuery(["governance", "holds", params], async () =>
    governanceService.listPublicationHolds(params),
  );
}

export function useEvidencePackage(packageId: string) {
  return useTenantQuery(
    ["governance", "package", packageId],
    async () => governanceService.getEvidencePackage(packageId),
    { enabled: !!packageId },
  );
}

import { useTenantMutation } from "@/services/shared/infrastructure/tenant-mutation";
import { governanceService } from "../governance.service";

export function useSealEvidencePackage() {
  return useTenantMutation(
    async (_org, body: unknown) => governanceService.sealEvidencePackage(body),
    { invalidateQueries: [["governance", "holds"]] },
  );
}

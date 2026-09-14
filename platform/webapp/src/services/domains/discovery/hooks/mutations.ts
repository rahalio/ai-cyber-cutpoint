import { useTenantMutation } from "@/services/shared/infrastructure/tenant-mutation";
import { discoveryService } from "../discovery.service";

export function useAdjudicateChainCandidate() {
  return useTenantMutation(
    async (_org, vars: { candidateId: string; body: unknown }) =>
      discoveryService.adjudicateChainCandidate(vars.candidateId, vars.body),
    { invalidateQueries: [["discovery", "candidates"]] },
  );
}

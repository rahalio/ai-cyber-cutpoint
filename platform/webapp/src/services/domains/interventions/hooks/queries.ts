import { useTenantQuery } from "@/services/shared/infrastructure/tenant-query";
import { interventionsService } from "../interventions.service";

export function useListInterventionCandidates(params?: Record<string, any>) {
  return useTenantQuery(["interventions", "candidates", params], async () =>
    interventionsService.listInterventionCandidates(params),
  );
}

export function useListInterventions(params?: Record<string, any>) {
  return useTenantQuery(["interventions", "list", params], async () =>
    interventionsService.listInterventions(params),
  );
}

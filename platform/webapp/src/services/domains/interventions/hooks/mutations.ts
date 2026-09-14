import { useTenantMutation } from "@/services/shared/infrastructure/tenant-mutation";
import { interventionsService } from "../interventions.service";

export function useSelectIntervention() {
  return useTenantMutation(
    async (_org, body: unknown) => interventionsService.selectIntervention(body),
    { invalidateQueries: [["interventions", "list"], ["interventions", "candidates"]] },
  );
}

export function useRecordInterventionOutcome() {
  return useTenantMutation(
    async (_org, vars: { interventionId: string; body: unknown }) =>
      interventionsService.recordInterventionOutcome(vars.interventionId, vars.body),
    { invalidateQueries: [["interventions", "list"]] },
  );
}

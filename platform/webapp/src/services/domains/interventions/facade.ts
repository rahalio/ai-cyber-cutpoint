import { interventionsService } from "./interventions.service";

export const interventionsFacade = {
  listInterventionCandidates: interventionsService.listInterventionCandidates.bind(interventionsService),
  listInterventions: interventionsService.listInterventions.bind(interventionsService),
  selectIntervention: interventionsService.selectIntervention.bind(interventionsService),
  recordInterventionOutcome: interventionsService.recordInterventionOutcome.bind(interventionsService),
};

/**
 * Interventions Service — leverage-ranked control changes + outcomes
 */
import { apiClient } from "@/services/shared/infrastructure/api-client";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async listInterventionCandidates(params?: Record<string, string | number | boolean | null | undefined>) {
    return asItems(await unwrap(apiClient.get("/v1/interventions/candidates", { params })));
  },
  async listInterventions(params?: Record<string, string | number | boolean | null | undefined>) {
    return asItems(await unwrap(apiClient.get("/v1/interventions", { params })));
  },
  async selectIntervention(body: unknown) {
    return unwrap(apiClient.post("/v1/interventions", { body }));
  },
  async recordInterventionOutcome(interventionId: string, body: unknown) {
    return unwrap(
      apiClient.post(`/v1/interventions/${encodeURIComponent(interventionId)}/outcome`, { body }),
    );
  },
};

export const interventionsService = makeService(raw, "interventions");

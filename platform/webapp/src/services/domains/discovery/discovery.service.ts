/**
 * Discovery Service — chain candidates, adjudication, dependency map
 */
import { apiClient } from "@/services/shared/infrastructure/api-client";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async listChainCandidates(params?: Record<string, string | number | boolean | null | undefined>) {
    return asItems(await unwrap(apiClient.get("/v1/chains/candidates", { params })));
  },
  async getChainCandidate(candidateId: string) {
    return unwrap(apiClient.get(`/v1/chains/candidates/${encodeURIComponent(candidateId)}`));
  },
  async adjudicateChainCandidate(candidateId: string, body: unknown) {
    return unwrap(
      apiClient.post(`/v1/chains/candidates/${encodeURIComponent(candidateId)}/adjudication`, {
        body,
      }),
    );
  },
  async listDependencyEdges(params?: Record<string, string | number | boolean | null | undefined>) {
    return asItems(await unwrap(apiClient.get("/v1/dependencies/edges", { params })));
  },
  async getDependencyMap(marketId: string) {
    return unwrap(
      apiClient.get(`/v1/markets/${encodeURIComponent(marketId)}/dependency-map`),
    );
  },
};

export const discoveryService = makeService(raw, "discovery");

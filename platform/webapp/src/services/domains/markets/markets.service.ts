/**
 * Markets Service — handwritten client (OpenAPI /v1/markets*)
 * Regenerate-owned stubs used wrong /orgs/{id} prefixes; keep this until webapp codegen path templates are fixed.
 */
import { apiClient } from "@/services/shared/infrastructure/api-client";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async listMarkets(params?: Record<string, string | number | boolean | null | undefined>) {
    return asItems(await unwrap(apiClient.get("/v1/markets", { params })));
  },
  async registerMarket(body: unknown) {
    return unwrap(apiClient.post("/v1/markets", { body }));
  },
  async getMarket(marketId: string) {
    return unwrap(apiClient.get(`/v1/markets/${encodeURIComponent(marketId)}`));
  },
  async listCorpora(marketId: string, params?: Record<string, string | number | boolean | null | undefined>) {
    return asItems(
      await unwrap(
        apiClient.get(`/v1/markets/${encodeURIComponent(marketId)}/corpora`, { params }),
      ),
    );
  },
  async ingestCorpus(marketId: string, body: unknown) {
    return unwrap(
      apiClient.post(`/v1/markets/${encodeURIComponent(marketId)}/corpora`, { body }),
    );
  },
};

export const marketsService = makeService(raw, "markets");

/**
 * Labelling Service — taxonomy, batches, classification runs
 */
import { apiClient } from "@/services/shared/infrastructure/api-client";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async getTaxonomy(marketId: string) {
    return unwrap(apiClient.get(`/v1/markets/${encodeURIComponent(marketId)}/taxonomy`));
  },
  async publishTaxonomyVersion(marketId: string, body: unknown) {
    return unwrap(
      apiClient.post(`/v1/markets/${encodeURIComponent(marketId)}/taxonomy/versions`, { body }),
    );
  },
  async listAnnotationBatches(params?: Record<string, string | number | boolean | null | undefined>) {
    return asItems(await unwrap(apiClient.get("/v1/annotation/batches", { params })));
  },
  async createAnnotationBatch(body: unknown) {
    return unwrap(apiClient.post("/v1/annotation/batches", { body }));
  },
  async submitAnnotationLabels(batchId: string, body: unknown) {
    return unwrap(
      apiClient.post(`/v1/annotation/batches/${encodeURIComponent(batchId)}/labels`, { body }),
    );
  },
  async getLabellerAgreement(batchId: string) {
    return unwrap(
      apiClient.get(`/v1/annotation/batches/${encodeURIComponent(batchId)}/agreement`),
    );
  },
  async listClassificationRuns(params?: Record<string, string | number | boolean | null | undefined>) {
    return asItems(await unwrap(apiClient.get("/v1/classification-runs", { params })));
  },
};

export const labellingService = makeService(raw, "labelling");

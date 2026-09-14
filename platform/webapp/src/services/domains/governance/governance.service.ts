/**
 * Governance Service — coverage/drift, holds, evidence packages
 */
import { apiClient } from "@/services/shared/infrastructure/api-client";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async getCoverageAssessment(marketId: string) {
    return unwrap(
      apiClient.get(`/v1/assurance/markets/${encodeURIComponent(marketId)}/coverage`),
    );
  },
  async getDriftAssessment(marketId: string) {
    return unwrap(
      apiClient.get(`/v1/assurance/markets/${encodeURIComponent(marketId)}/drift`),
    );
  },
  async listPublicationHolds(params?: Record<string, string | number | boolean | null | undefined>) {
    return asItems(await unwrap(apiClient.get("/v1/assurance/publication-holds", { params })));
  },
  async sealEvidencePackage(body: unknown) {
    return unwrap(apiClient.post("/v1/evidence/packages", { body }));
  },
  async getEvidencePackage(packageId: string) {
    return unwrap(apiClient.get(`/v1/evidence/packages/${encodeURIComponent(packageId)}`));
  },
};

export const governanceService = makeService(raw, "governance");

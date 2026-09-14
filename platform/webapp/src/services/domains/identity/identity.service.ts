/**
 * Identity Service — API keys + operator auth
 */
import { apiClient } from "@/services/shared/infrastructure/api-client";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async listApiKeys() {
    return asItems(await unwrap(apiClient.get("/v0/tenants/me/api-keys")));
  },
  async createApiKey(body: unknown) {
    return unwrap(apiClient.post("/v0/tenants/me/api-keys", { body }));
  },
  async revokeApiKey(keyId: string) {
    return apiClient.delete(`/v0/tenants/me/api-keys/${encodeURIComponent(keyId)}`);
  },
  async listUsers() {
    return asItems(await unwrap(apiClient.get("/v0/tenants/me/users")));
  },
  async login(body: { email: string; password: string }) {
    return unwrap(apiClient.post("/v0/auth/login", { body }));
  },
  async getOperatorMe() {
    return unwrap(apiClient.get("/v0/auth/me"));
  },
  async logout() {
    return unwrap(apiClient.post("/v0/auth/logout"));
  },
};

export const identityService = makeService(raw, "identity");

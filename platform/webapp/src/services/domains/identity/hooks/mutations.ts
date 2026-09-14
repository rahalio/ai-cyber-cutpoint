import { useTenantMutation } from "@/services/shared/infrastructure/tenant-mutation";
import { identityService } from "../identity.service";

export function useCreateApiKey() {
  return useTenantMutation(
    async (_org, body: unknown) => identityService.createApiKey(body),
    { invalidateQueries: [["identity", "api-keys"]] },
  );
}

export function useRevokeApiKey() {
  return useTenantMutation(
    async (_org, keyId: string) => identityService.revokeApiKey(keyId),
    { invalidateQueries: [["identity", "api-keys"]] },
  );
}

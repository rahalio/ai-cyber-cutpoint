import { useTenantQuery } from "@/services/shared/infrastructure/tenant-query";
import { identityService } from "../identity.service";

export function useListApiKeys() {
  return useTenantQuery(["identity", "api-keys"], async () => identityService.listApiKeys());
}

export function useListUsers() {
  return useTenantQuery(["identity", "users"], async () => identityService.listUsers());
}

export function useOperatorMe() {
  return useTenantQuery(["identity", "me"], async () => identityService.getOperatorMe());
}

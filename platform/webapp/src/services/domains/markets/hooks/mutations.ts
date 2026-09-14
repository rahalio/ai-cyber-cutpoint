import { useTenantMutation } from "@/services/shared/infrastructure/tenant-mutation";
import { marketsService } from "../markets.service";

export function useRegisterMarket() {
  return useTenantMutation(
    async (_org, body: unknown) => marketsService.registerMarket(body),
    { invalidateQueries: [["markets", "list"]] },
  );
}

export function useIngestCorpus(marketId: string) {
  return useTenantMutation(
    async (_org, body: unknown) => marketsService.ingestCorpus(marketId, body),
    { invalidateQueries: [["markets", "corpora", marketId]] },
  );
}

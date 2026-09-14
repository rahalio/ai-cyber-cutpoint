import { useTenantQuery } from "@/services/shared/infrastructure/tenant-query";
import { marketsService } from "../markets.service";

export function useListMarkets(params?: Record<string, any>) {
  return useTenantQuery(["markets", "list", params], async () =>
    marketsService.listMarkets(params),
  );
}

export function useMarket(marketId: string) {
  return useTenantQuery(
    ["markets", "get", marketId],
    async () => marketsService.getMarket(marketId),
    { enabled: !!marketId },
  );
}

export function useListCorpora(marketId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["markets", "corpora", marketId, params],
    async () => marketsService.listCorpora(marketId, params),
    { enabled: !!marketId },
  );
}

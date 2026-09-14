import { useTenantQuery } from "@/services/shared/infrastructure/tenant-query";
import { discoveryService } from "../discovery.service";

export function useListChainCandidates(params?: Record<string, any>) {
  return useTenantQuery(["discovery", "candidates", params], async () =>
    discoveryService.listChainCandidates(params),
  );
}

export function useChainCandidate(candidateId: string) {
  return useTenantQuery(
    ["discovery", "candidate", candidateId],
    async () => discoveryService.getChainCandidate(candidateId),
    { enabled: !!candidateId },
  );
}

export function useListDependencyEdges(params?: Record<string, any>) {
  return useTenantQuery(["discovery", "edges", params], async () =>
    discoveryService.listDependencyEdges(params),
  );
}

export function useDependencyMap(marketId: string) {
  return useTenantQuery(
    ["discovery", "map", marketId],
    async () => discoveryService.getDependencyMap(marketId),
    { enabled: !!marketId },
  );
}

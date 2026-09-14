import { discoveryService } from "./discovery.service";

export const discoveryFacade = {
  listChainCandidates: discoveryService.listChainCandidates.bind(discoveryService),
  getChainCandidate: discoveryService.getChainCandidate.bind(discoveryService),
  adjudicateChainCandidate: discoveryService.adjudicateChainCandidate.bind(discoveryService),
  listDependencyEdges: discoveryService.listDependencyEdges.bind(discoveryService),
  getDependencyMap: discoveryService.getDependencyMap.bind(discoveryService),
};

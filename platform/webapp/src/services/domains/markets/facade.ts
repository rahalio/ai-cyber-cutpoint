import { marketsService } from "./markets.service";

export const marketsFacade = {
  listMarkets: marketsService.listMarkets.bind(marketsService),
  registerMarket: marketsService.registerMarket.bind(marketsService),
  getMarket: marketsService.getMarket.bind(marketsService),
  listCorpora: marketsService.listCorpora.bind(marketsService),
  ingestCorpus: marketsService.ingestCorpus.bind(marketsService),
};

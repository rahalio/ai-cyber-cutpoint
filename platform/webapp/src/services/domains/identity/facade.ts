import { identityService } from "./identity.service";

export const identityFacade = {
  listApiKeys: identityService.listApiKeys.bind(identityService),
  createApiKey: identityService.createApiKey.bind(identityService),
  revokeApiKey: identityService.revokeApiKey.bind(identityService),
  listUsers: identityService.listUsers.bind(identityService),
  login: identityService.login.bind(identityService),
  getOperatorMe: identityService.getOperatorMe.bind(identityService),
  logout: identityService.logout.bind(identityService),
};

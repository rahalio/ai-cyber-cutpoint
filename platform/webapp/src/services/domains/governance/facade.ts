import { governanceService } from "./governance.service";

export const governanceFacade = {
  getCoverageAssessment: governanceService.getCoverageAssessment.bind(governanceService),
  getDriftAssessment: governanceService.getDriftAssessment.bind(governanceService),
  listPublicationHolds: governanceService.listPublicationHolds.bind(governanceService),
  sealEvidencePackage: governanceService.sealEvidencePackage.bind(governanceService),
  getEvidencePackage: governanceService.getEvidencePackage.bind(governanceService),
};

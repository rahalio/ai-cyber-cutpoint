import { labellingService } from "./labelling.service";

export const labellingFacade = {
  getTaxonomy: labellingService.getTaxonomy.bind(labellingService),
  publishTaxonomyVersion: labellingService.publishTaxonomyVersion.bind(labellingService),
  listAnnotationBatches: labellingService.listAnnotationBatches.bind(labellingService),
  createAnnotationBatch: labellingService.createAnnotationBatch.bind(labellingService),
  submitAnnotationLabels: labellingService.submitAnnotationLabels.bind(labellingService),
  getLabellerAgreement: labellingService.getLabellerAgreement.bind(labellingService),
  listClassificationRuns: labellingService.listClassificationRuns.bind(labellingService),
};

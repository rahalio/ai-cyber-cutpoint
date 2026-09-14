import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const sealEvidencePackage_Body = z
  .object({
    chainAdjudicationIds: z.array(z.string()),
    purpose: z.enum([
      'law_enforcement_referral',
      'internal_legal',
      'regulator_disclosure',
    ]),
    recipient: z.string().optional(),
  })
  .passthrough();
const MarketId = z.string();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const CoverageAssessment = z
  .object({
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    assessedAt: z.string().datetime({ offset: true }),
    taxonomyVersion: z.string().optional(),
    outOfTaxonomyShare: z.number().optional(),
    emergingUnnamedThemes: z.array(z.string()).optional(),
    recallMeasurable: z.boolean().optional().default(false),
    coverageStatement: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const CoverageAssessmentResponse = z
  .object({
    data: z
      .object({
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        assessedAt: z.string().datetime({ offset: true }),
        taxonomyVersion: z.string().optional(),
        outOfTaxonomyShare: z.number().optional(),
        emergingUnnamedThemes: z.array(z.string()).optional(),
        recallMeasurable: z.boolean().optional().default(false),
        coverageStatement: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DriftAssessment = z
  .object({
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    assessedAt: z.string().datetime({ offset: true }),
    holdoutWindowStart: z.string().optional(),
    holdoutWindowEnd: z.string().optional(),
    holdoutF1: z.number().optional(),
    thresholdF1: z.number().optional(),
    breached: z.boolean().optional(),
    daysSinceLastRelabelling: z.number().int().optional(),
    recommendedAction: z
      .enum(['none', 'schedule_relabelling', 'relabel_now', 'hold_publication'])
      .optional(),
  })
  .passthrough();
const DriftAssessmentResponse = z
  .object({
    data: z
      .object({
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        assessedAt: z.string().datetime({ offset: true }),
        holdoutWindowStart: z.string().optional(),
        holdoutWindowEnd: z.string().optional(),
        holdoutF1: z.number().optional(),
        thresholdF1: z.number().optional(),
        breached: z.boolean().optional(),
        daysSinceLastRelabelling: z.number().int().optional(),
        recommendedAction: z
          .enum([
            'none',
            'schedule_relabelling',
            'relabel_now',
            'hold_publication',
          ])
          .optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const PublicationHoldId = z.string();
const PublicationHold = z
  .object({
    publicationHoldId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    cause: z.enum([
      'drift_threshold_breached',
      'taxonomy_coverage_breached',
      'retention_expired',
      'licence_lapsed',
    ]),
    appliedAt: z.string().datetime({ offset: true }),
    liftedAt: z.string().datetime({ offset: true }).optional(),
    detail: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const PublicationHoldListData = z
  .object({
    items: z.array(
      z
        .object({
          publicationHoldId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
          marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
          cause: z.enum([
            'drift_threshold_breached',
            'taxonomy_coverage_breached',
            'retention_expired',
            'licence_lapsed',
          ]),
          appliedAt: z.string().datetime({ offset: true }),
          liftedAt: z.string().datetime({ offset: true }).optional(),
          detail: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const PublicationHoldListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              publicationHoldId: z
                .string()
                .regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              cause: z.enum([
                'drift_threshold_breached',
                'taxonomy_coverage_breached',
                'retention_expired',
                'licence_lapsed',
              ]),
              appliedAt: z.string().datetime({ offset: true }),
              liftedAt: z.string().datetime({ offset: true }).optional(),
              detail: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const EvidencePackageCreate = z
  .object({
    chainAdjudicationIds: z.array(z.string()),
    purpose: z.enum([
      'law_enforcement_referral',
      'internal_legal',
      'regulator_disclosure',
    ]),
    recipient: z.string().optional(),
  })
  .passthrough();
const EvidencePackageId = z.string();
const ArtefactHash = z
  .object({
    artefactId: z.string(),
    artefactType: z.enum(['post', 'reply', 'adjudication', 'dependency_edge']),
    hash: z.string(),
  })
  .partial()
  .passthrough();
const CustodyEvent = z
  .object({
    at: z.string().datetime({ offset: true }),
    actor: z.string(),
    action: z.enum(['sealed', 'accessed', 'transferred', 'disclosed']),
    recipient: z.string().optional(),
  })
  .passthrough();
const EvidencePackage = z
  .object({
    evidencePackageId: z.string().regex(/^evd_[0-9A-HJKMNP-TV-Z]{26}$/),
    purpose: z.enum([
      'law_enforcement_referral',
      'internal_legal',
      'regulator_disclosure',
    ]),
    sealedAt: z.string().datetime({ offset: true }),
    sealedBy: z.string().optional(),
    manifestHash: z.string(),
    artefactHashes: z
      .array(
        z
          .object({
            artefactId: z.string(),
            artefactType: z.enum([
              'post',
              'reply',
              'adjudication',
              'dependency_edge',
            ]),
            hash: z.string(),
          })
          .partial()
          .passthrough()
      )
      .optional(),
    custodyLog: z
      .array(
        z
          .object({
            at: z.string().datetime({ offset: true }),
            actor: z.string(),
            action: z.enum(['sealed', 'accessed', 'transferred', 'disclosed']),
            recipient: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const EvidencePackageResponse = z
  .object({
    data: z
      .object({
        evidencePackageId: z.string().regex(/^evd_[0-9A-HJKMNP-TV-Z]{26}$/),
        purpose: z.enum([
          'law_enforcement_referral',
          'internal_legal',
          'regulator_disclosure',
        ]),
        sealedAt: z.string().datetime({ offset: true }),
        sealedBy: z.string().optional(),
        manifestHash: z.string(),
        artefactHashes: z
          .array(
            z
              .object({
                artefactId: z.string(),
                artefactType: z.enum([
                  'post',
                  'reply',
                  'adjudication',
                  'dependency_edge',
                ]),
                hash: z.string(),
              })
              .partial()
              .passthrough()
          )
          .optional(),
        custodyLog: z
          .array(
            z
              .object({
                at: z.string().datetime({ offset: true }),
                actor: z.string(),
                action: z.enum([
                  'sealed',
                  'accessed',
                  'transferred',
                  'disclosed',
                ]),
                recipient: z.string().optional(),
              })
              .passthrough()
          )
          .optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  sealEvidencePackage_Body,
  MarketId,
  Problem,
  CoverageAssessment,
  ResponseMeta,
  CoverageAssessmentResponse,
  DriftAssessment,
  DriftAssessmentResponse,
  PublicationHoldId,
  PublicationHold,
  PublicationHoldListData,
  PublicationHoldListResponse,
  EvidencePackageCreate,
  EvidencePackageId,
  ArtefactHash,
  CustodyEvent,
  EvidencePackage,
  EvidencePackageResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/assurance/markets/:marketId/coverage',
    alias: 'getCoverageAssessment',
    description: `Share of market traffic outside the active taxonomy. Recall is unmeasurable; coverage is a floor.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'marketId',
        type: 'Path',
        schema: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            assessedAt: z.string().datetime({ offset: true }),
            taxonomyVersion: z.string().optional(),
            outOfTaxonomyShare: z.number().optional(),
            emergingUnnamedThemes: z.array(z.string()).optional(),
            recallMeasurable: z.boolean().optional().default(false),
            coverageStatement: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
  },
  {
    method: 'get',
    path: '/v1/assurance/markets/:marketId/drift',
    alias: 'getDriftAssessment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'marketId',
        type: 'Path',
        schema: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            assessedAt: z.string().datetime({ offset: true }),
            holdoutWindowStart: z.string().optional(),
            holdoutWindowEnd: z.string().optional(),
            holdoutF1: z.number().optional(),
            thresholdF1: z.number().optional(),
            breached: z.boolean().optional(),
            daysSinceLastRelabelling: z.number().int().optional(),
            recommendedAction: z
              .enum([
                'none',
                'schedule_relabelling',
                'relabel_now',
                'hold_publication',
              ])
              .optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
  },
  {
    method: 'get',
    path: '/v1/assurance/publication-holds',
    alias: 'listPublicationHolds',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  publicationHoldId: z
                    .string()
                    .regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  cause: z.enum([
                    'drift_threshold_breached',
                    'taxonomy_coverage_breached',
                    'retention_expired',
                    'licence_lapsed',
                  ]),
                  appliedAt: z.string().datetime({ offset: true }),
                  liftedAt: z.string().datetime({ offset: true }).optional(),
                  detail: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
  },
  {
    method: 'post',
    path: '/v1/evidence/packages',
    alias: 'sealEvidencePackage',
    description: `Privileged action. Seals adjudicated chains into a hash-manifested referral package.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: sealEvidencePackage_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            evidencePackageId: z.string().regex(/^evd_[0-9A-HJKMNP-TV-Z]{26}$/),
            purpose: z.enum([
              'law_enforcement_referral',
              'internal_legal',
              'regulator_disclosure',
            ]),
            sealedAt: z.string().datetime({ offset: true }),
            sealedBy: z.string().optional(),
            manifestHash: z.string(),
            artefactHashes: z
              .array(
                z
                  .object({
                    artefactId: z.string(),
                    artefactType: z.enum([
                      'post',
                      'reply',
                      'adjudication',
                      'dependency_edge',
                    ]),
                    hash: z.string(),
                  })
                  .partial()
                  .passthrough()
              )
              .optional(),
            custodyLog: z
              .array(
                z
                  .object({
                    at: z.string().datetime({ offset: true }),
                    actor: z.string(),
                    action: z.enum([
                      'sealed',
                      'accessed',
                      'transferred',
                      'disclosed',
                    ]),
                    recipient: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 403,
        description: `Authenticated but not permitted`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/evidence/packages/:packageId',
    alias: 'getEvidencePackage',
    requestFormat: 'json',
    parameters: [
      {
        name: 'packageId',
        type: 'Path',
        schema: z.string().regex(/^evd_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            evidencePackageId: z.string().regex(/^evd_[0-9A-HJKMNP-TV-Z]{26}$/),
            purpose: z.enum([
              'law_enforcement_referral',
              'internal_legal',
              'regulator_disclosure',
            ]),
            sealedAt: z.string().datetime({ offset: true }),
            sealedBy: z.string().optional(),
            manifestHash: z.string(),
            artefactHashes: z
              .array(
                z
                  .object({
                    artefactId: z.string(),
                    artefactType: z.enum([
                      'post',
                      'reply',
                      'adjudication',
                      'dependency_edge',
                    ]),
                    hash: z.string(),
                  })
                  .partial()
                  .passthrough()
              )
              .optional(),
            custodyLog: z
              .array(
                z
                  .object({
                    at: z.string().datetime({ offset: true }),
                    actor: z.string(),
                    action: z.enum([
                      'sealed',
                      'accessed',
                      'transferred',
                      'disclosed',
                    ]),
                    recipient: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}

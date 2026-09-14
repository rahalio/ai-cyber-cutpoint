import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerMarket_Body = z
  .object({
    name: z.string(),
    language: z.string(),
    onboardingLabelBudgetPosts: z.number().int().gte(1000),
    driftThresholdF1: z.number().optional(),
  })
  .passthrough();
const ingestCorpus_Body = z
  .object({
    payloadReference: z.string(),
    licence: z
      .object({
        lawfulBasis: z.enum([
          'public_posting_scrape',
          'commercial_agreement',
          'research_agreement',
          'law_enforcement_disclosure',
        ]),
        licenceTerms: z.string(),
        redistributionPermitted: z.boolean().optional(),
        publicIndexingPermitted: z.boolean().optional().default(false),
      })
      .passthrough(),
    retention: z
      .object({
        rawRetentionDays: z.number().int(),
        derivedRetentionDays: z.number().int().optional(),
        purgeOnExpiry: z.boolean().optional().default(true),
      })
      .passthrough(),
    pseudonymiseActors: z.boolean().optional().default(true),
    coverageStart: z.string().optional(),
    coverageEnd: z.string().optional(),
  })
  .passthrough();
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
const MarketId = z.string();
const Market = z
  .object({
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    language: z.string(),
    status: z.enum(['onboarding', 'labelling', 'active', 'held', 'exited']),
    onboardingLabelBudgetPosts: z.number().int().optional(),
    labelledPosts: z.number().int().optional(),
    annotationEffortSeconds: z.number().int().optional(),
    activeTaxonomyVersion: z.string().optional(),
    publicationHeld: z.boolean().optional(),
    firstAdjudicatedChainAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const MarketListData = z
  .object({
    items: z.array(
      z
        .object({
          marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string(),
          language: z.string(),
          status: z.enum([
            'onboarding',
            'labelling',
            'active',
            'held',
            'exited',
          ]),
          onboardingLabelBudgetPosts: z.number().int().optional(),
          labelledPosts: z.number().int().optional(),
          annotationEffortSeconds: z.number().int().optional(),
          activeTaxonomyVersion: z.string().optional(),
          publicationHeld: z.boolean().optional(),
          firstAdjudicatedChainAt: z
            .string()
            .datetime({ offset: true })
            .optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
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
const MarketListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              language: z.string(),
              status: z.enum([
                'onboarding',
                'labelling',
                'active',
                'held',
                'exited',
              ]),
              onboardingLabelBudgetPosts: z.number().int().optional(),
              labelledPosts: z.number().int().optional(),
              annotationEffortSeconds: z.number().int().optional(),
              activeTaxonomyVersion: z.string().optional(),
              publicationHeld: z.boolean().optional(),
              firstAdjudicatedChainAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
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
const MarketCreate = z
  .object({
    name: z.string(),
    language: z.string(),
    onboardingLabelBudgetPosts: z.number().int().gte(1000),
    driftThresholdF1: z.number().optional(),
  })
  .passthrough();
const MarketResponse = z
  .object({
    data: z
      .object({
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        language: z.string(),
        status: z.enum(['onboarding', 'labelling', 'active', 'held', 'exited']),
        onboardingLabelBudgetPosts: z.number().int().optional(),
        labelledPosts: z.number().int().optional(),
        annotationEffortSeconds: z.number().int().optional(),
        activeTaxonomyVersion: z.string().optional(),
        publicationHeld: z.boolean().optional(),
        firstAdjudicatedChainAt: z
          .string()
          .datetime({ offset: true })
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
const CorpusId = z.string();
const SourceLicence = z
  .object({
    lawfulBasis: z.enum([
      'public_posting_scrape',
      'commercial_agreement',
      'research_agreement',
      'law_enforcement_disclosure',
    ]),
    licenceTerms: z.string(),
    redistributionPermitted: z.boolean().optional(),
    publicIndexingPermitted: z.boolean().optional().default(false),
  })
  .passthrough();
const RetentionPolicy = z
  .object({
    rawRetentionDays: z.number().int(),
    derivedRetentionDays: z.number().int().optional(),
    purgeOnExpiry: z.boolean().optional().default(true),
  })
  .passthrough();
const Corpus = z
  .object({
    corpusId: z.string().regex(/^crp_[0-9A-HJKMNP-TV-Z]{26}$/),
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum([
      'accepted',
      'pseudonymising',
      'available',
      'expired',
      'purged',
    ]),
    threadCount: z.number().int().optional(),
    replyCount: z.number().int().optional(),
    uniqueActorCount: z.number().int().optional(),
    coverageStart: z.string().optional(),
    coverageEnd: z.string().optional(),
    licence: z
      .object({
        lawfulBasis: z.enum([
          'public_posting_scrape',
          'commercial_agreement',
          'research_agreement',
          'law_enforcement_disclosure',
        ]),
        licenceTerms: z.string(),
        redistributionPermitted: z.boolean().optional(),
        publicIndexingPermitted: z.boolean().optional().default(false),
      })
      .passthrough()
      .optional(),
    retention: z
      .object({
        rawRetentionDays: z.number().int(),
        derivedRetentionDays: z.number().int().optional(),
        purgeOnExpiry: z.boolean().optional().default(true),
      })
      .passthrough()
      .optional(),
    retentionExpiresAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CorpusListData = z
  .object({
    items: z.array(
      z
        .object({
          corpusId: z.string().regex(/^crp_[0-9A-HJKMNP-TV-Z]{26}$/),
          marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum([
            'accepted',
            'pseudonymising',
            'available',
            'expired',
            'purged',
          ]),
          threadCount: z.number().int().optional(),
          replyCount: z.number().int().optional(),
          uniqueActorCount: z.number().int().optional(),
          coverageStart: z.string().optional(),
          coverageEnd: z.string().optional(),
          licence: z
            .object({
              lawfulBasis: z.enum([
                'public_posting_scrape',
                'commercial_agreement',
                'research_agreement',
                'law_enforcement_disclosure',
              ]),
              licenceTerms: z.string(),
              redistributionPermitted: z.boolean().optional(),
              publicIndexingPermitted: z.boolean().optional().default(false),
            })
            .passthrough()
            .optional(),
          retention: z
            .object({
              rawRetentionDays: z.number().int(),
              derivedRetentionDays: z.number().int().optional(),
              purgeOnExpiry: z.boolean().optional().default(true),
            })
            .passthrough()
            .optional(),
          retentionExpiresAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const CorpusListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              corpusId: z.string().regex(/^crp_[0-9A-HJKMNP-TV-Z]{26}$/),
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum([
                'accepted',
                'pseudonymising',
                'available',
                'expired',
                'purged',
              ]),
              threadCount: z.number().int().optional(),
              replyCount: z.number().int().optional(),
              uniqueActorCount: z.number().int().optional(),
              coverageStart: z.string().optional(),
              coverageEnd: z.string().optional(),
              licence: z
                .object({
                  lawfulBasis: z.enum([
                    'public_posting_scrape',
                    'commercial_agreement',
                    'research_agreement',
                    'law_enforcement_disclosure',
                  ]),
                  licenceTerms: z.string(),
                  redistributionPermitted: z.boolean().optional(),
                  publicIndexingPermitted: z
                    .boolean()
                    .optional()
                    .default(false),
                })
                .passthrough()
                .optional(),
              retention: z
                .object({
                  rawRetentionDays: z.number().int(),
                  derivedRetentionDays: z.number().int().optional(),
                  purgeOnExpiry: z.boolean().optional().default(true),
                })
                .passthrough()
                .optional(),
              retentionExpiresAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
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
const CorpusIngest = z
  .object({
    payloadReference: z.string(),
    licence: z
      .object({
        lawfulBasis: z.enum([
          'public_posting_scrape',
          'commercial_agreement',
          'research_agreement',
          'law_enforcement_disclosure',
        ]),
        licenceTerms: z.string(),
        redistributionPermitted: z.boolean().optional(),
        publicIndexingPermitted: z.boolean().optional().default(false),
      })
      .passthrough(),
    retention: z
      .object({
        rawRetentionDays: z.number().int(),
        derivedRetentionDays: z.number().int().optional(),
        purgeOnExpiry: z.boolean().optional().default(true),
      })
      .passthrough(),
    pseudonymiseActors: z.boolean().optional().default(true),
    coverageStart: z.string().optional(),
    coverageEnd: z.string().optional(),
  })
  .passthrough();
const CorpusResponse = z
  .object({
    data: z
      .object({
        corpusId: z.string().regex(/^crp_[0-9A-HJKMNP-TV-Z]{26}$/),
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum([
          'accepted',
          'pseudonymising',
          'available',
          'expired',
          'purged',
        ]),
        threadCount: z.number().int().optional(),
        replyCount: z.number().int().optional(),
        uniqueActorCount: z.number().int().optional(),
        coverageStart: z.string().optional(),
        coverageEnd: z.string().optional(),
        licence: z
          .object({
            lawfulBasis: z.enum([
              'public_posting_scrape',
              'commercial_agreement',
              'research_agreement',
              'law_enforcement_disclosure',
            ]),
            licenceTerms: z.string(),
            redistributionPermitted: z.boolean().optional(),
            publicIndexingPermitted: z.boolean().optional().default(false),
          })
          .passthrough()
          .optional(),
        retention: z
          .object({
            rawRetentionDays: z.number().int(),
            derivedRetentionDays: z.number().int().optional(),
            purgeOnExpiry: z.boolean().optional().default(true),
          })
          .passthrough()
          .optional(),
        retentionExpiresAt: z.string().datetime({ offset: true }).optional(),
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
  registerMarket_Body,
  ingestCorpus_Body,
  Problem,
  MarketId,
  Market,
  MarketListData,
  ResponseMeta,
  MarketListResponse,
  MarketCreate,
  MarketResponse,
  CorpusId,
  SourceLicence,
  RetentionPolicy,
  Corpus,
  CorpusListData,
  CorpusListResponse,
  CorpusIngest,
  CorpusResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/markets',
    alias: 'listMarkets',
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
      {
        name: 'language',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['onboarding', 'labelling', 'active', 'held', 'exited'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  language: z.string(),
                  status: z.enum([
                    'onboarding',
                    'labelling',
                    'active',
                    'held',
                    'exited',
                  ]),
                  onboardingLabelBudgetPosts: z.number().int().optional(),
                  labelledPosts: z.number().int().optional(),
                  annotationEffortSeconds: z.number().int().optional(),
                  activeTaxonomyVersion: z.string().optional(),
                  publicationHeld: z.boolean().optional(),
                  firstAdjudicatedChainAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
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
    method: 'post',
    path: '/v1/markets',
    alias: 'registerMarket',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerMarket_Body,
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
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            language: z.string(),
            status: z.enum([
              'onboarding',
              'labelling',
              'active',
              'held',
              'exited',
            ]),
            onboardingLabelBudgetPosts: z.number().int().optional(),
            labelledPosts: z.number().int().optional(),
            annotationEffortSeconds: z.number().int().optional(),
            activeTaxonomyVersion: z.string().optional(),
            publicationHeld: z.boolean().optional(),
            firstAdjudicatedChainAt: z
              .string()
              .datetime({ offset: true })
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
        status: 401,
        description: `Missing or invalid API key`,
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
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
    path: '/v1/markets/:marketId',
    alias: 'getMarket',
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
            name: z.string(),
            language: z.string(),
            status: z.enum([
              'onboarding',
              'labelling',
              'active',
              'held',
              'exited',
            ]),
            onboardingLabelBudgetPosts: z.number().int().optional(),
            labelledPosts: z.number().int().optional(),
            annotationEffortSeconds: z.number().int().optional(),
            activeTaxonomyVersion: z.string().optional(),
            publicationHeld: z.boolean().optional(),
            firstAdjudicatedChainAt: z
              .string()
              .datetime({ offset: true })
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
        status: 401,
        description: `Missing or invalid API key`,
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
  {
    method: 'get',
    path: '/v1/markets/:marketId/corpora',
    alias: 'listCorpora',
    requestFormat: 'json',
    parameters: [
      {
        name: 'marketId',
        type: 'Path',
        schema: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
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
                  corpusId: z.string().regex(/^crp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum([
                    'accepted',
                    'pseudonymising',
                    'available',
                    'expired',
                    'purged',
                  ]),
                  threadCount: z.number().int().optional(),
                  replyCount: z.number().int().optional(),
                  uniqueActorCount: z.number().int().optional(),
                  coverageStart: z.string().optional(),
                  coverageEnd: z.string().optional(),
                  licence: z
                    .object({
                      lawfulBasis: z.enum([
                        'public_posting_scrape',
                        'commercial_agreement',
                        'research_agreement',
                        'law_enforcement_disclosure',
                      ]),
                      licenceTerms: z.string(),
                      redistributionPermitted: z.boolean().optional(),
                      publicIndexingPermitted: z
                        .boolean()
                        .optional()
                        .default(false),
                    })
                    .passthrough()
                    .optional(),
                  retention: z
                    .object({
                      rawRetentionDays: z.number().int(),
                      derivedRetentionDays: z.number().int().optional(),
                      purgeOnExpiry: z.boolean().optional().default(true),
                    })
                    .passthrough()
                    .optional(),
                  retentionExpiresAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
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
    method: 'post',
    path: '/v1/markets/:marketId/corpora',
    alias: 'ingestCorpus',
    description: `Ingest a licensed corpus. Rejected unless lawful basis, licence terms, and a retention window are supplied, and unless pseudonymisation is requested.
`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: ingestCorpus_Body,
      },
      {
        name: 'marketId',
        type: 'Path',
        schema: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            corpusId: z.string().regex(/^crp_[0-9A-HJKMNP-TV-Z]{26}$/),
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum([
              'accepted',
              'pseudonymising',
              'available',
              'expired',
              'purged',
            ]),
            threadCount: z.number().int().optional(),
            replyCount: z.number().int().optional(),
            uniqueActorCount: z.number().int().optional(),
            coverageStart: z.string().optional(),
            coverageEnd: z.string().optional(),
            licence: z
              .object({
                lawfulBasis: z.enum([
                  'public_posting_scrape',
                  'commercial_agreement',
                  'research_agreement',
                  'law_enforcement_disclosure',
                ]),
                licenceTerms: z.string(),
                redistributionPermitted: z.boolean().optional(),
                publicIndexingPermitted: z.boolean().optional().default(false),
              })
              .passthrough()
              .optional(),
            retention: z
              .object({
                rawRetentionDays: z.number().int(),
                derivedRetentionDays: z.number().int().optional(),
                purgeOnExpiry: z.boolean().optional().default(true),
              })
              .passthrough()
              .optional(),
            retentionExpiresAt: z
              .string()
              .datetime({ offset: true })
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
        status: 401,
        description: `Missing or invalid API key`,
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
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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

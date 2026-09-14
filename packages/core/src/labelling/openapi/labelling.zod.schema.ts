import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const publishTaxonomyVersion_Body = z
  .object({
    categories: z.array(
      z
        .object({
          key: z.string(),
          label: z.string(),
          definition: z.string().optional(),
          retired: z.boolean().optional().default(false),
        })
        .passthrough()
    ),
    changeSummary: z.string(),
  })
  .passthrough();
const createAnnotationBatch_Body = z
  .object({
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    targetPosts: z.number().int(),
    holdoutReservedPosts: z.number().int().optional(),
    labellerIds: z.array(z.string()).optional(),
  })
  .passthrough();
const submitAnnotationLabels_Body = z
  .object({
    postLabels: z.array(
      z
        .object({
          postId: z.string(),
          categoryKey: z.string(),
          labellerId: z.string(),
          confidence: z.enum(['certain', 'probable', 'unsure']).optional(),
        })
        .passthrough()
    ),
    replyLabels: z.array(
      z
        .object({
          replyId: z.string(),
          replyType: z.enum(['buy', 'sell', 'endorsement', 'other']),
          labellerId: z.string(),
        })
        .passthrough()
    ),
    effortSeconds: z.number().int().optional(),
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
const ProductCategory = z
  .object({
    key: z.string(),
    label: z.string(),
    definition: z.string().optional(),
    retired: z.boolean().optional().default(false),
  })
  .passthrough();
const Taxonomy = z
  .object({
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    activeVersion: z.string(),
    categories: z.array(
      z
        .object({
          key: z.string(),
          label: z.string(),
          definition: z.string().optional(),
          retired: z.boolean().optional().default(false),
        })
        .passthrough()
    ),
    outOfTaxonomyShare: z.number().optional(),
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
const TaxonomyResponse = z
  .object({
    data: z
      .object({
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        activeVersion: z.string(),
        categories: z.array(
          z
            .object({
              key: z.string(),
              label: z.string(),
              definition: z.string().optional(),
              retired: z.boolean().optional().default(false),
            })
            .passthrough()
        ),
        outOfTaxonomyShare: z.number().optional(),
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
const TaxonomyVersionCreate = z
  .object({
    categories: z.array(
      z
        .object({
          key: z.string(),
          label: z.string(),
          definition: z.string().optional(),
          retired: z.boolean().optional().default(false),
        })
        .passthrough()
    ),
    changeSummary: z.string(),
  })
  .passthrough();
const TaxonomyVersionId = z.string();
const TaxonomyVersion = z
  .object({
    taxonomyVersionId: z.string().regex(/^tax_[0-9A-HJKMNP-TV-Z]{26}$/),
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    version: z.string(),
    publishedAt: z.string().datetime({ offset: true }),
    publishedBy: z.string().optional(),
    changeSummary: z.string().optional(),
    categories: z
      .array(
        z
          .object({
            key: z.string(),
            label: z.string(),
            definition: z.string().optional(),
            retired: z.boolean().optional().default(false),
          })
          .passthrough()
      )
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const TaxonomyVersionResponse = z
  .object({
    data: z
      .object({
        taxonomyVersionId: z.string().regex(/^tax_[0-9A-HJKMNP-TV-Z]{26}$/),
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        version: z.string(),
        publishedAt: z.string().datetime({ offset: true }),
        publishedBy: z.string().optional(),
        changeSummary: z.string().optional(),
        categories: z
          .array(
            z
              .object({
                key: z.string(),
                label: z.string(),
                definition: z.string().optional(),
                retired: z.boolean().optional().default(false),
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
const BatchId = z.string();
const AnnotationBatch = z
  .object({
    batchId: z.string().regex(/^bat_[0-9A-HJKMNP-TV-Z]{26}$/),
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    taxonomyVersion: z.string().optional(),
    status: z.enum(['open', 'in_progress', 'complete', 'abandoned']),
    targetPosts: z.number().int(),
    labelledPosts: z.number().int().optional(),
    labelledReplies: z.number().int().optional(),
    holdoutReservedPosts: z.number().int().optional(),
    effortSeconds: z.number().int().optional(),
    budgetConsumedShare: z.number().optional(),
    labellerIds: z.array(z.string()).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AnnotationBatchListData = z
  .object({
    items: z.array(
      z
        .object({
          batchId: z.string().regex(/^bat_[0-9A-HJKMNP-TV-Z]{26}$/),
          marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
          taxonomyVersion: z.string().optional(),
          status: z.enum(['open', 'in_progress', 'complete', 'abandoned']),
          targetPosts: z.number().int(),
          labelledPosts: z.number().int().optional(),
          labelledReplies: z.number().int().optional(),
          holdoutReservedPosts: z.number().int().optional(),
          effortSeconds: z.number().int().optional(),
          budgetConsumedShare: z.number().optional(),
          labellerIds: z.array(z.string()).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const AnnotationBatchListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              batchId: z.string().regex(/^bat_[0-9A-HJKMNP-TV-Z]{26}$/),
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              taxonomyVersion: z.string().optional(),
              status: z.enum(['open', 'in_progress', 'complete', 'abandoned']),
              targetPosts: z.number().int(),
              labelledPosts: z.number().int().optional(),
              labelledReplies: z.number().int().optional(),
              holdoutReservedPosts: z.number().int().optional(),
              effortSeconds: z.number().int().optional(),
              budgetConsumedShare: z.number().optional(),
              labellerIds: z.array(z.string()).optional(),
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
const AnnotationBatchCreate = z
  .object({
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    targetPosts: z.number().int(),
    holdoutReservedPosts: z.number().int().optional(),
    labellerIds: z.array(z.string()).optional(),
  })
  .passthrough();
const AnnotationBatchResponse = z
  .object({
    data: z
      .object({
        batchId: z.string().regex(/^bat_[0-9A-HJKMNP-TV-Z]{26}$/),
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        taxonomyVersion: z.string().optional(),
        status: z.enum(['open', 'in_progress', 'complete', 'abandoned']),
        targetPosts: z.number().int(),
        labelledPosts: z.number().int().optional(),
        labelledReplies: z.number().int().optional(),
        holdoutReservedPosts: z.number().int().optional(),
        effortSeconds: z.number().int().optional(),
        budgetConsumedShare: z.number().optional(),
        labellerIds: z.array(z.string()).optional(),
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
const PostLabel = z
  .object({
    postId: z.string(),
    categoryKey: z.string(),
    labellerId: z.string(),
    confidence: z.enum(['certain', 'probable', 'unsure']).optional(),
  })
  .passthrough();
const ReplyLabel = z
  .object({
    replyId: z.string(),
    replyType: z.enum(['buy', 'sell', 'endorsement', 'other']),
    labellerId: z.string(),
  })
  .passthrough();
const AnnotationLabelsSubmit = z
  .object({
    postLabels: z.array(
      z
        .object({
          postId: z.string(),
          categoryKey: z.string(),
          labellerId: z.string(),
          confidence: z.enum(['certain', 'probable', 'unsure']).optional(),
        })
        .passthrough()
    ),
    replyLabels: z.array(
      z
        .object({
          replyId: z.string(),
          replyType: z.enum(['buy', 'sell', 'endorsement', 'other']),
          labellerId: z.string(),
        })
        .passthrough()
    ),
    effortSeconds: z.number().int().optional(),
  })
  .passthrough();
const ContestedCategory = z
  .object({ categoryKey: z.string(), disagreementRate: z.number() })
  .partial()
  .passthrough();
const LabellerAgreement = z
  .object({
    batchId: z.string().regex(/^bat_[0-9A-HJKMNP-TV-Z]{26}$/),
    pairwiseAgreement: z.number().optional(),
    contestedCategories: z
      .array(
        z
          .object({ categoryKey: z.string(), disagreementRate: z.number() })
          .partial()
          .passthrough()
      )
      .optional(),
    labellersBelowThreshold: z.array(z.string()).optional(),
  })
  .passthrough();
const LabellerAgreementResponse = z
  .object({
    data: z
      .object({
        batchId: z.string().regex(/^bat_[0-9A-HJKMNP-TV-Z]{26}$/),
        pairwiseAgreement: z.number().optional(),
        contestedCategories: z
          .array(
            z
              .object({ categoryKey: z.string(), disagreementRate: z.number() })
              .partial()
              .passthrough()
          )
          .optional(),
        labellersBelowThreshold: z.array(z.string()).optional(),
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
const ClassificationRunId = z.string();
const CategoryPrecision = z
  .object({ categoryKey: z.string(), precision: z.number() })
  .partial()
  .passthrough();
const ClassificationRun = z
  .object({
    classificationRunId: z.string().regex(/^run_[0-9A-HJKMNP-TV-Z]{26}$/),
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    taxonomyVersion: z.string().optional(),
    completedAt: z.string().datetime({ offset: true }),
    postsClassified: z.number().int().optional(),
    repliesClassified: z.number().int().optional(),
    weightedProductPrecision: z.number().optional(),
    weightedReplyPrecision: z.number().optional(),
    perCategoryPrecision: z
      .array(
        z
          .object({ categoryKey: z.string(), precision: z.number() })
          .partial()
          .passthrough()
      )
      .optional(),
    recallMeasurable: z.boolean().optional().default(false),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ClassificationRunListData = z
  .object({
    items: z.array(
      z
        .object({
          classificationRunId: z.string().regex(/^run_[0-9A-HJKMNP-TV-Z]{26}$/),
          marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
          taxonomyVersion: z.string().optional(),
          completedAt: z.string().datetime({ offset: true }),
          postsClassified: z.number().int().optional(),
          repliesClassified: z.number().int().optional(),
          weightedProductPrecision: z.number().optional(),
          weightedReplyPrecision: z.number().optional(),
          perCategoryPrecision: z
            .array(
              z
                .object({ categoryKey: z.string(), precision: z.number() })
                .partial()
                .passthrough()
            )
            .optional(),
          recallMeasurable: z.boolean().optional().default(false),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ClassificationRunListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              classificationRunId: z
                .string()
                .regex(/^run_[0-9A-HJKMNP-TV-Z]{26}$/),
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              taxonomyVersion: z.string().optional(),
              completedAt: z.string().datetime({ offset: true }),
              postsClassified: z.number().int().optional(),
              repliesClassified: z.number().int().optional(),
              weightedProductPrecision: z.number().optional(),
              weightedReplyPrecision: z.number().optional(),
              perCategoryPrecision: z
                .array(
                  z
                    .object({ categoryKey: z.string(), precision: z.number() })
                    .partial()
                    .passthrough()
                )
                .optional(),
              recallMeasurable: z.boolean().optional().default(false),
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

export const schemas: any = {
  publishTaxonomyVersion_Body,
  createAnnotationBatch_Body,
  submitAnnotationLabels_Body,
  MarketId,
  Problem,
  ProductCategory,
  Taxonomy,
  ResponseMeta,
  TaxonomyResponse,
  TaxonomyVersionCreate,
  TaxonomyVersionId,
  TaxonomyVersion,
  TaxonomyVersionResponse,
  BatchId,
  AnnotationBatch,
  AnnotationBatchListData,
  AnnotationBatchListResponse,
  AnnotationBatchCreate,
  AnnotationBatchResponse,
  PostLabel,
  ReplyLabel,
  AnnotationLabelsSubmit,
  ContestedCategory,
  LabellerAgreement,
  LabellerAgreementResponse,
  ClassificationRunId,
  CategoryPrecision,
  ClassificationRun,
  ClassificationRunListData,
  ClassificationRunListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/annotation/batches',
    alias: 'listAnnotationBatches',
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
        name: 'marketId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['open', 'in_progress', 'complete', 'abandoned'])
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
                  batchId: z.string().regex(/^bat_[0-9A-HJKMNP-TV-Z]{26}$/),
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  taxonomyVersion: z.string().optional(),
                  status: z.enum([
                    'open',
                    'in_progress',
                    'complete',
                    'abandoned',
                  ]),
                  targetPosts: z.number().int(),
                  labelledPosts: z.number().int().optional(),
                  labelledReplies: z.number().int().optional(),
                  holdoutReservedPosts: z.number().int().optional(),
                  effortSeconds: z.number().int().optional(),
                  budgetConsumedShare: z.number().optional(),
                  labellerIds: z.array(z.string()).optional(),
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
    path: '/v1/annotation/batches',
    alias: 'createAnnotationBatch',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createAnnotationBatch_Body,
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
            batchId: z.string().regex(/^bat_[0-9A-HJKMNP-TV-Z]{26}$/),
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            taxonomyVersion: z.string().optional(),
            status: z.enum(['open', 'in_progress', 'complete', 'abandoned']),
            targetPosts: z.number().int(),
            labelledPosts: z.number().int().optional(),
            labelledReplies: z.number().int().optional(),
            holdoutReservedPosts: z.number().int().optional(),
            effortSeconds: z.number().int().optional(),
            budgetConsumedShare: z.number().optional(),
            labellerIds: z.array(z.string()).optional(),
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
  },
  {
    method: 'get',
    path: '/v1/annotation/batches/:batchId/agreement',
    alias: 'getLabellerAgreement',
    requestFormat: 'json',
    parameters: [
      {
        name: 'batchId',
        type: 'Path',
        schema: z.string().regex(/^bat_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            batchId: z.string().regex(/^bat_[0-9A-HJKMNP-TV-Z]{26}$/),
            pairwiseAgreement: z.number().optional(),
            contestedCategories: z
              .array(
                z
                  .object({
                    categoryKey: z.string(),
                    disagreementRate: z.number(),
                  })
                  .partial()
                  .passthrough()
              )
              .optional(),
            labellersBelowThreshold: z.array(z.string()).optional(),
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
    path: '/v1/annotation/batches/:batchId/labels',
    alias: 'submitAnnotationLabels',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: submitAnnotationLabels_Body,
      },
      {
        name: 'batchId',
        type: 'Path',
        schema: z.string().regex(/^bat_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            batchId: z.string().regex(/^bat_[0-9A-HJKMNP-TV-Z]{26}$/),
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            taxonomyVersion: z.string().optional(),
            status: z.enum(['open', 'in_progress', 'complete', 'abandoned']),
            targetPosts: z.number().int(),
            labelledPosts: z.number().int().optional(),
            labelledReplies: z.number().int().optional(),
            holdoutReservedPosts: z.number().int().optional(),
            effortSeconds: z.number().int().optional(),
            budgetConsumedShare: z.number().optional(),
            labellerIds: z.array(z.string()).optional(),
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
  },
  {
    method: 'get',
    path: '/v1/classification-runs',
    alias: 'listClassificationRuns',
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
        name: 'marketId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/)
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
                  classificationRunId: z
                    .string()
                    .regex(/^run_[0-9A-HJKMNP-TV-Z]{26}$/),
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  taxonomyVersion: z.string().optional(),
                  completedAt: z.string().datetime({ offset: true }),
                  postsClassified: z.number().int().optional(),
                  repliesClassified: z.number().int().optional(),
                  weightedProductPrecision: z.number().optional(),
                  weightedReplyPrecision: z.number().optional(),
                  perCategoryPrecision: z
                    .array(
                      z
                        .object({
                          categoryKey: z.string(),
                          precision: z.number(),
                        })
                        .partial()
                        .passthrough()
                    )
                    .optional(),
                  recallMeasurable: z.boolean().optional().default(false),
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
    method: 'get',
    path: '/v1/markets/:marketId/taxonomy',
    alias: 'getTaxonomy',
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
            activeVersion: z.string(),
            categories: z.array(
              z
                .object({
                  key: z.string(),
                  label: z.string(),
                  definition: z.string().optional(),
                  retired: z.boolean().optional().default(false),
                })
                .passthrough()
            ),
            outOfTaxonomyShare: z.number().optional(),
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
  {
    method: 'post',
    path: '/v1/markets/:marketId/taxonomy/versions',
    alias: 'publishTaxonomyVersion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: publishTaxonomyVersion_Body,
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
            taxonomyVersionId: z.string().regex(/^tax_[0-9A-HJKMNP-TV-Z]{26}$/),
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            version: z.string(),
            publishedAt: z.string().datetime({ offset: true }),
            publishedBy: z.string().optional(),
            changeSummary: z.string().optional(),
            categories: z
              .array(
                z
                  .object({
                    key: z.string(),
                    label: z.string(),
                    definition: z.string().optional(),
                    retired: z.boolean().optional().default(false),
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
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
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

import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const adjudicateChainCandidate_Body = z
  .object({
    outcome: z.enum([
      'related',
      'resell',
      'unrelated',
      'lack_of_product',
      'lack_of_purchase',
    ]),
    rationale: z.string().optional(),
    harmMetric: z.string().optional(),
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
const ChainCandidateId = z.string();
const Actor = z
  .object({
    pseudonymousKey: z.string(),
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    firstSeenAt: z.string().datetime({ offset: true }).optional(),
    lastSeenAt: z.string().datetime({ offset: true }).optional(),
    edgeCount: z.number().int().optional(),
  })
  .passthrough();
const TransactionId = z.string();
const Transaction = z
  .object({
    transactionId: z.string().regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    sellerKey: z.string(),
    buyerKey: z.string(),
    categoryKey: z.string(),
    occurredAt: z.string().datetime({ offset: true }),
    evidenceReplyId: z.string().optional(),
  })
  .passthrough();
const PostId = z.string();
const Post = z
  .object({
    postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    threadId: z.string().optional(),
    authorKey: z.string().optional(),
    postedAt: z.string().datetime({ offset: true }),
    excerpt: z.string().optional(),
  })
  .passthrough();
const ReplyId = z.string();
const Reply = z
  .object({
    replyId: z.string().regex(/^rpl_[0-9A-HJKMNP-TV-Z]{26}$/),
    postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
    authorKey: z.string().optional(),
    repliedAt: z.string().datetime({ offset: true }),
    excerpt: z.string().optional(),
    quoteRemoved: z.boolean().optional(),
  })
  .passthrough();
const ChainCandidate = z
  .object({
    candidateId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    taxonomyVersion: z.string().optional(),
    sourceCategory: z.string(),
    destinationCategory: z.string(),
    linkingActorKey: z.string().optional(),
    purchaseTransactionId: z.string().optional(),
    onwardSaleTransactionId: z.string().optional(),
    attenuatedWeight: z.number().optional(),
    elapsedDaysBetweenLegs: z.number().int().optional(),
    adjudicationStatus: z.enum([
      'pending',
      'accepted',
      'rejected',
      'suppressed',
    ]),
    suppressionReason: z
      .enum(['endorsement_reply', 'quote_artefact', 'duplicate_listing'])
      .optional(),
    linkingActor: z
      .object({
        pseudonymousKey: z.string(),
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        firstSeenAt: z.string().datetime({ offset: true }).optional(),
        lastSeenAt: z.string().datetime({ offset: true }).optional(),
        edgeCount: z.number().int().optional(),
      })
      .passthrough()
      .optional(),
    purchase: z
      .object({
        transactionId: z.string().regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        sellerKey: z.string(),
        buyerKey: z.string(),
        categoryKey: z.string(),
        occurredAt: z.string().datetime({ offset: true }),
        evidenceReplyId: z.string().optional(),
      })
      .passthrough()
      .optional(),
    onwardSale: z
      .object({
        transactionId: z.string().regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        sellerKey: z.string(),
        buyerKey: z.string(),
        categoryKey: z.string(),
        occurredAt: z.string().datetime({ offset: true }),
        evidenceReplyId: z.string().optional(),
      })
      .passthrough()
      .optional(),
    sourcePost: z
      .object({
        postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        threadId: z.string().optional(),
        authorKey: z.string().optional(),
        postedAt: z.string().datetime({ offset: true }),
        excerpt: z.string().optional(),
      })
      .passthrough()
      .optional(),
    buyEvidence: z
      .object({
        replyId: z.string().regex(/^rpl_[0-9A-HJKMNP-TV-Z]{26}$/),
        postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
        authorKey: z.string().optional(),
        repliedAt: z.string().datetime({ offset: true }),
        excerpt: z.string().optional(),
        quoteRemoved: z.boolean().optional(),
      })
      .passthrough()
      .optional(),
    onwardPost: z
      .object({
        postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        threadId: z.string().optional(),
        authorKey: z.string().optional(),
        postedAt: z.string().datetime({ offset: true }),
        excerpt: z.string().optional(),
      })
      .passthrough()
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ChainCandidateListData = z
  .object({
    items: z.array(
      z
        .object({
          candidateId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
          marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
          taxonomyVersion: z.string().optional(),
          sourceCategory: z.string(),
          destinationCategory: z.string(),
          linkingActorKey: z.string().optional(),
          purchaseTransactionId: z.string().optional(),
          onwardSaleTransactionId: z.string().optional(),
          attenuatedWeight: z.number().optional(),
          elapsedDaysBetweenLegs: z.number().int().optional(),
          adjudicationStatus: z.enum([
            'pending',
            'accepted',
            'rejected',
            'suppressed',
          ]),
          suppressionReason: z
            .enum(['endorsement_reply', 'quote_artefact', 'duplicate_listing'])
            .optional(),
          linkingActor: z
            .object({
              pseudonymousKey: z.string(),
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              firstSeenAt: z.string().datetime({ offset: true }).optional(),
              lastSeenAt: z.string().datetime({ offset: true }).optional(),
              edgeCount: z.number().int().optional(),
            })
            .passthrough()
            .optional(),
          purchase: z
            .object({
              transactionId: z.string().regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              sellerKey: z.string(),
              buyerKey: z.string(),
              categoryKey: z.string(),
              occurredAt: z.string().datetime({ offset: true }),
              evidenceReplyId: z.string().optional(),
            })
            .passthrough()
            .optional(),
          onwardSale: z
            .object({
              transactionId: z.string().regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              sellerKey: z.string(),
              buyerKey: z.string(),
              categoryKey: z.string(),
              occurredAt: z.string().datetime({ offset: true }),
              evidenceReplyId: z.string().optional(),
            })
            .passthrough()
            .optional(),
          sourcePost: z
            .object({
              postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              threadId: z.string().optional(),
              authorKey: z.string().optional(),
              postedAt: z.string().datetime({ offset: true }),
              excerpt: z.string().optional(),
            })
            .passthrough()
            .optional(),
          buyEvidence: z
            .object({
              replyId: z.string().regex(/^rpl_[0-9A-HJKMNP-TV-Z]{26}$/),
              postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
              authorKey: z.string().optional(),
              repliedAt: z.string().datetime({ offset: true }),
              excerpt: z.string().optional(),
              quoteRemoved: z.boolean().optional(),
            })
            .passthrough()
            .optional(),
          onwardPost: z
            .object({
              postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              threadId: z.string().optional(),
              authorKey: z.string().optional(),
              postedAt: z.string().datetime({ offset: true }),
              excerpt: z.string().optional(),
            })
            .passthrough()
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
const ChainCandidateListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              candidateId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              taxonomyVersion: z.string().optional(),
              sourceCategory: z.string(),
              destinationCategory: z.string(),
              linkingActorKey: z.string().optional(),
              purchaseTransactionId: z.string().optional(),
              onwardSaleTransactionId: z.string().optional(),
              attenuatedWeight: z.number().optional(),
              elapsedDaysBetweenLegs: z.number().int().optional(),
              adjudicationStatus: z.enum([
                'pending',
                'accepted',
                'rejected',
                'suppressed',
              ]),
              suppressionReason: z
                .enum([
                  'endorsement_reply',
                  'quote_artefact',
                  'duplicate_listing',
                ])
                .optional(),
              linkingActor: z
                .object({
                  pseudonymousKey: z.string(),
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  firstSeenAt: z.string().datetime({ offset: true }).optional(),
                  lastSeenAt: z.string().datetime({ offset: true }).optional(),
                  edgeCount: z.number().int().optional(),
                })
                .passthrough()
                .optional(),
              purchase: z
                .object({
                  transactionId: z
                    .string()
                    .regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  sellerKey: z.string(),
                  buyerKey: z.string(),
                  categoryKey: z.string(),
                  occurredAt: z.string().datetime({ offset: true }),
                  evidenceReplyId: z.string().optional(),
                })
                .passthrough()
                .optional(),
              onwardSale: z
                .object({
                  transactionId: z
                    .string()
                    .regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  sellerKey: z.string(),
                  buyerKey: z.string(),
                  categoryKey: z.string(),
                  occurredAt: z.string().datetime({ offset: true }),
                  evidenceReplyId: z.string().optional(),
                })
                .passthrough()
                .optional(),
              sourcePost: z
                .object({
                  postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  threadId: z.string().optional(),
                  authorKey: z.string().optional(),
                  postedAt: z.string().datetime({ offset: true }),
                  excerpt: z.string().optional(),
                })
                .passthrough()
                .optional(),
              buyEvidence: z
                .object({
                  replyId: z.string().regex(/^rpl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
                  authorKey: z.string().optional(),
                  repliedAt: z.string().datetime({ offset: true }),
                  excerpt: z.string().optional(),
                  quoteRemoved: z.boolean().optional(),
                })
                .passthrough()
                .optional(),
              onwardPost: z
                .object({
                  postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  threadId: z.string().optional(),
                  authorKey: z.string().optional(),
                  postedAt: z.string().datetime({ offset: true }),
                  excerpt: z.string().optional(),
                })
                .passthrough()
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
const ChainCandidateResponse = z
  .object({
    data: z
      .object({
        candidateId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        taxonomyVersion: z.string().optional(),
        sourceCategory: z.string(),
        destinationCategory: z.string(),
        linkingActorKey: z.string().optional(),
        purchaseTransactionId: z.string().optional(),
        onwardSaleTransactionId: z.string().optional(),
        attenuatedWeight: z.number().optional(),
        elapsedDaysBetweenLegs: z.number().int().optional(),
        adjudicationStatus: z.enum([
          'pending',
          'accepted',
          'rejected',
          'suppressed',
        ]),
        suppressionReason: z
          .enum(['endorsement_reply', 'quote_artefact', 'duplicate_listing'])
          .optional(),
        linkingActor: z
          .object({
            pseudonymousKey: z.string(),
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            firstSeenAt: z.string().datetime({ offset: true }).optional(),
            lastSeenAt: z.string().datetime({ offset: true }).optional(),
            edgeCount: z.number().int().optional(),
          })
          .passthrough()
          .optional(),
        purchase: z
          .object({
            transactionId: z.string().regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            sellerKey: z.string(),
            buyerKey: z.string(),
            categoryKey: z.string(),
            occurredAt: z.string().datetime({ offset: true }),
            evidenceReplyId: z.string().optional(),
          })
          .passthrough()
          .optional(),
        onwardSale: z
          .object({
            transactionId: z.string().regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            sellerKey: z.string(),
            buyerKey: z.string(),
            categoryKey: z.string(),
            occurredAt: z.string().datetime({ offset: true }),
            evidenceReplyId: z.string().optional(),
          })
          .passthrough()
          .optional(),
        sourcePost: z
          .object({
            postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            threadId: z.string().optional(),
            authorKey: z.string().optional(),
            postedAt: z.string().datetime({ offset: true }),
            excerpt: z.string().optional(),
          })
          .passthrough()
          .optional(),
        buyEvidence: z
          .object({
            replyId: z.string().regex(/^rpl_[0-9A-HJKMNP-TV-Z]{26}$/),
            postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
            authorKey: z.string().optional(),
            repliedAt: z.string().datetime({ offset: true }),
            excerpt: z.string().optional(),
            quoteRemoved: z.boolean().optional(),
          })
          .passthrough()
          .optional(),
        onwardPost: z
          .object({
            postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            threadId: z.string().optional(),
            authorKey: z.string().optional(),
            postedAt: z.string().datetime({ offset: true }),
            excerpt: z.string().optional(),
          })
          .passthrough()
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
const ChainAdjudicationCreate = z
  .object({
    outcome: z.enum([
      'related',
      'resell',
      'unrelated',
      'lack_of_product',
      'lack_of_purchase',
    ]),
    rationale: z.string().optional(),
    harmMetric: z.string().optional(),
  })
  .passthrough();
const AdjudicationId = z.string();
const ChainAdjudication = z
  .object({
    adjudicationId: z.string().regex(/^adj_[0-9A-HJKMNP-TV-Z]{26}$/),
    candidateId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
    outcome: z.enum([
      'related',
      'resell',
      'unrelated',
      'lack_of_product',
      'lack_of_purchase',
    ]),
    rationale: z.string().optional(),
    adjudicatedBy: z.string(),
    adjudicatedAt: z.string().datetime({ offset: true }),
    producedDependencyEdgeId: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ChainAdjudicationResponse = z
  .object({
    data: z
      .object({
        adjudicationId: z.string().regex(/^adj_[0-9A-HJKMNP-TV-Z]{26}$/),
        candidateId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
        outcome: z.enum([
          'related',
          'resell',
          'unrelated',
          'lack_of_product',
          'lack_of_purchase',
        ]),
        rationale: z.string().optional(),
        adjudicatedBy: z.string(),
        adjudicatedAt: z.string().datetime({ offset: true }),
        producedDependencyEdgeId: z.string().optional(),
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
const DependencyEdgeId = z.string();
const DependencyEdge = z
  .object({
    dependencyEdgeId: z.string().regex(/^dep_[0-9A-HJKMNP-TV-Z]{26}$/),
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    sourceCategory: z.string(),
    destinationCategory: z.string(),
    adjudicatedChainCount: z.number().int().optional(),
    attenuatedWeight: z.number().optional(),
    firstObservedAt: z.string().datetime({ offset: true }).optional(),
    lastObservedAt: z.string().datetime({ offset: true }).optional(),
    notableAnnotation: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DependencyEdgeListData = z
  .object({
    items: z.array(
      z
        .object({
          dependencyEdgeId: z.string().regex(/^dep_[0-9A-HJKMNP-TV-Z]{26}$/),
          marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
          sourceCategory: z.string(),
          destinationCategory: z.string(),
          adjudicatedChainCount: z.number().int().optional(),
          attenuatedWeight: z.number().optional(),
          firstObservedAt: z.string().datetime({ offset: true }).optional(),
          lastObservedAt: z.string().datetime({ offset: true }).optional(),
          notableAnnotation: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const DependencyEdgeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              dependencyEdgeId: z
                .string()
                .regex(/^dep_[0-9A-HJKMNP-TV-Z]{26}$/),
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              sourceCategory: z.string(),
              destinationCategory: z.string(),
              adjudicatedChainCount: z.number().int().optional(),
              attenuatedWeight: z.number().optional(),
              firstObservedAt: z.string().datetime({ offset: true }).optional(),
              lastObservedAt: z.string().datetime({ offset: true }).optional(),
              notableAnnotation: z.string().optional(),
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
const DependencyMap = z
  .object({
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    taxonomyVersion: z.string().optional(),
    edges: z
      .array(
        z
          .object({
            dependencyEdgeId: z.string().regex(/^dep_[0-9A-HJKMNP-TV-Z]{26}$/),
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            sourceCategory: z.string(),
            destinationCategory: z.string(),
            adjudicatedChainCount: z.number().int().optional(),
            attenuatedWeight: z.number().optional(),
            firstObservedAt: z.string().datetime({ offset: true }).optional(),
            lastObservedAt: z.string().datetime({ offset: true }).optional(),
            notableAnnotation: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough()
      )
      .optional(),
    hubCategories: z.array(z.string()).optional(),
    coverageFloorShare: z.number().optional(),
    coverageIsFloor: z.boolean().optional().default(true),
  })
  .passthrough();
const DependencyMapResponse = z
  .object({
    data: z
      .object({
        marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
        taxonomyVersion: z.string().optional(),
        edges: z
          .array(
            z
              .object({
                dependencyEdgeId: z
                  .string()
                  .regex(/^dep_[0-9A-HJKMNP-TV-Z]{26}$/),
                marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                sourceCategory: z.string(),
                destinationCategory: z.string(),
                adjudicatedChainCount: z.number().int().optional(),
                attenuatedWeight: z.number().optional(),
                firstObservedAt: z
                  .string()
                  .datetime({ offset: true })
                  .optional(),
                lastObservedAt: z
                  .string()
                  .datetime({ offset: true })
                  .optional(),
                notableAnnotation: z.string().optional(),
                createdAt: z.string().datetime({ offset: true }),
                updatedAt: z.string().datetime({ offset: true }),
              })
              .passthrough()
          )
          .optional(),
        hubCategories: z.array(z.string()).optional(),
        coverageFloorShare: z.number().optional(),
        coverageIsFloor: z.boolean().optional().default(true),
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
  adjudicateChainCandidate_Body,
  MarketId,
  Problem,
  ChainCandidateId,
  Actor,
  TransactionId,
  Transaction,
  PostId,
  Post,
  ReplyId,
  Reply,
  ChainCandidate,
  ChainCandidateListData,
  ResponseMeta,
  ChainCandidateListResponse,
  ChainCandidateResponse,
  ChainAdjudicationCreate,
  AdjudicationId,
  ChainAdjudication,
  ChainAdjudicationResponse,
  DependencyEdgeId,
  DependencyEdge,
  DependencyEdgeListData,
  DependencyEdgeListResponse,
  DependencyMap,
  DependencyMapResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/chains/candidates',
    alias: 'listChainCandidates',
    description: `Candidates are internal working material and must not be published as findings.`,
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
        name: 'sourceCategory',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'destinationCategory',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'adjudicationStatus',
        type: 'Query',
        schema: z
          .enum(['pending', 'accepted', 'rejected', 'suppressed'])
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
                  candidateId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  taxonomyVersion: z.string().optional(),
                  sourceCategory: z.string(),
                  destinationCategory: z.string(),
                  linkingActorKey: z.string().optional(),
                  purchaseTransactionId: z.string().optional(),
                  onwardSaleTransactionId: z.string().optional(),
                  attenuatedWeight: z.number().optional(),
                  elapsedDaysBetweenLegs: z.number().int().optional(),
                  adjudicationStatus: z.enum([
                    'pending',
                    'accepted',
                    'rejected',
                    'suppressed',
                  ]),
                  suppressionReason: z
                    .enum([
                      'endorsement_reply',
                      'quote_artefact',
                      'duplicate_listing',
                    ])
                    .optional(),
                  linkingActor: z
                    .object({
                      pseudonymousKey: z.string(),
                      marketId: z
                        .string()
                        .regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                      firstSeenAt: z
                        .string()
                        .datetime({ offset: true })
                        .optional(),
                      lastSeenAt: z
                        .string()
                        .datetime({ offset: true })
                        .optional(),
                      edgeCount: z.number().int().optional(),
                    })
                    .passthrough()
                    .optional(),
                  purchase: z
                    .object({
                      transactionId: z
                        .string()
                        .regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
                      marketId: z
                        .string()
                        .regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                      sellerKey: z.string(),
                      buyerKey: z.string(),
                      categoryKey: z.string(),
                      occurredAt: z.string().datetime({ offset: true }),
                      evidenceReplyId: z.string().optional(),
                    })
                    .passthrough()
                    .optional(),
                  onwardSale: z
                    .object({
                      transactionId: z
                        .string()
                        .regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
                      marketId: z
                        .string()
                        .regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                      sellerKey: z.string(),
                      buyerKey: z.string(),
                      categoryKey: z.string(),
                      occurredAt: z.string().datetime({ offset: true }),
                      evidenceReplyId: z.string().optional(),
                    })
                    .passthrough()
                    .optional(),
                  sourcePost: z
                    .object({
                      postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
                      marketId: z
                        .string()
                        .regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                      threadId: z.string().optional(),
                      authorKey: z.string().optional(),
                      postedAt: z.string().datetime({ offset: true }),
                      excerpt: z.string().optional(),
                    })
                    .passthrough()
                    .optional(),
                  buyEvidence: z
                    .object({
                      replyId: z.string().regex(/^rpl_[0-9A-HJKMNP-TV-Z]{26}$/),
                      postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
                      authorKey: z.string().optional(),
                      repliedAt: z.string().datetime({ offset: true }),
                      excerpt: z.string().optional(),
                      quoteRemoved: z.boolean().optional(),
                    })
                    .passthrough()
                    .optional(),
                  onwardPost: z
                    .object({
                      postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
                      marketId: z
                        .string()
                        .regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                      threadId: z.string().optional(),
                      authorKey: z.string().optional(),
                      postedAt: z.string().datetime({ offset: true }),
                      excerpt: z.string().optional(),
                    })
                    .passthrough()
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
  },
  {
    method: 'get',
    path: '/v1/chains/candidates/:candidateId',
    alias: 'getChainCandidate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'candidateId',
        type: 'Path',
        schema: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            candidateId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
            marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
            taxonomyVersion: z.string().optional(),
            sourceCategory: z.string(),
            destinationCategory: z.string(),
            linkingActorKey: z.string().optional(),
            purchaseTransactionId: z.string().optional(),
            onwardSaleTransactionId: z.string().optional(),
            attenuatedWeight: z.number().optional(),
            elapsedDaysBetweenLegs: z.number().int().optional(),
            adjudicationStatus: z.enum([
              'pending',
              'accepted',
              'rejected',
              'suppressed',
            ]),
            suppressionReason: z
              .enum([
                'endorsement_reply',
                'quote_artefact',
                'duplicate_listing',
              ])
              .optional(),
            linkingActor: z
              .object({
                pseudonymousKey: z.string(),
                marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                firstSeenAt: z.string().datetime({ offset: true }).optional(),
                lastSeenAt: z.string().datetime({ offset: true }).optional(),
                edgeCount: z.number().int().optional(),
              })
              .passthrough()
              .optional(),
            purchase: z
              .object({
                transactionId: z.string().regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
                marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                sellerKey: z.string(),
                buyerKey: z.string(),
                categoryKey: z.string(),
                occurredAt: z.string().datetime({ offset: true }),
                evidenceReplyId: z.string().optional(),
              })
              .passthrough()
              .optional(),
            onwardSale: z
              .object({
                transactionId: z.string().regex(/^txn_[0-9A-HJKMNP-TV-Z]{26}$/),
                marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                sellerKey: z.string(),
                buyerKey: z.string(),
                categoryKey: z.string(),
                occurredAt: z.string().datetime({ offset: true }),
                evidenceReplyId: z.string().optional(),
              })
              .passthrough()
              .optional(),
            sourcePost: z
              .object({
                postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
                marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                threadId: z.string().optional(),
                authorKey: z.string().optional(),
                postedAt: z.string().datetime({ offset: true }),
                excerpt: z.string().optional(),
              })
              .passthrough()
              .optional(),
            buyEvidence: z
              .object({
                replyId: z.string().regex(/^rpl_[0-9A-HJKMNP-TV-Z]{26}$/),
                postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
                authorKey: z.string().optional(),
                repliedAt: z.string().datetime({ offset: true }),
                excerpt: z.string().optional(),
                quoteRemoved: z.boolean().optional(),
              })
              .passthrough()
              .optional(),
            onwardPost: z
              .object({
                postId: z.string().regex(/^pst_[0-9A-HJKMNP-TV-Z]{26}$/),
                marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                threadId: z.string().optional(),
                authorKey: z.string().optional(),
                postedAt: z.string().datetime({ offset: true }),
                excerpt: z.string().optional(),
              })
              .passthrough()
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
  {
    method: 'post',
    path: '/v1/chains/candidates/:candidateId/adjudication',
    alias: 'adjudicateChainCandidate',
    description: `Mandatory analyst gate. Only accepted candidates become dependency edges.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: adjudicateChainCandidate_Body,
      },
      {
        name: 'candidateId',
        type: 'Path',
        schema: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            adjudicationId: z.string().regex(/^adj_[0-9A-HJKMNP-TV-Z]{26}$/),
            candidateId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
            outcome: z.enum([
              'related',
              'resell',
              'unrelated',
              'lack_of_product',
              'lack_of_purchase',
            ]),
            rationale: z.string().optional(),
            adjudicatedBy: z.string(),
            adjudicatedAt: z.string().datetime({ offset: true }),
            producedDependencyEdgeId: z.string().optional(),
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
  {
    method: 'get',
    path: '/v1/dependencies/edges',
    alias: 'listDependencyEdges',
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
                  dependencyEdgeId: z
                    .string()
                    .regex(/^dep_[0-9A-HJKMNP-TV-Z]{26}$/),
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  sourceCategory: z.string(),
                  destinationCategory: z.string(),
                  adjudicatedChainCount: z.number().int().optional(),
                  attenuatedWeight: z.number().optional(),
                  firstObservedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  lastObservedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  notableAnnotation: z.string().optional(),
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
    path: '/v1/markets/:marketId/dependency-map',
    alias: 'getDependencyMap',
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
            taxonomyVersion: z.string().optional(),
            edges: z
              .array(
                z
                  .object({
                    dependencyEdgeId: z
                      .string()
                      .regex(/^dep_[0-9A-HJKMNP-TV-Z]{26}$/),
                    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                    sourceCategory: z.string(),
                    destinationCategory: z.string(),
                    adjudicatedChainCount: z.number().int().optional(),
                    attenuatedWeight: z.number().optional(),
                    firstObservedAt: z
                      .string()
                      .datetime({ offset: true })
                      .optional(),
                    lastObservedAt: z
                      .string()
                      .datetime({ offset: true })
                      .optional(),
                    notableAnnotation: z.string().optional(),
                    createdAt: z.string().datetime({ offset: true }),
                    updatedAt: z.string().datetime({ offset: true }),
                  })
                  .passthrough()
              )
              .optional(),
            hubCategories: z.array(z.string()).optional(),
            coverageFloorShare: z.number().optional(),
            coverageIsFloor: z.boolean().optional().default(true),
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

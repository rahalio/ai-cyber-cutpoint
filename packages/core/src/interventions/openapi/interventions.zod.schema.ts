import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const selectIntervention_Body = z
  .object({
    candidateId: z.string().regex(/^icd_[0-9A-HJKMNP-TV-Z]{26}$/),
    decision: z.enum(['select', 'decline']),
    declineReason: z.string().optional(),
    ownerTeam: z.string().optional(),
    hypothesis: z.string().optional(),
    measurementWindowDays: z.number().int().optional().default(90),
  })
  .passthrough();
const recordInterventionOutcome_Body = z
  .object({
    harmMetric: z.string(),
    value: z.number(),
    windowStart: z.string(),
    windowEnd: z.string(),
    substitutionObserved: z.boolean().optional(),
    notes: z.string().optional(),
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
const InterventionCandidateId = z.string();
const InterventionCandidate = z
  .object({
    interventionCandidateId: z.string().regex(/^icd_[0-9A-HJKMNP-TV-Z]{26}$/),
    marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
    severedEdgeId: z.string(),
    controlChange: z.string(),
    controlDomain: z
      .enum([
        'authentication',
        'account_recovery',
        'rate_limiting',
        'payment_channel',
        'listing_policy',
        'carrier_process',
      ])
      .optional(),
    severanceLeverage: z.number().optional(),
    estimatedHarmSevered: z.number().optional(),
    harmMetric: z.string().optional(),
    implementationDifficulty: z.enum(['low', 'medium', 'high']).optional(),
    supportingChainCount: z.number().int().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const InterventionCandidateListData = z
  .object({
    items: z.array(
      z
        .object({
          interventionCandidateId: z
            .string()
            .regex(/^icd_[0-9A-HJKMNP-TV-Z]{26}$/),
          marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
          severedEdgeId: z.string(),
          controlChange: z.string(),
          controlDomain: z
            .enum([
              'authentication',
              'account_recovery',
              'rate_limiting',
              'payment_channel',
              'listing_policy',
              'carrier_process',
            ])
            .optional(),
          severanceLeverage: z.number().optional(),
          estimatedHarmSevered: z.number().optional(),
          harmMetric: z.string().optional(),
          implementationDifficulty: z
            .enum(['low', 'medium', 'high'])
            .optional(),
          supportingChainCount: z.number().int().optional(),
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
const InterventionCandidateListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              interventionCandidateId: z
                .string()
                .regex(/^icd_[0-9A-HJKMNP-TV-Z]{26}$/),
              marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
              severedEdgeId: z.string(),
              controlChange: z.string(),
              controlDomain: z
                .enum([
                  'authentication',
                  'account_recovery',
                  'rate_limiting',
                  'payment_channel',
                  'listing_policy',
                  'carrier_process',
                ])
                .optional(),
              severanceLeverage: z.number().optional(),
              estimatedHarmSevered: z.number().optional(),
              harmMetric: z.string().optional(),
              implementationDifficulty: z
                .enum(['low', 'medium', 'high'])
                .optional(),
              supportingChainCount: z.number().int().optional(),
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
const InterventionId = z.string();
const HarmBaseline = z
  .object({
    harmMetric: z.string(),
    value: z.number(),
    unit: z.string().optional(),
    windowStart: z.string(),
    windowEnd: z.string(),
    sourceSystem: z.string().optional(),
  })
  .passthrough();
const Intervention = z
  .object({
    interventionId: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
    candidateId: z.string().regex(/^icd_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum([
      'selected',
      'declined',
      'implemented',
      'measured',
      'failed',
    ]),
    declineReason: z.string().optional(),
    ownerTeam: z.string().optional(),
    changeRecordReference: z.string().optional(),
    hypothesis: z.string().optional(),
    baseline: z
      .object({
        harmMetric: z.string(),
        value: z.number(),
        unit: z.string().optional(),
        windowStart: z.string(),
        windowEnd: z.string(),
        sourceSystem: z.string().optional(),
      })
      .passthrough()
      .optional(),
    measurementDueAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const InterventionListData = z
  .object({
    items: z.array(
      z
        .object({
          interventionId: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
          candidateId: z.string().regex(/^icd_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum([
            'selected',
            'declined',
            'implemented',
            'measured',
            'failed',
          ]),
          declineReason: z.string().optional(),
          ownerTeam: z.string().optional(),
          changeRecordReference: z.string().optional(),
          hypothesis: z.string().optional(),
          baseline: z
            .object({
              harmMetric: z.string(),
              value: z.number(),
              unit: z.string().optional(),
              windowStart: z.string(),
              windowEnd: z.string(),
              sourceSystem: z.string().optional(),
            })
            .passthrough()
            .optional(),
          measurementDueAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const InterventionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              interventionId: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
              candidateId: z.string().regex(/^icd_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum([
                'selected',
                'declined',
                'implemented',
                'measured',
                'failed',
              ]),
              declineReason: z.string().optional(),
              ownerTeam: z.string().optional(),
              changeRecordReference: z.string().optional(),
              hypothesis: z.string().optional(),
              baseline: z
                .object({
                  harmMetric: z.string(),
                  value: z.number(),
                  unit: z.string().optional(),
                  windowStart: z.string(),
                  windowEnd: z.string(),
                  sourceSystem: z.string().optional(),
                })
                .passthrough()
                .optional(),
              measurementDueAt: z
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
const InterventionCreate = z
  .object({
    candidateId: z.string().regex(/^icd_[0-9A-HJKMNP-TV-Z]{26}$/),
    decision: z.enum(['select', 'decline']),
    declineReason: z.string().optional(),
    ownerTeam: z.string().optional(),
    hypothesis: z.string().optional(),
    measurementWindowDays: z.number().int().optional().default(90),
  })
  .passthrough();
const InterventionResponse = z
  .object({
    data: z
      .object({
        interventionId: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
        candidateId: z.string().regex(/^icd_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum([
          'selected',
          'declined',
          'implemented',
          'measured',
          'failed',
        ]),
        declineReason: z.string().optional(),
        ownerTeam: z.string().optional(),
        changeRecordReference: z.string().optional(),
        hypothesis: z.string().optional(),
        baseline: z
          .object({
            harmMetric: z.string(),
            value: z.number(),
            unit: z.string().optional(),
            windowStart: z.string(),
            windowEnd: z.string(),
            sourceSystem: z.string().optional(),
          })
          .passthrough()
          .optional(),
        measurementDueAt: z.string().datetime({ offset: true }).optional(),
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
const OutcomeMeasurementCreate = z
  .object({
    harmMetric: z.string(),
    value: z.number(),
    windowStart: z.string(),
    windowEnd: z.string(),
    substitutionObserved: z.boolean().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const OutcomeMeasurementId = z.string();
const OutcomeMeasurement = z
  .object({
    outcomeMeasurementId: z.string().regex(/^out_[0-9A-HJKMNP-TV-Z]{26}$/),
    interventionId: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
    harmMetric: z.string(),
    value: z.number(),
    baselineValue: z.number().optional(),
    harmSevered: z.number().optional(),
    movedTargetMetric: z.boolean().optional(),
    substitutionObserved: z.boolean().optional(),
    measuredAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const OutcomeMeasurementResponse = z
  .object({
    data: z
      .object({
        outcomeMeasurementId: z.string().regex(/^out_[0-9A-HJKMNP-TV-Z]{26}$/),
        interventionId: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
        harmMetric: z.string(),
        value: z.number(),
        baselineValue: z.number().optional(),
        harmSevered: z.number().optional(),
        movedTargetMetric: z.boolean().optional(),
        substitutionObserved: z.boolean().optional(),
        measuredAt: z.string().datetime({ offset: true }).optional(),
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
  selectIntervention_Body,
  recordInterventionOutcome_Body,
  MarketId,
  Problem,
  InterventionCandidateId,
  InterventionCandidate,
  InterventionCandidateListData,
  ResponseMeta,
  InterventionCandidateListResponse,
  InterventionId,
  HarmBaseline,
  Intervention,
  InterventionListData,
  InterventionListResponse,
  InterventionCreate,
  InterventionResponse,
  OutcomeMeasurementCreate,
  OutcomeMeasurementId,
  OutcomeMeasurement,
  OutcomeMeasurementResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/interventions',
    alias: 'listInterventions',
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
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['selected', 'declined', 'implemented', 'measured', 'failed'])
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
                  interventionId: z
                    .string()
                    .regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
                  candidateId: z.string().regex(/^icd_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum([
                    'selected',
                    'declined',
                    'implemented',
                    'measured',
                    'failed',
                  ]),
                  declineReason: z.string().optional(),
                  ownerTeam: z.string().optional(),
                  changeRecordReference: z.string().optional(),
                  hypothesis: z.string().optional(),
                  baseline: z
                    .object({
                      harmMetric: z.string(),
                      value: z.number(),
                      unit: z.string().optional(),
                      windowStart: z.string(),
                      windowEnd: z.string(),
                      sourceSystem: z.string().optional(),
                    })
                    .passthrough()
                    .optional(),
                  measurementDueAt: z
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
  },
  {
    method: 'post',
    path: '/v1/interventions',
    alias: 'selectIntervention',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: selectIntervention_Body,
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
            interventionId: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
            candidateId: z.string().regex(/^icd_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum([
              'selected',
              'declined',
              'implemented',
              'measured',
              'failed',
            ]),
            declineReason: z.string().optional(),
            ownerTeam: z.string().optional(),
            changeRecordReference: z.string().optional(),
            hypothesis: z.string().optional(),
            baseline: z
              .object({
                harmMetric: z.string(),
                value: z.number(),
                unit: z.string().optional(),
                windowStart: z.string(),
                windowEnd: z.string(),
                sourceSystem: z.string().optional(),
              })
              .passthrough()
              .optional(),
            measurementDueAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/interventions/:interventionId/outcome',
    alias: 'recordInterventionOutcome',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: recordInterventionOutcome_Body,
      },
      {
        name: 'interventionId',
        type: 'Path',
        schema: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            outcomeMeasurementId: z
              .string()
              .regex(/^out_[0-9A-HJKMNP-TV-Z]{26}$/),
            interventionId: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
            harmMetric: z.string(),
            value: z.number(),
            baselineValue: z.number().optional(),
            harmSevered: z.number().optional(),
            movedTargetMetric: z.boolean().optional(),
            substitutionObserved: z.boolean().optional(),
            measuredAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/interventions/candidates',
    alias: 'listInterventionCandidates',
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
        name: 'harmMetric',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  interventionCandidateId: z
                    .string()
                    .regex(/^icd_[0-9A-HJKMNP-TV-Z]{26}$/),
                  marketId: z.string().regex(/^mkt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  severedEdgeId: z.string(),
                  controlChange: z.string(),
                  controlDomain: z
                    .enum([
                      'authentication',
                      'account_recovery',
                      'rate_limiting',
                      'payment_channel',
                      'listing_policy',
                      'carrier_process',
                    ])
                    .optional(),
                  severanceLeverage: z.number().optional(),
                  estimatedHarmSevered: z.number().optional(),
                  harmMetric: z.string().optional(),
                  implementationDifficulty: z
                    .enum(['low', 'medium', 'high'])
                    .optional(),
                  supportingChainCount: z.number().int().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}

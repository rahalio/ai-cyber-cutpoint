/**
 * Discovery Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/discovery.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Actor = components["schemas"]["Actor"];
export type ChainAdjudication = components["schemas"]["ChainAdjudication"];
export type ChainAdjudicationCreate = components["schemas"]["ChainAdjudicationCreate"];
export type ChainCandidate = components["schemas"]["ChainCandidate"];
export type ChainCandidateListData = components["schemas"]["ChainCandidateListData"];
export type DependencyEdge = components["schemas"]["DependencyEdge"];
export type DependencyEdgeListData = components["schemas"]["DependencyEdgeListData"];
export type DependencyMap = components["schemas"]["DependencyMap"];
export type Post = components["schemas"]["Post"];
export type Reply = components["schemas"]["Reply"];
export type Transaction = components["schemas"]["Transaction"];
export type Candidate = operations["listChainCandidates"]["responses"]["200"]["content"]["application/json"]["data"];
export type Edge = operations["listDependencyEdges"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type AdjudicateChainCandidateRequestInput = NonNullable<operations["adjudicateChainCandidate"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListChainCandidatesParams = NonNullable<operations["listChainCandidates"]["parameters"]["query"]>;
export type GetChainCandidateParams = operations["getChainCandidate"]["parameters"]["path"];
export type AdjudicateChainCandidateParams = operations["adjudicateChainCandidate"]["parameters"]["path"];
export type ListDependencyEdgesParams = NonNullable<operations["listDependencyEdges"]["parameters"]["query"]>;
export type GetDependencyMapParams = operations["getDependencyMap"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListChainCandidatesResponse = operations["listChainCandidates"]["responses"]["200"]["content"]["application/json"];
export type GetChainCandidateResponse = operations["getChainCandidate"]["responses"]["200"]["content"]["application/json"];
export type AdjudicateChainCandidateResponse = operations["adjudicateChainCandidate"]["responses"]["201"]["content"]["application/json"];
export type ListDependencyEdgesResponse = operations["listDependencyEdges"]["responses"]["200"]["content"]["application/json"];
export type GetDependencyMapResponse = operations["getDependencyMap"]["responses"]["200"]["content"]["application/json"];



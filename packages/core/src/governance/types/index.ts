/**
 * Governance Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/governance.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ArtefactHash = components["schemas"]["ArtefactHash"];
export type CoverageAssessment = components["schemas"]["CoverageAssessment"];
export type CustodyEvent = components["schemas"]["CustodyEvent"];
export type DriftAssessment = components["schemas"]["DriftAssessment"];
export type EvidencePackage = components["schemas"]["EvidencePackage"];
export type EvidencePackageCreate = components["schemas"]["EvidencePackageCreate"];
export type PublicationHold = components["schemas"]["PublicationHold"];
export type PublicationHoldListData = components["schemas"]["PublicationHoldListData"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SealEvidencePackageRequestInput = NonNullable<operations["sealEvidencePackage"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetCoverageAssessmentParams = operations["getCoverageAssessment"]["parameters"]["path"];
export type GetDriftAssessmentParams = operations["getDriftAssessment"]["parameters"]["path"];
export type ListPublicationHoldsParams = NonNullable<operations["listPublicationHolds"]["parameters"]["query"]>;
export type GetEvidencePackageParams = operations["getEvidencePackage"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetCoverageAssessmentResponse = operations["getCoverageAssessment"]["responses"]["200"]["content"]["application/json"];
export type GetDriftAssessmentResponse = operations["getDriftAssessment"]["responses"]["200"]["content"]["application/json"];
export type ListPublicationHoldsResponse = operations["listPublicationHolds"]["responses"]["200"]["content"]["application/json"];
export type SealEvidencePackageResponse = operations["sealEvidencePackage"]["responses"]["201"]["content"]["application/json"];
export type GetEvidencePackageResponse = operations["getEvidencePackage"]["responses"]["200"]["content"]["application/json"];



/**
 * Labelling Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/labelling.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AnnotationBatch = components["schemas"]["AnnotationBatch"];
export type AnnotationBatchCreate = components["schemas"]["AnnotationBatchCreate"];
export type AnnotationBatchListData = components["schemas"]["AnnotationBatchListData"];
export type AnnotationLabelsSubmit = components["schemas"]["AnnotationLabelsSubmit"];
export type CategoryPrecision = components["schemas"]["CategoryPrecision"];
export type ClassificationRun = components["schemas"]["ClassificationRun"];
export type ClassificationRunListData = components["schemas"]["ClassificationRunListData"];
export type ContestedCategory = components["schemas"]["ContestedCategory"];
export type LabellerAgreement = components["schemas"]["LabellerAgreement"];
export type PostLabel = components["schemas"]["PostLabel"];
export type ProductCategory = components["schemas"]["ProductCategory"];
export type ReplyLabel = components["schemas"]["ReplyLabel"];
export type Taxonomy = components["schemas"]["Taxonomy"];
export type TaxonomyVersion = components["schemas"]["TaxonomyVersion"];
export type TaxonomyVersionCreate = components["schemas"]["TaxonomyVersionCreate"];
export type Batch = operations["listAnnotationBatches"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type PublishTaxonomyVersionRequestInput = NonNullable<operations["publishTaxonomyVersion"]["requestBody"]>["content"]["application/json"];
export type CreateAnnotationBatchRequestInput = NonNullable<operations["createAnnotationBatch"]["requestBody"]>["content"]["application/json"];
export type SubmitAnnotationLabelsRequestInput = NonNullable<operations["submitAnnotationLabels"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetTaxonomyParams = operations["getTaxonomy"]["parameters"]["path"];
export type PublishTaxonomyVersionParams = operations["publishTaxonomyVersion"]["parameters"]["path"];
export type ListAnnotationBatchesParams = NonNullable<operations["listAnnotationBatches"]["parameters"]["query"]>;
export type SubmitAnnotationLabelsParams = operations["submitAnnotationLabels"]["parameters"]["path"];
export type GetLabellerAgreementParams = operations["getLabellerAgreement"]["parameters"]["path"];
export type ListClassificationRunsParams = NonNullable<operations["listClassificationRuns"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetTaxonomyResponse = operations["getTaxonomy"]["responses"]["200"]["content"]["application/json"];
export type PublishTaxonomyVersionResponse = operations["publishTaxonomyVersion"]["responses"]["201"]["content"]["application/json"];
export type ListAnnotationBatchesResponse = operations["listAnnotationBatches"]["responses"]["200"]["content"]["application/json"];
export type CreateAnnotationBatchResponse = operations["createAnnotationBatch"]["responses"]["201"]["content"]["application/json"];
export type SubmitAnnotationLabelsResponse = operations["submitAnnotationLabels"]["responses"]["202"]["content"]["application/json"];
export type GetLabellerAgreementResponse = operations["getLabellerAgreement"]["responses"]["200"]["content"]["application/json"];
export type ListClassificationRunsResponse = operations["listClassificationRuns"]["responses"]["200"]["content"]["application/json"];



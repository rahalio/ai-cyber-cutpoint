/**
 * Markets Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/markets.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Corpus = components["schemas"]["Corpus"];
export type CorpusIngest = components["schemas"]["CorpusIngest"];
export type CorpusListData = components["schemas"]["CorpusListData"];
export type Market = components["schemas"]["Market"];
export type MarketCreate = components["schemas"]["MarketCreate"];
export type MarketListData = components["schemas"]["MarketListData"];
export type RetentionPolicy = components["schemas"]["RetentionPolicy"];
export type SourceLicence = components["schemas"]["SourceLicence"];
export type Corpora = operations["listCorpora"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterMarketRequestInput = NonNullable<operations["registerMarket"]["requestBody"]>["content"]["application/json"];
export type IngestCorpusRequestInput = NonNullable<operations["ingestCorpus"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListMarketsParams = NonNullable<operations["listMarkets"]["parameters"]["query"]>;
export type GetMarketParams = operations["getMarket"]["parameters"]["path"];
export type ListCorporaParams = NonNullable<operations["listCorpora"]["parameters"]["query"]>;
export type IngestCorpusParams = operations["ingestCorpus"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListMarketsResponse = operations["listMarkets"]["responses"]["200"]["content"]["application/json"];
export type RegisterMarketResponse = operations["registerMarket"]["responses"]["201"]["content"]["application/json"];
export type GetMarketResponse = operations["getMarket"]["responses"]["200"]["content"]["application/json"];
export type ListCorporaResponse = operations["listCorpora"]["responses"]["200"]["content"]["application/json"];
export type IngestCorpusResponse = operations["ingestCorpus"]["responses"]["202"]["content"]["application/json"];



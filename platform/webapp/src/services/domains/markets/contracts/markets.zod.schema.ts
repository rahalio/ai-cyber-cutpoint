/**
 * Markets Domain Contracts
 *
 * Re-exports Zod schemas from @cutpoint/core for runtime validation.
 * This avoids duplication and ensures alignment with the API contract.
 *
 * Architecture:
 * - Single source of truth: @cutpoint/core
 * - No code duplication or drift
 * - Runtime validation of API responses
 * - Used in services to validate responses
 *
 * @see @cutpoint/core/markets for the source schemas
 */

import { marketsSchemas as coreMarketsSchemas } from "@cutpoint/core/markets";
import type { z } from "zod";

/**
 * Re-export schemas from core
 * These are the same schemas used by the api-server, ensuring perfect alignment
 */
export const {
  // TODO: Add specific schema exports based on OpenAPI spec
  // ResponseMeta,
  // PageInfo,
  // etc.
} = coreMarketsSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const marketsSchemas = coreMarketsSchemas;

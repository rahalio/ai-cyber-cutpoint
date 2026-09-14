/**
 * Integration event type definitions (hand-maintained).
 * Codegen writes registry entries conforming to this shape.
 */

export type IntegrationEventDeliveryMode = 'sync' | 'async';

export interface IntegrationEventTypeDefinition {
  type: string;
  domain: string;
  aggregateType: string;
  description: string;
  defaultDeliveryMode: IntegrationEventDeliveryMode;
}

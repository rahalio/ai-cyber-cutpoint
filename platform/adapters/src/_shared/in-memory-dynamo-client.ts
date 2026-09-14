/**
 * In-memory DynamoDB DocumentClient stand-in for local sandbox (no Docker / AWS).
 * Supports the subset of ops used by generated repository adapters: put/get/scan/query/delete/update.
 */

import type {
  QueryCommandInput,
  QueryCommandOutput,
  GetCommandInput,
  GetCommandOutput,
  PutCommandInput,
  PutCommandOutput,
  UpdateCommandInput,
  UpdateCommandOutput,
  DeleteCommandInput,
  DeleteCommandOutput,
  ScanCommandInput,
  ScanCommandOutput,
  TransactWriteCommandInput,
  TransactWriteCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import type {
  BatchWriteItemCommandInput,
  BatchWriteItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import type { AdapterDynamoDBClient } from './dynamodb-client-types.js';

type Item = Record<string, unknown>;

const tables = new Map<string, Map<string, Item>>();

function tableMap(name: string): Map<string, Item> {
  let t = tables.get(name);
  if (!t) {
    t = new Map();
    tables.set(name, t);
  }
  return t;
}

function itemKey(pk: unknown, sk: unknown): string {
  return `${String(pk ?? '')}\0${String(sk ?? '')}`;
}

function evalBeginsWith(item: Item, attr: string, prefix: string): boolean {
  const v = item[attr];
  return typeof v === 'string' && v.startsWith(prefix);
}

/** Very small FilterExpression evaluator for generated adapters. */
function matchesFilter(
  item: Item,
  filterExpression?: string,
  values?: Record<string, unknown>
): boolean {
  if (!filterExpression) return true;
  const expr = filterExpression.trim();
  // begins_with(PK, :prefix)
  const m = expr.match(/^begins_with\((\w+),\s*:(\w+)\)$/);
  if (m && values) {
    const [, attr, valKey] = m;
    return evalBeginsWith(item, attr, String(values[`:${valKey}`] ?? ''));
  }
  // attribute_not_exists handled at put time
  return true;
}

export function clearInMemoryDynamoTables(): void {
  tables.clear();
}

export class InMemoryDynamoClient implements AdapterDynamoDBClient {
  async put(input: PutCommandInput): Promise<PutCommandOutput> {
    const tableName = input.TableName!;
    const item = { ...(input.Item as Item) };
    const key = itemKey(item.PK, item.SK);
    const map = tableMap(tableName);
    if (
      input.ConditionExpression?.includes('attribute_not_exists') &&
      map.has(key)
    ) {
      const err = new Error('ConditionalCheckFailedException') as Error & {
        name: string;
      };
      err.name = 'ConditionalCheckFailedException';
      throw err;
    }
    map.set(key, item);
    return { $metadata: {} };
  }

  async get(input: GetCommandInput): Promise<GetCommandOutput> {
    const key = input.Key as Item;
    const item = tableMap(input.TableName!).get(itemKey(key.PK, key.SK));
    return { Item: item, $metadata: {} };
  }

  async delete(input: DeleteCommandInput): Promise<DeleteCommandOutput> {
    const key = input.Key as Item;
    tableMap(input.TableName!).delete(itemKey(key.PK, key.SK));
    return { $metadata: {} };
  }

  async scan(input: ScanCommandInput): Promise<ScanCommandOutput> {
    const all = [...tableMap(input.TableName!).values()].filter((item) =>
      matchesFilter(
        item,
        input.FilterExpression,
        input.ExpressionAttributeValues as Record<string, unknown> | undefined
      )
    );
    const limit = input.Limit ?? all.length;
    const items = all.slice(0, limit);
    return {
      Items: items,
      Count: items.length,
      ScannedCount: all.length,
      $metadata: {},
    };
  }

  async query(input: QueryCommandInput): Promise<QueryCommandOutput> {
    // Treat as filtered scan for sandbox (GSI keys stored on items when present)
    const values = input.ExpressionAttributeValues as
      | Record<string, unknown>
      | undefined;
    const all = [...tableMap(input.TableName!).values()].filter((item) => {
      if (input.KeyConditionExpression && values) {
        // PK = :pk
        const eq = input.KeyConditionExpression.match(/(\w+)\s*=\s*:(\w+)/);
        if (eq) {
          const [, attr, valKey] = eq;
          if (String(item[attr]) !== String(values[`:${valKey}`])) return false;
        }
        const bw = input.KeyConditionExpression.match(
          /begins_with\((\w+),\s*:(\w+)\)/
        );
        if (bw) {
          const [, attr, valKey] = bw;
          if (!evalBeginsWith(item, attr, String(values[`:${valKey}`] ?? '')))
            return false;
        }
      }
      return matchesFilter(item, input.FilterExpression, values);
    });
    const limit = input.Limit ?? all.length;
    const items = all.slice(0, limit);
    return {
      Items: items,
      Count: items.length,
      ScannedCount: all.length,
      $metadata: {},
    };
  }

  async update(input: UpdateCommandInput): Promise<UpdateCommandOutput> {
    const key = input.Key as Item;
    const map = tableMap(input.TableName!);
    const k = itemKey(key.PK, key.SK);
    const existing = map.get(k) ?? { ...key };
    const values = (input.ExpressionAttributeValues ?? {}) as Record<
      string,
      unknown
    >;
    // SET a = :a, b = :b
    const setMatch = input.UpdateExpression?.match(/SET\s+(.+)/i);
    if (setMatch) {
      for (const part of setMatch[1].split(',')) {
        const m = part.trim().match(/(\w+)\s*=\s*:(\w+)/);
        if (m) existing[m[1]] = values[`:${m[2]}`];
      }
    }
    map.set(k, existing);
    return { Attributes: existing, $metadata: {} };
  }

  async batchWrite(
    _input: BatchWriteItemCommandInput
  ): Promise<BatchWriteItemCommandOutput> {
    return { $metadata: {} };
  }

  async transactWrite(
    _input: TransactWriteCommandInput
  ): Promise<TransactWriteCommandOutput> {
    return { $metadata: {} };
  }

  async send<T>(_command: T): Promise<any> {
    throw new Error('InMemoryDynamoClient.send is not supported in sandbox');
  }
}

export function isSandboxDynamoMode(): boolean {
  if (
    process.env.CUTPOINT_SANDBOX === '1' ||
    process.env.CUTPOINT_SANDBOX === 'true'
  ) {
    return true;
  }
  if (process.env.CUTPOINT_SANDBOX === '0' || process.env.CUTPOINT_SANDBOX === 'false') {
    return false;
  }
  // Default local: no Dynamo endpoint configured → in-memory
  return !process.env.AWS_ENDPOINT_URL && !process.env.LOCALSTACK_ENDPOINT;
}

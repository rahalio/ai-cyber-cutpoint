# Cutpoint

OpenAPI-first DDD monorepo for **Cutpoint** — criminal-market disruption planning (`1812-00381v2`).

Scaffolded from `zero-apps-codegen-scaffold` with package scope **`@cutpoint`**.

## Domains

| Domain | OpenAPI | Responsibility |
|--------|---------|----------------|
| `identity` | `packages/openapi-core/src/identity.yaml` | API keys + operator users (sandbox) |
| `markets` | `markets.yaml` | Markets + licensed corpora |
| `labelling` | `labelling.yaml` | Taxonomy, annotation batches, classification runs |
| `discovery` | `discovery.yaml` | Chain candidates, adjudication, dependency map |
| `interventions` | `interventions.yaml` | Control-change candidates + outcomes |
| `governance` | `governance.yaml` | Coverage, drift, publication holds, evidence packages |

Product canon: [PRODUCT.md](PRODUCT.md). Web console: [WEB-APP-SPEC.md](WEB-APP-SPEC.md). Skeleton archive: [docs/openapi-skeleton.yaml](docs/openapi-skeleton.yaml).

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: ddd_demo_local_dev_key

pnpm codegen:webapp   # once: domain clients + feature stubs
pnpm --filter @cutpoint/core build
pnpm dev:web          # http://localhost:3000
```

Identity (sandbox, no Dynamo):

```bash
curl -H "X-API-Key: ddd_demo_local_dev_key" http://127.0.0.1:4000/v0/tenants/me/api-keys
```

Product domains need DynamoDB (Local or AWS). See [docs/DYNAMO-LOCAL.md](docs/DYNAMO-LOCAL.md).

```bash
docker compose up -d
TABLE_NAME=ddd-core-local AWS_ENDPOINT_URL=http://localhost:8000 \
  node scripts/ensure-dynamo-table.mjs
TABLE_NAME=ddd-core-local AWS_ENDPOINT_URL=http://localhost:8000 pnpm dev:api
```

## Codegen

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Put `x-dynamodb` on **entity schemas** (and `x-repository` on operations) so adapters generate fully.
4. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

```bash
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main generate \
  --domain markets --config .codegen/.zero-codegen-merged.json --skip-build
```

See `.cursor/skills/` and [docs/CODEGEN.md](docs/CODEGEN.md).

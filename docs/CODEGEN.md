# Codegen guide

## Modes

| Mode | When | Action |
|------|------|--------|
| **A — New domain** | First time a domain YAML has no layers | Full multi-layer `generate --domain X` |
| **B — YAML edit** | Domain already scaffolded | Bundle → `--layers core` → handwrite platform |

## Commands

```bash
pnpm codegen:paths
pnpm lint:openapi
pnpm bundle:openapi
pnpm codegen:core
pnpm codegen:identity   # full identity scaffold (starter)
pnpm codegen:webapp     # platform/webapp services + feature stubs (--no-clean)
pnpm dev:web            # Next console on :3000 (API on :4000)
```

Webapp notes:

- Enable `layers.webapp.services|features` in `.codegen/.zero-codegen-merged.json`.
- `codegen:webapp` uses `--no-clean` so multi-step webapp generators sharing a domain folder do not wipe each other (layer cleaner still runs when `pipeline.clean` is true unless `--no-clean`).
- After stub generation, Cutpoint keeps handwritten `*.service.ts` / hooks that call OpenAPI paths (`/v1/...`, `/v0/...`) — see [WEB-APP-SPEC.md](../WEB-APP-SPEC.md).

Config: `.codegen/.zero-codegen-merged.json`  
Tool: `PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main`

## OpenAPI sample shape

- `packages/openapi-core/src/common/` — envelopes, problem, security, parameters, primitives
- `packages/openapi-core/src/identity.yaml` — live sample domain
- `.codegen/openapi-examples/` — teaching specs (not wired to Redocly)

## Shared vs product

| Shared (keep) | Product (add in consumer) |
|---------------|---------------------------|
| `_shared` dirs, middleware, messaging | Domain YAML + generated trees |
| Identity domain | Invoice / orders / … domains |
| Envelope + Problem contracts | Domain-specific schemas |

## Related skills

- `ddd-platform` — architecture & anti-drift
- `ddd-codegen` — pipeline commands
- `ddd-identity` — auth blueprint

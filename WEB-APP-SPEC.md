# WEB-APP-SPEC — Cutpoint

**Product:** Cutpoint  
**Shell:** `@cutpoint/webapp` (Next.js 14 App Router)  
**API:** local `api-server` on `:4000`  
**Spirit:** Disruption-planning workbench — precision floor, human adjudication gate, harm-severed interventions. Not an alert firehose.

## Information architecture

Primary nav (mission verbs):

| Route | Domain(s) | Job |
| --- | --- | --- |
| `/today` | cross-domain | Role home: queue depth, markets, open cuts |
| `/markets` | markets + discovery | Corpora + buy→sell dependency map |
| `/adjudication` | discovery | Candidate queue + dual-pane accept/reject |
| `/labelling` | labelling | Taxonomy, batches, classification runs |
| `/interventions` | interventions | Leverage-ranked control changes + outcomes |
| `/evidence` | governance | Coverage/drift, publication holds, packages |
| `/settings` | identity | API keys, operators |
| `/login` | identity | API key or operator JWT |

### Role homes

| Persona | Default | Emphasis |
| --- | --- | --- |
| TI / T&S analyst | `/adjudication` | Dual-pane evidence, typed reject reasons |
| Disruption lead | `/interventions` | Leverage scoreboard, outcomes |
| Annotation lead | `/labelling` | Budgeted batches, taxonomy coverage |
| Counsel / compliance | `/evidence` | Holds + sealed packages (no raw corpus) |
| Manager | `/today` | Throughput / SLA signals |

## Signature screens

1. **Today** — counts for candidates, markets, cut points; deep links into work queues.
2. **Markets & Chains** — market list + corpora; dependency map / edges (layered L→R metaphor; avoid hairballs).
3. **Adjudication** — dense queue; dual-pane buy vs subsequent sale; Accept / Reject with reasons (BR-2 gate).
4. **Labelling** — market-scoped taxonomy, annotation batches, precision-first classification runs (BR-4–BR-6).
5. **Interventions** — ranked candidates with harm/leverage fields; selected interventions retain failed outcomes (BR-1, BR-9).
6. **Evidence & Governance** — coverage floor + drift assessment; publication holds block findings (BR-3, BR-6); privileged packages (BR-10).
7. **Settings** — tenant API keys and operators.

## Design system

### Tokens (CSS variables in `globals.css`)

| Token | Role |
| --- | --- |
| `--color-surface-canvas` / graphite | Side nav / workbench chrome |
| `--color-trust` teal `#2a6f7a` | Adjudicated / high-reliability |
| `--color-risk-elevated` rust `#c45c26` | Escalation |
| `--color-cut` cobalt `#2c4a7c` | Planned intervention / CTA |
| `--color-status-candidate` | Unreviewed candidates |
| `--color-status-held` | Publication hold |
| TLP colors | **Never** reuse for risk/severity |

### Typography & density

- UI: IBM Plex Sans  
- IDs / hashes / JSON: IBM Plex Mono  
- Radius 2–4px; dense tables (~compact rows); no purple SaaS chrome, glassmorphism, or emoji status.

### Motion budget

- Subtle route/content fade only; no celebratory animations on accept/approve.

## Anti-patterns

- Firehose home without queue prioritization  
- Opaque “AI risk” without provenance  
- Mixing TLP and severity palettes  
- Free-text-only adjudication (no structured decision)  
- Presenting chain inventory as complete market coverage (BR-3)

## Implementation notes

- Generated webapp layer scaffolds `services/domains/*` and `features/*`. Path templates from codegen incorrectly prefixed `/orgs/{orgId}/`; **handwritten service clients** under `services/domains/{domain}/*.service.ts` call OpenAPI paths (`/v1/...`, `/v0/...`) until codegen path templates are fixed.
- Custom UI lives in `src/app/*` and may extend `src/features/*/components`.
- Regen: `pnpm codegen:webapp` (uses `--no-clean` so multi-step webapp generators do not wipe each other). Re-apply handwritten services after raw stub regen if needed.

## Sources (UX research)

- [Recorded Future Intelligence Graph](https://www.recordedfuture.com/platform/intelligence-graph)  
- [Chainalysis Reactor](https://www.chainalysis.com/product/reactor/)  
- [Flashpoint platform](https://flashpoint.io/platform/)  
- [Maltego](https://www.maltego.com/) / [product features](https://www.maltego.com/product-features/)  
- [DarkOwl Search API](https://www.darkowl.com/products/vision)  
- [FIRST CTI source evaluation](https://www.first.org/global/sigs/cti/curriculum/source-evaluation)  
- Cutpoint [PRODUCT.md](PRODUCT.md) BRs and personas  

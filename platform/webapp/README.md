# Cutpoint webapp

Next.js 14 console for Cutpoint (`@cutpoint/webapp`).

```bash
# from repo root
pnpm install
pnpm --filter @cutpoint/core build
pnpm --filter @cutpoint/webapp dev
# http://localhost:3000 — API expects http://localhost:4000
```

Demo key: `ddd_demo_local_dev_key` (same as api-server).

Webapp domain clients/hooks are generated via `pnpm codegen:webapp`. Handwritten UI lives in `src/app` and `src/features/*/components`.

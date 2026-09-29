# DevCompare

DevCompare is an early-stage developer-tool comparison site built with React, TypeScript, Vite, and Wouter. It ships with a small local catalog of 36 tools across 16 categories, searchable tool detail pages, category pages, alternatives, and side-by-side comparisons.

This repository is a working prototype, not a launched affiliate business. Catalog descriptions and pricing are hand-maintained starter content and may be incomplete or out of date. User-count and rating claims are intentionally not shown because no trustworthy source data is currently wired in. Verify product facts and prices against each vendor before publishing them. Outbound links currently go directly to vendor websites; affiliate tracking, disclosure, analytics, and monetization are not configured.

## Requirements

- Node.js 20.19+ or 22.12+ (Vite 7 requirement)
- pnpm 10 (the repository includes `pnpm-lock.yaml`)

## Local development

```bash
git clone https://github.com/Ahoo-11/devcompare.git
cd devcompare
pnpm install --frozen-lockfile
pnpm dev
```

Vite prints the local development URL (normally `http://localhost:3000`).

## Checks and production build

```bash
pnpm check
pnpm build
pnpm start
```

`pnpm build` creates the frontend in `dist/public` and the Express static-file server in `dist/index.js`. `pnpm start` serves that production build, including client-side routes. Set `PORT` to override the default port `3000`; no other runtime environment variables are required by the current application. The project does not currently include an automated test suite.

## Deployment notes

The app can run as a Node.js service on a Linux VM, including a future Hetzner host. Install dependencies from the lockfile, build, then run `pnpm start` under a process manager such as systemd. Put TLS and domain routing in a reverse proxy such as Caddy or nginx. A domain, DNS, server, TLS configuration, monitoring, and backups still need to be arranged separately; none are set up by this repository.

## Project layout

- `client/src/pages/` — home, comparison, tool detail, category, alternatives, and not-found views
- `client/src/lib/tools-data.ts` — local seed catalog and search/category helpers
- `client/src/components/` — shared UI components
- `server/index.ts` — Express server for static production assets and SPA fallback
- `vite.config.ts` — Vite development and build configuration

## Editing the catalog

Update the `Tool` entries in `client/src/lib/tools-data.ts`. Check descriptions, pricing, and vendor URLs against primary vendor sources before release. Do not add user counts, ratings, endorsements, or “expert” claims without a cited and maintainable source. If affiliate relationships are added later, disclose them clearly and configure tracking separately.

## Current scope and gaps

There is no account system, database, API, payment provider, affiliate tracking, analytics, content-management workflow, or production deployment configuration. The present catalog and pages are local prototype content. These capabilities require separate product and infrastructure work before this should be treated as a commercial service.

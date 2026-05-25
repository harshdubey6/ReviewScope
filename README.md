# ReviewScope

ReviewScope is an open-source self-hostable platform for automated, context-aware code reviews. It combines fast static analysis with optional LLM-powered reasoning to surface high-impact issues in pull requests and help maintainers ship safer code.

This repository is a monorepo containing the API, worker, and dashboard applications, plus supporting packages for LLM routing, context assembly (RAG), and static rules.

If you removed pricing UI or paid-tier gating, this README reflects the current codebase where features are available and the public `/pricing` page has been removed.

## Quick Overview

- Static AST-based detectors that run for every PR (free and fast).
- Optional LLM review stage that can use built-in server-managed models or repository-specific API keys.
- RAG-enabled context assembly to provide model-aware prompts with repository files and types.
- Background worker processing with Redis/Bull and PostgreSQL persistence.

## Repository Layout

```
apps/
  api/         # Hono API: webhooks, REST endpoints, DB migrations
  worker/      # Background job runner: static rules, RAG, LLM calls
  dashboard/   # Next.js app: UI for repos, settings, and review viewer

packages/
  context-engine/  # RAG, retrievers, prompt assembly
  llm-core/        # Provider adapters, prompts, model selection
  rules-engine/    # Static analysis rules and parsers
  security/        # Encryption and masking utilities

README.md
```

## Local Development (short)

Prerequisites: Node.js 18+, PostgreSQL, Redis (or Upstash), GitHub App credentials for webhook integration.

1. Install dependencies

```bash
pnpm install
```

2. Copy example env files into each app (see `apps/*/.env.example` if present) and set values for `DATABASE_URL`, `REDIS_URL`, `NEXTAUTH_SECRET`, and GitHub credentials.

3. Run the services in development

```bash
# API
pnpm --filter @reviewscope/api dev

# Worker
pnpm --filter @reviewscope/worker dev

# Dashboard
pnpm --filter @reviewscope/dashboard dev
```

Or use `docker compose -f docker-compose.dev.yml up --build` if you prefer containers.

## Database

Use Drizzle migrations in `apps/api`:

```bash
cd apps/api
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Notable Notes

- The project includes a server-managed default model (`Sarvam-M`) and also supports using per-installation provider keys. Ensure `ENCRYPTION_KEY` is set in the worker environment to decrypt stored API keys.
- The `/pricing` page and plan-gating logic were removed from the UI in this fork; features are accessible based on your deployment configuration.

## Suggested cleanup (files you may want to remove)

I found several public assets and removed the pricing route. Before deleting more files, confirm which of these you'd like removed:

- `apps/dashboard/public/dodo.jpeg` (payments logo shown in footer)
- `apps/dashboard/public/openai.svg` (OpenAI logo)
- `apps/dashboard/public/gemini-color.svg` (Gemini logo)
- `apps/dashboard/public/hero.png` (marketing hero image)

Reply with the names to delete, or say `delete all` to remove the list above.

## Contributing

1. Fork the repository and create a branch for your feature/fix.
2. Run tests and lint (if present) and open a PR with a clear description.

## Support

If you need help running or customizing ReviewScope, reply here or open an issue in the upstream repository.

---
Updated: May 25, 2026

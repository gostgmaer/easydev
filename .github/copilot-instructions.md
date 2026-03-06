# Copilot Instructions for easydev

## Project Context
- This is a Next.js 13 App Router project using TypeScript (`strict: true`) and Tailwind CSS.
- UI components are primarily in `components/` with reusable primitives in `components/ui/`.
- Shared content and SEO data are centralized in `lib/content.ts` and related files under `lib/` and `app/`.

## Coding Conventions
- Use TypeScript for all new code and avoid `any` unless there is a clear reason.
- Prefer the existing path alias `@/*` for internal imports.
- Reuse existing utilities (for example `cn` from `@/lib/utils`) and existing UI primitives before adding new helpers/components.
- Keep component behavior focused; move reusable logic to `lib/` or `hooks/`.
- Add `"use client"` only when client-only features are required (state, effects, browser APIs).
- Preserve existing structure and naming patterns instead of broad refactors.

## Content and SEO
- Business/content copy should live in `lib/content.ts`, not hardcoded across components.
- Keep metadata, structured data, sitemap, and robots changes consistent with existing patterns in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`.

## Styling
- Use Tailwind utility classes and existing design tokens/config from `tailwind.config.ts`.
- Prefer extending existing section/component styles over introducing a new styling approach.

## Validation
When making changes, run relevant checks:
- `npm run lint`
- `npm run typecheck`
- `npm run build` for production-impacting changes

## Avoid
- Do not introduce new UI/state libraries unless explicitly requested.
- Do not migrate routing patterns away from App Router unless explicitly requested.
- Do not make unrelated formatting or structural changes outside the task scope.

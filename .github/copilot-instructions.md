# Copilot Instructions -- EasyDev Portfolio Platform

## Project Overview

EasyDev is a modern, production-ready portfolio and service platform
built with Next.js App Router. The goal of this repository is to
maintain a high-quality, maintainable, and scalable codebase suitable
for professional deployment.

AI-generated contributions must prioritize: - Production stability -
Maintainable architecture - Accessibility compliance - Performance
optimization - SEO best practices - Minimal, focused code changes

Existing functionality must not be altered unless explicitly required by
the task.

---

# Core Development Principles

## 1. Production-First Code

All generated code must be: - Production-ready - Type-safe - Clean and
maintainable - Free of debugging artifacts - Compatible with static
export builds

Avoid experimental or unstable patterns.

---

## 2. Minimal Surface Area Changes

When modifying code: - Only change files relevant to the task - Avoid
refactoring unrelated modules - Do not rename files or move folders
unless requested - Preserve existing architecture patterns

---

## 3. Consistency with Existing Codebase

Before creating new utilities or components: - Search the repository for
existing implementations - Reuse helpers, utilities, or UI primitives
when possible - Follow existing naming conventions and file structures

Consistency is more important than introducing new abstractions.

---

# Technology Stack

## Framework

- Next.js 13.5+ (App Router)
- React 18

## Language

- TypeScript (strict mode enabled)

## Styling

- Tailwind CSS
- shadcn/ui
- Radix UI primitives

## Build Target

Static export configuration:

    output: 'export'
    trailingSlash: true

All code must remain compatible with static hosting environments.

---

# Project Architecture

## /app

Contains Next.js App Router entry points.

Includes: - Layout configuration - Metadata generation - Static routes -
Error boundaries - SEO files

Example files: - layout.tsx - page.tsx - sitemap.ts - robots.ts -
manifest.ts

---

## /components

### components/sections

Page-level sections used to construct landing pages.

Examples: - Hero - Services - Portfolio - Contact

### components/ui

Reusable UI primitives built using shadcn + Radix.

Examples: - Button - Input - Dialog - Toast - Card

Avoid duplicating primitives that already exist.

---

## /lib

Centralized shared logic and utilities.

Example structure:

    lib/
    api.ts
    config.ts
    content.ts
    env.ts
    error-handling.ts
    seo-utils.ts
    safe-fetch.ts
    validations.ts

All cross-cutting logic should live here.

---

## /types

Shared TypeScript type definitions used across the application.

Avoid using `any` whenever possible.

---

# Static Export Constraints

Because the application uses Next.js Static Export:

Allowed: - Client-side fetching - Static metadata - Static routes -
Build-time configuration

Avoid introducing: - Dynamic server APIs - Runtime server dependencies -
Node-only modules in client components

Do not add API routes or server actions unless explicitly required.

---

# Implementation Guidelines

## TypeScript

- Use strict typing
- Prefer structured interfaces
- Avoid `any`

## Components

Default to Server Components.

Add `"use client"` only when required for: - React state - Browser
APIs - Event listeners - Animations

## Imports

Use project alias:

    import { something } from "@/lib/utils"

Avoid deep relative imports.

---

# Content Management

The single source of truth for all business content is:

    lib/content.ts

Do not hardcode marketing copy inside components.

---

# SEO & Metadata Governance

Primary SEO files:

    app/layout.tsx
    app/sitemap.ts
    app/robots.ts
    app/manifest.ts
    lib/seo-utils.ts

Keep metadata consistent across these files.

---

# API Integration Rules

Central API layer:

    lib/api.ts

Safe request utilities:

    lib/safe-fetch.ts

Use: - safeFetch() - safeGet() - safePost()

These provide error handling and response normalization.

---

# Validation Standards

User input must be validated before processing.

Validation utilities:

    lib/validations.ts

Preferred validation library: Zod

Forms must validate: - required fields - format correctness -
client-side safety

---

# Error Handling

All async flows must include proper error handling.

Critical flows (contact, inquiry): - loading states - user-friendly
errors - success confirmation

Non-critical flows (analytics, logging): - fail silently - never block
UI

Documentation:

    ERROR_HANDLING.md
    ERROR_HANDLING_SUMMARY.md
    lib/error-handling.ts

---

# UI & Accessibility Standards

All UI must follow: - semantic HTML - keyboard navigation - accessible
labels - responsive layouts

Forms must include: - loading indicators - validation feedback - success
states - error states

---

# Environment & Security

Environment configuration:

    lib/env.ts
    lib/config.ts

Rules: - Never hardcode secrets - Never commit credentials - Guard
browser-only logic:

    if (typeof window !== "undefined") { }

---

# Authentication & User Dashboard Requirements

## Authentication Module

The application must support a secure authentication system for internal
dashboard access.

Requirements:

- Email + password authentication
- Secure password hashing
- Session or JWT-based authentication
- Protected dashboard routes
- Logout functionality
- Automatic redirect for unauthenticated users

Auth routes:

    /app/(auth)/login/page.tsx
    /app/(auth)/forgot-password/page.tsx

Protected dashboard routes:

    /app/dashboard/*

---

# User Dashboard

Authenticated users must have access to a dashboard for managing project
inquiries.

Example structure:

    /app/dashboard/layout.tsx
    /app/dashboard/page.tsx

Dashboard UI must use **Tailwind + shadcn components**.

Reusable dashboard components:

    components/dashboard/

---

# Project Request Management

The dashboard must include a **Project Requests Table**.

Each request record contains:

- name
- email
- message
- projectType
- budget
- timeline
- createdAt

---

# Table UI Requirements

Table columns:

- Name
- Email
- Project Type
- Budget
- Timeline
- Created At
- Actions

---

# Table Features

The request table must support:

- Server-side pagination
- Server-side sorting
- Search/filter functionality
- Loading states
- Empty states

Example query parameters:

    ?page=1
    &limit=10
    &sort=createdAt
    &order=desc

---

# Action Menu (Last Column)

The last column must contain a dropdown action menu using **shadcn
DropdownMenu**.

Actions:

- View Request
- Update Request

Example:

    [•••]
      View Request
      Update Request

---

# View Request

Route:

This page shows full request details.

---

# Update Request Page

Route:

    /dashboard/requests/[id]/edit

Capabilities:

- Update request status
- Add internal notes
- Modify request details

---

# API Architecture

All request data must be handled through:

    lib/api.ts

Example endpoints:

    GET /api/requests
    GET /api/requests/:id
    PATCH /api/requests/:id

Standard response format:

    {
      success: boolean,
      data: T,
      pagination?: {
        page: number,
        limit: number,
        total: number
      }
    }

---

# Code Quality Checklist

Before completing significant changes run:

    npm run lint
    npm run typecheck
    npm run build

The project must build successfully with zero TypeScript errors.

---

# Performance Expectations

Generated code should:

- minimize bundle size
- avoid unnecessary client components
- prevent hydration mismatches
- avoid heavy runtime dependencies

Prefer static rendering whenever possible.

---

# Things to Avoid

AI contributions must NOT:

- introduce new libraries without approval
- migrate frameworks or styling systems
- rewrite stable code unnecessarily
- create duplicate utilities
- introduce breaking architecture changes

---

# Contribution Philosophy

The EasyDev codebase prioritizes:

- simplicity
- reliability
- maintainability
- professional production standards

All contributions should improve the platform without introducing
unnecessary complexity.

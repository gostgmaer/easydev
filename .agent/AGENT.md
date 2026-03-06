# EasyDev – Agent Instructions

## Project Overview

**EasyDev** (`easydev.in`) is a modern, production-ready **web development agency** website. It showcases the agency's services, portfolio/case studies, pricing plans, and provides a contact form for client inquiries. Built with **Next.js 13 (App Router)**, TypeScript, and Tailwind CSS.

---

## Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Framework    | Next.js 13 (App Router)           |
| Language     | TypeScript                        |
| Styling      | Tailwind CSS + `tailwindcss-animate` |
| UI Components| Shadcn/ui (Radix UI primitives)   |
| Icons        | Lucide React                      |
| Forms        | React Hook Form + Zod validation  |
| Database     | Supabase (optional/contact forms) |
| Analytics    | Google Analytics 4                |
| Deployment   | Static export (Vercel / Netlify)  |

---

## Project Structure

```
easydev/
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout: fonts, metadata, structured data
│   ├── page.tsx            # Home page (assembles all sections)
│   ├── globals.css         # Global styles & CSS variables
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt config
│   └── case-studies/       # Case study detail pages
│
├── components/
│   ├── sections/           # Page-level section components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   ├── Contact.tsx
│   │   └── contact/        # Contact sub-components
│   │       ├── ContactForm.tsx
│   │       ├── ContactInfo.tsx
│   │       ├── Form.tsx
│   │       └── FormField.tsx
│   ├── ui/                 # Shadcn/ui base components (do not modify directly)
│   ├── layout/             # Layout wrappers (navbar, etc.)
│   └── Providers.tsx       # Theme & context providers
│
├── lib/
│   ├── content.ts          # ⭐ SINGLE SOURCE OF TRUTH for all site content
│   ├── api.ts              # API call helpers
│   ├── env.ts              # Environment variable validation
│   ├── safe-fetch.ts       # Type-safe fetch wrapper with error handling
│   ├── safe-utils.ts       # Utility functions (safe wrappers)
│   ├── seo-utils.ts        # SEO metadata utilities
│   ├── validations.ts      # Zod schemas for forms
│   ├── error-handling.ts   # Error handling utilities
│   ├── analytics.ts        # GA4 event tracking
│   └── performance.ts      # Performance measurement helpers
│
├── types/                  # Global TypeScript type definitions
├── public/                 # Static assets (images, icons)
├── hooks/                  # Custom React hooks
└── data/                   # Static JSON data files
```

---

## Key Conventions

### 1. Content Changes → `lib/content.ts` Only
All text, data, and configuration (personal info, services, projects, testimonials, pricing, FAQs, contact details, SEO metadata) lives in **`lib/content.ts`**. Never hardcode content in components.

### 2. Component Organisation
- **Page sections** → `components/sections/`
- **Reusable primitives** → `components/ui/` (Shadcn generated — avoid editing unless necessary)
- **Complex sections** get their own sub-folder (e.g., `sections/contact/`)

### 3. Styling Rules
- Use **Tailwind CSS utility classes** exclusively; no raw CSS unless in `globals.css`
- Follow the existing dark-mode-first pattern; use `dark:` variants
- Colour tokens are defined in `tailwind.config.ts` and CSS variables in `globals.css`
- Animations use `tailwindcss-animate`; prefer built-in classes before writing custom keyframes

### 4. TypeScript
- Strict mode is **on** (`tsconfig.json`)
- Define types in `types/` for shared interfaces; co-locate component-specific types
- Always type API responses and form schemas (use Zod in `lib/validations.ts`)
- Run `npm run typecheck` to verify before considering a change complete

### 5. Form Handling
- All forms use **React Hook Form** with **Zod resolvers**
- Validation schemas belong in `lib/validations.ts`
- Standard form field wrapper: `components/sections/contact/FormField.tsx`

### 6. API & Data Fetching
- Use helpers in `lib/safe-fetch.ts` for all HTTP calls (built-in error handling & retries)
- External API base URL is controlled by `NEXT_PUBLIC_BASE_URL`
- Environment variables are validated in `lib/env.ts` — add new vars there

### 7. SEO
- Page metadata is generated via helpers in `lib/seo-utils.ts`
- Defaults are set in `app/layout.tsx`; override per-page with `generateMetadata()`
- Keep structured data (JSON-LD) in `app/layout.tsx` up to date

---

## Environment Variables

Copy `.env.example` → `.env.local` and fill in values. Key groups:

| Group           | Key vars                                          |
|-----------------|---------------------------------------------------|
| Site URLs       | `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BASE_URL`    |
| Email           | `SENDGRID_API_KEY` / `RESEND_API_KEY`             |
| Database        | `SUPABASE_URL`, `SUPABASE_ANON_KEY`               |
| Analytics       | `NEXT_PUBLIC_GA_ID`                               |
| Auth (optional) | `NEXTAUTH_SECRET`, `NEXTAUTH_URL`                 |

---

## Development Workflow

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Type-check
npm run typecheck

# Lint
npm run lint

# Production build (static export)
npm run build
```

---

## Important Files Reference

| File | Purpose |
|------|---------|
| `lib/content.ts` | All site content & copy |
| `app/layout.tsx` | Root layout, fonts, global metadata, JSON-LD |
| `tailwind.config.ts` | Design tokens (colors, fonts, spacing) |
| `app/globals.css` | CSS custom properties & base styles |
| `lib/env.ts` | Env var validation & access |
| `lib/validations.ts` | Zod form schemas |
| `ERROR_HANDLING.md` | Error handling patterns & conventions |
| `QUICK_REFERENCE.md` | Quick dev reference for common tasks |

---

## Do's and Don'ts

### ✅ Do
- Edit `lib/content.ts` for any copy/data changes
- Use `safe-fetch.ts` for all API calls
- Add new Zod schemas to `lib/validations.ts`
- Keep components lean — extract logic to `lib/` or `hooks/`
- Write accessible markup (ARIA labels, semantic HTML)
- Run `typecheck` and `lint` before finalising changes

### ❌ Don't
- Hardcode content strings in components
- Edit files under `components/ui/` unless absolutely necessary (Shadcn managed)
- Add inline styles; use Tailwind classes
- Commit `.env` or `.env.local` files
- Bypass the safe-fetch wrapper for raw `fetch()` calls
- Introduce new npm packages without checking if existing utilities already cover the need

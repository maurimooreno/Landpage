# Implementation Plan: Landing de servicios de software a medida

**Branch**: `main` | **Feature directory**: `001-custom-software-landing` | **Date**: 2026-09-08 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-custom-software-landing/spec.md`

**Note**: This plan ends after research and design. Task decomposition belongs to
`$speckit-tasks`; implementation belongs to `$speckit-implement`.

## Summary

Build a mobile-first, statically generated Astro landing page that explains bespoke software
services, establishes credible experience through verified case studies, and converts relevant
Argentine SME visitors into callback requests. Use Astro components and semantic HTML by default,
Tailwind CSS for a deliberate token-driven visual system, and only a small framework-free TypeScript
enhancement for the contact form. Project case studies use an Astro Content Collection; stable
navigation, services, and profile facts remain typed static data. Contact submissions follow a
provider-neutral external endpoint contract and are delivered to the company email.
The publishable MVP comprises US1, US2, US3, and every applicable cross-cutting release gate; story
checkpoints support incremental development but are not separate public releases.

## Technical Context

**Language/Version**: Astro 6.3.x on Node.js >= 22.12.0 with TypeScript in strict mode; modern HTML
and CSS

**Development Branch**: All feature implementation occurs on `001-custom-software-landing`; direct
development on `main` is prohibited. `main` accepts the feature only through the protected pull-request
workflow.

**Build Dependencies**: Astro, Tailwind CSS 4 with `@tailwindcss/vite`, and `@astrojs/sitemap`

**Development Dependencies**: `@astrojs/check`, Playwright Test, `@axe-core/playwright`, ESLint with
Astro support, Prettier with Astro support, and Lighthouse CI

**Storage**: No application database. Versioned local content and static data only. Contact data is
sent to an external endpoint and retained in the company email workflow under the 90-day policy.

**Testing**: Astro type/content checks; lint and formatting checks; Playwright end-to-end tests over
the static build served in a controlled preview in Chromium, Firefox, WebKit, and representative mobile projects; automated
axe checks plus manual WCAG review; Lighthouse performance/SEO/accessibility budgets

**Continuous Integration**: GitHub Actions runs every required quality gate on pull requests and on
changes to the default branch. A versioned ruleset definition is applied to `main` through the GitHub
REST API and requires the named checks `lint`, `format`, `build`, `tests`, `accessibility`,
`performance`, and `security` before merge. A separate scheduled workflow runs Lighthouse against
the production URL without collecting visitor data.

**Target Platform**: Static hosting over HTTPS on evergreen desktop and mobile browsers; without
client JavaScript, all content and the direct company-email fallback remain usable

**Project Type**: Static marketing website with one landing route, privacy route, confirmation
route, generated robots route, and one external contact-submission integration

**Performance Goals**: In each of three consecutive pre-deployment Lighthouse laboratory runs against
the static build served in a controlled preview with the documented mobile profile, LCP <= 2.5 s,
CLS <= 0.1, and TBT <= 200 ms; the primary value
proposition and contact action remain usable throughout loading; zero framework hydration. After
deployment, the same three-run audit executes weekly against the production URL and retains reports
for regression comparison without RUM or personal-data collection.

**Constraints**: Static output; WCAG 2.2 AA; content works at 320-1440 px and beyond; no React, Vue,
or other UI framework; no SSR; no secrets in client output; no first-party form backend; no
unverified claims or confidential client data in public content; minimal browser JavaScript;
Argentine market in Spanish

**Scale/Scope**: Three public HTML routes, one generated robots route, six primary landing sections,
approximately 5 services and 1-8 verified project entries, one compact contact form, one language,
and low-to-moderate marketing
traffic with burst protection delegated to the form endpoint

## Constitution Check

*GATE: Passed before Phase 0 research and passed again after Phase 1 design.*

| Principle / Gate | Plan evidence | Status |
|---|---|---|
| Simplicity and maintainability | One Astro project, static output, no app database or UI framework, limited component set | PASS |
| Responsive by default | All three HTML routes and relevant states use a 320-1440 px matrix, explicit mobile touch operation, and portrait/landscape validation or documented non-applicability | PASS |
| Intentional UX/UI | Impeccable Persuade workflow is a required design and finish gate; card-heavy generic composition is prohibited | PASS |
| Accessible by design | Semantic HTML, keyboard-first controls, WCAG 2.2 AA, axe plus manual verification | PASS |
| Performance as a feature | Explicit Lighthouse mobile budgets for LCP, CLS and TBT run before release and weekly against production, with retained reports and no visitor tracking | PASS |
| Search visibility | Canonical URL, sitemap, robots, Open Graph, semantic content and truthful structured data | PASS |
| Clear responsibilities | Layout, section, UI, content, data, script, and integration boundaries are explicit | PASS |
| Professionalism and trust | Verified evidence only, clear response promise, honest states and privacy copy | PASS |
| Security and privacy | Minimum fields, consent, provider-neutral secure endpoint, no exposed secret, 90-day deletion | PASS |
| Delivery quality gates | GitHub Actions plus an actively applied `main` ruleset require lint, format, build/type checks, tests, accessibility, Lighthouse performance and security checks before merge | PASS |

Post-design review found no constitutional exception. The external endpoint is intentionally kept
behind a documented browser contract, and Content Collections are used only where schema validation
and repeatable case-study authoring justify them.

## Continuous Integration and Merge Gates

The repository uses `.github/workflows/ci.yml` as the required merge-validation workflow. It runs
for `pull_request`, pushes to `main`, manual dispatch, and `merge_group` when GitHub merge queues are
enabled. The workflow installs the locked dependency graph with `npm ci`, uses a supported Node.js
22 release, and uploads test and Lighthouse evidence needed to diagnose failures.

The desired branch protection is versioned in `.github/rulesets/main.json`. Immediately after the CI
workflow and its seven stable check names are available, and before any user-story implementation is
merged, an attended setup task MUST locate the repository ruleset by its stable name and create or
update it through the GitHub REST API using authenticated repository-administration access. The
active ruleset targets
`refs/heads/main`, requires pull requests and all seven status checks below, disallows silent bypass,
and records its returned ruleset identifier and redacted verification output. Merely checking for an
existing ruleset does not satisfy this gate.

All feature work uses `001-custom-software-landing`. A closing task MUST query the active ruleset
again and prove with a controlled failing pull request that it still blocks merges; this final
verification supplements rather than postpones the effective setup configuration.

The `main` branch ruleset MUST require these stable GitHub Actions check names. A failure, timeout,
or cancellation in any required check blocks merge:

| Required check | Required evidence and failure condition |
|---|---|
| `lint` | ESLint completes with no errors over maintained source and configuration files. |
| `format` | Prettier reports no formatting drift. |
| `build` | Astro type/content validation and the static release build both succeed with required build-time configuration. |
| `tests` | Contract and Playwright functional suites pass against the controlled static preview in every configured browser project. |
| `accessibility` | Automated axe suites pass with no WCAG 2.2 A/AA violations, and keyboard/reflow regression tests pass. Manual accessibility evidence remains a release gate because automation is not sufficient by itself. |
| `performance` | Three consecutive Lighthouse mobile runs satisfy LCP <= 2.5 s, CLS <= 0.1, and TBT <= 200 ms in every run; reports are retained as artifacts. |
| `security` | Dependency audit has no unresolved high or critical vulnerability, secret and built-output scans find no exposed credential or personal payload, and endpoint-origin and abuse-control checks pass. |

Jobs may execute in parallel after dependency installation or use an immutable dependency cache, but
none may silently downgrade failure to success. A final deployment or release job, if later added,
MUST depend on all seven required checks. Repository configuration MUST prevent direct bypass unless
an explicitly authorized emergency exception is recorded under the constitutional exception process.

The workflow declares least-privilege `GITHUB_TOKEN` permissions, normally `contents: read`, does not
expose production secrets to untrusted pull-request code, and pins third-party actions to reviewed
commit SHAs. Branch or path filters MUST NOT leave a required check permanently pending. CI validates
a controlled static preview; it does not publish the site or send real customer contact data.

`.github/workflows/production-lighthouse.yml` runs weekly and through `workflow_dispatch` against the
public URL supplied as the non-secret repository variable `PRODUCTION_SITE_URL`. It performs three
Lighthouse mobile runs with the same LCP, CLS, and TBT assertions as CI, uploads the reports with a
90-day retention target, and leaves a failed workflow run as the maintainer alert and regression
record. It requests read-only repository permissions, submits no form, stores no visitor identifiers,
and introduces no browser-side RUM or analytics code. Its failure does not rewrite historical results
or retroactively block an already merged commit, but it blocks declaring production health restored.
Before deployment, release readiness requires this workflow to be configured and validated without
requiring a live production URL. The first real production run occurs after the approved manual
deployment and establishes the operational baseline; it is not a prerequisite for performing that
deployment.

## MVP Release Boundary

US1, US2, and US3 retain independent development checkpoints, but the first public MVP release MUST
include all three stories and the complete cross-cutting phase. No subset, including US1 with direct
email alone, is described as a publishable release. Pre-deployment readiness includes the configured
periodic production audit; after deployment, the first run confirms production health as a separate
operational checkpoint.

## UX/UI Surface Strategy

**Mode**: Persuade. A time-constrained SME decision-maker arrives with operational friction and
needs to understand fit, reduce perceived delivery risk, and request contact.

**Structural thesis**: Present a progression from operational friction to a working system, not a
stack of interchangeable marketing cards. The first viewport must make the offer, action, and
problem-to-outcome proof immediately legible; the selected Impeccable direction decides its actual
composition. Subsequent sections move through problem, service, proof, working relationship, and
callback.

**Proof and truth**: Project evidence leads with the business problem, the developer's responsibility,
and the verified outcome. Technical capability supports the evidence rather than becoming a logo
wall. Synthetic demonstrations must be labelled, and commercial claims must never be invented.

**Interaction thesis**: Navigation is quiet and direct. The only signature functional interaction
is the contact-channel selector, which reveals the matching phone or email field. Without JavaScript,
all content and the direct company-email fallback remain available. Motion, if retained, is one
restrained connective system with an equivalent reduced-motion state.

**Visual-world gate**: UI source work MUST stop if the Impeccable engine is unavailable. Run context
once, initialize `PRODUCT.md`, inventory real evidence and assets, then run
`concept-seed --scope direction --mode persuade`. Present the resulting directions, obtain a human
choice, persist `buildPath`, and record the six-block direction contract in the surface brief. The
selected world must define typography, palette, spatial rhythm, component language, first viewport,
signature interaction, and its honest risk. Immediately before editing UI, load the Impeccable
craft-floor reference. The direction must reject startup clichés: generic gradient heroes, repeated
rounded cards, decorative badges, glow effects, and oversized empty hero space.

If `buildPath` is comp-led, complete the comp, spec, plates, and hero gates before later sections. If
it is code-led, make the direction contract's FIRST VIEWPORT and signature interaction explicit and
audit them at finish. Provider selection is a blocking prerequisite only for US2: form implementation
stops until the chosen managed service or serverless endpoint passes the contact contract against a
real test mailbox.

**Finish gate**: After implementation, capture full-page 1440 px and 390 px screenshots, open each to
verify valid evidence, run Impeccable detection once, and send the original request, direction
contract, captures, detector findings, and comp/diffs when applicable to a fresh finish reviewer.
Act on its disposition, use one consolidated fix pass and at most one confirmation round, then
document the built design system only after the last correction. The Impeccable engine was unavailable
during planning, so no visual-world roll or durable design artifact is falsely recorded here.

## Project Structure

### Documentation (this feature)

```text
specs/001-custom-software-landing/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── provider-decision.md
├── contracts/
│   └── contact-submission.md
├── checklists/
│   └── requirements.md
├── validation/
│   ├── foundation.md
│   ├── us1.md
│   ├── us2.md
│   ├── us2-security.md
│   ├── us2-operations.md
│   ├── us3.md
│   ├── responsive.md
│   ├── performance.md
│   ├── security.md
│   ├── privacy.md
│   ├── content.md
│   ├── usability.md
│   ├── ci.md
│   ├── production-performance.md
│   └── final.md
└── tasks.md
```

### Source Code (repository root)

```text
.github/
├── rulesets/
│   └── main.json
└── workflows/
    ├── ci.yml
    └── production-lighthouse.yml
.impeccable/
├── config.json
└── review/
    ├── desktop.png
    ├── mobile.png
    └── verdict.md
.gitignore
.prettierignore
astro.config.ts
tsconfig.json
.nvmrc
.env.example
eslint.config.js
prettier.config.mjs
playwright.config.ts
lighthouserc.cjs
package.json
package-lock.json
PRODUCT.md
DESIGN.md
docs/
└── contact-operations.md
public/
└── favicon.svg
src/
├── assets/
│   ├── brand/
│   ├── projects/
│   └── social/
├── components/
│   ├── layout/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── Experience.astro
│   │   ├── Projects.astro
│   │   └── Contact.astro
│   └── ui/
│       ├── ActionLink.astro
│       ├── SectionHeading.astro
│       └── ProjectSummary.astro
├── content/
│   └── projects/
├── data/
│   ├── types.ts
│   ├── navigation.ts
│   ├── profile.ts
│   ├── experience.ts
│   ├── services.ts
│   ├── contact.ts
│   └── seo.ts
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── privacidad.astro
│   ├── robots.txt.ts
│   └── contacto/
│       └── gracias.astro
├── scripts/
│   └── contact-form.ts
├── styles/
│   └── global.css
└── content.config.ts
tests/
├── e2e/
│   ├── landing.spec.ts
│   ├── landing-responsive.spec.ts
│   ├── contact.spec.ts
│   ├── contact-errors.spec.ts
│   ├── contact-accessibility.spec.ts
│   ├── projects.spec.ts
│   ├── project-content.spec.ts
│   ├── accessibility.spec.ts
│   ├── cross-cutting.spec.ts
│   └── seo.spec.ts
└── fixtures/
    └── contact-endpoint.ts
```

**Structure Decision**: Use a single Astro application. Section components correspond to major
semantic regions and are not split further unless they acquire independent behavior. Small repeated
visual contracts live in `components/ui`; stable lists live in typed `data`; only project cases use
a Content Collection because they combine structured metadata, authored narrative, and local images.
Shared contracts remain in `data/types.ts`; public identity, experience, contact configuration, and
SEO metadata have dedicated data modules. Operational instructions remain under `docs`, while feature-specific decision and
validation evidence remains under the feature directory. GitHub Actions owns repeatable merge gates,
scheduled production checks, and retained diagnostic evidence, but not deployment behavior. The
versioned ruleset payload is applied through the GitHub REST API by an attended repository setup task.

## Phase 0: Research Summary

Research decisions and rejected alternatives are recorded in [research.md](research.md). All
plan-level technical choices are resolved. The Impeccable visual world is a shared blocking
implementation gate; selection of the contract-compatible contact provider blocks US2 only rather
than unrelated stories.
Package versions are locked during implementation from the current Astro-compatible releases and
committed in the lockfile.

## Phase 1: Design Summary

- [data-model.md](data-model.md) defines content records, conditional form fields, validation,
  client states, delivery states, and retention responsibilities.
- [contracts/contact-submission.md](contracts/contact-submission.md) defines the provider-neutral
  contact endpoint, responses, fallback behavior, abuse handling, and privacy boundary.
- [quickstart.md](quickstart.md) defines setup and end-to-end validation for responsive behavior,
  accessibility, SEO, performance, security, content truth, and the Impeccable finish workflow.

## Complexity Tracking

No constitutional violations or exceptional complexity are accepted by this plan.

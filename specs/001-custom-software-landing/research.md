# Phase 0 Research: Landing de servicios de software a medida

**Date**: 2026-09-08

## 1. Rendering model

**Decision**: Use Astro 6.3.x with its default static output. Generate the landing, privacy page,
confirmation page, sitemap, and crawl assets at build time.

**Rationale**: The site is content-led and needs no per-request personalization. Static output
minimizes operational surface, browser JavaScript, latency, and security risk while matching the
explicit project constraint.

**Alternatives considered**: Astro SSR was rejected because no requirement needs request-time
rendering. A client-side single-page application was rejected because it adds hydration and weakens
the semantic, performance, and maintenance goals.

## 2. Type safety and project checks

**Decision**: Run Astro 6.3.x on Node.js >= 22.12.0, extend Astro's strict TypeScript configuration,
use typed data exports and validated content schemas, and run `astro check` in CI.

**Rationale**: Astro documents strict and strictest TypeScript templates and validates content and
component types through its checking tool. Strict types catch missing content, invalid form-state
assumptions, and metadata errors before build.

**Alternatives considered**: Loose TypeScript and JavaScript-only content were rejected because
they defer simple content-contract failures to runtime or visual review.

## 3. Tailwind CSS integration and tokens

**Decision**: Use Tailwind CSS 4 through the Vite plugin and import Tailwind once from the global
stylesheet. Define project tokens with the CSS-first theme mechanism, while keeping uncommon or
semantic behavior in readable component or global CSS.

**Rationale**: Current Tailwind documentation uses the Vite plugin, `@import "tailwindcss"`, and
CSS-first `@theme` variables. This supports a consistent palette, typography, spacing, breakpoints,
easing, focus, and reduced-motion vocabulary without maintaining a large configuration layer.

**Alternatives considered**: Tailwind v3 configuration was rejected as legacy for a greenfield
project. CSS modules for every component were rejected because the surface is small; unrestricted
utility strings without tokens were rejected because they invite visual drift.

## 4. Component and content boundaries

**Decision**: Keep one component per major semantic section, two structural components, and only a
few UI primitives with proven reuse. Store navigation, profile, and service facts in typed data.
Use one Astro Content Collection for project case studies and their local images, configured in
`src/content.config.ts` with an explicit `glob()` loader rooted at `src/content/projects`.

**Rationale**: Project entries benefit from schema validation and authored narrative, while short,
stable site facts do not justify a content abstraction. Astro's content schemas and native image
metadata can validate local project media and alternative text.

**Alternatives considered**: Putting every sentence in a Content Collection was rejected as
fragmentation. Hard-coding every project in a section component was rejected because it weakens
repeatable validation and content maintenance. A headless CMS was rejected because no editorial
workflow or remote content source is required.

## 5. Images and browser JavaScript

**Decision**: Use local, verified assets rendered through Astro's native image component with
explicit dimensions, responsive candidates, sizes, modern output formats, and meaningful alternative
text. Ship no framework runtime. Allow one small TypeScript module for conditional contact fields
and inline submission status. Without JavaScript, verified content and the direct company-email
fallback remain available; the full multi-channel form is an enhancement.

**Rationale**: Astro's asset pipeline produces optimized responsive image output. The form has real
conditional state, but it does not justify a UI framework. If the enhancement fails, content and the
direct company-email fallback remain usable without claiming that the multi-channel form submitted.

**Alternatives considered**: Unoptimized public-folder project images, a React island, and decorative
client-side effects were rejected for performance, accessibility, and maintenance cost.

## 6. Contact submission integration

**Decision**: Submit to a provider-neutral HTTPS endpoint configured at build time. Selecting a real
provider or serverless endpoint and proving delivery to a test company mailbox is a blocking task
before form implementation. The endpoint
must follow [contracts/contact-submission.md](contracts/contact-submission.md), deliver to the company
email, validate on its trusted boundary, enforce abuse controls, support allowed origins, and return
machine-readable status. No secret is embedded in browser output.

**Rationale**: This preserves static hosting and avoids a bespoke backend while keeping the UI and
tests independent of a specific vendor. A small client enhancement provides in-page status. A direct
company-email link remains the no-JavaScript and service-failure fallback.

**Alternatives considered**: A first-party server and database were rejected as unnecessary. A
`mailto:`-only form was rejected because it is unreliable and depends on visitor configuration.
A vendor-specific component was rejected because it couples presentation to one provider.

## 7. SEO and discovery

**Decision**: Load and validate the public site origin and contact endpoint in Astro configuration,
failing release builds unless both are valid HTTPS URLs. Configure the sitemap
integration, exclude `/contacto/gracias/`, generate canonical URLs from `Astro.site`, and generate
`robots.txt` as a static Astro route so it references the configured sitemap origin. Centralize
per-page title, description, Open Graph, and canonical metadata in the base layout. Add truthful
JSON-LD for the professional service and person/organization relationship only when verified fields
exist.

**Rationale**: Astro's sitemap documentation requires the deployed `site` URL for correct absolute
URLs. Central metadata prevents route drift, while page-owned values remain unique. Conditional
structured data prevents invented business facts.

**Alternatives considered**: Duplicated head markup per page and unconditional placeholder schema
were rejected. Client-generated metadata was rejected because metadata is known at build time.

## 8. Performance budget

**Decision**: Gate the MVP with three consecutive Lighthouse mobile laboratory runs against the static
build served in a controlled pre-deployment preview, requiring LCP <= 2.5 s, CLS <= 0.1, and TBT <=
200 ms in every run. Reuse the same profile and
assertions in a weekly GitHub Actions workflow against the public production URL, retain its reports
for 90 days, and use failed scheduled runs as the regression signal. Budget zero framework hydration,
one small form script, self-hosted or system fonts with controlled loading, and no unbounded motion
or media.

**Rationale**: A repeatable laboratory gate is proportionate to a small static landing and produces
comparable evidence before and after deployment. A scheduled Lighthouse audit can detect production
regressions without adding visitor-side code or collecting personal data.

**Alternatives considered**: Score-only targets were rejected because they can hide metric
regressions. Field-performance targets requiring real-user measurement were removed from the MVP.
RUM and third-party visitor telemetry were rejected as unnecessary data collection for the current
scale.

## 9. Accessibility and browser testing

**Decision**: Test the built site using Playwright projects for Chromium, Firefox, WebKit, and
representative mobile viewports. Require zero axe violations for every enabled WCAG 2.2 A/AA rule,
regardless of reported severity, and
manually verify keyboard order, visible focus, zoom/reflow, contrast, accessible names, status
announcements, reduced motion, target sizes, conditional form behavior, and touch operation. Cover
the landing, privacy, and confirmation routes with their relevant states at portrait and landscape
orientations when applicable, recording a reason for each non-applicable orientation.

**Rationale**: Playwright supports shared scenarios across browser and device projects and can manage
the preview server. Automated accessibility scanning cannot establish full WCAG conformance, and
axe documentation notes that some WCAG 2.2 rules may require explicit enablement.

**Alternatives considered**: A single Chromium pass and automated-only accessibility testing were
rejected because both leave high-impact requirements unverified.

## 10. Impeccable design workflow

**Decision**: Treat the landing as a Persuade surface. UI implementation stops if the Impeccable
engine is unavailable. Before UI code: run context once, initialize `PRODUCT.md`, inventory verified
evidence and assets, run `concept-seed --scope direction --mode persuade`, obtain a human choice,
persist `buildPath`, and record the six-block surface direction contract. Load craft-floor immediately
before editing. Follow comp/spec/plates/hero gates for comp-led work or make FIRST VIEWPORT and the
signature interaction explicit for code-led work. After the build, execute the bounded desktop/mobile
inspection, one detector pass, fresh finish review, disposition handling, and final design-system
documentation required by Impeccable.

**Rationale**: The design has no existing visual authority, and the brief explicitly rejects generic
AI landing patterns. A deliberate concept gate prevents the implementation from defaulting to card
grids, generic gradients, oversized heroes, and decorative badges.

**Alternatives considered**: Selecting colors and fonts directly in this technical plan was rejected
because it bypasses visual-direction approval. The Impeccable engine was not installed during
planning, so the plan records the mandatory implementation gate rather than fabricating its output.

## 11. GitHub Actions and main protection

**Decision**: Version the seven-job CI workflow and the desired `main` repository ruleset separately.
Perform feature work only on `001-custom-software-landing`. Immediately after the CI workflow and its
stable check names are available, apply the ruleset through the GitHub REST API using attended
repository-administration credentials, before any user-story implementation is merged,
creating or updating it by stable name. Require pull requests and successful `lint`, `format`,
`build`, `tests`, `accessibility`, `performance`, and `security` checks without an undocumented bypass.
Use `pull_request`, `push` to `main`, `workflow_dispatch`, and `merge_group` triggers, least-privilege
workflow permissions, and reviewed commit-SHA pins for third-party actions.

At release close, query the active ruleset again and use a controlled failing pull request to prove
that merge blocking remains effective.

**Rationale**: A workflow produces status checks but does not itself make them mandatory. Applying an
active ruleset closes that gap while the versioned payload keeps the desired protection auditable and
repeatable. `merge_group` prevents required checks from remaining unavailable when a merge queue is
enabled.

**Alternatives considered**: Manual-only branch protection was rejected because it is difficult to
audit and reproduce. Merely verifying that some ruleset exists was rejected because it does not prove
the required checks or enforcement state. Giving workflows write-all permission was rejected under
least privilege.

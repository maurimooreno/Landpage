# Quickstart and Validation Guide

This guide describes the expected developer workflow after implementation tasks create the Astro
project. It validates the static release build in a controlled preview, not only the development server.

## Prerequisites

- Node.js 22.12.0 or newer on a version supported by Astro 6.3.x
- npm and the committed lockfile
- A selected contact endpoint satisfying [contracts/contact-submission.md](contracts/contact-submission.md)
  and a real test company mailbox for delivery verification
- Verified profile, company email, service, project, privacy, and asset content
- The Impeccable engine available before visual-direction selection and final UI review
- A GitHub repository administrator available to apply the versioned `main` ruleset
- The feature checked out on `001-custom-software-landing`; do not implement it directly on `main`

## Configure local environment

Create an ignored local environment file from the committed example and set only public,
non-secret configuration:

```text
PUBLIC_SITE_URL=https://example.test
PUBLIC_CONTACT_ENDPOINT=https://forms.example.test/contact
```

Do not place provider secrets, mailbox credentials, or personal test payloads in source-controlled
files or public variables.

## Install and run

```bash
npm ci
npm run dev
```

Expected: the landing is available at the printed local URL, navigation reaches every section, and
the privacy and confirmation routes render directly.

## Static build verification

```bash
npm run check
npm run lint
npm run format:check
npm run build
npm run preview
```

Expected:

- Type, content schema, lint, formatting, and build checks pass.
- Output contains static HTML for `/`, `/privacidad/`, and `/contacto/gracias/`.
- No SSR adapter or UI framework runtime is present.
- The static release build fails if the site origin or contact endpoint is missing, non-HTTPS, or invalid.
- The sitemap uses the configured canonical origin and excludes `/contacto/gracias/`.
- The generated `robots.txt` references that sitemap; the confirmation page is `noindex,follow`.

## CI and main protection

- `.github/workflows/ci.yml` runs for pull requests targeting `main`, pushes to `main`, manual
  dispatch, and merge-queue checks.
- The workflow exposes stable checks named `lint`, `format`, `build`, `tests`, `accessibility`,
  `performance`, and `security`; every check fails closed when its command fails or times out.
- Apply `.github/rulesets/main.json` through the GitHub REST API using attended repository-admin
  access immediately after the workflow and seven stable checks are available, before merging any
  user-story implementation. Create or update the ruleset by stable name and record its identifier
  without storing the credential.
- During final validation, confirm again that the active ruleset targets `refs/heads/main`, requires pull requests and all seven checks,
  and has no undocumented bypass. A controlled failing check must prevent merge before restoring the
  passing commit.

## Automated journey validation

```bash
npm run test:e2e
npm run test:a11y
npm run test:performance
```

Run tests against the controlled static preview with a mocked contract-compatible contact endpoint.

### Landing comprehension

- The first viewport identifies bespoke software services, Argentine SMEs, remote delivery, and the
  primary callback action.
- Navigation reaches services, experience, projects, and contact with logical focus behavior.
- Services cover internal applications, APIs, integrations, automation, and bespoke enterprise
  software and connect each need to an outcome.
- Project entries publish only approved, non-restricted content.

### Contact flow

- Call and WhatsApp select and require only a phone number.
- Email selects and requires only an email address.
- Inactive fields are disabled and absent from the payload.
- Consent is required and initially unchecked.
- Invalid fields expose associated Spanish errors and focus the first invalid control.
- Duplicate submission is prevented while a request is pending.
- Success announces delivery and the 1-business-day response promise.
- Validation, rate-limit, timeout, offline, and server failures never show false success and retain
  retryable data in the current page.
- The public company email remains available when the endpoint fails.
- A no-JavaScript run preserves all content and exposes the direct company-email fallback without
  claiming that the enhanced multi-channel form is available.

### Responsive matrix

Validate `/`, `/privacidad/`, and `/contacto/gracias/` at minimum at 320, 390, 768, 1024, and 1440
CSS pixels, including each route's relevant loading, success, error, empty, long-content, and
missing-resource states. Use Playwright's representative mobile Chrome and mobile Safari projects.

- No horizontal overflow, clipped content, unreachable action, or overlapping focus target.
- Long names, long email addresses, 1-8 projects, missing project media, and expanded text remain
  legible.
- Touch targets, sticky elements, headings, and reading order remain correct after reflow and zoom.
- On mobile, operate navigation, calls to action, form controls, validation, retry, and confirmation
  through touch input. Validate portrait and landscape whenever the route or state supports both;
  record the reason whenever an orientation is not applicable in
  `specs/001-custom-software-landing/validation/responsive.md`.

### Accessibility

- Automated axe scans report zero violations for all enabled WCAG 2.2 A/AA rules, regardless of
  reported severity.
- Manual keyboard traversal covers skip link, navigation, all calls to action, channel selection,
  validation, submission, failure, and success.
- Review contrast, 200% and 400% zoom/reflow, visible and unobscured focus, accessible names,
  status announcements, target sizes, reduced motion, alternative text, and language metadata.
- Manual and automated evidence covers the representative responsive matrix; passing one viewport
  is never treated as evidence for the others.

### SEO and content truth

- Every route has one descriptive title, unique description, canonical URL, language, and consistent
  index directive.
- The landing has one logical primary heading and semantic section hierarchy.
- Open Graph content resolves to a real optimized image with meaningful alternative text.
- Structured data validates and contains only verified person/business/service facts.
- No placeholder client, result, location, review, price, or years-of-business claim ships.

### Performance

- Pre-release validation runs Lighthouse three consecutive times in laboratory conditions against
  the static build served in a controlled local preview with the documented mobile profile. Every
  run must satisfy LCP <= 2.5 s, CLS <= 0.1, and TBT <= 200 ms.
- `.github/workflows/production-lighthouse.yml` runs the same three audits weekly and by manual
  dispatch against `PRODUCTION_SITE_URL`, uploads reports for 90 days, and exposes failures through
  GitHub Actions history and notifications. Before deployment, validate the workflow definition and
  variable boundary without requiring the production URL to respond.
- The production workflow performs synthetic audits only: it submits no form, installs no RUM or
  analytics code, and collects no visitor or personal data.
- Images have intrinsic dimensions and appropriate responsive candidates.
- Fonts do not block useful content or cause visible layout shift.
- No UI framework hydration, third-party visual widget, autoplay media, or unbounded animation ships.
- The form enhancement is the only expected route-level client script unless a measured requirement
  justifies another.

### Security and privacy

- Built files and network requests expose no secret.
- Endpoint tests cover invalid shape, unknown fields, honeypot, oversized payload, origin rejection,
  outdated privacy notice, rate limit with `Retry-After`, timeout, delivery retry, terminal-failure
  alert, and safe error messages.
- No form payload enters analytics, URLs, console output, or client error reporting.
- The privacy notice names the responsible party and contact, purpose, lawful basis, fields,
  processor/recipients, retention, international transfers, rights procedure, version, and the
  applicable Argentine context; qualified review precedes any compliance claim.
- The company email workflow proves response before the end of the next Argentine business day and
  deletion of non-client prospect data within 90 days of the last contact, including direct fallback
  emails. Retained purge evidence contains no personal data.

## Moderated usability validation

- Run at least 10 first-exposure sessions with the target audience: at least five mobile and five
  desktop sessions.
- Measure offer comprehension after 30 seconds, contact discovery within 15 seconds, valid form
  completion within 3 minutes, and separate 1-5 ratings for clarity, professionalism, and trust.
- SC-002 passes only when at least 90% of the mobile cohort and at least 90% of the desktop cohort pass
  independently; an aggregate result cannot compensate for a failing cohort.
- When any criterion fails, record the finding, apply one consolidated correction batch, repeat the
  affected validation, and attach new anonymized evidence. The correction may touch any affected
  file and the evidence must list every modified file. Allow at most two correction/retest cycles. A
  remaining failure blocks the release and requires explicit replanning.

## Impeccable UI/UX gates

Before UI implementation (blocking):

1. Stop if the Impeccable engine is unavailable; run context once when it is installed.
2. Initialize `PRODUCT.md`, then inventory verified evidence and assets.
3. Run `concept-seed --scope direction --mode persuade`, present the directions, and obtain a human
   selection.
4. Persist `buildPath` and record the six-block surface direction contract. For comp-led work, obey
   comp/spec/plates/hero gates; for code-led work, make FIRST VIEWPORT and the signature interaction
   explicit.
5. Load the Impeccable craft-floor reference immediately before editing UI.

At finish:

1. Capture valid full-page desktop (1440 px) and mobile (390 px) screenshots in one batch, plus the
   actual user viewport if known; open every file and verify its content.
2. Run the Impeccable detector exactly once.
3. Send the original request, direction contract, verified captures, detector findings, and comp/diff
   evidence when applicable to a fresh finish reviewer.
4. Act on its disposition, batch all material fixes, and use at most one confirmation capture round.
5. Document the built visual system only after the final correction.

Expected: the first viewport explains the offer and action within seconds; the page has one coherent
visual world, varied scroll pacing, authored proof, restrained purposeful motion, and none of the
prohibited generic landing patterns.

## MVP release decision

The first public MVP requires US1, US2, US3, all seven passing merge checks, manual accessibility and
privacy evidence, the moderated-usability gate, the Impeccable finish review, and a configured
production Lighthouse workflow. Individual story checkpoints may be demonstrated during development
but are not publishable releases.

## Post-deployment production baseline

After the approved manual deployment exposes the public HTTPS URL, set the non-secret repository
variable `PRODUCTION_SITE_URL` and dispatch `.github/workflows/production-lighthouse.yml`. Confirm
that all three audits pass, reports are retained for 90 days, and no form submission or visitor data
is collected. Record this first run as the operational baseline; it confirms production health but
does not create a circular prerequisite for deployment.

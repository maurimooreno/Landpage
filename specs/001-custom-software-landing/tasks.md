---

description: "Dependency-ordered implementation tasks for the custom software services landing"
---

# Tasks: Landing de servicios de software a medida

**Input**: Design documents from `/specs/001-custom-software-landing/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md),
[data-model.md](data-model.md), [contracts/contact-submission.md](contracts/contact-submission.md),
[quickstart.md](quickstart.md)

**Tests**: Required by the feature specification and project constitution. Story tests are written
first and must fail for the expected missing behavior before implementation begins.

**Organization**: Tasks are grouped by user story for independent development and validation. The
publishable MVP requires all three stories and the final cross-cutting phase.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel after its stated prerequisites because it changes different files.
- **[Story]**: Maps the task to User Story 1, 2, or 3 from `spec.md`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the Astro toolchain, repeatable validation, CI workflows, and versioned
repository-protection intent.

- [X] T001 Verify the active implementation branch is `001-custom-software-landing` and abort product work on `main`, then initialize Astro 6.3.x with Node.js >=22.12.0, strict TypeScript, static output, approved dependencies, lockfile, and npm scripts in `package.json`, `package-lock.json`, `.nvmrc`, and `tsconfig.json`
- [X] T002 Configure Tailwind CSS 4 through `@tailwindcss/vite`, import it once, and establish the CSS-first theme boundary in `astro.config.ts` and `src/styles/global.css`
- [X] T003 [P] Configure Astro-aware ESLint rules with no generated-output linting in `eslint.config.js`
- [X] T004 [P] Configure Astro-aware formatting and ignored build artifacts in `prettier.config.mjs` and `.prettierignore`
- [X] T005 [P] Configure Playwright production-preview projects for Chromium, Firefox, WebKit, mobile Chrome, and mobile Safari in `playwright.config.ts`
- [X] T006 [P] Configure three-run Lighthouse mobile laboratory collection and hard LCP <=2.5 s, CLS <=0.1, and TBT <=200 ms assertions for a controlled static preview or a separately supplied post-deployment public URL in `lighthouserc.cjs`
- [X] T007 Validate HTTPS site and contact endpoint configuration, fail release builds only when required build-time public values are missing, exclude the confirmation route from the sitemap, and document that `PRODUCTION_SITE_URL` is a post-deployment workflow variable rather than a site-build prerequisite in `astro.config.ts` and `.env.example`
- [X] T008 Implement the least-privilege merge-validation workflow for `pull_request`, pushes to `main`, `workflow_dispatch`, and `merge_group`, using SHA-pinned actions and stable blocking jobs named `lint`, `format`, `build`, `tests`, `accessibility`, `performance`, and `security` in `.github/workflows/ci.yml`
- [X] T009 Implement the read-only weekly and manually dispatched three-run Lighthouse audit of the non-secret `PRODUCTION_SITE_URL`, with 90-day report artifacts and no form submission, RUM, analytics, or visitor data in `.github/workflows/production-lighthouse.yml`
- [X] T010 After T008 exposes the seven stable checks, define `.github/rulesets/main.json` and apply it through the GitHub REST API by stable name with attended repository-admin access, creating or updating active `refs/heads/main` protection that requires pull requests and every named check with no undocumented bypass, and record its identifier and redacted response in `specs/001-custom-software-landing/validation/ci.md`

**Checkpoint**: Tooling and workflows exist, and effective `main` protection is configured before any
product UI is implemented.

---

## Phase 2: Foundational (Shared Blocking Prerequisites)

**Purpose**: Resolve only the visual direction, verified content boundary, shared types, and common
document shell required by every story.

**CRITICAL**: No user-story UI begins until this phase passes. Contact-provider work is deliberately
excluded and begins inside US2.

- [ ] T011 Provision the Impeccable engine with user approval if required, run context once, complete product initialization, and record durable product truth in `PRODUCT.md`
- [ ] T012 Inventory owner-verified identity, company email, experience, project evidence, permissions, assets, and prohibited claims; stop release work if required factual content is missing in `PRODUCT.md`
- [ ] T013 Run Impeccable `concept-seed --scope direction --mode persuade`, obtain the human direction choice, persist `buildPath` in `.impeccable/config.json`, and write the six-block surface brief for `src/pages/index.astro`
- [ ] T014 Load the Impeccable craft-floor immediately before the first UI edit, then translate the approved direction contract into accessible Tailwind typography, color, focus, spacing, motion, and reduced-motion tokens in `src/styles/global.css`
- [ ] T015 [P] Define strict shared content, SEO, navigation, and contact-domain types without framework state in `src/data/types.ts`
- [ ] T016 Implement the semantic document shell from T015 with language, skip link, metadata contract, canonical handling, and safe JSON-LD serialization in `src/layouts/BaseLayout.astro`
- [ ] T017 [P] Add source, environment, build, test-result, Lighthouse, and local Impeccable ignore rules without hiding shipping assets in `.gitignore`
- [ ] T018 Run install, type, lint, format, build, and empty-suite smoke checks and record the shared foundation result in `specs/001-custom-software-landing/validation/foundation.md`

**Checkpoint**: Shared visual, content, type, and layout contracts compile; US1, US2, and US3 may begin
independent development.

---

## Phase 3: User Story 1 - Reconocer una solución adecuada (Priority: P1)

**Goal**: Explain the bespoke software offer, target audience, solvable problems, and next action.

**Independent Test**: A representative first-time visitor identifies the offer, at least three
solution types, and the recommended next step without assistance.

### Tests for User Story 1

> Write these tests first and confirm they fail for the expected missing behavior.

- [ ] T019 [P] [US1] Write failing Playwright tests for first-viewport offer, primary email action, service/problem comprehension, semantic headings, and section navigation in `tests/e2e/landing.spec.ts`
- [ ] T020 [P] [US1] Write failing responsive assertions for the landing at 320, 390, 768, 1024, and 1440 px with long content, no horizontal overflow, mobile touch operation, and portrait/landscape coverage or an explicit non-applicability reason in `tests/e2e/landing-responsive.spec.ts`

### Implementation for User Story 1

- [ ] T021 [P] [US1] Encode verified public identity, value proposition, Argentine remote service area, response promise, and experience summary in `src/data/profile.ts`
- [ ] T022 [P] [US1] Encode applications, APIs, integrations, automations, and bespoke enterprise software with problem-to-outcome copy in `src/data/services.ts`
- [ ] T023 [P] [US1] Define stable accessible section labels and anchors for services, experience, projects, and contact in `src/data/navigation.ts`
- [ ] T024 [P] [US1] Implement the approved-direction action link with correct semantics, visible focus, and restrained states in `src/components/ui/ActionLink.astro`
- [ ] T025 [P] [US1] Implement a reusable semantic section introduction without decorative badge treatment in `src/components/ui/SectionHeading.astro`
- [ ] T026 [US1] Implement keyboard-safe primary navigation from T023 without a UI framework in `src/components/layout/Header.astro`
- [ ] T027 [US1] Implement professional identity, essential navigation, direct company email, privacy link, and current copyright from T021 and T023 in `src/components/layout/Footer.astro`
- [ ] T028 [US1] Implement the approved first-viewport composition with truthful offer, Argentine SME audience, primary contact action, and secondary project route in `src/components/sections/Hero.astro`
- [ ] T029 [US1] Implement the services/problem narrative with varied pacing and no repetitive card grid in `src/components/sections/Services.astro`
- [ ] T030 [US1] Assemble the independently testable landing increment with header, hero, services, direct email fallback, and footer in `src/pages/index.astro`
- [ ] T031 [US1] Run the US1 suites and record automated comprehension proxies, keyboard, semantics, responsive, and zero-hydration evidence in `specs/001-custom-software-landing/validation/us1.md`

**Checkpoint**: US1 passes independently as a development increment, but is not a publishable MVP.

---

## Phase 4: User Story 2 - Iniciar una conversación cualificada (Priority: P1)

**Goal**: Let a prospect request contact by call, WhatsApp, or email through a minimal, private,
accessible form with a direct-email fallback.

**Independent Test**: A valid request can be initiated from the primary CTA, validated, accepted,
delivered to a test mailbox, confirmed honestly, retried after failure, and handled without JavaScript.

### Provider prerequisites for User Story 2

- [ ] T032 [P] [US2] Evaluate managed form services or a serverless endpoint against every contract criterion and record the selected provider, processing location, failure behavior, and rejected alternatives in `specs/001-custom-software-landing/provider-decision.md`
- [ ] T033 [P] [US2] Implement a deterministic contract-compatible mock with success, validation, privacy-version, rate-limit, timeout, and failure controls in `tests/fixtures/contact-endpoint.ts`
- [ ] T034 [US2] Prove the T032 endpoint accepts the contract payload, rejects invalid and abusive payloads, exposes delivery state, retries failures, alerts terminal failure, and delivers to a real test mailbox in `specs/001-custom-software-landing/provider-decision.md`

### Tests for User Story 2

> Begin after T033 and confirm each test fails for the expected missing behavior.

- [ ] T035 [P] [US2] Write failing contract-driven tests for conditional fields, exact payload shape, consent, authoritative receipt, duplicate prevention, and success state in `tests/e2e/contact.spec.ts`
- [ ] T036 [P] [US2] Write failing tests for client/server validation, outdated privacy notice, 403, 413, 429 with Retry-After, timeout, offline, 5xx, preserved retry data, and no false success in `tests/e2e/contact-errors.spec.ts`
- [ ] T037 [P] [US2] Write failing keyboard, focus, status-announcement, accessible-error, reduced-motion, and no-JavaScript fallback tests in `tests/e2e/contact-accessibility.spec.ts`

### Implementation for User Story 2

- [ ] T038 [P] [US2] Define channel options, active `YYYY-MM-DD` privacy version, Spanish validation copy, 10-second timeout, and public fallback email in `src/data/contact.ts`
- [ ] T039 [P] [US2] Document mailbox ownership, one-business-day Buenos Aires response rule, qualification states, direct-email handling, 90-day deletion, and non-personal audit evidence in `docs/contact-operations.md`
- [ ] T040 [US2] Implement the minimal semantic form from T038 with channel controls, conditional phone/email regions, consent, honeypot, live status, and `noscript` email fallback in `src/components/sections/Contact.astro`
- [ ] T041 [US2] Implement framework-free conditional fields, client validation, exact payload creation, 10-second lifecycle, accessible announcements, Retry-After handling, and retry behavior in `src/scripts/contact-form.ts`
- [ ] T042 [US2] Implement the legally reviewed Spanish privacy notice from T038 with responsible party, purpose, lawful basis, fields, processor, transfers, retention, rights process, and version in `src/pages/privacidad.astro`
- [ ] T043 [US2] Implement the truthful noindex confirmation route from the configured response promise without implying delivery beyond endpoint acceptance in `src/pages/contacto/gracias.astro`
- [ ] T044 [US2] Add the contact section after the proof narrative and connect all primary calls to action without breaking the direct-email path in `src/pages/index.astro`
- [ ] T045 [US2] Verify built output exposes no secret, inactive value, payload in URLs/logs/analytics, or unsafe provider detail in `specs/001-custom-software-landing/validation/us2-security.md`
- [ ] T046 [US2] Run mocked contact, error, accessibility, and no-JavaScript suites and record story acceptance in `specs/001-custom-software-landing/validation/us2.md`
- [ ] T047 [US2] Run a production-like provider test through every channel, verify test-mail delivery, retry, and terminal alert, and append redacted evidence to `specs/001-custom-software-landing/provider-decision.md`
- [ ] T048 [US2] Exercise response and deletion operations for form and direct-email paths and record only non-personal audit proof in `specs/001-custom-software-landing/validation/us2-operations.md`

**Checkpoint**: US2 passes independently with a proven provider; no provider work blocked US1 or US3.

---

## Phase 5: User Story 3 - Validar experiencia y confianza (Priority: P2)

**Goal**: Present truthful technical experience, working approach, and verified project evidence.

**Independent Test**: A visitor can navigate from experience to projects and verify that every case
states the problem, contribution, and result without inflating the new company's history.

### Tests for User Story 3

> Write these tests first and confirm they fail for the expected missing behavior.

- [ ] T049 [P] [US3] Write failing tests for experience/company-history separation, project completeness, a valid 1-8 entry layout, support for three or more cases, absent media, and navigation to proof in `tests/e2e/projects.spec.ts`
- [ ] T050 [P] [US3] Write failing content-policy tests that exclude restricted or unapproved entries and detect confidential or placeholder claims in `tests/e2e/project-content.spec.ts`

### Implementation for User Story 3

- [ ] T051 [P] [US3] Configure the projects Content Collection with explicit `glob()` loader, strict schema, image validation, confidentiality, approval, and ordering rules in `src/content.config.ts`
- [ ] T052 [P] [US3] Encode verified system types, process expertise, collaboration approach, and technical capabilities without inflating company history in `src/data/experience.ts`
- [ ] T053 [US3] Add every owner-approved public or anonymized case available for launch, allowing fewer than three and up to eight, with factual outcomes and no restricted content in `src/content/projects/`
- [ ] T054 [P] [US3] Add only licensed and approved project imagery with provenance and meaningful alternative-text decisions in `src/assets/projects/`
- [ ] T055 [US3] Implement the experience narrative and working approach from T052 in `src/components/sections/Experience.astro`
- [ ] T056 [US3] Implement a resilient text-led project summary against the T051 schema with optional optimized media and confidentiality labels in `src/components/ui/ProjectSummary.astro`
- [ ] T057 [US3] Implement the approved-direction project sequence with 1-8 entries, native Astro image optimization, and honest missing-media behavior in `src/components/sections/Projects.astro`
- [ ] T058 [US3] Integrate experience and projects into the persuasive sequence and secondary hero route in `src/pages/index.astro`
- [ ] T059 [US3] Run schema, content-policy, project, responsive, and confidentiality checks and record acceptance in `specs/001-custom-software-landing/validation/us3.md`

**Checkpoint**: US3 passes independently. All three stories are now ready for integrated release gates.

---

## Phase 6: Integrated MVP Release Gates

**Purpose**: Complete the publishable MVP by integrating US1, US2, US3 and satisfying every
cross-cutting constitutional gate.

- [ ] T060 [P] Define unique verified title, description, canonical path, robots directive, Open Graph asset, and conditional structured-data values for every public route in `src/data/seo.ts`
- [ ] T061 Apply route-specific metadata, safe Person/ProfessionalService JSON-LD, social image, and noindex confirmation behavior in `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `src/pages/privacidad.astro`, and `src/pages/contacto/gracias.astro`
- [ ] T062 Generate environment-correct `robots.txt`, reference the sitemap, and preserve confirmation-route exclusion in `src/pages/robots.txt.ts` and `astro.config.ts`
- [ ] T063 After T060-T062, implement SEO regression tests for titles, descriptions, canonicals, language, headings, Open Graph, sitemap, robots, noindex, and truthful structured data, and confirm they pass in `tests/e2e/seo.spec.ts`
- [ ] T064 [P] Implement whole-page axe tests with all available WCAG 2.2 A/AA rules at every representative viewport and zero violations in `tests/e2e/accessibility.spec.ts`
- [ ] T065 [P] Implement cross-browser keyboard, 200%/400% zoom-reflow, focus visibility, target size, status, reduced-motion, long-content, missing-resource, and mobile touch checks across landing, privacy, and confirmation with every relevant state in `tests/e2e/cross-cutting.spec.ts`, and record portrait/landscape coverage or explicit non-applicability in `specs/001-custom-software-landing/validation/responsive.md`
- [ ] T066 Run three consecutive Lighthouse mobile laboratory audits against the static build served in a controlled pre-deployment preview, require LCP <=2.5 s, CLS <=0.1, and TBT <=200 ms in every run, inspect output, and retain evidence in `specs/001-custom-software-landing/validation/performance.md`
- [ ] T067 Run dependency, built-output, secret, payload-leak, endpoint-origin, and abuse-control security checks and record results in `specs/001-custom-software-landing/validation/security.md`
- [ ] T068 Verify the privacy notice received qualified review and matches provider, transfer, retention, rights, consent-version, and mailbox operations in `specs/001-custom-software-landing/validation/privacy.md`
- [ ] T069 Audit public copy, project claims, licenses, media provenance, alternative text, links, and production assets with zero placeholders in `specs/001-custom-software-landing/validation/content.md`
- [ ] T070 Conduct at least 10 first-exposure moderated sessions with at least five mobile and five desktop participants, evaluate SC-001, SC-003, SC-011 and SC-002 independently in each cohort, and record anonymized results in `specs/001-custom-software-landing/validation/usability.md`
- [ ] T071 Review T070 results; when any criterion fails, apply one consolidated correction batch in any affected file, record every modified path, repeat the affected validation with new anonymized evidence, and allow at most two correction/retest cycles before blocking release and requiring replanning in `specs/001-custom-software-landing/validation/usability.md`
- [ ] T072 Capture and verify full-page 1440 px and 390 px renders after usability acceptance in `.impeccable/review/desktop.png` and `.impeccable/review/mobile.png`
- [ ] T073 Run the Impeccable detector exactly once and send its findings, original request, direction contract, verified captures, and comp/diff evidence when applicable to a fresh finish reviewer in `.impeccable/review/verdict.md`
- [ ] T074 Apply the reviewer disposition as one consolidated fix or rebuild batch, recapture the same viewports, obtain the bounded confirmation verdict, and update `.impeccable/review/verdict.md`
- [ ] T075 Run the Impeccable documenter only after the final correction to record the shipped visual system and provenance in `DESIGN.md` and its generated sidecar
- [ ] T076 Query the ruleset configured by T010, verify its stable identifier, active `refs/heads/main` target, pull-request requirement, seven required checks, and absence of undocumented bypass, and append redacted closing evidence to `specs/001-custom-software-landing/validation/ci.md`
- [ ] T077 After T076, trigger `.github/workflows/ci.yml` from an `001-custom-software-landing` pull request, introduce and then revert a controlled failing change to prove every required check blocks merge, and append redacted evidence to `specs/001-custom-software-landing/validation/ci.md`
- [ ] T078 Execute every pre-deployment command and manual scenario in `specs/001-custom-software-landing/quickstart.md`, require all stories and constitutional release gates to pass, validate the configured production-audit workflow without requiring a live URL, and record MVP readiness to publish in `specs/001-custom-software-landing/validation/final.md`

**Checkpoint**: The complete US1 + US2 + US3 MVP is ready for the approved manual deployment only
when T060-T078 pass.

---

## Phase 7: Post-Deployment Production Health

**Purpose**: Establish the first synthetic production baseline after the external hosting process
publishes the approved MVP.

- [ ] T079 After manual deployment exposes the public HTTPS URL, set the non-secret `PRODUCTION_SITE_URL`, dispatch `.github/workflows/production-lighthouse.yml`, verify three passing audits and 90-day artifacts without form submission or visitor data, and record the operational baseline in `specs/001-custom-software-landing/validation/production-performance.md`

**Checkpoint**: The scheduled production monitor has a verified baseline and can detect later regressions.

---

## Dependencies & Execution Order

### Phase Dependencies

```text
Phase 1 Setup
    |
    v
Phase 2 Shared Foundation
    |
    +-------------------------+-------------------------+
    |                         |                         |
    v                         v                         v
US1 Offer (P1)          US2 Contact (P1)          US3 Proof (P2)
                              |
                    provider prerequisites
    |                         |                         |
    +-------------------------+-------------------------+
                              |
                              v
                 Integrated MVP Release Gates
```

- **Phase 1** has no prerequisites; T008-T009 follow the tool configuration they invoke, and T010 depends on T008 plus its seven stable check names.
- **Phase 2** depends on Phase 1 and contains only contracts shared by US1, US2, and US3.
- **US1**, **US2**, and **US3** can start after Phase 2; US2 completes T032-T034 before form tests and implementation.
- Integrations touching `src/pages/index.astro` are serialized in order T030, T044, then T058.
- **Phase 6** requires all three stories because the publishable MVP includes US1 + US2 + US3.
- T076 re-verifies the ruleset applied by T010; T077 requires T076; T078 requires every prior pre-deployment release gate; T079 requires the approved manual deployment and public URL.

### User Story Dependencies

- **US1 (P1)**: No provider dependency; independently testable after the shared foundation.
- **US2 (P1)**: No dependency on US1 behavior, but its provider prerequisites T032-T034 are blocking.
- **US3 (P2)**: No dependency on US2; uses verified content and the shared layout.
- Story checkpoints are development milestones, not public releases.

### Within Each User Story

- Write tests first and confirm they fail for the expected missing behavior.
- Define typed data or schemas before their consumers.
- Build reusable UI only when demonstrated by the story.
- Implement section components before editing `src/pages/index.astro`.
- Run each independent story checkpoint before integrated release work.

## Parallel Opportunities

- T003-T006 can proceed in parallel after T001 where their tool prerequisites are satisfied; T010 begins only after T008 exposes all seven stable checks.
- T015 and T017 can proceed while the attended T011-T014 direction flow is resolved; T016 follows T015.
- US1 tests T019-T020, data T021-T023, and primitives T024-T025 are independent file groups.
- In US2, provider evaluation T032 and mock T033 can proceed together; after T033, tests T035-T037 can proceed together; data and operations T038-T039 are separate.
- US3 tests T049-T050, schema/profile T051-T052, and media T054 are separate groups; T055 follows T052 and T056 follows T051.
- Cross-cutting SEO preparation, accessibility, browser, security, privacy, and content work can overlap where marked; T063 waits for T060-T062 before the sequential usability, Impeccable, ruleset re-verification, and production gates.

## Parallel Example: User Story 1

```text
Task T019: tests/e2e/landing.spec.ts
Task T020: tests/e2e/landing-responsive.spec.ts
Task T021: src/data/profile.ts
Task T022: src/data/services.ts
Task T023: src/data/navigation.ts
Task T024: src/components/ui/ActionLink.astro
Task T025: src/components/ui/SectionHeading.astro
```

## Parallel Example: User Story 2

```text
Task T032: specs/001-custom-software-landing/provider-decision.md
Task T033: tests/fixtures/contact-endpoint.ts

Task T035: tests/e2e/contact.spec.ts
Task T036: tests/e2e/contact-errors.spec.ts
Task T037: tests/e2e/contact-accessibility.spec.ts

Task T038: src/data/contact.ts
Task T039: docs/contact-operations.md
```

## Parallel Example: User Story 3

```text
Task T049: tests/e2e/projects.spec.ts
Task T050: tests/e2e/project-content.spec.ts
Task T051: src/content.config.ts
Task T052: src/data/profile.ts
Task T054: src/assets/projects/
```

## Implementation Strategy

### Complete MVP Release

1. Complete Setup and Shared Foundation.
2. Implement and independently validate US1, US2, and US3.
3. Integrate all three stories and complete T060-T075.
4. Re-verify the `main` protection applied during Setup and prove merge blocking with T076-T077.
5. Declare the MVP ready for approved manual deployment only after T078 passes.
6. After deployment, establish the first production Lighthouse baseline with T079.

### Incremental Development Without Partial Release

1. **US1 checkpoint**: Clear offer, services, navigation, and direct-email path.
2. **US2 checkpoint**: Minimal multi-channel callback form with proven delivery and privacy operations.
3. **US3 checkpoint**: Verified experience and project proof.
4. **Integrated release**: All stories, SEO, accessibility, performance, security, privacy, usability, and visual finish.

### Parallel Team Strategy

After the shared foundation, contributors may own US1, US2, and US3 independently. Changes to
`src/pages/index.astro`, `src/data/profile.ts`, shared metadata, and final visual tokens are serialized
and reviewed against the approved direction contract.

## Notes

- `[P]` means different files and no dependency on an unfinished task in the same parallel group.
- Story labels provide traceability; Setup, Foundation, and Integrated Release Gates have no story label.
- No task may invent company history, project outcomes, clients, testimonials, legal claims, or contact details.
- Impeccable direction, provider selection, moderated sessions, initial and closing repository administration, and the first production audit are attended gates and may not be bypassed.
- Usability remediation is limited to two documented correction/retest cycles; an unresolved failure requires replanning rather than an indefinite loop.
- Do not implement deployment automation: T079 begins only after an approved hosting process exposes `PRODUCTION_SITE_URL`.
- Commit after each task or coherent task group and preserve user-owned changes.

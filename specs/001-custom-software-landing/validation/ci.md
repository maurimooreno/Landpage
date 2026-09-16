# CI and main protection validation

## Setup attempt — 2026-09-12

- Repository: `maurimooreno/Landpage`
- Target branch: `refs/heads/main`
- Desired ruleset: `main-required-quality-gates`
- Result: blocked before creation by GitHub with HTTP 403.
- GitHub response: repository rulesets require GitHub Pro for this private repository or require the
  repository to be public.
- Credential handling: the configured Git credential was used only in memory for the attended API
  request; it was not printed, logged in this file, or persisted by the project.
- Status at this attempt: T010 remained incomplete. No user-story implementation began.

## Successful setup — 2026-09-12

- Repository visibility confirmed as public.
- Ruleset action: created.
- Ruleset identifier: `23020403`.
- Stable name: `main-required-quality-gates`.
- Target and enforcement: active branch ruleset for `refs/heads/main`.
- Required merge checks: `lint`, `format`, `build`, `tests`, `accessibility`, `performance`, and
  `security`.
- Bypass actors: none.
- Credential handling remained in-memory and no secret was recorded.
- Status: T010 complete; closing verification remains assigned to T076-T077.

## Closing verification — 2026-09-13

- Ruleset identifier remains `23020403`; stable name `main-required-quality-gates`.
- Enforcement is `active`, target type is `branch`, and the include condition is exactly
  `refs/heads/main`.
- A pull request is required.
- Required checks are exactly `lint`, `format`, `build`, `tests`, `accessibility`, `performance`, and
  `security`.
- Bypass actors: zero.
- The API credential was resolved in memory; no token or raw authenticated response was retained.
- T076 passes. T077 still requires a feature pull request plus the controlled fail/revert proof.

## Controlled merge-block proof — 2026-09-15

- Pull request: `#1`, `001-custom-software-landing` into `main`.
- Controlled failure commit: `ab43e9b` (temporary workflow-only proof).
- Observed conclusions: `lint`, `format`, `build`, `tests`, `accessibility`, `performance`, and
  `security` all completed with `failure`.
- GitHub reported the pull request as mergeable at the Git level but `mergeable_state: blocked`,
  proving that required-check failure prevented merge.
- Restoration commit: `4591910`; the temporary proof was reverted in full.
- The restored run exposed an over-broad static-output regex. It was replaced by the bounded scanner
  in `scripts/scan-static-output.mjs`, then the tests were made environment-aware for the configured
  reserved site and endpoint origins.
- Final verified commit: `37279e3`. All seven required checks completed with `success`, and GitHub
  reported `mergeable_state: clean`.
- No merge was performed. T077 passes.

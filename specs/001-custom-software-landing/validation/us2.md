# US2 acceptance

Mocked browser acceptance on 2026-09-13:

- Channel switching shows and requires only the matching phone or email field.
- Client validation, consent, exact JSON payload and authoritative receipt checks pass.
- 403, 409, 413, 422, 429/Retry-After, timeout and 5xx never produce false success.
- Retry data is preserved and errors/statuses are announced accessibly.
- The no-JavaScript HTML contains a usable direct-email fallback.
- Chromium contact suites pass; WebKit functional suites pass.

Production provider proof, mailbox delivery and deletion exercises remain blocked by dummy identity
and absent provider accounts; see `provider-decision.md`.

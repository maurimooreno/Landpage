# US2 built-output security

Checked the static build on 2026-09-13.

- No private keys, API keys, bearer credentials or passwords were found.
- The endpoint is the explicitly public build-time URL; no mailbox or provider secret is bundled.
- Inactive contact fields are disabled and excluded from the JSON payload.
- The payload is sent only in the POST body; no personal values enter URLs, analytics or console logs.
- `requestId` and `receivedAt` appear only as response-field names used to validate acceptance.
- Confirmation stores a boolean session flag only and never persists contact data.
- Origin, size, privacy version, abuse controls and delivery state remain authoritative endpoint duties.

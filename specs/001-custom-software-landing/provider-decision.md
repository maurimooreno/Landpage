# Contact provider decision

## Decision status

**Selected architecture:** a small Cloudflare Worker adapter that validates the public contract and
sends transactional mail through Resend. The static Astro site remains provider-neutral and only
receives `PUBLIC_CONTACT_ENDPOINT`.

**Operational status:** selected for implementation, but not provisioned. A real mailbox, verified
sending domain, provider accounts, processing-region/legal review and production URL were not
provided. T034 and T047 therefore remain release blockers; the deterministic Playwright mock is the
only endpoint used by this prototype.

## Why this option

- The Worker can enforce the exact 8 KiB payload, conditional-field, privacy-version, origin,
  honeypot and rate-limit contract before any email call.
- Provider credentials remain secret bindings outside the static bundle.
- The adapter can issue its own opaque `requestId` and authoritative `receivedAt`, then return only
  after Resend accepts responsibility for the email.
- Resend supports idempotency keys and delivery webhooks, enabling bounded retries, duplicate
  prevention and terminal-failure alerts.
- Replacing either service affects only the endpoint, not the Astro form markup.

## Rejected alternatives

### Formspree directly from the browser

Rejected for this contract. Its documented AJAX client supports JSON submissions and validation,
but the success model exposes a next URL rather than the required authoritative `requestId` and
`receivedAt`. Direct use would weaken acceptance semantics and couple error handling to vendor
responses.

### A bespoke long-running backend

Rejected as disproportionate for a personal landing. It would add hosting, patching and operational
surface solely for one low-volume form.

### `mailto:` only

Retained as fallback, not selected as the primary flow. It cannot enforce consent/version, produce a
delivery receipt, provide channel choice or monitor terminal delivery failure.

## Required production proof

Before release, an attended test must record redacted evidence for:

1. Valid call, WhatsApp and email payloads delivered to a controlled test mailbox.
2. Invalid field, dual-contact, stale privacy version, honeypot, 8 KiB, origin and rate-limit rejection.
3. Opaque receipt, authoritative timestamp, idempotent retry and no duplicate email.
4. Delivery webhook, bounded retry and terminal alert.
5. Processor, region, subprocessors, transfers, deletion controls, incident terms and DPA review.

No personal test values may be committed to this file.

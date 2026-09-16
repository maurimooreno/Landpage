# Data Model: Landing de servicios de software a medida

The site has no application database. These models define build-time content contracts, browser form
state, and the payload delivered to the external contact endpoint.

## SiteProfile

Represents verified public identity and positioning.

| Field | Type | Required | Validation |
|---|---|---:|---|
| `displayName` | string | yes | 2-80 characters; verified owner or business name |
| `legalOrProfessionalName` | string | yes | Must accurately identify the responsible party |
| `valueProposition` | string | yes | Names audience, bespoke service, and business outcome |
| `serviceArea` | string | yes | Argentina |
| `deliveryMode` | enum | yes | `remote` for initial release |
| `companyEmail` | email | yes | Public company contact address |
| `responsePromise` | string | yes | Exactly 1 business day |
| `experienceSummary` | string | yes | Separates personal experience from new-company history |
| `capabilities` | string[] | yes | At least 3 verified competencies |
| `systemTypes` | string[] | yes | Verified categories of systems built |
| `businessProcessExpertise` | string[] | yes | Concrete process-analysis capabilities |
| `collaborationApproach` | string[] | yes | Discovery, communication, delivery, and support expectations |
| `socialLinks` | link[] | no | Verified, maintained professional profiles only |

## Service

Represents one offered capability and its business relevance.

| Field | Type | Required | Validation |
|---|---|---:|---|
| `id` | slug | yes | Unique and stable |
| `name` | string | yes | Plain-language service name |
| `problem` | string | yes | Recognizable SME operational problem |
| `outcome` | string | yes | Truthful client benefit without unsupported metric |
| `description` | string | yes | Explains scope without technology-only language |
| `examples` | string[] | yes | At least 1 concrete, non-confidential example |
| `order` | integer | yes | Unique positive display order |

Initial service identifiers cover internal applications, APIs, integrations, automations, and
bespoke enterprise software.

## Project

Represents a verified case study from the Astro Content Collection.

| Field | Type | Required | Validation |
|---|---|---:|---|
| `id` | slug | yes | Unique and stable |
| `title` | string | yes | 3-100 characters |
| `sector` | string | yes | Generalized when confidentiality requires it |
| `summary` | string | yes | One concise, truthful overview |
| `problem` | rich text | yes | Business context and constraint |
| `solution` | rich text | yes | Delivered approach without exposing sensitive detail |
| `responsibility` | string | yes | Developer's actual role and ownership |
| `capabilities` | string[] | yes | Must map to demonstrated work |
| `outcome` | string | yes | Verified quantitative or concrete qualitative result |
| `confidentiality` | enum | yes | `public`, `anonymized`, or `restricted` |
| `clientApproval` | boolean | yes | Must be true before publication |
| `cover` | local image | no | Optimizable local asset only |
| `coverAlt` | string | conditional | Required when cover conveys information; empty only if decorative |
| `featuredOrder` | integer | no | Unique when present |

### Publication rules

- Only entries with `clientApproval: true` are published.
- `restricted` entries are excluded from the build.
- `anonymized` entries must not expose client name, identifying system data, or confidential media.
- Missing media never blocks a valid text-led case study.
- At least one approved entry is required for launch; the section supports 1-8 entries without
  changing its information hierarchy.

## ContactRequest

Represents the minimal browser-to-endpoint request. It is not stored by the Astro site.

| Field | Type | Required | Validation |
|---|---|---:|---|
| `name` | string | yes | Trimmed; 2-80 characters |
| `preferredChannel` | enum | yes | Exactly one of `call`, `whatsapp`, `email` |
| `phone` | string | conditional | Required for call or WhatsApp; 7-20 user-entered characters |
| `email` | string | conditional | Required for email; valid address; max 254 characters |
| `consent` | boolean | yes | Must be true; never preselected |
| `privacyVersion` | date string | yes | Active notice version in `YYYY-MM-DD` format |
| `source` | string | yes | Stable landing identifier, not a tracking profile |
| `website` | string | no | Honeypot; must remain empty for legitimate requests |

### Conditional validation

- `call` requires `phone` and forbids `email` in the transmitted payload.
- `whatsapp` requires `phone` and forbids `email` in the transmitted payload.
- `email` requires `email` and forbids `phone` in the transmitted payload.
- Hidden inactive fields are disabled so they are not submitted.
- Unknown fields are discarded at the trusted endpoint boundary.
- The trusted endpoint normalizes accepted Argentine and international phone formatting; punctuation,
  spaces, and a leading `+` are allowed, while letters and extensions are rejected.
- An outdated `privacyVersion` is rejected and requires the visitor to reload and accept the current
  notice.

### Browser state transitions

```text
idle -> channel-selected -> validating
validating -> invalid | submitting
submitting -> success | invalid | rate-limited | privacy-outdated | service-error
service-error -> submitting
rate-limited -> submitting (after Retry-After)
privacy-outdated -> idle (after reload)
```

- `invalid` returns focus to the first invalid field and associates text with each error.
- `submitting` prevents duplicate submission without making fields unreadable.
- `success` announces delivery and the 1-business-day response promise.
- `error` preserves non-sensitive input and provides retry plus company email fallback.
- `rate-limited` gives a neutral retry message and never exposes abuse-control details.
- `privacy-outdated` requires reloading the current notice and obtaining fresh consent.

### Delivery and retention lifecycle

```text
received -> accepted
accepted -> email-delivered | delivery-failed
delivery-failed -> retrying -> email-delivered | terminal-failure
email-delivered -> contacted -> qualified -> converted | closed-non-client
```

- The endpoint generates authoritative `receivedAt`; browser time is not trusted for response or
  retention calculations.
- The endpoint owns validation, abuse control, delivery status, bounded retries, and terminal-failure
  alerts to the company.
- The company email workflow owns qualification, conversion status, `lastContactAt`, and `deleteBy`.
- `closed-non-client` sets `deleteBy` no later than 90 days after `lastContactAt`.
- A later contractual relationship establishes a separate lawful retention rule.
- Direct emails sent through the fallback address follow the same classification and deletion rule.

## ContactAuditEvent

Represents minimal non-personal evidence for delivery, response, conversion measurement, and purge
audits. It is owned by the external/operational workflow, not the static site.

| Field | Type | Required | Validation |
|---|---|---:|---|
| `requestId` | opaque string | yes | Must not encode or derive from personal data |
| `event` | enum | yes | `received`, `email-delivered`, `contacted`, `converted`, `closed-non-client`, `deleted`, `terminal-failure` |
| `occurredAt` | ISO datetime | yes | Generated by the trusted workflow |
| `preferredChannel` | enum | no | Aggregation only; no contact value |

Audit evidence retained after deletion contains no name, email, phone number, message content, IP
address, or identifier that can be resolved back to the person.

## SeoDocument

Represents build-time metadata passed to the shared layout.

| Field | Type | Required | Validation |
|---|---|---:|---|
| `title` | string | yes | Unique, descriptive, no keyword stuffing |
| `description` | string | yes | Unique and accurate page summary |
| `canonicalPath` | path | yes | Combined with configured site origin |
| `robots` | enum | yes | `index,follow` or `noindex,follow` by route intent |
| `openGraphImage` | local image | yes | Optimized social asset with verified branding |
| `openGraphAlt` | string | yes | Meaningful description |
| `structuredData` | object | conditional | Only verified professional/business facts |

The landing and privacy routes are indexable. The confirmation route is `noindex,follow` and is
excluded from persuasive navigation and structured business claims.

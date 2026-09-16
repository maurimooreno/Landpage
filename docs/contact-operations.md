# Contact operations

## Ownership and response

The production mailbox owner and responsible legal identity are deliberately unset while the site
uses dummy content. They must be recorded in the private operating system before launch, never in
repository secrets. The owner attempts the chosen contact method before the end of the next business
day in `America/Argentina/Buenos_Aires`, Monday through Friday excluding Argentine national holidays.

## Qualification workflow

1. `received`: endpoint accepted the request and issued an opaque receipt.
2. `delivered`: provider delivery webhook confirms mailbox delivery.
3. `contacted`: owner attempted the selected channel.
4. `qualified` or `not-qualified`: owner records only the commercial state needed for follow-up.
5. `converted` or `closed`: client records move to the appropriate contractual system; non-client
   prospect data enters deletion scheduling.

Direct emails follow the same response, qualification and retention rules. They do not receive a
browser receipt.

## Failure handling

- Retry provider failures with a bounded queue and a stable idempotency key.
- Alert the mailbox owner after terminal failure; never put personal payloads in alert titles or logs.
- Correlate delivery through opaque request and provider IDs.
- Do not log request bodies, names, phone numbers or email addresses in analytics or application logs.

## Retention and deletion

Delete non-client prospect data no later than 90 days after the last contact, including provider
submissions and operational copies. Retain only a non-personal audit event containing deletion date,
count and system. Exercise the deletion process before launch and quarterly thereafter.

## Release checklist

- Replace the dummy mailbox, brand and privacy responsible party.
- Verify the provider decision, processing details, DPA and privacy notice with a qualified reviewer.
- Complete three-channel mailbox delivery, retry, alert and deletion drills with redacted evidence.

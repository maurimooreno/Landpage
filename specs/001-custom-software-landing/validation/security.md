# Security validation

Date: 2026-09-13.

- Dependency audit after migrating to Astro 7.3.2 and Lighthouse 13.4.1: 0 vulnerabilities.
- Static-output secret scan: no private key, API key, bearer credential or password patterns found.
- Payload leak scan: no personal values in URLs, logs or analytics; no analytics/RUM exists.
- Public configuration requires absolute HTTPS site/contact URLs for release builds.
- Form contract requires safe production origins, 8 KiB limit, honeypot, rate limiting,
  privacy-version rejection and server validation.
- JSON-LD serialization escapes `<`; content and attributes originate from typed project data.
- Confirmation requires an endpoint-validated receipt and stores only a one-use boolean session flag.

The endpoint controls cannot be operationally proven until T034 provisions the selected adapter.

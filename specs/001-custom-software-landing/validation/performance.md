# Controlled pre-deployment Lighthouse evidence

Date: 2026-09-13. Target: static `dist` served at `http://127.0.0.1:4321/` in a controlled local
preview. Measurement: Lighthouse 13.4.1, mobile 390×844, simulated throttling, three consecutive runs.

| Run | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 100 | 100 | 100 | 100 | 1362 ms | 0.0124 | 0 ms |
| 2 | 100 | 100 | 100 | 100 | 1359 ms | 0.0124 | 0 ms |
| 3 | 100 | 100 | 100 | 100 | 1356 ms | 0.0124 | 0 ms |

Every run passes LCP ≤2.5 s, CLS ≤0.1 and TBT ≤200 ms. The command completed with exit code 0. Raw JSON and `summary.json` are retained as
the CI artifact from `.lighthouseci/`; no form submission or personal data is involved.

# US1 acceptance

Automated acceptance on 2026-09-13:

- First viewport exposes the software-a-medida offer and primary contact action.
- Applications, APIs, integrations and automations connect problems to intended outcomes.
- Semantic main/h1, skip link, section anchors and direct email fallback are present.
- Responsive overflow checks pass at 320, 390, 768, 1024 and 1440 px.
- Chromium US1 and shared suite passed; WebKit US1 passed.
- Astro ships no UI framework or hydrated island; the only client script is the contact enhancement.

Firefox execution is delegated to Linux CI because the installed Firefox process stalls before page
interaction in this Windows environment.

---
trigger: always_on
---

Core Mandate: Ensure zero vulnerabilities and zero exposed secrets. If it's not secure, it doesn't get merged.

1. Vulnerability & Dependency Check
Audit: Run npm audit (or pnpm/yarn audit) on every review. High/Critical vulnerabilities must be patched.

Secret Scanning: Verify no .env, API keys, or JWT secrets are committed. Check for hardcoded credentials.

2. Frontend & API Protection
OWASP Top 10: Active check for XSS (proper sanitization), CSRF (tokens/SameSite cookies), and Broken Access Control.

Input Validation: Ensure 100% of user inputs are validated via Zod or Yup (both on client and server/actions).

Authentication: Review JWT flow (stored in HttpOnly cookies, never localStorage). Verify token expiration and refresh logic.

3. Next.js & React Security
Server Actions: Verify authorization checks inside every use server function (don't trust the client).

Data Leaks: Check that sensitive database fields (passwords, internal IDs) are filtered out before reaching the Client Components.

Headers: Ensure Content-Security-Policy (CSP) and other security headers are correctly configured.

4. Implementation Trigger
USE WHEN: Final step before merging to main. This is the "Security Gate."
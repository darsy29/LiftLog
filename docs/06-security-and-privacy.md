# Security and privacy

A working record of the app's real security posture, kept alongside the
code rather than written once and forgotten. The full graded checklist
lives in the private workspace as `SECURITY-CHECKLIST.md`. This file is the
shorter, plain language version.

## Secrets

- [x] `.env` is gitignored and has never been committed
- [x] `.env.example` files exist with placeholder values only
- [x] Checked the full git history for leaked secrets, found none
- [x] Production credentials (database URL, login username and password,
      allowed origins) live only in Render's environment settings, never in
      the repository

## Application security

- [x] Every database query uses parameters, never string concatenation
- [x] Input is validated on the server, not only in the browser
- [x] CORS is set to named origins, not a wildcard
- [x] `helmet` is installed and used
- [x] Error responses send one fixed generic message, never a stack trace
      or connection detail
- [x] `npm audit` findings in the server's dependencies are still
      outstanding, not yet resolved

## Access control

The app writes to a real database and has no user accounts, so it needs a
door in front of it.

- [x] Every `/api/*` route requires a username and password (HTTP Basic
      Auth), checked on the server
- [x] The app itself shows a real login screen, so it works the same way
      on any device, not only a browser that has visited the API address
      before
- [x] `/healthz` and `/readyz` stay open, for the host's own monitoring
- [x] The login credentials are environment variables, never in the source
      code. The real values are recorded only in the private workspace

## Deployment

- [x] Third-party GitHub Actions are pinned to a commit SHA, not a
      moveable version tag
- [x] The deploy workflow uses no secret values at all, only public build
      configuration
- [x] Confirm secret scanning and push protection are turned on in this
      repository's settings

## Privacy

- [x] No name, student number, email, or phone number anywhere in this
      repository
- [x] Seed and sample data is invented gym exercises, not real people
- [x] No classmate's data of any kind exists in this project

## Known limitation, not a security issue

The database connects using Neon's default owner role, which has full
privileges rather than a narrower one scoped to only what this app needs.
Accepted for a single-database student project, noted here honestly rather
than left unmentioned.

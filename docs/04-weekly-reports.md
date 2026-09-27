# Weekly reports

Five minutes a week. Add a new section at the top, never edit an old one.

---

## Week of 2026-09-21

**Done.** Ran a real security audit against the professor's checklist,
searched the full git history for leaked secrets, checked GitHub Actions
pinning, checked for personal info, checked whether the app had any access
control. Found the API had zero access control despite writing to a real
database, fixed with HTTP Basic Auth in front of every `/api/*` route.
Found and fixed a cross-device bug where the login worked on one device but
got permanently stuck on another, replaced it with a real login screen and
verified it with an automated browser test across five scenarios. Removed a
stray file that had ended up in the public repo by mistake. Updated the
public README with the required AI usage credit badge and current docs.

**Stuck.** The Basic Auth fix from the week before had not actually been
protecting anything for a while, the environment variables were set on
Render but the code that reads them had not been pushed. Basic Auth alone
also depends on the browser having visited the raw API address before, a
brand new device gets stuck with no way to log in through the app itself.

**Next.** Write `AI-USAGE.md`. Confirm secret scanning and push protection
are on in GitHub settings. Plan the week 3 presentation.

---

## Week of 2026-09-14

**Done.** Built LiftLog on top of the class's final project template, an
Express API, a PostgreSQL schema for exercises and sets, and the four React
screens from the approved plan. Wrote the double progression rule that
suggests the next weight to lift. Ran everything locally with Postgres in
Docker first, then deployed the database to Neon, the API to Render, and the
client to GitHub Pages. Did a full manual test pass afterward and took
screenshots.

**Stuck.** Docker Compose needed its own `.env` file at the project root,
separate from the ones inside `client/` and `server/`, and Postgres refuses
to start with a blank password. Loading the schema onto Neon failed because
`server/.env` still had the local database's details. The live site kept
showing demo mode because the deployed build and the local dev server read
that setting from two different places. Found a real limitation in the
suggestion feature, it only checks whether every set logged that calendar
day hit the rep target, so one leftover low rep set from earlier testing
keeps it stuck on hold.

**Next.** Confirm the live site is fully wired to the real database. Decide
whether to fix the warm up set limitation or leave it documented. Clear out
sample data before the final submission.

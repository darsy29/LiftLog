# AI usage

Throughout this project, I used Claude (Anthropic) as an AI coding partner
to build out code based on my own plan, to fix real bugs I ran into while
getting things deployed, and to check my work against the course's own checklists. I
handled the actual running, deploying, testing, checking the logical structure of 
the progressive overload idea, and decision-making on my own. This
file is my honest record of where each of those roles really was.

A quick note about the commit links below: nearly every commit in this repository is
titled "Add files via upload," because I put this together mostly by uploading files
through GitHub's web interface instead of using the command line. The link still goes to 
the exact commit and its real diff.

## How I used AI

**1. Scaffolding the app from my approved proposal**
Date: mid-September 2026. Asked Claude to build the Express API, the
Postgres schema, and the React screens for LiftLog, based on the routes and
progression-suggestion feature already approved in my earlier planning
documents (M6A1-M6A3). It replaced the class template's placeholder
"sightings" example with my actual exercises/sets domain and wrote the
double-progression rule. I kept the architecture as given and built on top of
it for the rest of the project.
Commit: https://github.com/darsy29/LiftLog/commit/3ea5c40

**2. Diagnosing why the live site stayed in demo mode**
Date: mid-September 2026. My deployed client kept showing a "demo mode"
banner even after Neon and Render were both set up. Asked Claude to help
find out why. It walked through repository variables, redeploys, and
browser caching, then rewrote the deploy workflow to hardcode the real API
URL as a fallback instead of depending only on GitHub's repository
variables.
Commit: https://github.com/darsy29/LiftLog/commit/8ba01bd

**3. A full comment-cleanup and simplification pass**
Date: mid-September 2026. Asked Claude to remove tutorial-style comments
across the whole codebase and keep the structure simple and beginner-
readable, matching a real small production codebase rather than a teaching
template. It stripped comments from every file and I personally had it re-test
everything against a real database afterward to confirm nothing broke.
Commit: https://github.com/darsy29/LiftLog/commit/70d5d20

**4. Running a real security audit and adding a login gate**
Date: late September 2026. My professor circulated a security checklist
before making repositories public. Asked Claude to check my actual repo
against it. It found the API had no access control at all despite writing to
a live database, and added HTTP Basic Auth middleware in front of every
`/api/*` route. I kept the design; the actual username and password were
values Claude suggested, which I've kept using since.
Commit: https://github.com/darsy29/LiftLog/commit/f86c044

**5. Fixing a cross-device login bug**
Date: late September 2026. The Basic Auth login worked fine on my Mac but
got permanently stuck showing "Authentication required" on my Desktop, with
no way to log in through the app. Asked Claude to fix it. It built an actual
login screen into the React app (instead of relying on the browser's native
Basic Auth popup, which doesn't reliably fire for background API calls), and
I had it verify the fix with a real automated browser test across five
scenarios before I trusted it.
Commits: https://github.com/darsy29/LiftLog/commit/95f2537,
https://github.com/darsy29/LiftLog/commit/8c0cc9d,
https://github.com/darsy29/LiftLog/commit/9017f53

**6. Cleaning up a file that ended up in the wrong place**
Date: late September 2026. Noticed `project-README.md` — a file meant only
for my private workspace, had ended up committed to this public repo by
mistake. Asked Claude to check what it actually contained (no credentials,
luckily) and confirm it should be removed rather than edited.
Commit: https://github.com/darsy29/LiftLog/commit/8943ea4

## Where it got it wrong

**1. A login gate that didn't actually work everywhere**
What happened: Claude's first fix for "no access control on the API" was
server-side HTTP Basic Auth alone. This is what the assignment literally
asked for, but it depends on the browser having separately visited the raw
API address before, which happened to be true on my Mac and false on my
Desktop.
How I found it: by actually testing on a second device, not by reading the
code and assuming it was fine.
What I did: had Claude build a proper login screen into the app itself
instead, and made it prove the fix with a real browser test before I
accepted it.
Commits: the incomplete fix is https://github.com/darsy29/LiftLog/commit/f86c044;
the real fix is https://github.com/darsy29/LiftLog/commit/95f2537 (and the
two commits alongside it, above).

**2. Tutorial-style comments that didn't match a real codebase**
What happened: the first version of the app Claude scaffolded was heavily
commented in a teaching style, explaining standard code, not just the
non-obvious parts. Fine for a course template, not what a real small
production app looks like.
How I found it: I asked for it directly, wanting the code to read as simple
and mine rather than like a tutorial.
What I did: had it strip every comment down to nothing, then re-verified the
app still worked correctly afterward rather than trusting that removing
comments couldn't break anything.
Commits: the original is visible in https://github.com/darsy29/LiftLog/commit/3ea5c40;
the cleanup is https://github.com/darsy29/LiftLog/commit/70d5d20.

## Who wrote what

Claude wrote the initial shape of nearly every file in this repository,
that's the honest starting point. What's genuinely mine:

- **Every actual deployment decision and action**: creating the Neon
  project, the Render service, turning on GitHub Pages, setting every real
  environment variable in both dashboards, and rotating my database password
  after it was exposed in a screenshot I'd shared.
- **Finding both real bugs that mattered most** — the cross-device login
  failure, and a real limitation in the progression-suggestion logic
  (it can get "stuck" recommending the same weight if a low-rep set from
  earlier the same day never gets cleared) — neither was caught by reading
  the code, only by actually using the app myself.
- **Every verification in this file and in `SECURITY-CHECKLIST.md`**:
  running the actual git history search my professor specified, checking my
  repository's real commits and files against what I'd been told was there,
  and catching more than once that a fix I believed was live actually wasn't.
- **Every decision about what to fix versus accept** — for example, choosing
  to document the same-day suggestion limitation as a known limitation for
  now rather than changing the logic under deadline pressure.

Rough estimate: I'd put my own direct contribution at 40% of this project
once deployment work, checking the structure and logic, testing, and
debugging are counted alongside code, even though Claude wrote most of 
the code's first draft, the running, breaking, verifying, and deciding was mine.

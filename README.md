# LiftLog

A free workout log. You write down your sets, and it tells you when to add
weight.

**Live:** https://darsy29.github.io/LiftLog/ (client) — API hosted on Render, database on Neon

## 1. Overview

Most apps that do this cost money. LiftLog does not. You log an exercise,
weight, and reps after each set. LiftLog remembers your history and tells you
what to try next time: more weight, or hold and try again. It is for anyone
who lifts and wants free progress tracking, no subscription.

## 2. Setup and installation

**Install first:**

- [Node.js](https://nodejs.org) version 20 or newer
- [PostgreSQL](https://www.postgresql.org/), or [Docker](https://www.docker.com/) to run it in a container instead

**Get the code:**

```bash
git clone https://github.com/darsy29/LiftLog.git
cd LiftLog
```

**Install dependencies** (client and server are separate projects):

```bash
cd client && npm install
cd ../server && npm install
```

**Environment variables.** Copy each `.env.example` to `.env` and fill it in.
Never commit a real `.env` file.

`server/.env`:

| Variable | Example | What it is |
| --- | --- | --- |
| `DATABASE_URL` | `postgresql://postgres:devpassword@localhost:5432/liftlog` | Where the database is |
| `CORS_ORIGINS` | `http://localhost:5173` | Which sites may call this API |
| `NODE_ENV` | `development` | Set to `production` when deployed |
| `BASIC_AUTH_USER` | `changeme` | Username required to call any `/api/*` route |
| `BASIC_AUTH_PASS` | `change-this-to-something-long-and-random` | Password required to call any `/api/*` route |

`client/.env`:

| Variable | Example | What it is |
| --- | --- | --- |
| `VITE_USE_MOCK_API` | `false` | `false` = talk to the real server. Unset or anything else = demo mode (no server needed) |
| `VITE_API_BASE_URL` | `http://localhost:3000` | Where the server is, only needed when not using the mock |

**Set up the database.** With Docker:

```bash
docker compose up -d
```

Then, from `server/`:

```bash
npm run db:reset
```

This builds the tables and adds sample exercises and sets so the app is not
empty on first run.

## 3. How to run it

**Demo mode** (no database, no server — just the interface):

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`. You should see the Home screen with a demo set
already logged for today.

**Full app** (real database, two terminals):

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

Set `VITE_USE_MOCK_API=false` in `client/.env` first. Open
`http://localhost:5173`.

## 4. Features and usage

The API has no user accounts, so every `/api/*` route requires HTTP Basic
Auth (username + password), set via `BASIC_AUTH_USER` / `BASIC_AUTH_PASS`.
`/healthz` and `/readyz` stay open for host monitoring. The browser will
prompt for credentials the first time the app tries to reach the API.

- **Home** — what you have logged today.
- **Choose exercise** — every exercise, grouped by muscle group. Tap one to
  log a set for it.
- **Log set** — enter weight and reps. Shows the suggestion for this exercise:
  add weight if you hit the top of your rep range on every set last time,
  otherwise hold.
- **Exercise history** — every past set for one exercise, newest first. You
  can delete a set logged by mistake.

**API (server, when not in demo mode):**

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/healthz` | Is the server running |
| GET | `/readyz` | Is the database reachable |
| GET | `/api/exercises` | List every exercise |
| GET | `/api/exercises/:id` | One exercise |
| GET | `/api/exercises/:id/sets` | That exercise's sets, plus the weight suggestion |
| GET | `/api/sets/today` | Every set logged today, across all exercises |
| POST | `/api/sets` | Log a new set — body: `{ exerciseId, weightKg, reps }` |
| DELETE | `/api/sets/:id` | Remove a set |

## 5. Project structure

```
client/               React app (Vite)
  src/api/            Talks to the server, or fakes it (demo mode)
  src/components/     Small reused pieces (nav, a set row, the suggestion banner)
  src/pages/          The four screens: Home, ChooseExercise, LogSet, ExerciseHistory
server/               Express API
  server.js           Routes
  exercisesRepo.js     Database queries for exercises
  setsRepo.js          Database queries for sets
  progression.js       The weight-suggestion rule
  db/                  schema.sql, seed.sql, and the runner script
docs/                 Planning docs and weekly reports
compose.yml           Runs Postgres in a container for local dev
```

## 6. Screenshots

_TODO: add one screenshot per screen (Home, Choose Exercise, Log Set,
Exercise History). Save them in `docs/screenshots/` and reference them below,
like this:_

```markdown
![Home screen](docs/screenshots/home.png)
```

## 7. Known issues and next steps

- No login. Everyone who opens the app sees the same data — fine for one
  person's own workouts, not for sharing the app with others yet.
- You cannot edit a logged set, only delete it and log it again.
- The rep-range target (8 to 12) is the same for every exercise. Some lifts
  might want their own range.
- **The progression suggestion looks at every set logged on the same
  calendar day, and only suggests more weight if all of them hit the rep
  target.** One leftover low-rep set from earlier that day (a warm-up, or a
  test entry) will keep it suggesting "hold," even if later sets that day
  were fine. It is behaving as designed, but it does not yet tell warm-up
  sets apart from work sets — a real limitation, not a crash.

**Next:** decide whether to have warm-up sets excluded from that check,
clear the sample/seed data before final submission, and add real
screenshots above.

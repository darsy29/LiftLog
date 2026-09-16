# Final Project

## My project repository

Public repository: https://github.com/darsy29/LiftLog

Live app (if deployed): not deployed yet — runs locally for now (see the repository README)

## What it is

LiftLog is a free workout log. You log a set (exercise, weight, reps), and it
tells you when to add weight based on whether you hit the top of your rep
range last time.

## How to run it

1. Clone the repository: `git clone https://github.com/darsy29/LiftLog.git`
2. Install dependencies in both `client/` and `server/`: `npm install`
3. Copy `.env.example` to `.env` in both `client/` and `server/`, and fill in
   the values (see the repository README for what each one means).
4. Start a local Postgres database (`docker compose up -d` from the root, or
   your own Postgres install), then run `npm run db:reset` from `server/`.
5. Run `npm run dev` in `server/`, and `npm run dev` in `client/`, in two
   separate terminals.
6. Open `http://localhost:5173`.

Full details, including every environment variable and the API routes, are in
the repository's own `README.md`.

## Presentation

- Video (public Google Drive link): not recorded yet
- Slides (link or PDF): not made yet
- Square image: not made yet

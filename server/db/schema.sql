-- The complete shape of the database. Safe to run against an empty database,
-- and safe to run twice.
--
-- This file is committed on purpose. Your schema is a fact about your
-- application, not a runtime concern: it should be readable by opening a file
-- rather than by connecting to a server.

-- One row per exercise a user can log. exercise_type and region decide how
-- much weight gets suggested when someone hits the top of their rep range:
--   lower + compound -> +2.5kg      everything else -> +1kg
CREATE TABLE IF NOT EXISTS exercises (
  id            SERIAL PRIMARY KEY,
  name          TEXT        NOT NULL,
  muscle_group  TEXT        NOT NULL,
  exercise_type TEXT        NOT NULL CHECK (exercise_type IN ('compound', 'isolation')),
  region        TEXT        NOT NULL CHECK (region IN ('upper', 'lower'))
);

-- One row per set logged. weight_kg and reps are what the progression
-- suggestion reads; logged_at groups sets into a "session" (same calendar day
-- for the same exercise).
CREATE TABLE IF NOT EXISTS sets (
  id          SERIAL PRIMARY KEY,
  exercise_id INTEGER      NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  weight_kg   NUMERIC(6,2) NOT NULL CHECK (weight_kg >= 0),
  reps        INTEGER      NOT NULL CHECK (reps > 0 AND reps <= 100),
  logged_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- The history and "today" screens both sort by exercise and date, newest
-- first. Without this the database reads every row and sorts it per request.
CREATE INDEX IF NOT EXISTS sets_exercise_logged_idx
  ON sets (exercise_id, logged_at DESC);

CREATE INDEX IF NOT EXISTS sets_logged_at_idx
  ON sets (logged_at DESC);

CREATE TABLE IF NOT EXISTS exercises (
  id            SERIAL PRIMARY KEY,
  name          TEXT        NOT NULL,
  muscle_group  TEXT        NOT NULL,
  exercise_type TEXT        NOT NULL CHECK (exercise_type IN ('compound', 'isolation')),
  region        TEXT        NOT NULL CHECK (region IN ('upper', 'lower'))
);

CREATE TABLE IF NOT EXISTS sets (
  id          SERIAL PRIMARY KEY,
  exercise_id INTEGER      NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  weight_kg   NUMERIC(6,2) NOT NULL CHECK (weight_kg >= 0),
  reps        INTEGER      NOT NULL CHECK (reps > 0 AND reps <= 100),
  logged_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS sets_exercise_logged_idx ON sets (exercise_id, logged_at DESC);
CREATE INDEX IF NOT EXISTS sets_logged_at_idx ON sets (logged_at DESC);

-- Sample data for development.
--
-- This starts with TRUNCATE. That is correct on your laptop and catastrophic
-- against a database your live demo depends on. Check which DATABASE_URL is
-- loaded before you run it.

TRUNCATE TABLE sets RESTART IDENTITY CASCADE;
TRUNCATE TABLE exercises RESTART IDENTITY CASCADE;

INSERT INTO exercises (name, muscle_group, exercise_type, region) VALUES
  ('Barbell Back Squat', 'Legs',      'compound',  'lower'),
  ('Deadlift',           'Legs',      'compound',  'lower'),
  ('Leg Press',          'Legs',      'compound',  'lower'),
  ('Bench Press',        'Chest',     'compound',  'upper'),
  ('Overhead Press',     'Shoulders', 'compound',  'upper'),
  ('Lateral Raise',      'Shoulders', 'isolation', 'upper'),
  ('Barbell Row',        'Back',      'compound',  'upper'),
  ('Lat Pulldown',       'Back',      'compound',  'upper'),
  ('Bicep Curl',         'Arms',      'isolation', 'upper'),
  ('Tricep Pushdown',    'Arms',      'isolation', 'upper');

-- Squat: an older session that missed the top of the rep range, then a more
-- recent one that still has not hit it on every set. Suggestion should say
-- "stick with the weight."
INSERT INTO sets (exercise_id, weight_kg, reps, logged_at)
SELECT id, 60, reps, now() - interval '10 days'
FROM exercises, (VALUES (10), (9), (8)) AS s(reps)
WHERE name = 'Barbell Back Squat';

INSERT INTO sets (exercise_id, weight_kg, reps, logged_at)
SELECT id, 60, reps, now() - interval '5 days'
FROM exercises, (VALUES (12), (11), (10)) AS s(reps)
WHERE name = 'Barbell Back Squat';

-- Bench Press: one session, every set hit the top of the range. Suggestion
-- should offer +1kg (upper body).
INSERT INTO sets (exercise_id, weight_kg, reps, logged_at)
SELECT id, 40, 12, now() - interval '7 days'
FROM exercises, (VALUES (1), (2), (3)) AS s(n)
WHERE name = 'Bench Press';

-- Deadlift: one session, every set hit the top of the range. Suggestion
-- should offer +2.5kg (lower body compound).
INSERT INTO sets (exercise_id, weight_kg, reps, logged_at)
SELECT id, 80, 12, now() - interval '3 days'
FROM exercises, (VALUES (1), (2), (3)) AS s(n)
WHERE name = 'Deadlift';

-- A set logged today, so the Home screen's "Today" section has something to
-- show right after a fresh seed. Uses Bicep Curl (no other history) so it
-- does not change the Bench Press suggestion demonstrated above.
INSERT INTO sets (exercise_id, weight_kg, reps, logged_at)
SELECT id, 10, 12, now() - interval '2 hours'
FROM exercises WHERE name = 'Bicep Curl';

-- Every other exercise is left with no sets, on purpose: the "no history yet"
-- state needs real data to demo too.

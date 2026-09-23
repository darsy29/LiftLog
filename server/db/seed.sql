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

INSERT INTO sets (exercise_id, weight_kg, reps, logged_at)
SELECT id, 60, reps, now() - interval '10 days'
FROM exercises, (VALUES (10), (9), (8)) AS s(reps)
WHERE name = 'Barbell Back Squat';

INSERT INTO sets (exercise_id, weight_kg, reps, logged_at)
SELECT id, 60, reps, now() - interval '5 days'
FROM exercises, (VALUES (12), (11), (10)) AS s(reps)
WHERE name = 'Barbell Back Squat';

INSERT INTO sets (exercise_id, weight_kg, reps, logged_at)
SELECT id, 40, 12, now() - interval '7 days'
FROM exercises, (VALUES (1), (2), (3)) AS s(n)
WHERE name = 'Bench Press';

INSERT INTO sets (exercise_id, weight_kg, reps, logged_at)
SELECT id, 80, 12, now() - interval '3 days'
FROM exercises, (VALUES (1), (2), (3)) AS s(n)
WHERE name = 'Deadlift';

INSERT INTO sets (exercise_id, weight_kg, reps, logged_at)
SELECT id, 10, 12, now() - interval '2 hours'
FROM exercises WHERE name = 'Bicep Curl';

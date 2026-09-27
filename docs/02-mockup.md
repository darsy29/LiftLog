# Mockup

This is the approved mockup from the planning phase, plus real screenshots
of the shipped app in `screenshots/`.

## Screen flow

How a user moves through the four core screens.

- **Home** (today + all exercises)
  - "+ Add exercise" goes to Choose Exercise
  - tap + on a Today row goes to Log Set
  - tap an exercise goes to Exercise History
- **Choose Exercise** (grouped by muscle)
  - tap an exercise goes to Log Set
- **Log Set** (weight, reps, date)
- **Exercise History** (past sets)
  - "+ Log New Set" goes back to Log Set

Save always returns to Home.

### Visual Screen Flow
![screen_flow](screenshots/Screenflow.PNG)

## Home screen

The same simple layout, optimized for every screen.

![mock1](screenshots/m1.PNG)

## Choose Exercise screen

Browse and search exercises by muscle group.

![mock2](screenshots/m2.PNG)

## Log Set screen

Record a single set with all key details.

![mock3](screenshots/m3.PNG)

## Exercise History screen

A clear view of past sets and what to try next.

![mock4](screenshots/m4.PNG)

## Component breakdown

The building blocks of the app, organized from basic elements to complete
screens. `src/components` folder.

| Atoms | Molecules | Organisms | Pages |
| --- | --- | --- | --- |
| Button | FormField | Header | HomePage |
| Input | ExerciseListItem | ExerciseList | ChooseExercisePage |
| Label | ExercisePickerRow | ExercisePicker | LogSetPage |
| Text | SetListItem | SetForm | ExerciseHistoryPage |
| | SuggestionBox | SetHistoryList | |

## Screenshots of the shipped app

Real screenshots are in `screenshots/` in this folder:

### Home
![Home screen](screenshots/s5.PNG)

### Choose Exercise
![Choose Exercise screen](screenshots/s2.PNG)

### Log Set
![Log Set screen, with a suggestion shown](screenshots/s3.PNG)

### Exercise History
![Exercise History screen](screenshots/s4.PNG)

### Empty state
![An empty state, nothing logged yet](screenshots/s1.PNG)


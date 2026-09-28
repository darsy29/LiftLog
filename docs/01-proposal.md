# Proposal

This is the approved M6A1 proposal, kept updated below as things
changed during the build.

## App name

LiftLog

## Who is it for

LiftLog lets a gym-goer log each set they lift and see what weight to try
next, based on their last sets. So when the user opens the app, they want
something to input their sets fast, or check the weight to try next before
they lift.

## Sections and routes

| Section / route | What it is for |
| --- | --- |
| Home | Today's logged sets, then the full list of exercises you've done so far |
| Choose exercise | Pick an exercise to log. They're grouped by muscle group |
| Log Set | Form to add a set: weight, reps, date (exercise already picked) |
| Exercise History | Past sets for one exercise, plus the next weight to try |

## What data does the app hold

| Data | Shape (rough) | Who owns it | Changes when |
| --- | --- | --- | --- |
| sets | `[{ id, exercise, weight, reps, date }]` | App (top level) | User adds a new set |
| new set form | `[{ exercise, weight, reps, date }]` | Log Set page | Exercise is pre-filled from Choose Exercise or a Today row. User edits weight and reps |
| selected exercise | String, passed from the last screen | Choose Exercise / Exercise History | User taps an exercise |

## What each screen contains (Log Set)

- Heading: "Log a Set"
- Exercise (already chosen, shown not typed)
- Weight input (number, pre-filled if quick-added)
- Reps input (number)
- Date input (defaults to today)
- Save button
- Back to Home

## One risk

In weightlifting there is a term called Progressive Overload, where the
lifter should add more weight once they consistently hit the highest reps
for most of their sets. Applying this logic to code makes the structure a
bit more complicated. It is doable and the logic is there, but it takes
extra effort and time to work out the patterns for when to increase weight.
The app is still simple to use and handy.

## The parts most likely to drift

### Core features

- Log a set for any exercise, grouped by muscle group. Built.
- Today's log on Home. Built.
- Suggested next weight per exercise, calculated from real history. Built.
- Exercise history, with delete. Built.

**Stretch goals (not core, moved here on purpose):**
- A split recommendation calculated from age, height, and weight. Part of
  the original brainstormed idea, cut early to keep the build to one clear
  feature instead of a full fitness app suite.
- Per-exercise custom rep ranges, instead of one fixed 8 to 12 range for
  every exercise.
- Editing a logged set, instead of delete-and-relog.
- Accounts and login.

### Where each piece is hosted

- **Client:** GitHub Pages, built and deployed by this repo's own GitHub
  Actions workflow. Free, no meaningful catch.
- **API:** Render, free web service tier. The catch: it sleeps after 15
  minutes with no traffic and takes up to a minute to wake back up on the
  next request. The app shows a "may be waking up" message for this, so it
  does not just look frozen.
- **Database:** Neon, free Postgres tier. Similar catch: the free-tier
  compute also suspends when idle and briefly cold-starts on the next query.

### Risks, updated from the original one above

The original risk called out Progressive Overload as the hard part, and
that turned out to be exactly right. The rule works for the common case,
but testing surfaced a real edge case the original risk did not name
specifically: the rule checks every set logged on the same calendar day, so
one leftover low-rep set from earlier testing (or a real warm-up set) keeps
the whole day counted as a miss. Documented as a known limitation rather
than fixed under deadline pressure.

Two more, found after the original proposal:

- **Free-tier cold starts** (Render and Neon both sleep when idle) could
  make the live link look slow on a first visit during grading. Mitigated
  by the loading message already built in.
- **No login** means every visitor shares one dataset. Fine for a solo demo,
  worth remembering if more than one person uses the live link at once.

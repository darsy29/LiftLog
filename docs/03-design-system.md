# Design system

Styling approach: CSS Modules, plain CSS files scoped per component, tokens
set once in a global `:root`.

## Colors

| Token | Hex | Role |
| --- | --- | --- |
| color-bg | #121212 | Page background |
| color-surface | #1E1E1E | Cards, panels |
| color-primary | #34D399 | Buttons and the one accent |
| color-text | #F5F5F5 | Body text |
| color-text-muted | #9A9A9A | Captions, hints |

## Contrast check (WCAG AA, 4.5:1 minimum)

- Text #F5F5F5 on background #121212 -> 17.2:1, Pass
- Muted text #9A9A9A on background #121212 -> 6.7:1, Pass
- Muted text #9A9A9A on surface #1E1E1E -> 5.9:1, Pass
- Dark text #06281C on accent #34D399 (buttons) -> 8.2:1, Pass

## Type scale

- Heading, 20px Bold, screen titles and big numbers. Example: "Bench Press"
- Body, 14px Regular, content and list rows. Example: "60kg x 8 reps"
- Small, 11px Regular, captions and hints. Example: "last: 60kg x 8"

## Spacing, base unit 8px

- Tight, 8px, between related items
- Standard, 16px, between sections
- Screen edge, 24px, page padding

## Reusable components

From the wireframe component.

| Component | Level | Used on | Props |
| --- | --- | --- | --- |
| Button | atom | appears on every screen | variant, onClick, children |
| ListRow | molecule | Home, Choose Exercise, Exercise History | title, subtitle, onClick, showAddButton |
| Header | organism | every screen | title, showBack |
| Input | atom | Log Set, Choose Exercise search | value, onChange, placeholder |
| SuggestionBox | molecule | Exercise History | label, value, note |

## Responsive plan

Below 600px (phone): single column, full width, 16-24px edge padding.

## Note on drift since this was approved

The finished app ended up on a lighter default theme (with a dark mode
variant) and a teal accent close in spirit to the #34D399 here, rather than
this exact dark palette. The tokens, contrast checking, and 8px spacing
scale above are what the app was built to follow, and the component list
matches what actually shipped. Recording the change here rather than
editing the numbers above, since this file is the original approved plan.

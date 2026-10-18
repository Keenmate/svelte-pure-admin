# Docs Pages Conversion Status

**Last Updated:** 2026-01-05

## Summary

All docs pages have been converted to use Svelte components and utility classes. Gap utilities from `pure-admin-core` rc02 are now used instead of inline styles.

## Completed Conversions

### Gap Utility Classes (rc02)
All `style="gap: ..."` converted to utility classes:
- `gap: 0.5rem` -> `gap-sm`
- `gap: 0.8rem` -> `gap-8`
- `gap: 1.2rem` -> `gap-12`
- `gap: 2rem` -> `gap-2xl`

### Font-Size Utility Classes (rc02)
All `style="font-size: ..."` converted to utility classes:
- `font-size: 0.875rem` -> `text-sm` (14px)
- Combined with margin: `font-size: 0.875rem; margin-top: 0.25rem;` -> `text-sm mt-1`
- Combined with color: `font-size: 0.875rem; color: #666;` -> `text-sm text-muted`

### Spacing/Layout Utility Classes
All convertible inline margin/padding/text-align converted:
- `margin-top: 1rem;` -> `mt-4`
- `margin-top: 2rem;` -> `mt-8`
- `margin-bottom: 1rem;` -> `mb-4`
- `margin-right: 0.5rem;` -> `mr-2`
- `margin: 0;` -> `mb-0`
- `padding-top: 0.5rem;` -> `pt-2`
- `text-align: right;` -> `text-right`
- `text-align: center;` -> `text-center`

### Flexbox Utility Classes
Display and flex styles converted:
- `display: flex;` -> `d-flex`
- `display: flex; gap: 0.5rem;` -> `d-flex gap-sm`
- `display: flex; gap: 0.5rem; flex-wrap: wrap;` -> `d-flex gap-sm flex-wrap`
- `display: flex; gap: 0.5rem; align-items: center;` -> `d-flex gap-sm align-items-center`

### Raw `<ul>` to `<BasicList>`
All raw `<ul>` elements converted to `<BasicList>` component:
- alerts/+page.svelte
- buttons/+page.svelte
- checkbox-lists/+page.svelte
- components/+page.svelte
- tables-sizing/+page.svelte
- timeline/+page.svelte
- timeline-block/+page.svelte
- timeline-feed/+page.svelte
- timeline-simple/+page.svelte
- tooltips/+page.svelte

### Component Conversions
- **components/+page.svelte**: Raw buttons -> Button, raw alerts -> Alert, raw badges -> Badge
- **timeline/+page.svelte**: Raw badges -> Badge with icon snippet

## Intentionally Raw Elements

Some pages use raw HTML elements intentionally for demo purposes:

### buttons/+page.svelte (27 raw buttons)
- Uses `data-ripple` and `data-loading-demo` attributes
- JavaScript in `onMount` manipulates DOM directly
- These demonstrate loading states and ripple effects

### code/+page.svelte (2 raw buttons)
- Copy buttons with `onclick={copyCode}`
- Function manipulates button innerHTML and classes directly
- Demonstrates interactive copy-to-clipboard functionality

### timeline/+page.svelte, loaders/+page.svelte
- Demo styling for quote boxes, timestamps, container dimensions
- These are intentional design elements showing component capabilities

## Clean Pages (No Conversion Needed)
- badges/
- cards/
- command-palette/
- forms/
- modal-dialogs/
- modals/
- popconfirm/
- tables/

## Notes

- `pure-admin-core` rc02 introduced gap utilities (.gap-xs through .gap-2xl, .gap-1 through .gap-20)
- Pre-existing type errors exist in Tooltip/Popover components (FloatingUIDOM) - not related to conversions

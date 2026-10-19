/**
 * Shared Type Definitions for Pure Admin Svelte Components
 * Following KeenMate naming conventions
 */

// Color variants used across most components
export type ColorVariant =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'light'
	| 'dark';

// Size variants (standard)
export type Size = 'xs' | 'sm' | 'lg' | 'xl';

// Extended size (includes 2xl)
export type ExtendedSize = 'xs' | 'sm' | 'lg' | 'xl' | '2xl';

// Horizontal alignment
export type HorizontalAlignment = 'start' | 'center' | 'end';

// Vertical alignment
export type VerticalAlignment = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

// Form validation state
export type ValidationState = 'default' | 'success' | 'warning' | 'error';

// Data visualization color variants
// 'primary' = the base fill (no modifier emitted — core has no --primary for these).
export type DataVizVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';

// Tooltip placement (logical: start/end flip in RTL) and colour variants —
// shared by <Tooltip> and the card title/description tooltips.
export type TooltipPlacement = 'top' | 'end' | 'bottom' | 'start';
// When a truncation tooltip appears: `overflow` = only while the text is cut off
// (core `data-pa-tooltip-overflow`), `always` = on every hover.
export type TooltipMode = 'overflow' | 'always';
export type TooltipVariant =
	| 'primary'
	| 'success'
	| 'warning'
	| 'danger'
	| 'color-1'
	| 'color-2'
	| 'color-3'
	| 'color-4'
	| 'color-5'
	| 'color-6'
	| 'color-7'
	| 'color-8'
	| 'color-9';

// Theme colors (1-9)
export type ThemeColor = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

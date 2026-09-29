/**
 * The canonical set of masked "structural affordance" glyphs shipped by
 * `@keenmate/pure-admin-core` (`_icons.scss` → `.pa-icon--NAME` + `--pa-icon-NAME`).
 * These are painted in `currentColor` via CSS mask and re-skin from one
 * `--base-icon-*` override — the closed, framework-owned set (close, chevrons,
 * search, edit, …). Decorative / brand / nav icons are NOT here; those come from a
 * consumer-configured provider (Font Awesome, an inline-SVG set, …).
 *
 * Kept in sync with core `_icons.scss:137-217`.
 */
export const AFFORDANCE_ICON_NAMES = [
	'x',
	'chevron',
	'chevron-right',
	'chevron-down',
	'chevron-left',
	'chevron-up',
	'caret',
	'caret-down',
	'caret-up',
	'clear',
	'remove',
	'expand',
	'collapse',
	'add',
	'edit',
	'delete',
	'search',
	'refresh',
	'filter',
	'check',
	'copy',
	'ellipsis',
	'ellipsis-vertical',
	'save',
	'settings',
	'bell',
	'user',
	'lock',
	'help',
	'logout',
	'download',
	'link',
	'external-link',
	'favorites',
	'info',
	'success',
	'warning',
	'danger'
] as const;

/** A masked structural-affordance glyph name (`pa-icon--NAME`). */
export type AffordanceIconName = (typeof AFFORDANCE_ICON_NAMES)[number];

const AFFORDANCE_SET: ReadonlySet<string> = new Set(AFFORDANCE_ICON_NAMES);

/** True if `name` is one of the framework's masked structural affordances. */
export function isAffordanceIcon(name: string): name is AffordanceIconName {
	return AFFORDANCE_SET.has(name);
}

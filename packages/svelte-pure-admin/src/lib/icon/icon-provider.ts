/**
 * Icon provider contract + resolution.
 *
 * `<Icon name="…">` resolves a name to markup in two stages:
 *
 *   1. **Framework affordances first (built-in, reserved).** If `name` is one of
 *      the closed set of masked structural affordances ({@link isAffordanceIcon} —
 *      close/x, chevrons, search, check, success, danger, …) it renders
 *      `<span class="pa-icon pa-icon--NAME">` and STOPS. No provider can shadow an
 *      affordance; they always resolve zero-config, so the framework's own glyphs
 *      never break regardless of what a consumer configures. (Qualify external
 *      names — `"fa close"`, `"hero close"` — to avoid the reserved bare names.)
 *   2. **Provider list.** Otherwise the name is handed to each registered provider
 *      in order; the first to return non-empty markup wins. A provider is a pure
 *      `(name, ctx) => string` mapping whatever naming the consumer types
 *      (`"hero close"`, `"fa delete"`, `"far-close"`, a Lucide key, …) to markup.
 *      Parsing the set/prefix is the PROVIDER's job — pure-admin just calls them in
 *      order. Mirrors keen-pure-admin's icon callbacks.
 *
 * The full {@link IconRenderContext} (class, size, isInteractive, label) is passed
 * to every provider so a set can embed its own sizing / hover marker. Hover: a
 * provider embeds its set's marker (`pc-icon-hover-fill` for Font Awesome,
 * `pc-icon-hover-highlight` for outline sets, `--pa-icon-src-hover` for masked).
 * Those markers are inert unless the icon sits inside a hovered control (or an
 * element carrying `.pc-icon-hover`), so they can always be present. `Icon`'s
 * `isInteractive` prop only adds `.pc-icon-hover` on the host so a *standalone*
 * icon becomes its own hover affordance. See `pure-css/src/scss/_icon-hover.scss`.
 */
import { getContext, setContext } from 'svelte';
import { isAffordanceIcon } from './affordances';

/** Context passed to every provider for each rendered icon — the icon's full render intent minus the name. */
export interface IconRenderContext {
	/** Custom classes the consumer put on `<Icon class="…">`. */
	class?: string;
	/** Requested size as a CSS length (e.g. `'1.25rem'`); the host sets `font-size` + `--pa-icon-size` from it. */
	size?: string;
	/** Whether the icon is a standalone hover affordance (host gets `.pc-icon-hover`). */
	isInteractive?: boolean;
	/** Accessible name, when the consumer passed one. */
	label?: string;
}

/**
 * Maps an icon `name` to the markup to inline (consumed via `{@html}` inside
 * `Icon`'s host). Return an empty string for a name this provider doesn't handle
 * so the next provider in the list gets a turn.
 */
export type IconProvider = (name: string, ctx: IconRenderContext) => string;

const ICON_PROVIDERS_KEY = Symbol.for('pure-admin-icon-providers');

/** Register the ordered provider list for the current component subtree (called by `PureAdminProvider`). */
export function setIconProviders(providers: IconProvider[]): void {
	setContext(ICON_PROVIDERS_KEY, providers);
}

/** Read the active provider list from context (empty when none configured — affordances still resolve). */
export function useIconProviders(): IconProvider[] {
	return getContext<IconProvider[] | undefined>(ICON_PROVIDERS_KEY) ?? [];
}

/**
 * Resolve an icon `name` to markup: framework affordance first (reserved,
 * built-in), then the provider list in order (first non-empty wins). Returns `''`
 * when nothing matches, so `Icon` renders nothing.
 */
export function resolveIcon(name: string, ctx: IconRenderContext, providers: IconProvider[]): string {
	if (isAffordanceIcon(name)) return `<span class="pa-icon pa-icon--${name}"></span>`;
	for (const provider of providers) {
		const markup = provider(name, ctx);
		if (markup) return markup;
	}
	return '';
}

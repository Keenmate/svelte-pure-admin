/**
 * Icon provider contract + context wiring.
 *
 * An **icon provider** is a pure function that maps an icon `name` (whatever the
 * consumer types in `<Icon name="…">`) to the markup to inline. This is the
 * ergonomic seam that lets every project render icons with the set they already
 * have — Font Awesome, an inline-SVG set on disk, Iconify, … — WITHOUT authoring
 * custom elements (`<fa-icon>` / `<hero-icon>` / raw `<svg>`) at each call-site.
 * It mirrors keen-pure-admin's `:icon_callback` dispatcher.
 *
 * The provider is configured once (on `PureAdminProvider`) and read from context
 * by `Icon`. When none is configured, the default is {@link masked} — the closed
 * set of framework structural affordances — so `Icon` works zero-config and the
 * library's own chrome (which uses masked `pa-icon--*` spans directly, not `Icon`)
 * is never affected by a consumer's provider choice.
 *
 * ## Hover
 * The consumer never picks the hover *mechanism* — the provider embeds its set's
 * correct marker in the returned markup (`pc-icon-hover-fill` for Font Awesome,
 * `pc-icon-hover-highlight` for outline sets, `--pa-icon-src-hover` for masked).
 * Those markers are inert unless the icon sits inside a hovered control (or an
 * element carrying `.pc-icon-hover`), so they can always be present. `Icon`'s
 * `isInteractive` prop only adds `.pc-icon-hover` so a *standalone* icon becomes
 * its own hover affordance — pure intent, set-agnostic. See foundation
 * `pure-css/src/scss/_icon-hover.scss`.
 */
import { getContext, setContext } from 'svelte';
import { masked } from './providers';

/** Context passed to a provider for each rendered icon. */
export interface IconRenderContext {
	/** Custom classes the consumer put on `<Icon class="…">` (usually applied to the host, not needed by most providers). */
	class?: string;
	/** Requested size as a CSS length (e.g. `'1.25rem'`); the host sets `font-size` + `--pa-icon-size` from it. */
	size?: string;
	/** Whether the icon is a standalone hover affordance (host gets `.pc-icon-hover`). */
	isInteractive?: boolean;
}

/**
 * Maps an icon `name` to the markup to inline (consumed via `{@html}` inside
 * `Icon`'s host). Return an empty string for a name this provider doesn't handle
 * so it can be chained with {@link combine}.
 */
export type IconProvider = (name: string, ctx: IconRenderContext) => string;

const ICON_PROVIDER_KEY = Symbol.for('pure-admin-icon-provider');

/** Register the icon provider for the current component subtree (called by `PureAdminProvider`). */
export function setIconProvider(provider: IconProvider): void {
	setContext(ICON_PROVIDER_KEY, provider);
}

/** Read the active icon provider from context, falling back to {@link masked} when none is configured. */
export function useIconProvider(): IconProvider {
	return getContext<IconProvider | undefined>(ICON_PROVIDER_KEY) ?? masked();
}

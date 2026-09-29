/**
 * Built-in icon providers. Each is a factory returning an {@link IconProvider}.
 * Consumers configure one on `PureAdminProvider`:
 *
 * ```svelte
 * <PureAdminProvider iconProvider={combine(svgIcons(myLucideSet), masked())}>
 * ```
 *
 * - {@link masked} — the framework's ~34 structural affordances (no data needed).
 * - {@link fontAwesome} — `<i class="fa-… fa-NAME fa-fw">` (font-class sets).
 * - {@link svgIcons} — inline `<svg>` from a `{ name: markup }` map (Lucide, Tabler,
 *   Heroicons outline, or any set you import at build time).
 * - {@link combine} — first provider to return non-empty markup wins (chain a
 *   decorative set with `masked()` so affordances always resolve).
 */
import type { IconProvider } from './icon-provider';
import { isAffordanceIcon } from './affordances';

/**
 * Renders the framework's masked structural affordances as
 * `<span class="pa-icon pa-icon--NAME">`. Returns `''` for any non-affordance
 * name (so it can be the tail of a {@link combine} chain). This is the default
 * provider when none is configured.
 */
export function masked(): IconProvider {
	return (name) => (isAffordanceIcon(name) ? `<span class="pa-icon pa-icon--${name}"></span>` : '');
}

export interface FontAwesomeOptions {
	/** Face/style class prefix — `'fa-solid'` (default), `'fa-regular'`, `'fa-brands'`, `'fas'`, `'far'`, … */
	style?: string;
	/** Add `fa-fw` fixed-width (default `true`). */
	fixedWidth?: boolean;
}

/**
 * Font Awesome provider: `name="user"` → `<i class="fa-solid fa-user fa-fw pc-icon-hover-fill">`.
 * Pass a full FA name if your set needs it. `pc-icon-hover-fill` flips regular→solid
 * on hover inside a control (needs the regular face present, largely FA Pro; inert otherwise).
 */
export function fontAwesome(options: FontAwesomeOptions = {}): IconProvider {
	const style = options.style ?? 'fa-solid';
	const fw = options.fixedWidth === false ? '' : ' fa-fw';
	return (name) => `<i class="${style} fa-${name}${fw} pc-icon-hover-fill"></i>`;
}

export interface SvgIconsOptions {
	/** SVG `viewBox` (default `'0 0 24 24'`). */
	viewBox?: string;
	/** `fill` attribute (default `'none'` — stroke sets like Lucide/Tabler). */
	fill?: string;
	/** `stroke` attribute (default `'currentColor'`). */
	stroke?: string;
	/** `stroke-width` (default `2`). */
	strokeWidth?: number | string;
	/**
	 * Hover-marker class stamped on the `<svg>` (default `'pc-icon-hover-highlight'`
	 * — recolour to accent on hover, the right cue for outline sets). Pass `''` to
	 * disable, or `'pc-icon-hover-fill'` for a font-weight set.
	 */
	hoverMarker?: string;
}

/**
 * Inline-SVG provider backed by a `{ name: innerMarkup }` map — `innerMarkup` is
 * the `<path>`/`<circle>`/… content (as in Lucide/Tabler/Heroicons-outline). The
 * provider wraps it in a `currentColor` stroke `<svg>` shell sized to `1em`.
 * Returns `''` for unknown names (chain with {@link masked} via {@link combine}).
 *
 * ```ts
 * import { navIcons } from './nav-icons'; // { dashboard: '<rect …/>…', … }
 * svgIcons(navIcons)
 * ```
 */
export function svgIcons(paths: Record<string, string>, options: SvgIconsOptions = {}): IconProvider {
	const viewBox = options.viewBox ?? '0 0 24 24';
	const fill = options.fill ?? 'none';
	const stroke = options.stroke ?? 'currentColor';
	const strokeWidth = options.strokeWidth ?? 2;
	const marker = options.hoverMarker ?? 'pc-icon-hover-highlight';
	const cls = marker ? ` class="${marker}"` : '';
	return (name) => {
		const inner = paths[name];
		if (!inner) return '';
		return (
			`<svg${cls} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="${viewBox}"` +
			` fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">` +
			`${inner}</svg>`
		);
	};
}

/** Chain providers: the first to return non-empty markup wins. */
export function combine(...providers: IconProvider[]): IconProvider {
	return (name, ctx) => {
		for (const provider of providers) {
			const markup = provider(name, ctx);
			if (markup) return markup;
		}
		return '';
	};
}

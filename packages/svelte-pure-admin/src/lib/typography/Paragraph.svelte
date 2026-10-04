<script lang="ts">
	/**
	 * Pure Admin Paragraph Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core typography utilities
	 */

	import type { HorizontalAlignment, TextMode, Size } from '../types';

	type SemanticStyle = 'default' | 'caption' | 'lead';
	// Flat text-* colour utilities: `secondary` (→ text-secondary = muted/subdued),
	// `primary` (→ text-body = default).
	type TextColor = 'primary' | 'secondary';

	// `size` maps DIRECTLY to the same-named flat text-* utility. With no size, a
	// paragraph is a plain <p> at the body default (16px = text-base, = a bare <p>).
	const sizeClassMap: Record<Size, string> = {
		xs: 'text-xs',
		sm: 'text-sm',
		lg: 'text-lg',
		xl: 'text-xl'
	};

	interface Props {
		/** Horizontal text alignment */
		horizontalAlignment?: HorizontalAlignment;
		/** Text colour — "secondary" (→ text-secondary = muted/subdued) or "primary" (→ text-body = default) */
		color?: TextColor;
		/** Text color mode (muted) — legacy alias of color="secondary" */
		mode?: TextMode;
		/** Text size variant */
		size?: Size;
		/** Semantic text style (caption for small labels, lead for introductory text) */
		semantic?: SemanticStyle;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		horizontalAlignment,
		color,
		mode,
		size,
		semantic,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		// No size → a plain <p> at the body default (16px); don't force a size class.
		const base: string[] = [];
		if (size) base.push(sizeClassMap[size]);
		if (horizontalAlignment) base.push(`text-${horizontalAlignment}`);
		// Explicit colour wins; `mode="muted"` is kept as a legacy alias.
		if (color === 'secondary') base.push('text-secondary');
		else if (color === 'primary') base.push('text-body');
		else if (mode === 'muted') base.push('text-secondary');
		if (semantic && semantic !== 'default') base.push(`text-${semantic}`);
		if (className) base.push(className);
		return base.length ? base.join(' ') : undefined;
	});
</script>

<p class={classes()}>
	{@render children?.()}
</p>

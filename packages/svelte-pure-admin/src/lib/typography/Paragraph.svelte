<script lang="ts">
	/**
	 * Pure Admin Paragraph Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core typography utilities
	 */

	import type { HorizontalAlignment, TextMode, Size } from '../types';

	type SemanticStyle = 'default' | 'caption' | 'lead';
	// Core ships exactly two paragraph colour modifiers: pa-text--primary
	// (= default colour) and pa-text--secondary (muted).
	type TextColor = 'primary' | 'secondary';

	interface Props {
		/** Horizontal text alignment */
		horizontalAlignment?: HorizontalAlignment;
		/** Text colour modifier (pa-text--{color}) — primary (= default) or secondary (muted) */
		color?: TextColor;
		/** Text color mode (muted uses secondary color) — legacy alias of color="secondary" */
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
		// Core's canonical paragraph is the `.pa-text` BEM component — the base
		// class carries the 14px size + primary colour, so it must always be
		// present; the modifiers only tune it.
		const base: string[] = ['pa-text'];
		if (horizontalAlignment) base.push(`pa-text--${horizontalAlignment}`);
		// Explicit colour wins; `mode="muted"` is kept as a legacy alias for secondary.
		if (color) base.push(`pa-text--${color}`);
		else if (mode === 'muted') base.push('pa-text--secondary');
		if (size) base.push(`pa-text--${size}`);
		if (semantic && semantic !== 'default') base.push(`pa-text--${semantic}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<p class={classes()}>
	{@render children?.()}
</p>

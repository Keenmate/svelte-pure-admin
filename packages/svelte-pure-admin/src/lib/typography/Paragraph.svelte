<script lang="ts">
	/**
	 * Pure Admin Paragraph Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core typography utilities
	 */

	import type { HorizontalAlignment, Size } from '../types';

	type SemanticStyle = 'default' | 'caption' | 'lead';

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
		textAlign?: HorizontalAlignment;
		/** Muted / subdued text (text-muted); default is the body colour, no class */
		isMuted?: boolean;
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
		textAlign,
		isMuted = false,
		size,
		semantic,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		// No size → a plain <p> at the body default (16px); don't force a size class.
		const base: string[] = [];
		if (size) base.push(sizeClassMap[size]);
		if (textAlign) base.push(`text-${textAlign}`);
		if (isMuted) base.push('text-muted');
		if (semantic && semantic !== 'default') base.push(`text-${semantic}`);
		if (className) base.push(className);
		return base.length ? base.join(' ') : undefined;
	});
</script>

<p class={classes()}>
	{@render children?.()}
</p>

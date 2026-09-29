<script lang="ts">
	/**
	 * Pure Admin ButtonGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/buttons.html
	 *
	 * Note: Gap modifiers (compact/loose) were removed in pure-admin-core rc04.
	 * Use utility classes instead: `class="gap-2"` for compact, `class="gap-8"` for loose.
	 */

	type AlignVariant = 'center' | 'end' | 'stretch';
	type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

	interface Props {
		/** Vertical orientation */
		vertical?: boolean;
		/** Vertical alignment (only for vertical groups): center, end, stretch */
		align?: AlignVariant;
		/** Switch to vertical at this breakpoint and up (pa-btn-group--{bp}-vertical) */
		verticalAt?: Breakpoint;
		/** Switch to horizontal at this breakpoint and up (pa-btn-group--{bp}-horizontal) */
		horizontalAt?: Breakpoint;
		/** @deprecated use `verticalAt="md"` — horizontal on mobile, vertical on md+ */
		mdVertical?: boolean;
		/** @deprecated use `horizontalAt="lg"` — vertical on mobile/tablet, horizontal on lg+ */
		lgHorizontal?: boolean;
		/** Prevent wrapping (single line, may overflow) */
		nowrap?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		vertical = false,
		align,
		verticalAt,
		horizontalAt,
		mdVertical = false,
		lgHorizontal = false,
		nowrap = false,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-btn-group'];
		if (vertical) base.push('pa-btn-group--vertical');
		if (align) base.push(`pa-btn-group--${align}`);
		// Responsive orientation (new breakpoint props; fall back to the deprecated booleans)
		const vAt = verticalAt ?? (mdVertical ? 'md' : undefined);
		const hAt = horizontalAt ?? (lgHorizontal ? 'lg' : undefined);
		if (vAt) base.push(`pa-btn-group--${vAt}-vertical`);
		if (hAt) base.push(`pa-btn-group--${hAt}-horizontal`);
		if (nowrap) base.push('pa-btn-group--nowrap');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>

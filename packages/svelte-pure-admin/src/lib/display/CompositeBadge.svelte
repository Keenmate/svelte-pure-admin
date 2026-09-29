<script lang="ts">
	/**
	 * Pure Admin CompositeBadge Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/badges.html
	 */

	import type { BadgeVariant, CompositeButtonVariant } from './badge-types';

	interface Props {
		/** Badge variant (main background) */
		variant?: BadgeVariant;
		/** Label section variant (for mixed colors) */
		labelVariant?: BadgeVariant;
		/** Button section variant (for mixed colors) */
		buttonVariant?: CompositeButtonVariant;
		/** Icon section variant (pa-composite-badge--icon-{variant}) */
		iconVariant?: BadgeVariant;
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Label text */
		labelText: string;
		/** Button/count text */
		buttonText: string | number;
		/** Make button interactive (renders as button element) */
		isInteractive?: boolean;
		/** Button click callback */
		onbuttonclick?: (event: MouseEvent) => void;
		/** Label click callback */
		onlabelclick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		variant = 'primary',
		labelVariant,
		buttonVariant,
		iconVariant,
		icon,
		labelText,
		buttonText,
		isInteractive = false,
		onbuttonclick,
		onlabelclick,
		class: className = ''
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-composite-badge', `pa-composite-badge--${variant}`];
		if (labelVariant) base.push(`pa-composite-badge--label-${labelVariant}`);
		if (buttonVariant) base.push(`pa-composite-badge--btn-${buttonVariant}`);
		if (iconVariant) base.push(`pa-composite-badge--icon-${iconVariant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if icon}
		<span class="pa-composite-badge__icon">
			{@render icon()}
		</span>
	{/if}
	{#if onlabelclick}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span
			class="pa-composite-badge__label"
			onclick={onlabelclick}
			onkeydown={(e) => e.key === 'Enter' && onlabelclick?.(e as any)}
			role="button"
			tabindex="0"
		>{labelText}</span>
	{:else}
		<span class="pa-composite-badge__label">{labelText}</span>
	{/if}
	{#if isInteractive}
		<button class="pa-composite-badge__button" onclick={onbuttonclick}>
			{buttonText}
		</button>
	{:else}
		<span class="pa-composite-badge__button">{buttonText}</span>
	{/if}
</div>

<script lang="ts">
	/**
	 * Pure Admin Split Button Menu Item (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/buttons.html
	 */
	import Icon from '../icon/Icon.svelte';

	type SplitButtonItemVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

	interface Props {
		/** Role colour of the item (e.g. `danger` for destructive actions) — emits pa-btn-split__item--{variant} */
		variant?: SplitButtonItemVariant;
		/** Keep the menu open when this item is clicked (emits `data-pa-keep-open`) — for items that open a popconfirm / sub-panel anchored to the item */
		shouldKeepOpen?: boolean;
		/** Disabled state */
		isDisabled?: boolean;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
		/** Icon snippet — renders inside pa-btn-split__item-icon */
		icon?: import('svelte').Snippet;
		/** Icon name rendered through <Icon> (icon providers resolve it, e.g. "fas fa-home"). The `icon` snippet wins when both are set. */
		iconName?: string;
		/** Action snippet — when provided, wraps item in pa-btn-split__item-row */
		action?: import('svelte').Snippet;
		/** Item content */
		children?: import('svelte').Snippet;
		/** Rest props (data-*, aria-*, etc.) forwarded to the item button */
		[key: string]: any;
	}

	let {
		variant,
		shouldKeepOpen = false,
		isDisabled = false,
		onclick,
		class: className = '',
		icon,
		iconName,
		action,
		children,
		...restProps
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-btn-split__item'];
		if (variant) base.push(`pa-btn-split__item--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if action}
	<div class="pa-btn-split__item-row">
		<button class={classes()} {onclick} disabled={isDisabled} data-pa-keep-open={shouldKeepOpen ? '' : undefined} {...restProps}>
			{#if icon || iconName}
				<span class="pa-btn-split__item-icon">{#if icon}{@render icon()}{:else if iconName}<Icon name={iconName} />{/if}</span>
			{/if}
			{@render children?.()}
		</button>
		{@render action()}
	</div>
{:else}
	<button class={classes()} {onclick} disabled={isDisabled} data-pa-keep-open={shouldKeepOpen ? '' : undefined} {...restProps}>
		{#if icon || iconName}
			<span class="pa-btn-split__item-icon">{#if icon}{@render icon()}{:else if iconName}<Icon name={iconName} />{/if}</span>
		{/if}
		{@render children?.()}
	</button>
{/if}

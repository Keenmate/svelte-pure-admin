<script lang="ts">
	/**
	 * Pure Admin CardTabContent Component (Svelte 5)
	 * Helper component for Card tab content areas
	 */

	interface Props {
		/** Whether this tab content is active */
		isActive?: boolean;
		/** Tab ID */
		id?: string;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { isActive = false, id, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-card__tab-content'];
		if (isActive) base.push('pa-card__tab-content--active');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div {id} class={classes()}>
	{@render children?.()}
</div>

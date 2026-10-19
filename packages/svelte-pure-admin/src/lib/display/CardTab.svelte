<script lang="ts">
	/**
	 * Pure Admin CardTab Component (Svelte 5)
	 * Helper component for Card tabs
	 */

	interface Props {
		/** Whether this tab is active */
		isActive?: boolean;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { isActive = false, onclick, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-card__tab'];
		if (isActive) base.push('pa-card__tab--active');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<button class={classes()} {onclick}>
	{@render children?.()}
</button>

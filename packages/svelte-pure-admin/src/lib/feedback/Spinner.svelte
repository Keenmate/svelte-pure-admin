<script lang="ts">
	/**
	 * Pure Admin Spinner Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/loaders.html
	 */

	// Only --xs exists in core SCSS; the larger sizes were never defined and rendered at the default size.
	type SpinnerSize = 'xs';
	type SpinnerVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		/** Spinner size */
		size?: SpinnerSize;
		/** Spinner variant/color */
		variant?: SpinnerVariant;
		/** Additional CSS classes */
		class?: string;
	}

	let { size, variant, class: className = '' }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-spinner'];
		if (size) base.push(`pa-spinner--${size}`);
		if (variant) base.push(`pa-spinner--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<span class={classes()}></span>

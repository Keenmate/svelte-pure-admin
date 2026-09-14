<script lang="ts">
	/**
	 * Pure Admin RadioGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * Wrapper for grouping radio buttons:
	 * <div class="pa-radio-group">
	 *   <Radio ... />
	 *   <Radio ... />
	 * </div>
	 */

	// `.pa-radio-group` and `.pa-checkbox-group` share these layout modifiers
	// (core `_checkboxes-radios.scss`): default is a flex column (no class);
	// `horizontal` = wrapping row; `grid` = responsive auto-fill columns;
	// `2col` / `3col` = fixed column count.
	type ChoiceGroupLayout = 'horizontal' | 'grid' | '2col' | '3col';

	interface Props {
		/** Layout of the grouped options. Default (unset) is a flex column. */
		layout?: ChoiceGroupLayout;
		/** Additional CSS classes */
		class?: string;
		/** Children content (Radio components) */
		children?: import('svelte').Snippet;
	}

	let { layout, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-radio-group'];
		if (layout) base.push(`pa-radio-group--${layout}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>

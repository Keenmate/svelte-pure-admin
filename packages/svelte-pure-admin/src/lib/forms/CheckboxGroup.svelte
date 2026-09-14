<script lang="ts">
	/**
	 * Pure Admin CheckboxGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * Wrapper for grouping checkboxes:
	 * <div class="pa-checkbox-group">
	 *   <Checkbox ... />
	 *   <Checkbox ... />
	 * </div>
	 */

	// `.pa-checkbox-group` and `.pa-radio-group` share these layout modifiers
	// (core `_checkboxes-radios.scss`): default is a flex column (no class);
	// `horizontal` = wrapping row; `grid` = responsive auto-fill columns
	// (tune with `--pa-checkbox-group-col-min`); `2col` / `3col` = fixed count.
	type ChoiceGroupLayout = 'horizontal' | 'grid' | '2col' | '3col';

	interface Props {
		/** Layout of the grouped options. Default (unset) is a flex column. */
		layout?: ChoiceGroupLayout;
		/** Additional CSS classes */
		class?: string;
		/** Inline style — e.g. `--base-icon-check` / `--base-icon-indeterminate` glyph overrides applied to every option in the group. */
		style?: string;
		/** Children content (Checkbox components) */
		children?: import('svelte').Snippet;
	}

	let { layout, class: className = '', style, children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-checkbox-group'];
		if (layout) base.push(`pa-checkbox-group--${layout}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} {style}>
	{@render children?.()}
</div>

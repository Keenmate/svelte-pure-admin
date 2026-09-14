<script lang="ts">
	/**
	 * Pure Admin FormActions Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * The footer button row of a form: `<div class="pa-form-actions">`. Core styles
	 * it only as a descendant of `.pa-form` (flex row, top margin, wrapping gap), so
	 * place it inside a `<Form>`. Prefer this over a `<ButtonGroup>` for form footers —
	 * ButtonGroup adds `pa-btn-group`, whose own flex/gap rules would layer on top.
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content (the action buttons) */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-form-actions'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>

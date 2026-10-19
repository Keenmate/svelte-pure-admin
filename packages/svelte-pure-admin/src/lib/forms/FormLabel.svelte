<script lang="ts">
	/**
	 * Pure Admin FormLabel Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * Core styles a BARE <label> inside `.pa-form-group` — there is no
	 * `.pa-form-label` class. The required marker is attribute-driven: core's
	 * `.pa-form-group:has(:required) > label::after` draws the asterisk whenever
	 * the group holds a `:required` control. So the label takes no `isRequired`
	 * prop — put `isRequired` on the control (Input / Select / Textarea emit the
	 * native attribute) and the marker appears for free.
	 */

	interface Props {
		/** Input ID for label */
		for?: string;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { for: htmlFor, class: className = '', children }: Props = $props();
</script>

<label for={htmlFor} class={className || undefined}>
	{@render children?.()}
</label>

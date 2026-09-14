<script lang="ts">
	/**
	 * Pure Admin FormGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 */

	type ValidationState = 'success' | 'warning' | 'error';

	interface Props {
		/** Validation state (success, warning, error) */
		state?: ValidationState;
		/** Has validation error (legacy, prefer state prop) */
		isError?: boolean;
		/** Has validation success (legacy, prefer state prop) */
		isSuccess?: boolean;
		/** Horizontal layout (label left, input right) */
		isHorizontal?: boolean;
		/** Horizontal layout - alias for isHorizontal */
		horizontal?: boolean;
		/**
		 * Mark the group required — emits `pa-form-group--required`, the escape
		 * hatch for NON-native widgets (custom selects, etc.) that have no
		 * `:required` descendant for core's auto-asterisk. For a native control,
		 * prefer putting `required` on the input (Input/Select/Textarea forward
		 * it) and let `:has(:required) > label::after` draw the marker for free.
		 */
		isRequired?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		state,
		isError = false,
		isSuccess = false,
		isHorizontal = false,
		horizontal = false,
		isRequired = false,
		class: className = '',
		children
	}: Props = $props();

	// Merge horizontal props (horizontal is alias for isHorizontal)
	const effectiveHorizontal = $derived(isHorizontal || horizontal);

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-form-group'];
		// New state prop takes precedence
		if (state) {
			base.push(`pa-form-group--${state}`);
		} else {
			// Legacy boolean props
			if (isSuccess) base.push('pa-form-group--success');
			if (isError) base.push('pa-form-group--error');
		}
		// `pa-form-group--required` is the escape hatch for non-native widgets
		// (core `_form-layout.scss`); native controls should instead carry the
		// `required` attribute so `:has(:required) > label::after` fires.
		if (isRequired) base.push('pa-form-group--required');
		if (effectiveHorizontal) base.push('pa-form-group--horizontal');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>

<script lang="ts">
	/**
	 * FormField Component
	 *
	 * A wrapper that combines FormGroup, FormLabel, and FormHelp with automatic
	 * error/success state handling. Reduces boilerplate when using form validation.
	 */
	import type { Snippet } from 'svelte';
	import FormGroup from './FormGroup.svelte';
	import FormLabel from './FormLabel.svelte';
	import FormHelp from './FormHelp.svelte';

	type InputState = 'success' | 'warning' | 'error';

	interface Props {
		/** Field label text */
		labelText?: string;
		/** Default help text (shown when no errors and not validated) */
		helpText?: string;
		/** Success message (shown when touched, no errors, and field has value) */
		successMessage?: string;
		/** Error messages array from validation */
		errors?: string[] | null;
		/** Whether the field has been touched/interacted with */
		isTouched?: boolean;
		/** Field has a value (for showing success state) */
		hasValue?: boolean;
		/** Manual state override (takes precedence over errors) */
		validation?: InputState;
		/** Additional class for FormGroup */
		class?: string;
		/** Horizontal layout (label left, input right) */
		isHorizontal?: boolean;
		/** The input control */
		children: Snippet<[{ errors: string[]; isTouched: boolean; validation?: InputState }]>;
	}

	let {
		labelText,
		helpText,
		successMessage,
		errors = null,
		isTouched = false,
		hasValue = false,
		validation,
		class: className = '',
		isHorizontal = false,
		children
	}: Props = $props();

	// Normalize errors to always be an array
	const normalizedErrors = $derived(errors ?? []);
	const hasErrors = $derived(normalizedErrors.length > 0);

	// When validation is manually set, use it; otherwise derive from errors/isTouched
	const showError = $derived(!validation && isTouched && hasErrors);
	const showSuccess = $derived(!validation && isTouched && !hasErrors && hasValue && !!successMessage);

	// Help variant follows manual validation or derived state
	const helpVariant = $derived<InputState | undefined>(
		validation ?? (showError ? 'error' : showSuccess ? 'success' : undefined)
	);
</script>

<FormGroup class={className} {isHorizontal}>
	{#if labelText}
		<FormLabel>{labelText}</FormLabel>
	{/if}

	<!-- Mark the control `isRequired` inside the snippet — core's
	     `.pa-form-group:has(:required) > label::after` draws the asterisk. -->
	{@render children({ errors: normalizedErrors, isTouched, validation })}

	{#if showError}
		<FormHelp variant="error">{normalizedErrors[0]}</FormHelp>
	{:else if showSuccess}
		<FormHelp variant="success">{successMessage}</FormHelp>
	{:else if helpText}
		<FormHelp variant={helpVariant}>{helpText}</FormHelp>
	{/if}
</FormGroup>

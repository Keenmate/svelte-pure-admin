<script lang="ts">
	/**
	 * Pure Admin NumberInput Component (Svelte 5)
	 * Specialized input for numeric values with formatting support
	 */

	import type { ThemeColor } from '../types';

	type InputSize = 'xs' | 'sm' | 'lg' | 'xl';
	type InputState = 'success' | 'warning' | 'error';

	interface Props {
		/** Numeric value (bindable) */
		value?: number | null;
		/** Input size */
		size?: InputSize;
		/** Validation state - auto-derived from errors if not set */
		validation?: InputState;
		/** Error messages from validation library (string or array of strings) */
		errors?: string | string[];
		/** Whether field has been touched/interacted with (controls when errors are shown) */
		isTouched?: boolean;
		/** Theme color variant (1-9) */
		themeColor?: ThemeColor;
		/** Disabled state */
		isDisabled?: boolean;
		/** Readonly state */
		isReadonly?: boolean;
		/** Required field */
		isRequired?: boolean;
		/** Placeholder text */
		placeholder?: string;
		/** Input ID */
		id?: string;
		/** Input name */
		name?: string;
		/** Minimum value */
		min?: number;
		/** Maximum value */
		max?: number;
		/** Step increment */
		step?: number | 'any';
		/** Additional CSS classes */
		class?: string;
		/** Input handler */
		oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		/** Change handler */
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		/** Blur handler */
		onblur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
		/** Focus handler */
		onfocus?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
		/** Keydown handler */
		onkeydown?: (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		value = $bindable(null),
		size,
		validation,
		errors,
		isTouched = true,
		themeColor,
		isDisabled = false,
		isReadonly = false,
		isRequired = false,
		placeholder,
		id,
		name,
		min,
		max,
		step,
		class: className = '',
		oninput,
		onchange,
		onblur,
		onfocus,
		onkeydown
	}: Props = $props();

	// Check if there are errors (handle both string and array)
	const hasErrors = $derived(() => {
		if (!errors) return false;
		if (Array.isArray(errors)) return errors.length > 0;
		return errors.length > 0;
	});

	// Compute effective state: manual validation takes precedence, otherwise derive from errors
	const effectiveState = $derived(() => {
		if (validation) return validation;
		if (hasErrors() && isTouched) return 'error';
		return undefined;
	});

	// Compute aria-invalid for accessibility
	const ariaInvalid = $derived(() => {
		return hasErrors() && isTouched ? 'true' : undefined;
	});

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-input'];
		if (size) base.push(`pa-input--${size}`);
		if (effectiveState()) base.push(`pa-input--${effectiveState()}`);
		if (themeColor) base.push(`pa-input--color-${themeColor}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<input
	type="number"
	bind:value
	{id}
	{name}
	{min}
	{max}
	{step}
	{placeholder}
	disabled={isDisabled}
	readonly={isReadonly}
	required={isRequired}
	class={classes()}
	aria-invalid={ariaInvalid()}
	{oninput}
	{onchange}
	{onblur}
	{onfocus}
	{onkeydown}
/>

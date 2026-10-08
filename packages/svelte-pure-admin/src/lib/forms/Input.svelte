<script lang="ts">
	/**
	 * Pure Admin Input Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * For text-like inputs only: text, email, password, tel, url, search
	 * For other types use specialized components:
	 * - NumberInput: numeric values with formatting
	 * - DateInput: date, time, datetime-local, month, week
	 * - FileInput: file uploads
	 * - RangeInput: sliders
	 * - ColorInput: color picker
	 */

	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { ThemeColor } from '../types';

	type InputSize = 'xs' | 'sm' | 'lg' | 'xl';
	type InputState = 'success' | 'warning' | 'error';
	type InputType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';

	interface Props {
		/** Input type (text-like only) */
		type?: InputType;
		/** Input value (bindable) */
		value?: string;
		/** Input size */
		size?: InputSize;
		/** Validation state (success, warning, error) - auto-derived from errors if not set */
		state?: InputState;
		/** Error messages from validation library (string or array of strings) */
		errors?: string | string[];
		/** Whether field has been touched/interacted with (controls when errors are shown) */
		touched?: boolean;
		/** Theme color variant (1-9) */
		themeColor?: ThemeColor;
		/** Disabled state */
		disabled?: boolean;
		/** Readonly state */
		readonly?: boolean;
		/** Required field */
		required?: boolean;
		/** Placeholder text */
		placeholder?: string;
		/** Input ID */
		id?: string;
		/** Input name */
		name?: string;
		/** Minimum length */
		minlength?: number;
		/** Maximum length */
		maxlength?: number;
		/** Pattern for validation */
		pattern?: string;
		/** Autocomplete hint for browsers (e.g., 'current-password', 'email', 'username') */
		autocomplete?: HTMLInputAttributes['autocomplete'];
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
		type = 'text',
		value = $bindable(),
		size,
		state,
		errors,
		touched = true,
		themeColor,
		disabled = false,
		readonly = false,
		required = false,
		placeholder,
		id,
		name,
		minlength,
		maxlength,
		pattern,
		autocomplete,
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

	// Compute effective state: manual state takes precedence, otherwise derive from errors
	const effectiveState = $derived(() => {
		if (state) return state;
		if (hasErrors() && touched) return 'error';
		return undefined;
	});

	// aria-invalid tracks the effective ERROR state (manual `state="error"` OR
	// derived errors+touched), consistent with the pa-input--error class.
	const ariaInvalid = $derived(() => {
		return effectiveState() === 'error' ? 'true' : undefined;
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
	{type}
	bind:value
	{id}
	{name}
	{minlength}
	{maxlength}
	{pattern}
	{autocomplete}
	{placeholder}
	{disabled}
	{readonly}
	{required}
	class={classes()}
	aria-invalid={ariaInvalid()}
	{oninput}
	{onchange}
	{onblur}
	{onfocus}
	{onkeydown}
/>

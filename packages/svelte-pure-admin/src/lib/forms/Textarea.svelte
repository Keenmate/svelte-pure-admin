<script lang="ts">
	/**
	 * Pure Admin Textarea Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 */

	import type { ThemeColor } from '../types';

	type TextareaSize = 'xs' | 'sm' | 'lg' | 'xl';
	type TextareaState = 'success' | 'warning' | 'error';

	interface Props {
		/** Textarea value */
		value?: string;
		/** Number of rows */
		rows?: number;
		/** Textarea size */
		size?: TextareaSize;
		/** Validation state - auto-derived from errors if not set */
		state?: TextareaState;
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
		/** Textarea ID */
		id?: string;
		/** Textarea name */
		name?: string;
		/** Additional CSS classes */
		class?: string;
		/** Input handler */
		oninput?: (event: Event & { currentTarget: HTMLTextAreaElement }) => void;
		/** Change handler */
		onchange?: (event: Event & { currentTarget: HTMLTextAreaElement }) => void;
		/** Blur handler */
		onblur?: (event: FocusEvent & { currentTarget: HTMLTextAreaElement }) => void;
		/** Focus handler */
		onfocus?: (event: FocusEvent & { currentTarget: HTMLTextAreaElement }) => void;
	}

	let {
		value = $bindable(''),
		rows = 4,
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
		class: className = '',
		oninput,
		onchange,
		onblur,
		onfocus
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

	// Compute aria-invalid for accessibility
	const ariaInvalid = $derived(() => {
		return hasErrors() && touched ? 'true' : undefined;
	});

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-textarea'];
		if (size) base.push(`pa-textarea--${size}`);
		// NOTE: core has no validation-border modifier for textarea (pa-textarea--success/
		// warning/error are phantom, dist=0). The state drives `aria-invalid` only; render
		// the visual error via the surrounding pa-form-group--error / pa-form-help--error.
		if (themeColor) base.push(`pa-textarea--color-${themeColor}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<textarea
	bind:value
	{id}
	{name}
	{rows}
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
></textarea>

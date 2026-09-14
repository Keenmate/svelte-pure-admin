<script lang="ts">
	/**
	 * Pure Admin Select Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 */

	import type { ThemeColor } from '../types';

	type SelectSize = 'xs' | 'sm' | 'lg' | 'xl';
	type SelectState = 'success' | 'warning' | 'error';

	interface Props {
		/**
		 * Select value. Scalar for a single select; bind an array when `multiple`
		 * is set (Svelte binds the list of selected option values).
		 */
		value?: string | number | Array<string | number>;
		/** Allow multiple selections — renders a native `<select multiple>`. */
		multiple?: boolean;
		/** Select size */
		size?: SelectSize;
		/** Validation state - auto-derived from errors if not set */
		state?: SelectState;
		/** Error messages from validation library (string or array of strings) */
		errors?: string | string[];
		/** Whether field has been touched/interacted with (controls when errors are shown) */
		touched?: boolean;
		/** Theme color variant (1-9) */
		themeColor?: ThemeColor;
		/** Disabled state */
		disabled?: boolean;
		/** Required field */
		required?: boolean;
		/** Select ID */
		id?: string;
		/** Select name */
		name?: string;
		/** Additional CSS classes */
		class?: string;
		/** Change handler */
		onchange?: (event: Event & { currentTarget: HTMLSelectElement }) => void;
		/** Children content (option elements) */
		children?: import('svelte').Snippet;
	}

	let {
		value = $bindable(),
		multiple = false,
		size,
		state,
		errors,
		touched = true,
		themeColor,
		disabled = false,
		required = false,
		id,
		name,
		class: className = '',
		onchange,
		children
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
		const base = ['pa-select'];
		if (size) base.push(`pa-select--${size}`);
		if (effectiveState()) base.push(`pa-select--${effectiveState()}`);
		if (themeColor) base.push(`pa-select--color-${themeColor}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<!-- Svelte requires `multiple` to be a static attribute alongside `bind:value`,
     so the two modes are separate branches rather than a dynamic attribute. -->
{#if multiple}
	<select multiple bind:value {id} {name} {disabled} {required} class={classes()} aria-invalid={ariaInvalid()} {onchange}>
		{@render children?.()}
	</select>
{:else}
	<select bind:value {id} {name} {disabled} {required} class={classes()} aria-invalid={ariaInvalid()} {onchange}>
		{@render children?.()}
	</select>
{/if}

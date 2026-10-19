<script lang="ts">
	/**
	 * Pure Admin CheckboxBox Component (Svelte 5)
	 * Low-level checkbox input + box pattern for use in composite components
	 *
	 * This is a building block component that renders:
	 * <span class="pa-checkbox">
	 *   <input type="checkbox" />
	 *   <span class="pa-checkbox__box"></span>
	 * </span>
	 *
	 * Used by: CheckboxListItem, Checkbox
	 */

	type CheckboxSize = 'xs' | 'sm' | 'lg' | 'xl';

	interface Props {
		/** Checkbox checked state */
		isChecked?: boolean;
		/** Indeterminate state (partial selection) */
		isIndeterminate?: boolean;
		/** Disabled state */
		isDisabled?: boolean;
		/** Use X mark instead of checkmark when checked */
		isXMark?: boolean;
		/** Checkbox size */
		size?: CheckboxSize;
		/** Checkbox ID */
		id?: string;
		/** Checkbox name */
		name?: string;
		/** Checkbox value */
		value?: string;
		/** Additional CSS classes */
		class?: string;
		/** Change handler */
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		isChecked = $bindable(false),
		isIndeterminate = false,
		isDisabled = false,
		isXMark = false,
		size,
		id,
		name,
		value,
		class: className = '',
		onchange
	}: Props = $props();

	let inputElement: HTMLInputElement;

	// Sync indeterminate property (can only be set via JS, not attribute)
	$effect(() => {
		if (inputElement) {
			inputElement.indeterminate = isIndeterminate;
		}
	});

	// Build class string for wrapper
	const wrapperClasses = $derived(() => {
		const base = ['pa-checkbox'];
		if (size) base.push(`pa-checkbox--${size}`);
		if (isXMark) base.push('pa-checkbox--x');
		if (isDisabled) base.push('pa-checkbox--disabled');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<!--
	Building block — renders a `<span class="pa-checkbox">`, NOT a `<label>`.
	Core's nested-in-list pattern (snippets/checkbox-lists.html) wraps the
	custom checkbox in a `<span class="pa-checkbox">` inside an outer
	`.pa-checkbox-list__label`; a `<label>` here would nest label-in-label
	(invalid HTML, ambiguous click target). The complete interactive control
	with its own label + text is `<Checkbox>`. `.pa-checkbox` styling is
	element-agnostic — the SCSS targets the class, so span works identically.
-->
<span class={wrapperClasses()}>
	<input
		bind:this={inputElement}
		type="checkbox"
		bind:checked={isChecked}
		{id}
		{name}
		{value}
		disabled={isDisabled}
		{onchange}
	/>
	<span class="pa-checkbox__box"></span>
</span>

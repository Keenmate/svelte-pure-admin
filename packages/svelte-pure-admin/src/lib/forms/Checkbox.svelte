<script lang="ts">
	/**
	 * Pure Admin Checkbox Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * Uses the custom tri-state checkbox pattern from pure-admin-visual:
	 * - Supports checked, unchecked, and indeterminate states
	 * - X-mark variant (shows X instead of checkmark when checked)
	 * - Size variants (xs, sm, default, lg, xl)
	 *
	 * This is a labeled checkbox (label wraps the box).
	 * For the raw checkbox without label wrapper, use CheckboxBox.
	 */

	type CheckboxSize = 'xs' | 'sm' | 'lg' | 'xl';
	type CheckboxLabelPosition = 'end' | 'start' | 'top';

	interface Props {
		/** Checkbox checked state */
		checked?: boolean;
		/** Indeterminate state (partial selection) */
		isIndeterminate?: boolean;
		/** Disabled state */
		disabled?: boolean;
		/** Required field — core turns the native `required` attribute into the asterisk */
		required?: boolean;
		/** Use X mark instead of checkmark when checked */
		isXMark?: boolean;
		/** Checkbox size */
		size?: CheckboxSize;
		/**
		 * Label position relative to the box → `pa-checkbox--label-{position}`.
		 * `end` is the visual default; leave unset for a classless default, or set
		 * it explicitly to emit the (redundant but valid) `--label-end` modifier.
		 */
		labelPosition?: CheckboxLabelPosition;
		/** Checkbox ID (required for label association) */
		id: string;
		/** Checkbox name */
		name?: string;
		/** Checkbox value */
		value?: string;
		/** Label text */
		labelText?: string;
		/** Additional CSS classes for wrapper */
		class?: string;
		/** Inline style on the wrapper — e.g. `--base-icon-check` / `--base-icon-indeterminate` glyph overrides. */
		style?: string;
		/** Label snippet (alternative to label prop for custom label content) */
		labelSnippet?: import('svelte').Snippet;
		/** Change handler */
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		checked = $bindable(false),
		isIndeterminate = false,
		disabled = false,
		required = false,
		isXMark = false,
		size,
		labelPosition,
		id,
		name,
		value,
		labelText,
		class: className = '',
		style,
		labelSnippet,
		onchange
	}: Props = $props();

	let inputElement: HTMLInputElement;

	// Sync indeterminate property (can only be set via JS, not attribute)
	$effect(() => {
		if (inputElement) {
			inputElement.indeterminate = isIndeterminate;
		}
	});

	// Build class string for wrapper (using pa-checkbox pattern)
	const wrapperClasses = $derived(() => {
		const base = ['pa-checkbox'];
		if (size) base.push(`pa-checkbox--${size}`);
		if (isXMark) base.push('pa-checkbox--x');
		// All three positions exist in core (`--label-end` is the default, so it's
		// redundant but valid); emit whichever is explicitly set. A checkbox with no
		// `labelPosition` stays classless (= end).
		if (labelPosition) base.push(`pa-checkbox--label-${labelPosition}`);
		if (disabled) base.push('pa-checkbox--disabled');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<label class={wrapperClasses()} {style}>
	<input
		bind:this={inputElement}
		type="checkbox"
		bind:checked
		{id}
		{name}
		{value}
		{disabled}
		{required}
		{onchange}
	/>
	<span class="pa-checkbox__box"></span>
	{#if labelSnippet}
		<span class="pa-checkbox__label">
			{@render labelSnippet()}
		</span>
	{:else if labelText}
		<span class="pa-checkbox__label">{labelText}</span>
	{/if}
</label>

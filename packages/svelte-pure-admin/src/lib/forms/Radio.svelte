<script lang="ts">
	/**
	 * Pure Admin Radio Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * Canonical pa-radio label pattern (snippets/forms.html) — the text is
	 * wrapped in a `pa-radio__label` span (required for label positioning and the
	 * `:has(input:required) .pa-radio__label::after` asterisk):
	 * <label class="pa-radio">
	 *   <input type="radio" ...>
	 *   <span class="pa-radio__label">Label text</span>
	 * </label>
	 */

	type RadioSize = 'xs' | 'sm' | 'lg' | 'xl';
	type RadioLabelPlacement = 'end' | 'start' | 'top';

	interface Props {
		/** Radio group value (bindable) */
		group?: string | number;
		/** Radio value */
		value: string | number;
		/** Disabled state */
		isDisabled?: boolean;
		/** Required field — core turns the native `required` attribute into the group asterisk */
		isRequired?: boolean;
		/** Radio name (group name) */
		name: string;
		/** Radio size */
		size?: RadioSize;
		/**
		 * Label position relative to the input → `pa-radio--label-{position}`.
		 * `end` is the visual default; leave unset for a classless default, or set
		 * it explicitly to emit the (redundant but valid) `--label-end` modifier.
		 */
		labelPlacement?: RadioLabelPlacement;
		/** Label text */
		labelText?: string;
		/** Additional CSS classes for wrapper */
		class?: string;
		/** Label snippet (alternative to label prop for custom content) */
		label?: import('svelte').Snippet;
		/** Change handler */
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		group = $bindable(),
		value,
		isDisabled = false,
		isRequired = false,
		name,
		size,
		labelPlacement,
		labelText,
		class: className = '',
		label,
		onchange
	}: Props = $props();

	// Build class string for label wrapper
	const wrapperClasses = $derived(() => {
		const base = ['pa-radio'];
		if (size) base.push(`pa-radio--${size}`);
		// All three positions exist in core (`--label-end` is the default, so it's
		// redundant but valid); emit whichever is explicitly set. A radio with no
		// `labelPlacement` stays classless (= end).
		if (labelPlacement) base.push(`pa-radio--label-${labelPlacement}`);
		// Disabled = `.pa-radio--disabled` on the label AND the native `disabled`
		// attribute on the <input>, same as Checkbox (core fixture radio.json).
		if (isDisabled) base.push('pa-radio--disabled');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<label class={wrapperClasses()}>
	<input
		type="radio"
		bind:group
		{value}
		{name}
		disabled={isDisabled}
		required={isRequired}
		{onchange}
	/>
	{#if label}
		<span class="pa-radio__label">{@render label()}</span>
	{:else if labelText}
		<span class="pa-radio__label">{labelText}</span>
	{/if}
</label>

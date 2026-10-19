<script lang="ts">
	/**
	 * Pure Admin ColorInput Component (Svelte 5)
	 * Specialized input for color selection
	 */

	type InputSize = 'xs' | 'sm' | 'lg' | 'xl';

	interface Props {
		/** Color value as hex string (bindable) */
		value?: string;
		/** Input size */
		size?: InputSize;
		/** Disabled state */
		isDisabled?: boolean;
		/** Input ID */
		id?: string;
		/** Input name */
		name?: string;
		/** Show hex value next to picker */
		hasValue?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Input handler */
		oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		/** Change handler */
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		value = $bindable('#000000'),
		size,
		isDisabled = false,
		id,
		name,
		hasValue = false,
		class: className = '',
		oninput,
		onchange
	}: Props = $props();

	// Build class string. Core has no `pa-input--color` modifier — the native
	// colour input is styled by the base `.pa-input` (`pa-input--color-{1..9}` is a
	// theme-colour BORDER modifier, unrelated to `<input type=color>`). Only the
	// size modifiers are real.
	const classes = $derived(() => {
		const base = ['pa-input'];
		if (size) base.push(`pa-input--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if hasValue}
	<!-- Core ships no colour-input wrapper (`pa-color-wrapper` / `pa-color-value`
	     are phantoms). Use the real `pa-input-group` addon layout: the swatch is the
	     `.pa-input`, the hex value is an `__append` addon. -->
	<div class="pa-input-group">
		<input
			type="color"
			bind:value
			{id}
			{name}
			disabled={isDisabled}
			class={classes()}
			{oninput}
			{onchange}
		/>
		<span class="pa-input-group__append">{value}</span>
	</div>
{:else}
	<input
		type="color"
		bind:value
		{id}
		{name}
		disabled={isDisabled}
		class={classes()}
		{oninput}
		{onchange}
	/>
{/if}

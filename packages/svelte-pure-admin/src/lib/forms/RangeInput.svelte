<script lang="ts">
	/**
	 * Pure Admin RangeInput Component (Svelte 5)
	 * Specialized input for range sliders
	 */

	import type { ThemeColor } from '../types';

	type InputSize = 'xs' | 'sm' | 'lg' | 'xl';
	type InputState = 'success' | 'warning' | 'error';

	interface Props {
		/** Current value (bindable) */
		value?: number;
		/** Input size */
		size?: InputSize;
		/** Validation state */
		validation?: InputState;
		/** Theme color variant (1-9) */
		themeColor?: ThemeColor;
		/** Disabled state */
		isDisabled?: boolean;
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
		/** Show value label */
		hasValue?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Input handler */
		oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		/** Change handler */
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		value = $bindable(50),
		size,
		validation,
		themeColor,
		isDisabled = false,
		id,
		name,
		min = 0,
		max = 100,
		step = 1,
		hasValue = false,
		class: className = '',
		oninput,
		onchange
	}: Props = $props();

	// Build class string. Core has no `pa-input--range` modifier (the blessed slider
	// is the div-based `pa-range` / `pa-range-group` — see RangeGroup). This is a thin
	// native `<input type=range>` on the base `.pa-input`; only size / state /
	// theme-colour modifiers are real.
	const classes = $derived(() => {
		const base = ['pa-input'];
		if (size) base.push(`pa-input--${size}`);
		if (validation) base.push(`pa-input--${validation}`);
		if (themeColor) base.push(`pa-input--color-${themeColor}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if hasValue}
	<!-- Core ships no native-range wrapper (`pa-range-wrapper` / `pa-range-value` are
	     phantoms — those live on the div-based `pa-range` slider). Use the real
	     `pa-input-group` addon layout. -->
	<div class="pa-input-group">
		<input
			type="range"
			bind:value
			{id}
			{name}
			{min}
			{max}
			{step}
			disabled={isDisabled}
			class={classes()}
			{oninput}
			{onchange}
		/>
		<span class="pa-input-group__append">{value}</span>
	</div>
{:else}
	<input
		type="range"
		bind:value
		{id}
		{name}
		{min}
		{max}
		{step}
		disabled={isDisabled}
		class={classes()}
		{oninput}
		{onchange}
	/>
{/if}

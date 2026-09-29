<script lang="ts">
	/**
	 * Pure Admin CheckboxListItem Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/checkbox-lists.html
	 * Individual checkbox list item with label, description, and actions
	 */

	import CheckboxBox from '../forms/CheckboxBox.svelte';

	type ItemState = 'disabled' | 'locked';

	interface Props {
		/** Checkbox ID (required for label association) */
		id: string;
		/** Checkbox label text */
		labelText: string;
		/** Optional description text */
		descriptionText?: string;
		/** Item state */
		state?: ItemState;
		/** Selected/highlighted row (pa-checkbox-list__item--selected; orthogonal to state) */
		isSelected?: boolean;
		/** Checked state (bindable) */
		checked?: boolean;
		/** Disabled state */
		disabled?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Change callback */
		onchange?: (checked: boolean) => void;
		/** Actions snippet (buttons, etc.) */
		actions?: import('svelte').Snippet;
	}

	let {
		id,
		labelText,
		descriptionText,
		state,
		isSelected = false,
		checked = $bindable(false),
		disabled = false,
		class: className = '',
		onchange,
		actions
	}: Props = $props();

	// Build class string for item
	const itemClasses = $derived(() => {
		const base = ['pa-checkbox-list__item'];

		// State modifiers
		if (state === 'disabled') base.push('pa-checkbox-list__item--disabled');
		if (state === 'locked') base.push('pa-checkbox-list__item--locked');
		if (isSelected) base.push('pa-checkbox-list__item--selected');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});

	// Handle checkbox change
	function handleChange(event: Event & { currentTarget: HTMLInputElement }) {
		checked = event.currentTarget.checked;
		onchange?.(checked);
	}

	// Determine if checkbox should be disabled
	const isDisabled = $derived(disabled || state === 'disabled' || state === 'locked');
</script>

<li class={itemClasses()}>
	<label class="pa-checkbox-list__label">
		<CheckboxBox
			{id}
			bind:checked
			disabled={isDisabled}
			onchange={handleChange}
		/>
		<span class="pa-checkbox-list__text">
			{labelText}
			{#if descriptionText}
				<span class="pa-checkbox-list__description">{descriptionText}</span>
			{/if}
		</span>
	</label>

	{#if actions}
		<div class="pa-checkbox-list__actions">
			{@render actions()}
		</div>
	{/if}
</li>

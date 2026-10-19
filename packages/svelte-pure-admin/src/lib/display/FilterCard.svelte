<script lang="ts">
	/**
	 * Pure Admin FilterCard Component (Svelte 5)
	 * Expandable filter card with inline filters and collapsible advanced section
	 * Based on @keenmate/pure-admin-core table-filters pattern
	 */
	import { _ } from '../i18n';
	import Button from '../buttons/Button.svelte';

	interface Props {
		/** Whether advanced filters are expanded */
		isExpanded?: boolean;
		/** Show the expand/collapse toggle button */
		hasToggle?: boolean;
		/** Show the clear all button */
		hasClear?: boolean;
		/** Show the refresh button */
		hasRefresh?: boolean;
		/** Show Apply/Clear buttons in advanced section footer */
		hasAdvancedActions?: boolean;
		/** Disable all filter inputs */
		isDisabled?: boolean;
		/** Loading state (disables inputs and shows loading indicator) */
		isLoading?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Clear all filters callback */
		onclear?: () => void;
		/** Refresh callback */
		onrefresh?: () => void;
		/** Apply filters callback (for advanced filters) */
		onapply?: () => void;
		/** Toggle expanded callback */
		ontoggle?: (expanded: boolean) => void;
		/** Main inline filters (search inputs, selects, etc.) */
		filters?: import('svelte').Snippet;
		/** Advanced filters section (shown when expanded) */
		advancedFilters?: import('svelte').Snippet;
		/** Custom action buttons (rendered before toggle button) */
		actions?: import('svelte').Snippet;
	}

	let {
		isExpanded = $bindable(false),
		hasToggle = true,
		hasClear = true,
		hasRefresh = true,
		hasAdvancedActions = true,
		isDisabled = false,
		isLoading = false,
		class: className = '',
		onclear,
		onrefresh,
		onapply,
		ontoggle,
		filters,
		advancedFilters,
		actions
	}: Props = $props();

	function handleToggle() {
		isExpanded = !isExpanded;
		ontoggle?.(isExpanded);
	}

	function handleClear() {
		onclear?.();
	}

	function handleRefresh() {
		onrefresh?.();
	}

	function handleApply() {
		onapply?.();
	}

	function handleClearAdvanced() {
		onclear?.();
	}

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-card', 'pa-filter-card'];
		if (isLoading) base.push('pa-filter-card--loading');
		if (isDisabled) base.push('pa-filter-card--disabled');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Has advanced filters
	const hasAdvanced = $derived(!!advancedFilters);
</script>

<div class={classes()}>
	<div class="pa-card__body">
		<!-- Main filter row -->
		<div class="pa-filter-card__row">
			{#if filters}
				<div class="pa-filter-card__filters">
					{@render filters()}
				</div>
			{/if}

			<!-- Action buttons: toggle (left), clear, refresh (right) -->
			<div class="pa-filter-card__actions">
				{#if hasToggle && hasAdvanced}
					<Button
						variant="primary"
						isIconOnly
						titleText={isExpanded ? $_('pureAdmin.buttons.hideFilters') : $_('pureAdmin.buttons.moreFilters')}
						onclick={handleToggle}
						isDisabled={isDisabled}
					>
						<span class="pa-icon" class:pa-icon--chevron-up={isExpanded} class:pa-icon--chevron-down={!isExpanded} aria-hidden="true"></span>
					</Button>
				{/if}

				{#if actions}
					{@render actions()}
				{/if}

				{#if hasClear}
					<Button
						variant="secondary"
						isIconOnly
						titleText={$_('pureAdmin.buttons.clearAll')}
						onclick={handleClear}
						isDisabled={isDisabled}
					>
						<span class="pa-icon pa-icon--clear" aria-hidden="true"></span>
					</Button>
				{/if}

				{#if hasRefresh}
					<Button
						variant="primary"
						isIconOnly
						titleText={$_('pureAdmin.buttons.refresh')}
						onclick={handleRefresh}
						isDisabled={isDisabled || isLoading}
					>
						<span class="pa-icon pa-icon--refresh" aria-hidden="true"></span>
					</Button>
				{/if}
			</div>
		</div>

		<!-- Advanced filters (collapsible) -->
		{#if hasAdvanced && isExpanded}
			<div class="pa-filter-card__advanced">
				{@render advancedFilters?.()}

				{#if hasAdvancedActions}
					<div class="pa-filter-card__advanced-actions">
						<Button variant="secondary" onclick={handleClearAdvanced} isDisabled={isDisabled}>
							{$_('pureAdmin.buttons.clearFilters')}
						</Button>
						<Button variant="primary" onclick={handleApply} isDisabled={isDisabled || isLoading}>
							{$_('pureAdmin.buttons.applyFilters')}
						</Button>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<!--
	No scoped <style>: all `.pa-filter-card__*` layout + `--loading` / `--disabled`
	state live in core's `_filter-card.scss`, loaded globally like every other
	component. The removed block duplicated core but drifted — it omitted core's
	`__filters > * { flex:1; min-width:200px }` stretch rule and hardcoded the
	advanced-block spacing at 1rem where core uses $spacing-md (0.75rem). Relying
	on core keeps the component in lockstep with the framework and drops the
	Svelte scoping-class noise from the emitted markup.
-->

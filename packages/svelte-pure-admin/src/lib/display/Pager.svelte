<script lang="ts">
	/**
	 * Pure Admin Pager Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tables.html
	 * Pagination component for tables
	 */

	import { _ } from '../i18n';

	type PagerAlign = 'start' | 'center' | 'end';

	interface Props {
		/** Current page number */
		currentPage?: number;
		/** Total number of pages */
		totalPages?: number;
		/** Alignment (default: center) */
		align?: PagerAlign;
		/** Show page input */
		showPageInput?: boolean;
		/** Show info text */
		showInfo?: boolean;
		/** Previous button click callback */
		onprevious?: (event: MouseEvent) => void;
		/** Next button click callback */
		onnext?: (event: MouseEvent) => void;
		/** Page change callback (from input) */
		onpagechange?: (page: number) => void;
		/** First button click callback */
		onfirst?: (event: MouseEvent) => void;
		/** Last button click callback */
		onlast?: (event: MouseEvent) => void;
		/** Disable previous button */
		disablePrevious?: boolean;
		/** Disable next button */
		disableNext?: boolean;
		/** Custom info text */
		infoText?: string;
		/** First-button label (default: i18n 'pager.first') */
		firstText?: string;
		/** Previous-button label (default: i18n 'pager.previous') */
		previousText?: string;
		/** Next-button label (default: i18n 'pager.next') */
		nextText?: string;
		/** Last-button label (default: i18n 'pager.last') */
		lastText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Custom controls (buttons) snippet */
		controls?: import('svelte').Snippet;
		/** Custom info snippet */
		info?: import('svelte').Snippet;
	}

	let {
		currentPage = $bindable(1),
		totalPages = 1,
		align = 'center',
		showPageInput = true,
		showInfo = true,
		onprevious,
		onnext,
		onpagechange,
		onfirst,
		onlast,
		disablePrevious = false,
		disableNext = false,
		infoText,
		firstText,
		previousText,
		nextText,
		lastText,
		class: className = '',
		controls,
		info
	}: Props = $props();

	// Resolve labels: explicit prop wins, else i18n
	const resolvedFirst = $derived(firstText ?? $_('pureAdmin.pager.first'));
	const resolvedPrevious = $derived(previousText ?? $_('pureAdmin.pager.previous'));
	const resolvedNext = $derived(nextText ?? $_('pureAdmin.pager.next'));
	const resolvedLast = $derived(lastText ?? $_('pureAdmin.pager.last'));

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-pager'];
		if (align === 'start') base.push('pa-pager--start');
		if (align === 'end') base.push('pa-pager--end');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Handle page input change
	function handlePageInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const page = parseInt(target.value, 10);
		if (!isNaN(page) && page >= 1 && page <= totalPages) {
			currentPage = page;
			if (onpagechange) onpagechange(page);
		} else {
			// Reset to current page if invalid
			target.value = currentPage.toString();
		}
	}
</script>

<div class={classes()}>
	<div class="pa-pager__container">
		{#if controls}
			{@render controls()}
		{:else}
			<div class="pa-pager__controls">
				{#if onfirst}
					<button class="pa-btn pa-btn--sm pa-btn--secondary" onclick={onfirst} disabled={disablePrevious}>
						{resolvedFirst}
					</button>
				{/if}
				<button class="pa-btn pa-btn--sm pa-btn--secondary" onclick={onprevious} disabled={disablePrevious}>
					{resolvedPrevious}
				</button>
				<button class="pa-btn pa-btn--sm pa-btn--secondary" onclick={onnext} disabled={disableNext}>
					{resolvedNext}
				</button>
				{#if onlast}
					<button class="pa-btn pa-btn--sm pa-btn--secondary" onclick={onlast} disabled={disableNext}>
						{resolvedLast}
					</button>
				{/if}
			</div>
		{/if}

		{#if info}
			{@render info()}
		{:else if showInfo && showPageInput}
			<div class="pa-pager__info">
				<span class="pa-pager__text">{$_('pureAdmin.pager.page')}</span>
				<input
					type="number"
					class="pa-input pa-input--sm pa-pager__input"
					value={currentPage}
					min="1"
					max={totalPages}
					onchange={handlePageInput}
				/>
				<span class="pa-pager__text">{$_('pureAdmin.pager.of')} {totalPages}</span>
			</div>
		{:else if infoText}
			<span class="pa-pager__text">{infoText}</span>
		{/if}
	</div>
</div>

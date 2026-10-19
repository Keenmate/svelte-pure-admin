<script lang="ts">
	/**
	 * Pure Admin Pager Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tables.html
	 * Pagination component for tables
	 */

	import { _ } from '../i18n';

	type PagerJustify = 'start' | 'center' | 'end';

	interface Props {
		/** Current page number */
		currentPage?: number;
		/** Total number of pages */
		totalPages?: number;
		/** Alignment (default: center) */
		justify?: PagerJustify;
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
		/** Where the info sits relative to the controls: 'end' (default, after) or 'start' (before) */
		infoPosition?: 'start' | 'end';
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
		/** Rich First-button content — overrides firstText */
		first?: import('svelte').Snippet;
		/** Rich Previous-button content — overrides previousText */
		previous?: import('svelte').Snippet;
		/** Rich Next-button content — overrides nextText */
		next?: import('svelte').Snippet;
		/** Rich Last-button content — overrides lastText */
		last?: import('svelte').Snippet;
	}

	let {
		currentPage = $bindable(1),
		totalPages = 1,
		justify = 'center',
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
		infoPosition = 'end',
		firstText,
		previousText,
		nextText,
		lastText,
		class: className = '',
		controls,
		info,
		first,
		previous,
		next,
		last
	}: Props = $props();

	// Resolve labels: explicit prop wins, else i18n
	const resolvedFirst = $derived(firstText ?? $_('pureAdmin.pager.first'));
	const resolvedPrevious = $derived(previousText ?? $_('pureAdmin.pager.previous'));
	const resolvedNext = $derived(nextText ?? $_('pureAdmin.pager.next'));
	const resolvedLast = $derived(lastText ?? $_('pureAdmin.pager.last'));

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-pager'];
		if (justify === 'start') base.push('pa-pager--start');
		if (justify === 'end') base.push('pa-pager--end');
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

{#snippet infoBlock()}
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
{/snippet}

<div class={classes()}>
	<div class="pa-pager__container">
		{#if infoPosition === 'start'}
			{@render infoBlock()}
		{/if}
		{#if controls}
			{@render controls()}
		{:else}
			<div class="pa-pager__controls">
				{#if onfirst}
					<button class="pa-btn pa-btn--sm pa-btn--secondary" onclick={onfirst} disabled={disablePrevious}>
						{#if first}{@render first()}{:else}{resolvedFirst}{/if}
					</button>
				{/if}
				<button class="pa-btn pa-btn--sm pa-btn--secondary" onclick={onprevious} disabled={disablePrevious}>
					{#if previous}{@render previous()}{:else}{resolvedPrevious}{/if}
				</button>
				<button class="pa-btn pa-btn--sm pa-btn--secondary" onclick={onnext} disabled={disableNext}>
					{#if next}{@render next()}{:else}{resolvedNext}{/if}
				</button>
				{#if onlast}
					<button class="pa-btn pa-btn--sm pa-btn--secondary" onclick={onlast} disabled={disableNext}>
						{#if last}{@render last()}{:else}{resolvedLast}{/if}
					</button>
				{/if}
			</div>
		{/if}

		{#if infoPosition !== 'start'}
			{@render infoBlock()}
		{/if}
	</div>
</div>

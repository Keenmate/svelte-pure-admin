<script lang="ts">
	/**
	 * Internal engine renderer for RangeGroup — renders the BEM markup from `rows`
	 * and drives range-group.js (init-once). The public <RangeGroup> wraps this in
	 * `{#key}` so a fresh instance re-seeds the sliders when values change from the
	 * outside (querystring back/forward, translated rows). Do not use directly.
	 */
	import { onMount } from 'svelte';
	import { _ } from '../i18n';
	import { loadCoreJs } from '../internal/core-js';
	import type { RangeGroupRow, RangeGroupValues } from './range-group-types';

	interface Props {
		rows: RangeGroupRow[];
		ariaLabel: string;
		panelStyle?: string;
		resetText?: string;
		applyText?: string;
		hasActions?: boolean;
		class?: string;
		onchange?: (values: RangeGroupValues) => void;
		onapply?: (values: RangeGroupValues) => void;
		onreset?: (values: RangeGroupValues) => void;
	}

	let {
		rows,
		ariaLabel,
		panelStyle,
		resetText,
		applyText,
		hasActions = true,
		class: className = '',
		onchange,
		onapply,
		onreset
	}: Props = $props();

	// display:contents host so PaRangeGroup.init (which scans descendants for
	// [data-range-group]) can find the root without adding a layout box.
	let hostEl: HTMLDivElement;

	const rootClasses = $derived(className ? `pa-range-group ${className}` : 'pa-range-group');

	function rangeClasses(row: RangeGroupRow): string {
		const base = ['pa-range'];
		if (row.mode === 'single') base.push('pa-range--single');
		if (row.handleType) base.push(`pa-range--handle-${row.handleType}`);
		return base.join(' ');
	}

	onMount(() => {
		const rootEl = hostEl.querySelector<HTMLElement>('.pa-range-group');
		if (!rootEl) return;

		const handleChange = (e: Event) =>
			onchange?.((e as CustomEvent<{ values: RangeGroupValues }>).detail.values);
		const handleApply = (e: Event) =>
			onapply?.((e as CustomEvent<{ values: RangeGroupValues }>).detail.values);
		const handleReset = (e: Event) =>
			onreset?.((e as CustomEvent<{ values: RangeGroupValues }>).detail.values);

		rootEl.addEventListener('pa-range-group:change', handleChange);
		rootEl.addEventListener('pa-range-group:apply', handleApply);
		rootEl.addEventListener('pa-range-group:reset', handleReset);

		loadCoreJs('range-group').then(() => window.PaRangeGroup?.init(hostEl));

		return () => {
			rootEl.removeEventListener('pa-range-group:change', handleChange);
			rootEl.removeEventListener('pa-range-group:apply', handleApply);
			rootEl.removeEventListener('pa-range-group:reset', handleReset);
		};
	});
</script>

<div bind:this={hostEl} style="display: contents;">
	<div class={rootClasses} data-range-group>
		<button
			type="button"
			class="pa-range-group__toggle"
			data-range-group-toggle
			aria-expanded="false"
			aria-label={ariaLabel}
		>
			<span class="pa-range-group__summary" data-range-group-summary></span>
			<span class="pa-range-group__caret" aria-hidden="true"></span>
		</button>

		<div
			class="pa-range-group__panel"
			data-range-group-panel
			role="dialog"
			aria-label={ariaLabel}
			style={panelStyle}
		>
			{#each rows as row (row.key)}
				<div class="pa-range-group__row">
					<div class="pa-range-group__row-head">
						<span class="pa-range-group__row-label">{row.rowLabelText || row.labelText}</span>
						<span class="pa-range-group__row-value" data-range-output>{row.outputText ?? ''}</span>
					</div>
					<div
						class={rangeClasses(row)}
						data-range
						data-key={row.key}
						data-label={row.labelText}
						data-min={row.min}
						data-max={row.max}
						data-step={row.step}
						data-mode={row.mode === 'single' ? 'single' : undefined}
						data-bound={row.mode === 'single' ? row.bound : undefined}
						data-value={row.mode === 'single' ? row.value : undefined}
						data-value-min={row.mode === 'single' ? undefined : row.valueMin}
						data-value-max={row.mode === 'single' ? undefined : row.valueMax}
						data-prefix={row.prefix}
						data-suffix={row.suffix}
						data-thousands={row.hasThousandsSeparator ? '' : undefined}
						data-ticks={row.ticks}
						data-ticks-minor={row.ticksMinor}
						data-tick-labels={row.hasTickLabels ? '' : undefined}
						data-snap-ticks={row.shouldSnapToTicks ? '' : undefined}
					>
						<div class="pa-range__rail">
							<div class="pa-range__track"></div>
							<div class="pa-range__fill" data-range-fill></div>
							<button
								type="button"
								class="pa-range__thumb pa-range__thumb--min"
								data-range-thumb="min"
								aria-label={row.mode === 'single' ? undefined : `Minimum ${row.labelText}`}
								aria-hidden={row.mode === 'single' ? 'true' : undefined}
							></button>
							<!-- Both thumbs carry their BEM modifier per the core snippet's
							     blessed shape (`--min`/`--max`). `--max` has no own CSS rule
							     today, but the framework keeps it in the markup; JS keys off
							     `data-range-thumb`. -->
							<button
								type="button"
								class="pa-range__thumb pa-range__thumb--max"
								data-range-thumb="max"
								aria-label={row.mode === 'single' ? `Minimum ${row.labelText}` : `Maximum ${row.labelText}`}
							></button>
						</div>
					</div>
				</div>
			{/each}

			{#if hasActions}
				<div class="pa-range-group__actions">
					<button type="button" class="pa-btn pa-btn--sm pa-btn--ghost" data-range-group-reset>{resetText ?? $_('pureAdmin.buttons.reset')}</button>
					<button type="button" class="pa-btn pa-btn--sm pa-btn--primary" data-range-group-apply>{applyText ?? $_('pureAdmin.buttons.apply')}</button>
				</div>
			{/if}
		</div>
	</div>
</div>

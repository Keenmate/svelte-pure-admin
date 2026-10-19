<script lang="ts" module>
	/** Visible-column identifier in a KpiStrip. */
	export type KpiStripColumn = 'metric' | 'now' | 'previousValue' | 'deltaPercent' | 'targetBar';
</script>

<script lang="ts">
	/**
	 * Pure Admin KPI Numeric Strip (Svelte 5)
	 * Based on @keenmate/pure-admin-core 2.7.1 _kpi-numeric-strip.scss
	 *
	 * Wide-only table-card. Default 5-col layout
	 * (metric · now · previousValue · deltaPercent · targetBar). previousValue /
	 * deltaPercent / targetBar are independently optional via the matching
	 * `hasPreviousValue` / `hasDeltaPercent` / `hasTargetBar` flags (default `true`; `false` emits the
	 * upstream `pa-kpi-strip--no-prev` / `--no-delta` / `--no-target` modifiers). `metric` and `now` are always present.
	 *
	 * The header row is auto-generated from the visible columns — no raw
	 * pa-kpi-strip__head markup needed in consumer code. Override individual
	 * labels via `headerLabels`, suppress the header via `hasHeader={false}`, or
	 * fully replace it via the `head` snippet.
	 */

	const NUMERIC_COLUMNS: ReadonlySet<KpiStripColumn> = new Set(['now', 'previousValue', 'deltaPercent']);

	// Core (`_kpi-numeric-strip.scss`) blesses only the short head modifiers
	// `--prev` / `--delta` / `--target` (the `--no-*` hide rules target these);
	// `metric` / `now` head cells carry no column modifier. Mirror the core
	// snippet's head cells so the markup matches the blessed shape.
	const HEAD_MODIFIERS: Partial<Record<KpiStripColumn, string>> = {
		previousValue: 'prev',
		deltaPercent: 'delta',
		targetBar: 'target'
	};

	const DEFAULT_HEADER_LABELS: Record<KpiStripColumn, string> = {
		metric: 'Metric',
		now: 'Now',
		previousValue: 'Prev',
		deltaPercent: 'Δ%',
		targetBar: 'vs Target'
	};

	interface Props {
		/** Card title in the header. */
		titleText?: string;
		/** Show the LIVE pill (animated green dot) next to the title. */
		isLive?: boolean;
		/** Footer caption (plain string). Override via the `footer` snippet for richer markup. */
		footerText?: string;

		/** Show the previous-value column (default `true`; `false` emits `pa-kpi-strip--no-prev`). */
		hasPreviousValue?: boolean;
		/** Show the Δ% column (default `true`; `false` emits `pa-kpi-strip--no-delta`). */
		hasDeltaPercent?: boolean;
		/** Show the target bar column (default `true`; `false` emits `pa-kpi-strip--no-target`). */
		hasTargetBar?: boolean;

		/** Render the auto-generated header row (default `true`). */
		hasHeader?: boolean;
		/** Override individual header labels. Keys are column identifiers; provide only the labels you want to change. */
		headerLabels?: Partial<Record<KpiStripColumn, string>>;

		/** Additional CSS classes appended to the card. */
		class?: string;

		/** Fully replace the auto-generated header with custom markup. Wins over `headerLabels` / `hasHeader`. */
		head?: import('svelte').Snippet;
		/** Row content (KpiStripRow instances). */
		children?: import('svelte').Snippet;
		/** Footer snippet override. Takes precedence over `footerText`. */
		footer?: import('svelte').Snippet;
	}

	let {
		titleText,
		isLive = false,
		footerText,
		hasPreviousValue = true,
		hasDeltaPercent = true,
		hasTargetBar = true,
		hasHeader = true,
		headerLabels = {},
		class: className = '',
		head,
		children,
		footer
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-card', 'pa-kpi-strip'];
		if (!hasPreviousValue) base.push('pa-kpi-strip--no-prev');
		if (!hasDeltaPercent) base.push('pa-kpi-strip--no-delta');
		if (!hasTargetBar) base.push('pa-kpi-strip--no-target');
		if (className) base.push(className);
		return base.join(' ');
	});

	/** Columns visible in this strip, in source order, after applying the toggles. */
	const visibleColumns = $derived.by((): KpiStripColumn[] => {
		const cols: KpiStripColumn[] = ['metric', 'now'];
		if (hasPreviousValue) cols.push('previousValue');
		if (hasDeltaPercent) cols.push('deltaPercent');
		if (hasTargetBar) cols.push('targetBar');
		return cols;
	});

	const labelOf = (col: KpiStripColumn) => headerLabels[col] ?? DEFAULT_HEADER_LABELS[col];
</script>

<div class={classes()}>
	{#if titleText || isLive}
		<div class="pa-card__header pa-kpi-header">
			{#if titleText}<div class="pa-card__title"><h3 class="pa-card__title-text">{titleText}</h3></div>{/if}
			{#if isLive}
				<span class="pa-kpi-live"><span class="pa-kpi-live__dot"></span>LIVE</span>
			{/if}
		</div>
	{/if}

	<div class="pa-card__body pa-kpi-strip__body">
		{#if head}
			<div class="pa-kpi-strip__head-row">
				{@render head()}
			</div>
		{:else if hasHeader}
			<div class="pa-kpi-strip__head-row">
				{#each visibleColumns as col (col)}
					<div
						class="pa-kpi-strip__head"
						class:pa-kpi-strip__head--num={NUMERIC_COLUMNS.has(col)}
						class:pa-kpi-strip__head--prev={HEAD_MODIFIERS[col] === 'prev'}
						class:pa-kpi-strip__head--delta={HEAD_MODIFIERS[col] === 'delta'}
						class:pa-kpi-strip__head--target={HEAD_MODIFIERS[col] === 'target'}
					>
						{labelOf(col)}
					</div>
				{/each}
			</div>
		{/if}
		{@render children?.()}
	</div>

	{#if footer || footerText}
		<div class="pa-card__footer pa-kpi-footer">
			{#if footer}
				{@render footer()}
			{:else}
				<span>{footerText}</span>
			{/if}
		</div>
	{/if}
</div>

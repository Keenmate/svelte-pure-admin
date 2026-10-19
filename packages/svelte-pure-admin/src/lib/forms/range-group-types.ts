/**
 * Shared types for RangeGroup (kept separate so RangeGroup.svelte,
 * RangeGroupCore.svelte, and range-group-qs.ts can all import them without
 * a component ↔ component circular dependency).
 */

/** Handle type — the predefined thumb design (cosmetic, per row). */
export type RangeHandleType = 'rect' | 'bar' | 'arrow' | 'needle';

/** One dimension in the range group. Mirrors the `data-*` config on `.pa-range`. */
export interface RangeGroupRow {
	/** Identity key — the row's entry key in the emitted `values` payload. */
	key: string;
	/** Visible label (summary segment + row head unless rowLabelText overrides it). */
	labelText: string;
	/** Row-head label override (defaults to labelText). */
	rowLabelText?: string;
	/** Lower bound (required). */
	min: number;
	/** Upper bound (required). */
	max: number;
	/** Increment (default 1). */
	step?: number;
	/** `range` = dual-thumb (default), `single` = one-handle threshold. */
	mode?: 'range' | 'single';
	/** Single mode only: `gte` → "value+" (default), `lte` → "≤ value". */
	bound?: 'gte' | 'lte';
	/** Single initial value. */
	value?: number;
	/** Range initial low. */
	valueMin?: number;
	/** Range initial high. */
	valueMax?: number;
	/** String before the formatted number (e.g. `$`). */
	prefix?: string;
	/** String after the formatted number (e.g. ` km`). */
	suffix?: string;
	/** Group the integer part with thousands separators. */
	hasThousandsSeparator?: boolean;
	/** Major tick interval (value units). */
	ticks?: number;
	/** Minor tick interval (value units). */
	ticksMinor?: number;
	/** Print major values under the ticks. */
	hasTickLabels?: boolean;
	/** Thumbs settle on the nearest tick instead of the step grid. */
	shouldSnapToTicks?: boolean;
	/** Handle type (default: round). */
	handleType?: RangeHandleType;
	/** Initial row-value / summary text before the JS computes it. */
	outputText?: string;
}

/** Single-mode value; `value` is `null` when the thumb sits at its extent ("Any"). */
export interface RangeGroupSingleValue {
	value: number | null;
	bound: 'gte' | 'lte';
}
/** Range-mode value; a bound is `null` when it sits at its extent ("Any"). */
export interface RangeGroupRangeValue {
	min: number | null;
	max: number | null;
}
/** Values payload, keyed by each row's `key`. */
export type RangeGroupValues = Record<string, RangeGroupSingleValue | RangeGroupRangeValue>;

/** Narrowing helper: is this a range ({min,max}) value rather than a single ({value,bound})? */
export function isRangeValue(
	v: RangeGroupSingleValue | RangeGroupRangeValue
): v is RangeGroupRangeValue {
	return 'min' in v;
}

/**
 * Apply a (partial) values payload onto a rows config, overriding the initial
 * `valueMin`/`valueMax`/`value`/`bound` for any key present in `values`. Used to
 * seed the sliders from decoded querystring / bound state on (re)build.
 */
export function seedRows(base: RangeGroupRow[], values: RangeGroupValues): RangeGroupRow[] {
	return base.map((row) => {
		const v = values[row.key];
		if (!v) return row;
		if (isRangeValue(v)) {
			return { ...row, valueMin: v.min ?? row.min, valueMax: v.max ?? row.max };
		}
		return { ...row, value: v.value ?? row.value, bound: v.bound ?? row.bound };
	});
}

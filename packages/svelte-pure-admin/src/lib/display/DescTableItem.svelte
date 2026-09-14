<script lang="ts">
	/**
	 * Pure Admin Descriptions Table Item Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-display.scss
	 *
	 * Single label-value pair in a DescTable. Renders a label span + value span.
	 * Supports copyable variants with clipboard functionality.
	 */

	import { _ } from '../i18n';

	interface Props {
		/** Label text */
		labelText: string;
		/** Value text (simple mode) */
		valueText?: string | number;
		/** Value spans remaining columns in the row */
		full?: boolean;
		/** Additional CSS classes on the value span */
		class?: string;
		/** Copy mode: 'btn' (always visible), 'click' (value clickable), 'hover' (button on hover) */
		copyMode?: 'btn' | 'click' | 'hover';
		/** Override what gets copied (defaults to valueText) */
		copyValue?: string;
		/** Callback after successful copy */
		oncopy?: (value: string) => void;
		/** Complex value content (snippet) */
		children?: import('svelte').Snippet;
	}

	let {
		labelText,
		valueText,
		full = false,
		class: className = '',
		copyMode,
		copyValue,
		oncopy,
		children
	}: Props = $props();

	// Copied feedback state
	let copied = $state(false);
	let copiedTimeout: ReturnType<typeof setTimeout> | null = null;

	const canCopy = $derived(
		copyValue !== undefined || valueText !== undefined
	);

	const valueClasses = $derived(() => {
		const base = ['pa-desc-table__value'];
		if (full) base.push('pa-desc-table__value--full');
		if (copyMode && canCopy) {
			base.push(`pa-desc-table__value--copy-${copyMode}`);
			// Core shows the "Copied!" ::after for any copy mode (not just click),
			// so toggle --copied whenever we've copied — btn/hover feedback too.
			if (copied) base.push('pa-desc-table__value--copied');
		}
		if (className) base.push(className);
		return base.join(' ');
	});

	// Bridge the svelte-i18n hint strings into core's copy ::after via the
	// inherited --pa-copy-hint-text / --pa-copied-text vars it reads, so the
	// visible hint matches the (already-translated) aria-label. English fallback
	// on older core. See Field.svelte for the same pattern.
	function cssString(s: string): string {
		return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
	}
	const copyVarStyle = $derived(
		copyMode && canCopy
			? `--pa-copy-hint-text: ${cssString($_('pureAdmin.field.clickToCopy'))}; --pa-copied-text: ${cssString($_('pureAdmin.field.copied'))}`
			: undefined
	);

	function getTextToCopy(): string {
		if (copyValue !== undefined) return copyValue;
		if (valueText !== undefined) return String(valueText);
		return '';
	}

	async function handleCopy() {
		const text = getTextToCopy();
		if (!text) return;

		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			oncopy?.(text);

			if (copiedTimeout) clearTimeout(copiedTimeout);
			copiedTimeout = setTimeout(() => {
				copied = false;
			}, 1500);
		} catch (err) {
			console.error('Failed to copy to clipboard:', err);
		}
	}

	function handleValueClick() {
		if (copyMode === 'click') {
			handleCopy();
		}
	}
</script>

<span class="pa-desc-table__label">{labelText}</span>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	class={valueClasses()}
	style={copyVarStyle}
	onclick={copyMode === 'click' && canCopy ? handleValueClick : undefined}
>
	{#if children}
		{@render children()}
	{:else if valueText !== undefined}
		{valueText}
	{/if}
	{#if (copyMode === 'btn' || copyMode === 'hover') && canCopy}
		<button
			type="button"
			class="pa-desc-table__copy"
			onclick={handleCopy}
			aria-label={copied ? $_('pureAdmin.field.copied') : $_('pureAdmin.field.clickToCopy')}
		>
			<!-- Static copy glyph (snippet blesses `fas fa-copy`); the "Copied!"
			     feedback is core's value ::after on --copied, not an icon swap. -->
			<i class="fas fa-copy" aria-hidden="true"></i>
		</button>
	{/if}
</span>

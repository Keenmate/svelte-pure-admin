<script lang="ts">
	/**
	 * Pure Admin Banded Row Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-display.scss
	 *
	 * Single row in a Banded container: tinted label + value.
	 * Supports copyable variants with clipboard functionality.
	 */

	import { _ } from '../i18n';

	interface Props {
		/** Label text */
		labelText: string;
		/** Value text (simple mode) */
		valueText?: string | number;
		/** Additional CSS classes for the row */
		class?: string;
		/** Additional CSS classes for the label element */
		labelClass?: string;
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
		class: className = '',
		labelClass = '',
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

	const classes = $derived(() => {
		const base = ['pa-banded__row'];
		if (copyMode && canCopy) {
			base.push(`pa-banded__row--copy-${copyMode}`);
			// Core shows the "Copied!" ::after for any copy mode (not just click).
			if (copied) base.push('pa-banded__row--copied');
		}
		if (className) base.push(className);
		return base.join(' ');
	});

	// Bridge svelte-i18n hint strings into core's copy ::after via the inherited
	// --pa-copy-hint-text / --pa-copied-text vars (English fallback on older core).
	function cssString(s: string): string {
		return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
	}
	const copyVarStyle = $derived(
		copyMode && canCopy
			? `--pa-copy-hint-text: ${cssString($_('pureAdmin.field.clickToCopy'))}; --pa-copied-text: ${cssString($_('pureAdmin.field.copied'))}`
			: undefined
	);

	const labelClasses = $derived(() => {
		const base = ['pa-banded__label'];
		if (labelClass) base.push(labelClass);
		return base.join(' ');
	});

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

<div class={classes()}>
	<span class={labelClasses()}>{labelText}</span>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<span
		class="pa-banded__value"
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
				class="pa-banded__copy"
				onclick={handleCopy}
				aria-label={copied ? $_('pureAdmin.field.copied') : $_('pureAdmin.field.clickToCopy')}
			>
				<!-- Static copy glyph (snippet blesses `fas fa-copy`); the "Copied!"
				     feedback is core's value ::after on --copied, not an icon swap. -->
				<i class="fas fa-copy" aria-hidden="true"></i>
			</button>
		{/if}
	</span>
</div>

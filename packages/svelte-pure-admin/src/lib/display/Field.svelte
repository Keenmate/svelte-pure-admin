<script lang="ts">
	/**
	 * Pure Admin Field Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core data-display.scss
	 *
	 * Single label-value pair for displaying read-only data.
	 * Supports copyable variants with clipboard functionality.
	 */

	import { _ } from '../i18n';

	interface Props {
		/** Label text (simple mode) */
		labelText?: string;
		/** Value text (simple mode) */
		valueText?: string | number;
		/** Full width in grid layouts (spans entire row) */
		full?: boolean;
		/** Copy mode: 'btn' (always visible), 'click' (value clickable), 'hover' (button on hover) */
		copyMode?: 'btn' | 'click' | 'hover';
		/** Override what gets copied (defaults to value prop) */
		copyValue?: string;
		/** Callback to get value to copy (for dynamic values) */
		copyValueCallback?: () => string;
		/** Hint text for click mode (default: i18n 'field.clickToCopy') */
		copyHintText?: string;
		/** Feedback text after copy (default: i18n 'field.copied') */
		copiedText?: string;
		/** Callback after successful copy */
		oncopy?: (value: string) => void;
		/** Value color variant (for chips mode: success, warning, danger) */
		valueVariant?: 'success' | 'warning' | 'danger';
		/** Additional CSS classes */
		class?: string;
		/** Complex label content (snippet) */
		labelSnippet?: import('svelte').Snippet;
		/** Complex value content (snippet) */
		valueSnippet?: import('svelte').Snippet;
		/** Alias for valueSnippet - main content */
		children?: import('svelte').Snippet;
	}

	let {
		labelText,
		valueText,
		full = false,
		copyMode,
		copyValue,
		copyValueCallback,
		copyHintText,
		copiedText,
		oncopy,
		valueVariant,
		class: className = '',
		labelSnippet,
		valueSnippet,
		children
	}: Props = $props();

	// Copied feedback state
	let copied = $state(false);
	let copiedTimeout: ReturnType<typeof setTimeout> | null = null;

	// Resolve i18n text with prop override
	const resolvedHintText = $derived(copyHintText ?? $_('pureAdmin.field.clickToCopy'));
	const resolvedCopiedText = $derived(copiedText ?? $_('pureAdmin.field.copied'));

	// Check if there's something to copy (required for copy functionality)
	const canCopy = $derived(
		copyValue !== undefined || copyValueCallback !== undefined || valueText !== undefined
	);

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-field'];
		if (full) base.push('pa-field--full');
		// Only add copy classes if there's something to copy
		if (copyMode && canCopy) {
			if (copyMode === 'btn') base.push('pa-field--copy-btn');
			if (copyMode === 'click') base.push('pa-field--copy-click');
			if (copyMode === 'hover') base.push('pa-field--copy-hover');
			if (copied) base.push('pa-field--copied');
		}
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build value class string (for chips mode color variants)
	const valueClasses = $derived(() => {
		const base = ['pa-field__value'];
		if (valueVariant) base.push(`pa-field__value--${valueVariant}`);
		return base.join(' ');
	});

	// Feed the hint / feedback strings into core's copy `::after` via the
	// inherited CSS vars it reads (`var(--pa-copy-hint-text, 'Click to copy')`
	// / `var(--pa-copied-text, 'Copied!')`, core >= the copy-hint-i18n release).
	// Set inline only when copy is active, so non-copy fields stay clean and a
	// per-field `copyHintText` / `copiedText` prop overrides the app-wide value
	// through the normal cascade. On older core the literal `::after` ignores
	// the vars and shows English — graceful, no breakage.
	function cssString(s: string): string {
		return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
	}
	const copyVarStyle = $derived(
		copyMode && canCopy
			? `--pa-copy-hint-text: ${cssString(resolvedHintText)}; --pa-copied-text: ${cssString(resolvedCopiedText)}`
			: undefined
	);

	// Determine which value content to render
	const hasValueContent = $derived(valueSnippet || children || valueText !== undefined);

	// Get the text to copy
	function getTextToCopy(): string {
		if (copyValue !== undefined) return copyValue;
		if (copyValueCallback !== undefined) return copyValueCallback();
		if (valueText !== undefined) return String(valueText);
		return '';
	}

	// Copy to clipboard
	async function handleCopy() {
		const text = getTextToCopy();
		if (!text) return;

		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			oncopy?.(text);

			// Clear previous timeout if exists
			if (copiedTimeout) clearTimeout(copiedTimeout);

			// Reset copied state after 1.5 seconds
			copiedTimeout = setTimeout(() => {
				copied = false;
			}, 1500);
		} catch (err) {
			console.error('Failed to copy to clipboard:', err);
		}
	}

	// Handle click on value (for copy-click mode)
	function handleValueClick() {
		if (copyMode === 'click') {
			handleCopy();
		}
	}
</script>

<div class={classes()} style={copyVarStyle}>
	{#if labelSnippet}
		<span class="pa-field__label">
			{@render labelSnippet()}
		</span>
	{:else if labelText}
		<span class="pa-field__label">{labelText}</span>
	{/if}

	{#if hasValueContent}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span
			class={valueClasses()}
			onclick={copyMode === 'click' && canCopy ? handleValueClick : undefined}
		>
			{#if valueSnippet}
				{@render valueSnippet()}
			{:else if children}
				{@render children()}
			{:else if valueText !== undefined}
				{valueText}
			{/if}
			{#if (copyMode === 'btn' || copyMode === 'hover') && canCopy}
				<button
					type="button"
					class="pa-field__copy"
					onclick={handleCopy}
					aria-label={copied ? resolvedCopiedText : resolvedHintText}
				>
					<!-- Static copy glyph (snippet blesses `fas fa-copy`). Core shows
					     the "Copied!" feedback via the value's ::after on --copied, so
					     the button icon never swaps. -->
					<i class="fas fa-copy" aria-hidden="true"></i>
				</button>
			{/if}
		</span>
	{/if}
</div>

<!--
	No scoped <style> and no invented classes: the copy hint / "Copied!"
	feedback is core's own `.pa-field__value::after`, and its text is fed
	through the inherited `--pa-copy-hint-text` / `--pa-copied-text` vars set
	inline above (core copy-hint-i18n release). Previously this component
	suppressed core's ::after and re-implemented the hint with a scoped
	stylesheet + `pa-field--copy-click-custom` / `--copied-custom` /
	`pa-field__copy-hint` / `pa-field__copy--copied` — all removed.
-->

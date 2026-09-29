<script lang="ts">
	/**
	 * Pure Admin CodeBlockWithHeader Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/code.html
	 * Code block with header (title and copy button)
	 */

	import Button from '../buttons/Button.svelte';

	type Language = 'javascript' | 'json' | 'html' | 'css' | 'bash' | 'sql' | 'python';

	interface Props {
		/** Title text (e.g., filename) */
		titleText: string;
		/** Programming language for styling */
		language?: Language;
		/** Show copy button */
		showCopy?: boolean;
		/** Compact layout on the inner code block (pa-code--compact) */
		isCompact?: boolean;
		/** Show line numbers on the inner code block (pa-code--numbered) */
		isNumbered?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Code content */
		children?: import('svelte').Snippet;
	}

	let {
		titleText,
		language,
		showCopy = true,
		isCompact = false,
		isNumbered = false,
		class: className = '',
		children
	}: Props = $props();

	let copied = $state(false);
	let codeElement: HTMLPreElement | undefined = $state();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-code-block'];
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build code block class string
	const codeClasses = $derived(() => {
		const base = ['pa-code'];
		if (isCompact) base.push('pa-code--compact');
		if (isNumbered) base.push('pa-code--numbered');
		if (language) base.push(`pa-code--${language}`);
		return base.join(' ');
	});

	function handleCopy() {
		// Copy this instance's own code (local ref, not a global query — several
		// blocks on one page would otherwise all copy the first block's text)
		if (codeElement) {
			const code = codeElement.textContent || '';

			navigator.clipboard.writeText(code).then(() => {
				copied = true;
				setTimeout(() => {
					copied = false;
				}, 2000);
			});
		}
	}
</script>

<div class={classes()}>
	<div class="pa-code-block__header">
		<span class="pa-code-block__title">{titleText}</span>
		{#if showCopy}
			<Button variant={copied ? 'success' : 'secondary'} size="xs" onclick={handleCopy}>
				{#snippet icon()}
					{copied ? '✓' : '📋'}
				{/snippet}
				{copied ? 'Copied!' : 'Copy'}
			</Button>
		{/if}
	</div>
	<div class="pa-code-block__body">
		<pre class={codeClasses()} bind:this={codeElement}>{@render children?.()}</pre>
	</div>
</div>

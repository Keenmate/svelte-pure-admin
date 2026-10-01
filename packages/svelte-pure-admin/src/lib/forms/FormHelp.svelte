<script lang="ts">
	/**
	 * Pure Admin FormHelp Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * For form help text and validation messages (core blesses a <small>):
	 * <small class="pa-form-help">Help text</small>
	 * <small class="pa-form-help pa-form-help--error">Error message</small>
	 * <small class="pa-form-help pa-form-help--success">Success message</small>
	 */

	import type { ThemeColor } from '../types';

	// Core defines only --error / --success / --warning (plus --color-N via
	// themeColor); there is no `.pa-form-help--info` (see snippets/forms.html).
	type HelpVariant = 'error' | 'success' | 'warning';

	interface Props {
		/** Help text variant */
		variant?: HelpVariant;
		/** Theme color variant (1-9) — applies pa-form-help--color-N */
		themeColor?: ThemeColor;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		variant,
		themeColor,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-form-help'];
		if (variant) base.push(`pa-form-help--${variant}`);
		if (themeColor) base.push(`pa-form-help--color-${themeColor}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<!-- Core blesses a <small> for help/validation text (snippets/forms.html:119-133);
     keen renders <small> too. Use <small> so the field-help shape matches the oracle. -->
<small class={classes()}>
	{@render children?.()}
</small>

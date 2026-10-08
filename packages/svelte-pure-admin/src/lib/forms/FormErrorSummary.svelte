<script lang="ts">
	/**
	 * FormErrorSummary Component
	 * Displays a summary of form validation errors with clickable anchor links
	 */
	import Alert from '../feedback/Alert.svelte';
	import Link from '../typography/Link.svelte';
	import { _ } from '../i18n';

	export interface FormErrorItem {
		field: string;
		id: string;
		message: string;
	}

	interface Props {
		/** Array of error objects */
		errors: FormErrorItem[];
		/** Whether to show the summary (typically: submitted && errors.length > 0) */
		show?: boolean;
		/** Additional CSS class */
		class?: string;
	}

	let { errors, show = true, class: className = '' }: Props = $props();

	const shouldShow = $derived(show && errors.length > 0);
	const errorCount = $derived(errors.length);
	const headingText = $derived(
		$_(errorCount === 1 ? 'pureAdmin.form.errorFound' : 'pureAdmin.form.errorsFound', {
			values: { count: errorCount }
		})
	);
</script>

{#if shouldShow}
	<Alert variant="danger" class="mb-4 {className}">
		<h4 class="pa-alert__heading">{headingText}</h4>
		<ul class="pa-alert__list">
			{#each errors as error}
				<li><Link href="#{error.id}">{error.field}</Link> - {error.message}</li>
			{/each}
		</ul>
	</Alert>
{/if}

<script lang="ts">
	/**
	 * A deliberately "expensive" panel — it logs when it MOUNTS and when it's
	 * DESTROYED, standing in for a Chart.js instance / date-picker / data fetch.
	 * Because ContainerBreakpoint gates it behind `{#if mode === …}`, this component
	 * is only ever constructed while its mode is on screen — the log proves it.
	 */
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		label: string;
		log: (msg: string) => void;
	}
	let { label, log }: Props = $props();

	onMount(() => log(`▶ mounted: ${label}`));
	onDestroy(() => log(`✕ destroyed: ${label}`));
</script>

<div class="pa-stat">
	<div class="pa-stat__icon pa-stat__icon--success">📈</div>
	<div class="pa-stat__content">
		<div class="pa-stat__number">$847K</div>
		<div class="pa-stat__label">{label}</div>
	</div>
</div>

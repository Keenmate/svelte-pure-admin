<script lang="ts">
	/**
	 * FitContainer — arm ANY horizontal flex row with the fit engine
	 * (@keenmate/pure-admin-core v2.9.0-rc17, `fit.js` — the engine is no longer
	 * navbar-only). It sets `data-pc-fit-auto` on the container so EVERY direct
	 * child folds into the fit set without tagging each, then boots the engine on
	 * the element. As the row runs out of width, children degrade one at a time —
	 * lowest priority first — and restore as space returns.
	 *
	 * Use it for a toolbar, a filter bar, or a card's action cluster:
	 *
	 *   <FitContainer class="my-toolbar" defaultPriority={20}>
	 *     <button data-pc-fit-ignore>Save</button>              <!-- pinned, never folds -->
	 *     <FitSlot strategy="steps" priority={40}>              <!-- shrinks label → icon -->
	 *       <FitStep>⧉ Duplicate</FitStep>
	 *       <FitStep>⧉</FitStep>
	 *     </FitSlot>
	 *     <button>Delete</button>                               <!-- untagged → default priority, folds first -->
	 *   </FitContainer>
	 *
	 * Children opt OUT with `data-pc-fit-ignore` (a burger, a submit button); tag a
	 * child with `data-pc-fit` / wrap it in a {@link FitSlot} to give it an explicit
	 * strategy/priority. Untagged children inherit `defaultPriority` (this prop →
	 * `data-pc-fit-default-priority`), falling back to
	 * `pureAdmin.config.fit.defaultPriority` (0). Lower priority folds first.
	 *
	 * This is the 1-D ROW-fold tool. For a 2-D layout swap where you want to avoid
	 * MOUNTING the hidden branch (chart ↔ KPI, grid ↔ tabs), use
	 * {@link ContainerBreakpoint} instead.
	 */
	import { onMount } from 'svelte';
	import { loadCoreJs } from '../internal/core-js';

	interface Props {
		/** Priority that untagged / implicit children inherit (→
		 *  `data-pc-fit-default-priority`). Lower folds first. Omit to fall back to
		 *  `pureAdmin.config.fit.defaultPriority`. */
		defaultPriority?: number;
		/** Fold EVERY direct child into the fit set via `data-pc-fit-auto` (default
		 *  `true`). Set `false` to arm the engine on this row but only manage the
		 *  children you tag with `data-pc-fit` / wrap in a {@link FitSlot} — the rest
		 *  stay put. Use for a row with a single relocating slot beside fixed content. */
		isAuto?: boolean;
		/** Container element tag (default `div`). */
		tag?: string;
		/** Extra classes on the container. */
		class?: string;
		/** The row's children (buttons, FitSlots, …). */
		children?: import('svelte').Snippet;
	}

	let { defaultPriority, isAuto = true, tag = 'div', class: className = '', children }: Props = $props();

	let el = $state<HTMLElement>();

	onMount(() => {
		let disposed = false;
		// `navbar-fit` resolves to core's renamed `fit.js`. The engine is
		// container-generic; `init` no-ops unless the element is armed
		// (`data-pc-fit-auto`, set below when `isAuto`) or holds a `[data-pc-fit]` child.
		loadCoreJs('navbar-fit').then(() => {
			if (disposed || !el) return;
			const fit = window.pureAdmin?.components?.fit ?? window.pureAdmin?.components?.navFit;
			fit?.init(el);
		});
		return () => {
			disposed = true;
		};
	});
</script>

<svelte:element
	this={tag}
	bind:this={el}
	class={className || undefined}
	data-pc-fit-auto={isAuto ? '' : undefined}
	data-pc-fit-default-priority={defaultPriority}
>
	{@render children?.()}
</svelte:element>

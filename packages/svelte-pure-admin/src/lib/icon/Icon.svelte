<script lang="ts">
	/**
	 * Icon — renders an icon by NAME through the configured icon provider.
	 *
	 * The consumer passes a `name`. Framework affordances (close, chevrons, success,
	 * danger, …) resolve first, built-in and reserved. Any other name is handed to the
	 * configured provider list (set on `PureAdminProvider`) so projects use whatever
	 * icon set they already have without hand-authoring `<fa-icon>` / `<hero-icon>` / raw `<svg>`.
	 *
	 * @example
	 * ```svelte
	 * <Icon name="user" />                 <!-- masked / provider glyph -->
	 * <Icon name="dashboard" size="1.5rem" />
	 * <Icon name="star" isInteractive />   <!-- standalone hover affordance -->
	 * <Icon name="settings" label="Open settings" />  <!-- accessible name -->
	 * ```
	 *
	 * Hover: the provider embeds its set's hover marker; an `<Icon>` inside a
	 * `.pa-btn` / nav link / `.pa-tabs__item` reacts on the control's hover with no
	 * prop. `isInteractive` adds `.pc-icon-hover` so a standalone icon reacts too.
	 */
	import { useIconProviders, resolveIcon } from './icon-provider';

	interface Props {
		/** Icon name — resolved by the configured provider. */
		name: string;
		/** Size as a CSS length (e.g. `'1.25rem'`); sets `font-size` + `--pa-icon-size`. Omit to inherit `1em`. */
		size?: string;
		/** Make a standalone icon its own hover affordance (adds `.pc-icon-hover`). */
		isInteractive?: boolean;
		/** Accessible name. When set, the icon is exposed as `role="img"`; otherwise it's `aria-hidden`. */
		label?: string;
		/** Additional CSS classes on the host. */
		class?: string;
	}

	let { name, size, isInteractive = false, label, class: className = '' }: Props = $props();

	const providers = useIconProviders();
	const markup = $derived(resolveIcon(name, { class: className, size, isInteractive, label }, providers));

	const hostClass = $derived(
		[isInteractive ? 'pc-icon-hover' : '', className].filter(Boolean).join(' ')
	);
	const hostStyle = $derived(size ? `font-size:${size};--pa-icon-size:${size}` : undefined);
</script>

{#if markup}
	<span
		class={hostClass || undefined}
		style={hostStyle}
		role={label ? 'img' : undefined}
		aria-label={label}
		aria-hidden={label ? undefined : 'true'}
	>{@html markup}</span>
{/if}

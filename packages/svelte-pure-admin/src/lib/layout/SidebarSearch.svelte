<script lang="ts">
	/**
	 * SidebarSearch — a framed search affordance at the top of the sidebar (core
	 * `.pc-sidebar__search`, v2.9.0-rc12/rc15). Place it as the first sidebar item; it
	 * collapses to just its icon in an `.pc-layout__sidebar--icon-collapse` sidebar.
	 *
	 * Two modes:
	 * - **Trigger** (default) — a `<button>` that fires `onclick` (open the command
	 *   palette or your own search).
	 * - **Type-and-go** — set `action` to render `.pc-sidebar__search--input`: a `<form>`
	 *   whose native GET submit navigates to a results page on Enter. Its magnifier is a
	 *   `type="submit"`, so it still submits from the collapsed icon-rail (an empty query
	 *   lands on the bare results page). `name` becomes the query param (default `q`).
	 *
	 * Renders its own `<li class="pc-sidebar__item">`, so it sits as a sibling of
	 * `SidebarItem` inside `<Sidebar>`.
	 */

	interface Props {
		/** Label text (trigger mode). */
		labelText?: string;
		/** Click handler (trigger mode) — e.g. open the command palette. */
		onclick?: () => void;
		/** Form target — set this to switch to type-and-go mode (`.pc-sidebar__search--input`). */
		action?: string;
		/** HTTP method (type-and-go; default `get`). */
		method?: 'get' | 'post';
		/** Query field name → URL param (type-and-go; default `q`). */
		name?: string;
		/** Bound query text (type-and-go). */
		value?: string;
		/** Placeholder for the input (type-and-go). */
		placeholder?: string;
		/** Additional CSS classes. */
		class?: string;
		/** Icon (defaults to a magnifier). */
		icon?: import('svelte').Snippet;
	}

	let {
		labelText = 'Search…',
		onclick,
		action,
		method = 'get',
		name = 'q',
		value = $bindable(undefined),
		placeholder = 'Search…',
		class: className = '',
		icon
	}: Props = $props();

	const isInput = $derived(action !== undefined);
</script>

<li class="pc-sidebar__item">
	{#if isInput}
		<form
			class={['pc-sidebar__search', 'pc-sidebar__search--input', className].filter(Boolean).join(' ')}
			{action}
			{method}
			role="search"
		>
			<!-- Empty by default: core masks a magnifier onto `pc-sidebar__search-icon`
			     (font-size:0). Pass an `icon` snippet only to override. The oracle
			     snippet (snippets/layout.html) blesses aria-label="Search" on both the
			     submit magnifier and the input, and emits no `value` when empty. -->
			<button type="submit" class="pc-sidebar__search-icon" aria-label="Search">{#if icon}{@render icon()}{/if}</button>
			<input
				type="search"
				{name}
				class="pc-sidebar__search-field"
				bind:value
				{placeholder}
				autocomplete="off"
				aria-label="Search"
			/>
		</form>
	{:else}
		<!-- No aria-label: the visible .pc-sidebar__label is the accessible name
		     (matches the oracle snippet + keen's trigger). -->
		<button
			type="button"
			class={['pc-sidebar__search', className].filter(Boolean).join(' ')}
			{onclick}
		>
			<span class="pc-sidebar__icon pc-icon-hover-highlight" aria-hidden="true">{#if icon}{@render icon()}{:else}<span class="pa-icon pa-icon--search"></span>{/if}</span>
			<span class="pc-sidebar__label">{labelText}</span>
		</button>
	{/if}
</li>

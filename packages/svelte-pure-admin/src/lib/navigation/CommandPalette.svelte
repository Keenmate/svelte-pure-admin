<script lang="ts">
	/**
	 * Pure Admin CommandPalette v2 (Svelte 5)
	 *
	 * macOS Spotlight-style command palette with:
	 * - /commands - Multi-step action wizards
	 * - :contexts - Scoped entity search
	 * - Global search (no prefix)
	 */

	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { _, locale } from '../i18n';
	import { shortcutRegistry } from '../services/shortcut-registry.svelte';
	import type {
		Command,
		SearchContext,
		SearchResult,
		StepOption,
		StepSelection,
		PaletteMode
	} from './command-palette-types';

	// =========================================================================
	// PROPS
	// =========================================================================

	interface Props {
		/** Show/hide the palette (bindable) */
		show?: boolean;
		/** Available commands (triggered by /) */
		commands?: Command[];
		/** Available search contexts (triggered by :) */
		contexts?: SearchContext[];
		/** Global search function (when no prefix is used) */
		globalSearch?: (query: string) => Promise<SearchResult[]> | SearchResult[];
		/** Called when a global search result is selected */
		onglobalselect?: (result: SearchResult) => void;
		/** Placeholder text */
		placeholder?: string;
		/** Display style for multi-step commands: 'inline' shows full path in input, 'tokens' shows selections as badges */
		displayStyle?: 'inline' | 'tokens';
		/**
		 * Size preset (core v2.9.0-rc15) — sets both the palette width and results
		 * height together via `.pa-command-palette--{sm|lg|xl}`. Omit for the default
		 * (60.8 / 38.4rem). Composes with the individual overrides below.
		 */
		size?: 'sm' | 'lg' | 'xl';
		/** Override the container max-width (`--pa-command-palette-width`, e.g. `'72rem'`). */
		width?: string;
		/** Override the gap above the palette (`--pa-command-palette-offset-top`). */
		offsetTop?: string;
		/** Override the results scroll height (`--pa-command-palette-results-max-height`). */
		resultsMaxHeight?: string;
		/** Additional CSS classes */
		class?: string;
		/** Custom error display snippet */
		errorSnippet?: import('svelte').Snippet<[string]>;
	}

	let {
		show = $bindable(false),
		commands = [],
		contexts = [],
		globalSearch,
		onglobalselect,
		placeholder,
		displayStyle = 'inline',
		size,
		width,
		offsetTop,
		resultsMaxHeight,
		class: className = '',
		errorSnippet
	}: Props = $props();

	// Use i18n default if placeholder not provided
	const resolvedPlaceholder = $derived(placeholder ?? $_('pureAdmin.commandPalette.placeholder'));

	// =========================================================================
	// STATE
	// =========================================================================

	let inputRef = $state<HTMLInputElement>();
	let inputValue = $state('');
	let mode = $state<PaletteMode>('idle');
	let activeCommand = $state<Command | undefined>(undefined);
	let currentStepIndex = $state(0);
	let selections = $state<StepSelection[]>([]);
	let activeContext = $state<SearchContext | undefined>(undefined);
	let displayItems = $state<Array<Command | SearchContext | StepOption | SearchResult>>([]);
	let activeIndex = $state(0);
	let loading = $state(false);
	let preview = $state<string | undefined>(undefined);
	let error = $state<string | undefined>(undefined);

	// Debounce timer for search
	let searchDebounceTimer: ReturnType<typeof setTimeout> | undefined;

	// =========================================================================
	// COMPUTED
	// =========================================================================

	const classes = $derived(() => {
		const base = ['pa-command-palette'];
		if (show) base.push('pa-command-palette--active');
		if (size) base.push(`pa-command-palette--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});

	// Runtime size overrides (core v2.9.0-rc15) — set the CSS vars only when provided,
	// so they fall back to the SCSS defaults / the `size` preset otherwise.
	const paletteStyle = $derived(() => {
		const vars: string[] = [];
		if (width) vars.push(`--pa-command-palette-width: ${width}`);
		if (offsetTop) vars.push(`--pa-command-palette-offset-top: ${offsetTop}`);
		if (resultsMaxHeight) vars.push(`--pa-command-palette-results-max-height: ${resultsMaxHeight}`);
		return vars.join('; ') || undefined;
	});

	// Get current step (if in command mode)
	const currentStep = $derived(() => {
		if (!activeCommand || currentStepIndex >= activeCommand.steps.length) return undefined;
		return activeCommand.steps[currentStepIndex];
	});

	// Build display text for completed selections
	const selectionsDisplay = $derived(() => {
		if (!activeCommand) return '';
		let display = activeCommand.shortcut;
		for (let i = 0; i < selections.length; i++) {
			const step = activeCommand.steps[i];
			const sel = selections[i];
			// Always add prompt or space before selection value
			display += step?.prompt || ' ';
			display += sel.option?.label || sel.freeText || '';
		}
		// Add current step's prompt if we're on a new step
		const step = currentStep();
		if (selections.length === currentStepIndex) {
			display += step?.prompt || ' ';
		}
		return display;
	});

	// =========================================================================
	// INPUT HANDLING
	// =========================================================================

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		inputValue = target.value;
		processInput();
	}

	function processInput() {
		// Clear any pending search and previous error
		if (searchDebounceTimer) {
			clearTimeout(searchDebounceTimer);
		}
		error = undefined;

		const value = inputValue.trim();

		// In command-step mode, always handle as step input (don't reset on empty)
		if (mode === 'command-step' && activeCommand) {
			const query = getQueryFromInput();
			loadStepOptions(query);
			return;
		}

		// Empty input - show idle/home state
		if (!value) {
			mode = 'idle';
			displayItems = [];
			activeIndex = 0;
			return;
		}

		// Command mode (/)
		if (value.startsWith('/')) {
			handleCommandInput(value);
			return;
		}

		// Context/search mode (:)
		if (value.startsWith(':')) {
			handleContextInput(value);
			return;
		}

		// Global search mode
		handleGlobalSearchInput(value);
	}

	function handleCommandInput(value: string) {
		const parts = value.split(' ');
		const cmdPart = parts[0]; // e.g., "/r" or "/report"
		const queryPart = parts.slice(1).join(' ');

		// Find matching command
		const matchingCommands = commands.filter((cmd) => {
			const allShortcuts = [cmd.shortcut, ...(cmd.aliases || [])];
			return allShortcuts.some(
				(s) => s.toLowerCase().startsWith(cmdPart.toLowerCase()) || cmdPart.toLowerCase().startsWith(s.toLowerCase())
			);
		});

		// Exact match - enter command mode
		const exactMatch = commands.find((cmd) => {
			const allShortcuts = [cmd.shortcut, ...(cmd.aliases || [])];
			return allShortcuts.some((s) => s.toLowerCase() === cmdPart.toLowerCase());
		});

		if (exactMatch && (queryPart || value.endsWith(' '))) {
			// We have an exact command match and user typed space - enter step mode
			enterCommandMode(exactMatch, queryPart);
		} else if (cmdPart === '/') {
			// Just "/" - show all commands
			mode = 'command-list';
			displayItems = commands;
			activeIndex = 0;
		} else {
			// Partial match - show filtered commands
			mode = 'command-list';
			displayItems = matchingCommands;
			activeIndex = 0;
		}
	}

	function enterCommandMode(command: Command, initialQuery: string = '') {
		activeCommand = command;
		currentStepIndex = 0;
		selections = [];
		mode = 'command-step';

		// If command has no steps, it's an instant command
		if (command.steps.length === 0) {
			executeCommand();
			return;
		}

		// In tokens mode, clear input for clean search
		if (displayStyle === 'tokens') {
			inputValue = '';
		}

		// Load options for first step
		loadStepOptions(initialQuery);
	}

	async function loadStepOptions(query: string = '') {
		const step = currentStep();
		if (!step) return;

		loading = true;
		try {
			const options = await step.getOptions(query, selections);
			displayItems = options;
			activeIndex = options.length > 0 ? 0 : -1;
			preview = undefined;
		} catch (err) {
			console.error('Failed to load step options:', err);
			error = $_('pureAdmin.commandPalette.loadOptionsFailed');
			displayItems = [];
		} finally {
			loading = false;
		}
	}

	function handleContextInput(value: string) {
		const parts = value.split(' ');
		const ctxPart = parts[0]; // e.g., ":p" or ":products"
		const queryPart = parts.slice(1).join(' ');

		// Find matching context
		const matchingContexts = contexts.filter((ctx) => {
			const allShortcuts = [ctx.shortcut, ...(ctx.aliases || [])];
			return allShortcuts.some(
				(s) => s.toLowerCase().startsWith(ctxPart.toLowerCase()) || ctxPart.toLowerCase().startsWith(s.toLowerCase())
			);
		});

		// Exact match - enter search mode
		const exactMatch = contexts.find((ctx) => {
			const allShortcuts = [ctx.shortcut, ...(ctx.aliases || [])];
			return allShortcuts.some((s) => s.toLowerCase() === ctxPart.toLowerCase());
		});

		if (exactMatch && (queryPart || value.endsWith(' '))) {
			// We have an exact context match and user typed space - search
			enterContextSearchMode(exactMatch, queryPart);
		} else if (ctxPart === ':') {
			// Just ":" - show all contexts
			mode = 'context-list';
			displayItems = contexts;
			activeIndex = 0;
		} else {
			// Partial match - show filtered contexts
			mode = 'context-list';
			displayItems = matchingContexts;
			activeIndex = 0;
		}
	}

	function enterContextSearchMode(context: SearchContext, query: string = '') {
		activeContext = context;
		mode = 'context-search';

		if (query) {
			performContextSearch(query);
		} else {
			displayItems = [];
			activeIndex = -1;
		}
	}

	async function performContextSearch(query: string) {
		if (!activeContext) return;

		loading = true;
		try {
			const results = await activeContext.onSearch(query);
			displayItems = results;
			activeIndex = results.length > 0 ? 0 : -1;
		} catch (err) {
			console.error('Context search failed:', err);
			error = $_('pureAdmin.commandPalette.searchFailed');
			displayItems = [];
		} finally {
			loading = false;
		}
	}

	function handleGlobalSearchInput(query: string) {
		mode = 'global-search';

		if (!globalSearch) {
			displayItems = [];
			return;
		}

		// Debounce search
		searchDebounceTimer = setTimeout(async () => {
			loading = true;
			try {
				const results = await globalSearch(query);
				displayItems = results;
				activeIndex = results.length > 0 ? 0 : -1;
			} catch (err) {
				console.error('Global search failed:', err);
				error = $_('pureAdmin.commandPalette.searchFailed');
				displayItems = [];
			} finally {
				loading = false;
			}
		}, 150);
	}

	// =========================================================================
	// SELECTION HANDLING
	// =========================================================================

	function selectItem(item: Command | SearchContext | StepOption | SearchResult) {
		switch (mode) {
			case 'command-list':
				selectCommand(item as Command);
				break;
			case 'command-step':
				selectStepOption(item as StepOption);
				break;
			case 'context-list':
				selectContext(item as SearchContext);
				break;
			case 'context-search':
				selectSearchResult(item as SearchResult);
				break;
			case 'global-search':
				selectGlobalResult(item as SearchResult);
				break;
		}
	}

	function selectCommand(command: Command) {
		inputValue = command.shortcut + ' ';
		enterCommandMode(command);
		inputRef?.focus();
	}

	function selectStepOption(option: StepOption) {
		const step = currentStep();
		if (!step) return;

		// Add selection
		selections = [
			...selections,
			{
				stepId: step.id,
				option: option
			}
		];

		// Move to next step
		moveToNextStep();
	}

	function moveToNextStep() {
		if (!activeCommand) return;

		// Find next applicable step
		let nextIndex = currentStepIndex + 1;
		while (nextIndex < activeCommand.steps.length) {
			const step = activeCommand.steps[nextIndex];
			if (!step.shouldShow || step.shouldShow(selections)) {
				break;
			}
			nextIndex++;
		}

		if (nextIndex >= activeCommand.steps.length) {
			// No more steps - execute command
			executeCommand();
		} else {
			currentStepIndex = nextIndex;

			if (displayStyle === 'tokens') {
				// Tokens mode: clear input, badges show selections
				inputValue = '';
			} else {
				// Inline mode: build full path in input
				inputValue = selectionsDisplay();
			}

			// Load options for new step
			loadStepOptions('');
		}

		inputRef?.focus();
	}

	function executeCommand() {
		if (!activeCommand) return;
		activeCommand.onComplete(selections);
		close();
	}

	function selectContext(context: SearchContext) {
		inputValue = context.shortcut + ' ';
		enterContextSearchMode(context);
		inputRef?.focus();
	}

	function selectSearchResult(result: SearchResult) {
		if (activeContext) {
			activeContext.onSelect(result);
		}
		close();
	}

	function rewindToStep(index: number) {
		// Remove selections from this step onwards and reload options
		selections = selections.slice(0, index);
		currentStepIndex = index;

		// Find the correct step index (accounting for shouldShow skips)
		if (activeCommand) {
			let actualIndex = 0;
			let visibleCount = 0;
			while (actualIndex < activeCommand.steps.length && visibleCount < index) {
				const step = activeCommand.steps[actualIndex];
				if (!step.shouldShow || step.shouldShow(selections)) {
					visibleCount++;
				}
				actualIndex++;
			}
			currentStepIndex = actualIndex;
		}

		if (displayStyle === 'tokens') {
			inputValue = '';
		} else {
			inputValue = selectionsDisplay();
		}
		loadStepOptions('');
		inputRef?.focus();
	}

	function selectGlobalResult(result: SearchResult) {
		// Route based on result type (commands/contexts enter their mode, others notify consumer)
		if (result._type === 'command' && result._command) {
			inputValue = result._command.shortcut + ' ';
			enterCommandMode(result._command);
			return;
		}
		if (result._type === 'context' && result._context) {
			inputValue = result._context.shortcut + ' ';
			enterContextSearchMode(result._context);
			return;
		}
		if (onglobalselect) {
			onglobalselect(result);
		}
		close();
	}

	// =========================================================================
	// KEYBOARD HANDLING
	// =========================================================================

	function findCommandByHotkey(key: string): Command | undefined {
		return commands.find((c) => {
			if (!c.hotkey) return false;
			const parts = c.hotkey.toLowerCase().split('+');
			return key.toLowerCase() === parts[parts.length - 1];
		});
	}

	function handleKeyDown(event: KeyboardEvent) {
		// Alt+key hotkeys — work globally (open palette + enter command)
		if (event.altKey && !event.ctrlKey && !event.metaKey && event.key !== 'Alt') {
			const cmd = findCommandByHotkey(event.key);
			if (cmd) {
				event.preventDefault();
				if (show) reset();
				if (!show) show = true;
				// Wait for focus then enter command
				setTimeout(() => {
					inputValue = cmd.shortcut + ' ';
					enterCommandMode(cmd);
				}, 0);
				return;
			}
		}

		if (!show) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				navigateDown();
				break;
			case 'ArrowUp':
				event.preventDefault();
				navigateUp();
				break;
			case 'Enter':
				event.preventDefault();
				handleEnter();
				break;
			case 'Tab':
				event.preventDefault();
				handleTab();
				break;
			case 'Escape':
				event.preventDefault();
				close();
				break;
		}
	}

	function navigateDown() {
		if (displayItems.length === 0) return;
		activeIndex = activeIndex >= displayItems.length - 1 ? 0 : activeIndex + 1;
	}

	function navigateUp() {
		if (displayItems.length === 0) return;
		activeIndex = activeIndex <= 0 ? displayItems.length - 1 : activeIndex - 1;
	}

	function handleEnter() {
		if (activeIndex >= 0 && activeIndex < displayItems.length) {
			selectItem(displayItems[activeIndex]);
		} else if (mode === 'command-step') {
			// Free text entry for current step
			const step = currentStep();
			if (step?.freeText) {
				const query = getQueryFromInput();
				selections = [
					...selections,
					{
						stepId: step.id,
						freeText: query
					}
				];
				moveToNextStep();
			}
		}
	}

	function handleTab() {
		// Tab works same as Enter for selection
		handleEnter();
	}

	function getQueryFromInput(): string {
		// Extract query portion from input based on current mode
		const value = inputValue;

		if (mode === 'command-step') {
			if (displayStyle === 'tokens') {
				// Tokens mode: input only contains current step query
				return value.trim();
			}
			// Inline mode: extract portion after selections
			const prefix = selectionsDisplay();
			return value.substring(prefix.length).trim();
		}

		if (mode === 'context-search' && activeContext) {
			const prefix = activeContext.shortcut + ' ';
			return value.substring(prefix.length).trim();
		}

		return value;
	}

	// =========================================================================
	// LIFECYCLE
	// =========================================================================

	function close() {
		show = false;
		reset();
	}

	function reset() {
		inputValue = '';
		mode = 'idle';
		activeCommand = undefined;
		currentStepIndex = 0;
		selections = [];
		activeContext = undefined;
		displayItems = [];
		activeIndex = 0;
		loading = false;
		preview = undefined;
		error = undefined;
	}

	// Focus input and lock scroll when shown
	$effect(() => {
		if (show && inputRef) {
			setTimeout(() => inputRef?.focus(), 0);
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});

	// Note: Input changes for command-step and context-search are handled by processInput()

	// Register global keyboard shortcut via registry
	onMount(() => {
		return shortcutRegistry.register({
			id: 'command-palette-toggle',
			key: 'k',
			modifiers: { ctrl: true },
			description: get(_)('commandPalette.openCommandPalette'),
			category: get(_)('shortcuts.generalCategory'),
			action: () => {
				show = !show;
				if (!show) reset();
			}
		});
	});

	// =========================================================================
	// HELPERS
	// =========================================================================

	function getItemIcon(item: Command | SearchContext | StepOption | SearchResult): string {
		return (item as any).icon || '';
	}

	function getItemTitle(item: Command | SearchContext | StepOption | SearchResult): string {
		if ('label' in item) return item.label; // StepOption
		if ('title' in item) return item.title; // SearchResult
		return item.name; // Command or SearchContext
	}

	function getItemSubtitle(item: Command | SearchContext | StepOption | SearchResult): string {
		const sub = ('subtitle' in item) ? (item.subtitle || '') : (('description' in item) ? (item.description || '') : '');
		if ('code' in item && item.code) return sub ? `[${item.code}] ${sub}` : `[${item.code}]`;
		return sub;
	}

	function getItemBadge(item: Command | SearchContext | StepOption | SearchResult): string {
		if ('badge' in item) return item.badge || '';
		if ('shortcut' in item) return item.shortcut;
		return '';
	}

	function getItemBadgeVariant(item: Command | SearchContext | StepOption | SearchResult): string {
		if ('badgeVariant' in item) return (item as SearchResult).badgeVariant || 'secondary';
		return 'secondary';
	}

	function getModeLabel(): string {
		switch (mode) {
			case 'command-list':
				return $_('pureAdmin.commandPalette.commands');
			case 'command-step':
				return activeCommand?.name || $_('pureAdmin.commandPalette.commands');
			case 'context-list':
				return $_('pureAdmin.commandPalette.searchIn');
			case 'context-search':
				return `${$_('pureAdmin.commandPalette.search')} ${activeContext?.name || ''}`;
			case 'global-search':
				return $_('pureAdmin.commandPalette.search');
			default:
				return '';
		}
	}

	function getEmptyMessage(): string {
		switch (mode) {
			case 'idle':
				return $_('pureAdmin.commandPalette.idleMessage');
			case 'command-list':
				return $_('pureAdmin.commandPalette.noMatchingCommands');
			case 'command-step':
				return currentStep()?.placeholder || $_('pureAdmin.commandPalette.typeToSearch');
			case 'context-list':
				return $_('pureAdmin.commandPalette.noMatchingContexts');
			case 'context-search':
			case 'global-search':
				return $_('pureAdmin.commandPalette.noResults');
			default:
				return '';
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class={classes()} style={paletteStyle()}>
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="pa-command-palette__backdrop" onclick={close}></div>

	<!-- Container -->
	<div class="pa-command-palette__container">
		<!-- Search input -->
		<div class="pa-command-palette__search">
			{#if displayStyle === 'tokens' && mode === 'command-step' && selections.length > 0}
				<div class="pa-command-palette__tokens">
					<span class="pa-badge pa-badge--primary">{activeCommand?.shortcut}</span>
					{#each selections as sel, i}
						{#if activeCommand?.steps[i]?.prompt}
							<span class="pa-command-palette__token-prompt">{activeCommand.steps[i].prompt.trim()}</span>
						{/if}
						<span class="pa-badge">
							<span>{sel.option?.label || sel.freeText}</span>
							<button
								type="button"
								class="pa-badge__remove"
								aria-label="Remove"
								onclick={() => rewindToStep(i)}
							>
								<span class="pa-icon pa-icon--x" aria-hidden="true"></span>
							</button>
						</span>
					{/each}
					{#if currentStep()?.prompt && selections.length === currentStepIndex}
						<span class="pa-command-palette__token-prompt">{currentStep()?.prompt?.trim()}</span>
					{/if}
				</div>
			{/if}
			<div class="pa-command-palette__input-wrapper">
				<input
					bind:this={inputRef}
					type="text"
					class="pa-command-palette__input"
					placeholder={resolvedPlaceholder}
					autocomplete="off"
					spellcheck="false"
					bind:value={inputValue}
					oninput={handleInput}
				/>
				<!-- Mode label -->
				{#if mode !== 'idle'}
					<div class="pa-command-palette__context pa-command-palette__context--visible">
						{getModeLabel()}
					</div>
				{/if}
			</div>
		</div>

		<!-- Results container -->
		<div class="pa-command-palette__results" class:pa-command-palette__results--loading={loading}>
			{#if mode === 'idle'}
				<!-- Home screen with commands and contexts -->
				<div class="pa-command-palette__home">
					<div class="pa-command-palette__home-section">
						<div class="pa-command-palette__home-heading">{$_('pureAdmin.commandPalette.commands')}</div>
						{#each commands as cmd}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div class="pa-command-palette__item" onclick={() => { inputValue = cmd.shortcut + ' '; enterCommandMode(cmd); }}>
								{#if cmd.icon}
									<div class="pa-command-palette__item-icon">{cmd.icon}</div>
								{/if}
								<div class="pa-command-palette__item-content">
									<div class="pa-command-palette__item-title">{cmd.name}</div>
									<div class="pa-command-palette__item-meta">{cmd.description}</div>
								</div>
								{#if cmd.hotkey}
									<div class="pa-command-palette__shortcut">
										{#each cmd.hotkey.split('+') as key, i}
											<span class="pa-command-palette__key">{key}</span>
										{/each}
									</div>
								{:else}
									<div class="pa-command-palette__shortcut"><span class="pa-command-palette__key">{cmd.shortcut}</span></div>
								{/if}
							</div>
						{/each}
					</div>
					<div class="pa-command-palette__home-section">
						<div class="pa-command-palette__home-heading">{$_('pureAdmin.commandPalette.searchIn')}</div>
						{#each contexts as ctx}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div class="pa-command-palette__item" onclick={() => { inputValue = ctx.shortcut + ' '; enterContextSearchMode(ctx); }}>
								{#if ctx.icon}
									<div class="pa-command-palette__item-icon">{ctx.icon}</div>
								{/if}
								<div class="pa-command-palette__item-content">
									<div class="pa-command-palette__item-title">{ctx.name}</div>
									<div class="pa-command-palette__item-meta">{ctx.description}</div>
								</div>
								<div class="pa-command-palette__shortcut"><span class="pa-command-palette__key">{ctx.shortcut}</span></div>
							</div>
						{/each}
					</div>
				</div>
			{:else if loading}
				<div class="pa-command-palette__loader">
					<div class="pa-spinner pa-spinner--xs pa-spinner--primary"></div>
					<span>{$_('pureAdmin.commandPalette.loading')}</span>
				</div>
			{:else if error}
				{#if errorSnippet}
					{@render errorSnippet(error)}
				{:else}
					<!-- Core has no error state — only `__empty` (centered muted text).
					     Render the error through it with a real `text-danger` utility for the
					     tint, rather than inventing a scoped-styled `__error` class. -->
					<div class="pa-command-palette__empty text-danger">
						<span aria-hidden="true">⚠️</span> {error}
					</div>
				{/if}
			{:else if displayItems.length === 0}
				<div class="pa-command-palette__empty">
					{getEmptyMessage()}
				</div>
			{:else}
				{#each displayItems as item, index (getItemTitle(item) + index)}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="pa-command-palette__item"
						class:pa-command-palette__item--active={activeIndex === index}
						onclick={() => selectItem(item)}
					>
						{#if getItemIcon(item)}
							<div class="pa-command-palette__item-icon">{getItemIcon(item)}</div>
						{/if}
						<div class="pa-command-palette__item-content">
							<div class="pa-command-palette__item-title">{getItemTitle(item)}</div>
							{#if getItemSubtitle(item)}
								<div class="pa-command-palette__item-meta">{getItemSubtitle(item)}</div>
							{/if}
						</div>
						{#if getItemBadge(item)}
							<span class="pa-badge pa-badge--{getItemBadgeVariant(item)}">{getItemBadge(item)}</span>
						{/if}
					</div>
				{/each}
			{/if}
		</div>

		<!-- Footer with hints -->
		<div class="pa-command-palette__footer">
			<div class="pa-command-palette__hint">
				<span class="pa-command-palette__key">↑↓</span>
				<span>{$_('pureAdmin.commandPalette.navigate')}</span>
			</div>
			<div class="pa-command-palette__hint">
				<span class="pa-command-palette__key">↵</span>
				<span>{$_('pureAdmin.commandPalette.select')}</span>
			</div>
			<div class="pa-command-palette__hint">
				<span class="pa-command-palette__key">Tab</span>
				<span>{$_('pureAdmin.commandPalette.complete')}</span>
			</div>
			<div class="pa-command-palette__hint">
				<span class="pa-command-palette__key">Esc</span>
				<span>{$_('pureAdmin.commandPalette.close')}</span>
			</div>
		</div>
	</div>
</div>

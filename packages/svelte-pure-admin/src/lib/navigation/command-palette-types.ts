/**
 * CommandPalette v2 Types
 *
 * Supports two modes:
 * - Commands (/prefix) - Multi-step action wizards
 * - Search Contexts (:prefix) - Scoped entity search
 */

// ============================================================================
// COMMAND TYPES (Multi-step wizards)
// ============================================================================

/**
 * Option shown in a command step's dropdown
 */
export interface StepOption {
	/** Unique identifier */
	id: string;
	/** Display label */
	label: string;
	/** Optional description shown below label */
	description?: string;
	/** Optional short code for quick lookup (e.g., '24' for Alerts page) */
	code?: string;
	/** Optional icon (emoji or icon class) */
	icon?: string;
	/** Value passed to onComplete - can be any data */
	value: any;
}

/**
 * User's selection for a command step
 */
export interface StepSelection {
	/** ID of the step this selection is for */
	stepId: string;
	/** Selected option (if chosen from dropdown) */
	option?: StepOption;
	/** Free text input (if step allows freeText) */
	freeText?: string;
}

/**
 * A step in a multi-step command wizard
 */
export interface CommandStep {
	/** Unique identifier for this step */
	id: string;

	/** Text auto-inserted before this step (e.g., " in ") */
	prompt?: string;

	/** Placeholder text shown in input when on this step */
	placeholder?: string;

	/**
	 * Get options to show for this step
	 * @param query - Current text typed for this step
	 * @param prevSelections - Previous step selections (for conditional options)
	 */
	getOptions: (
		query: string,
		prevSelections: StepSelection[]
	) => Promise<StepOption[]> | StepOption[];

	/** Allow free text input (not just dropdown selection) */
	freeText?: boolean;

	/**
	 * Conditionally show this step based on previous selections
	 * Return false to skip this step
	 */
	shouldShow?: (prevSelections: StepSelection[]) => boolean;
}

/**
 * A command definition (triggered by /shortcut)
 */
export interface Command {
	/** Command shortcut (e.g., "/r", "/settings") */
	shortcut: string;

	/** Alternative shortcuts (e.g., ["/report", "/reports"]) */
	aliases?: string[];

	/** Display name */
	name: string;

	/** Description shown in command list */
	description: string;

	/** Icon (emoji or icon class) */
	icon?: string;

	/** Keyboard hotkey (e.g., 'Alt+D') — displayed on home screen and usable globally */
	hotkey?: string;

	/** Steps in this command wizard (empty array for instant commands) */
	steps: CommandStep[];

	/**
	 * Called when command completes (all steps done or instant command)
	 * @param selections - Array of selections for each step
	 */
	onComplete: (selections: StepSelection[]) => void;

	/**
	 * Optional: Generate preview text before execution
	 * @param selections - Current selections
	 * @returns Preview string to show user
	 */
	getPreview?: (selections: StepSelection[]) => string;
}

// ============================================================================
// SEARCH CONTEXT TYPES (Entity search)
// ============================================================================

/**
 * A search result item
 */
export interface SearchResult {
	/** Unique identifier */
	id: string;
	/** Primary display text */
	title: string;
	/** Secondary text (e.g., email, price) */
	subtitle?: string;
	/**
	 * Longer descriptive text — the `.pa-search-results__snippet` on the page-level
	 * `SearchResults` list (e.g. a full-text excerpt). May contain
	 * `<mark class="pa-search-results__mark">…</mark>` highlight when the surface's
	 * `shouldRenderHtml` is enabled.
	 */
	snippet?: string;
	/** Trailing meta chips — the `.pa-search-results__meta-item` trail (e.g. "Docs / Guides", "Updated 2 days ago"). */
	meta?: string[];
	/** Type label shown at the row's end — the `.pa-search-results__type` / autocomplete `__item-type` (e.g. "Page", "Product"). */
	type?: string;
	/** Destination link for a `SearchResults` row (the `<a href>`). */
	href?: string;
	/** Icon (emoji or icon class) */
	icon?: string;
	/** Badge text (e.g., status, category) */
	badge?: string;
	/** Badge variant for styling (e.g., 'success', 'warning', 'danger', 'info', 'primary') */
	badgeVariant?: string;
	/**
	 * Group / category label the result belongs to — e.g. the server's "group
	 * column" from a single search query (`"Products"` | `"Users"` | `"Pages"`).
	 * `NavbarSearchField` buckets a flat result set by this into `__section` headings;
	 * a single round-trip returns rows already tagged with their group.
	 */
	group?: string;
	/** Result type for global search routing (e.g., 'command', 'context', 'product') */
	_type?: string;
	/** Reference to original Command (when _type === 'command') */
	_command?: Command;
	/** Reference to original SearchContext (when _type === 'context') */
	_context?: SearchContext;
	/** Additional data passed to onSelect */
	data?: any;
}

/**
 * Presentation-only grouping metadata for `NavbarSearchField`. Controls a group's
 * section-heading label, icon, display order, and per-group cap for results tagged
 * with a matching `SearchResult.group`. It NEVER triggers a fetch — grouping is
 * applied client-side to a single search response. Omit it entirely to derive
 * groups from the distinct `group` values in first-seen order.
 */
export interface SearchGroup {
	/** Matches `SearchResult.group`. */
	id: string;
	/** Section heading text (defaults to `id`). */
	label?: string;
	/** Optional icon shown beside the section heading. */
	icon?: string;
	/** Cap the number of rows shown for this group (top-N). */
	limit?: number;
}

/**
 * A search context definition (triggered by :shortcut)
 */
export interface SearchContext {
	/** Context shortcut (e.g., ":p", ":products") */
	shortcut: string;

	/** Alternative shortcuts */
	aliases?: string[];

	/** Display name */
	name: string;

	/** Description shown in context list */
	description: string;

	/** Icon (emoji or icon class) */
	icon?: string;

	/**
	 * Search function called when user types in this context
	 * @param query - Search query
	 */
	onSearch: (query: string) => Promise<SearchResult[]> | SearchResult[];

	/**
	 * Called when user selects a result
	 * @param result - Selected result
	 */
	onSelect: (result: SearchResult) => void;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * CommandPalette component props
 */
export interface CommandPaletteProps {
	/** Show/hide the palette (bindable) */
	isOpen?: boolean;

	/** Available commands (triggered by /) */
	commands?: Command[];

	/** Available search contexts (triggered by :) */
	contexts?: SearchContext[];

	/**
	 * Global search function (when no prefix is used)
	 * @param query - Search query
	 */
	globalSearch?: (query: string) => Promise<SearchResult[]> | SearchResult[];

	/**
	 * Called when a global search result is selected
	 */
	onglobalselect?: (result: SearchResult) => void;

	/** Placeholder text for the input */
	placeholder?: string;

	/** Additional CSS classes */
	class?: string;
}

// ============================================================================
// INTERNAL STATE TYPES
// ============================================================================

/**
 * Current mode of the command palette
 */
export type PaletteMode =
	| 'idle' // Just opened, nothing typed
	| 'command-list' // Showing available commands (typed /)
	| 'command-step' // In a command wizard step
	| 'context-list' // Showing available contexts (typed :)
	| 'context-search' // Searching in a context
	| 'global-search'; // Global search (no prefix)

/**
 * Internal state of the command palette
 */
export interface PaletteState {
	mode: PaletteMode;
	/** Currently active command (if in command mode) */
	activeCommand?: Command;
	/** Current step index in command wizard */
	currentStepIndex: number;
	/** Selections made so far in command wizard */
	selections: StepSelection[];
	/** Currently active search context (if in context mode) */
	activeContext?: SearchContext;
	/** Current query text (after prefix/selections) */
	query: string;
	/** Full input value */
	inputValue: string;
	/** Items to display (commands, contexts, options, or results) */
	displayItems: Array<Command | SearchContext | StepOption | SearchResult>;
	/** Currently highlighted item index */
	activeIndex: number;
	/** Loading state */
	loading: boolean;
	/** Preview text (if command has getPreview) */
	preview?: string;
}

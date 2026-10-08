/**
 * Global type declarations for Pure Admin
 */

// Floating UI DOM (loaded via CDN)
interface FloatingUIDOM {
	computePosition: typeof import('@floating-ui/dom').computePosition;
	flip: typeof import('@floating-ui/dom').flip;
	shift: typeof import('@floating-ui/dom').shift;
	offset: typeof import('@floating-ui/dom').offset;
	autoUpdate: typeof import('@floating-ui/dom').autoUpdate;
}

declare global {
	interface Window {
		FloatingUIDOM?: FloatingUIDOM;
		/** Splitter behaviour — @keenmate/pure-admin-core/js/splitter.js */
		PaSplitter?: {
			init: (el: HTMLElement) => void;
			initAll: (root?: ParentNode) => void;
		};
		/** Range-group behaviour — @keenmate/pure-admin-core/js/range-group.js */
		PaRangeGroup?: {
			/** Scans `[data-range-group]` under `scope` (default document). */
			init: (scope?: ParentNode) => void;
		};
		/** Stat fit-mode — @keenmate/pure-admin-core/js/pa-stat-fit.js */
		PaStatFit?: {
			/** Wraps + observes `.pa-stat--square[data-pa-stat-fit]` under `root`. */
			init: (root?: ParentNode) => void;
			/** Re-fit after the number text changes (one tile, or all). */
			refresh: (el?: HTMLElement) => void;
		};
		/** Card actions-overflow / generic overflow — @keenmate/pure-admin-core/js/overflow.js */
		PaOverflow?: {
			init: (root: HTMLElement) => void;
			initAll: (scope?: ParentNode) => void;
		};
		/** Alias of PaOverflow kept for the card-actions-overflow name. */
		PaCardActionsOverflow?: Window['PaOverflow'];
		/**
		 * Touch support for navbar hover dropdowns — @keenmate/pure-admin-core/js/navbar-dropdown.js.
		 * Attaches global click/keydown listeners at module eval; `init` only (re)applies
		 * ARIA attributes on `.pc-navmenu__item--has-dropdown` parents under `scope`.
		 */
		PaNavDropdown?: {
			/** Close every open navbar dropdown. */
			closeAll: () => void;
			/** (Re)apply aria-haspopup / aria-expanded on dropdown parents under `scope`. */
			init: (scope?: ParentNode) => void;
		};
		/**
		 * Core runtime namespace — @keenmate/pure-admin-core/js/*. The interactive modules
		 * attach shared config / an event bus / component APIs here. Only the members the
		 * library drives are typed; all optional (defined by whichever module loads first).
		 */
		pureAdmin?: {
			config?: {
				mobileBreakpoint?: number;
				fit?: { defaultPriority?: number };
				containerBreakpoint?: { hysteresis?: number; hiddenClass?: string };
			};
			printElement?: (target: string | HTMLElement, options?: { title?: string }) => void;
			printSheet?: (target: string | HTMLElement, options?: { title?: string }) => void;
			events?: {
				emit: (name: string, detail?: unknown) => void;
				/** Subscribe to a topic; returns an unsubscribe function. */
				on?: (name: string, handler: (detail: unknown) => void) => (() => void) | void;
				off?: (name: string, handler: (detail: unknown) => void) => void;
			};
			/**
			 * The single owner of the OS light/dark preference — pure-admin.js keeps one
			 * prefers-color-scheme watcher and publishes it here plus a 'colorscheme:change'
			 * event, so consumers following "auto" mode read this instead of opening their own.
			 */
			colorScheme?: { mode?: 'light' | 'dark' };
			components?: {
				/**
				 * Container Breakpoint engine — @keenmate/pure-admin-core/js/container-breakpoint.js
				 * (core v2.9.0-rc17). Maps an element's inline size to a NAMED mode from declared
				 * rem/px thresholds and fires only on a flip, so a wrapper can mount on demand.
				 * Reflects [data-mode], toggles .d-none on [data-pc-show] children, dispatches
				 * a `pc:breakpoint` CustomEvent. Hysteresis dead-band stops boundary flapping.
				 */
				containerBreakpoint?: {
					observe: (
						el: HTMLElement,
						opts: {
							steps: Record<string, number> | Array<{ name: string; min: number }>;
							unit?: 'rem' | 'px';
							hysteresis?: number;
							initial?: string;
							hiddenClass?: string;
							attribute?: string | false;
							emitEvent?: boolean;
						},
						cb?: (mode: string, prev: string | null, detail: unknown) => void
					) => { current: () => string; remeasure: () => void; destroy: () => void } | null;
					init: (el: HTMLElement) => unknown;
					initAll: (scope?: ParentNode) => void;
					relayoutAll: () => void;
				};
				/**
				 * Container-generic fit engine (alias of navFit) — core v2.9.0-rc17 fit.js.
				 * Also owns nav collapse (the former navbar-collapse.js): initNav wires a
				 * `.pc-navmenu[data-pc-fit-nav]` so its items fold into a sink.
				 */
				fit?: {
					init: (container: HTMLElement) => void;
					initAll: (scope?: ParentNode) => void;
					relayoutAll: () => void;
					/** Wire one nav's item-collapse (`.pc-navmenu[data-pc-fit-nav]`). */
					initNav: (nav: HTMLElement) => void;
					/** Wire every fit-managed nav under `scope`. */
					initAllNav: (scope?: ParentNode) => void;
					/** Re-fold every fit-managed nav. */
					relayoutAllNav: () => void;
					/** Register a relocation sink `{ out, in }` by name. */
					registerSink: (name: string, sink: unknown) => void;
				};
				/** Priority-driven header degradation (canonical name: `fit`) — core fit.js. */
				navFit?: {
					/** Idempotent — wire one fit container (default `.pc-navbar__inner`). */
					init: (container: HTMLElement) => void;
					/** Wire every fit container under `scope` (default document). */
					initAll: (scope?: ParentNode) => void;
					/** Force a re-measure (e.g. after markup changes). */
					relayoutAll: () => void;
				};
				/** Sidebar drag-to-resize — @keenmate/pure-admin-core/js/sidebar-resize.js */
				sidebarResize?: {
					/** Idempotent — finds `.pc-layout__sidebar--resizable`, creates + binds the handle. */
					init: () => void;
					/** Reset to the stylesheet default width. */
					reset: () => void;
					/** Set the sidebar width in px (flags `body.pc-sidebar-resized`). */
					setWidth: (width: number) => void;
					/** Current sidebar width in px. */
					getWidth: () => number;
				};
			};
		};
		/**
		 * Shared menu-dismissal registry — @keenmate/pure-admin-core/js/split-button.js
		 * + overflow.js (core v2.9.0-rc06). Every open menu (split buttons, `.pa-overflow`
		 * "more" menus, and our Svelte-native SplitButton) registers a close fn here so
		 * opening any one dismisses the others. Defined defensively by whichever module
		 * loads first, so it may be absent until a menu component mounts.
		 */
		PaMenus?: {
			closers: Array<() => void>;
			register: (fn: () => void) => () => void;
			closeOthers: (self: () => void) => void;
		};
	}
}

export {};

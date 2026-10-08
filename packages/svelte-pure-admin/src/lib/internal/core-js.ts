/**
 * SSR-safe loader for the core framework's interactive JS.
 *
 * Since @keenmate/pure-admin-core v2.9.0-rc04 the framework ships its component
 * behaviours as self-contained IIFEs under `@keenmate/pure-admin-core/js/*`. Each
 * one reads `document.readyState` at evaluation time and attaches its API to
 * `window` (e.g. `window.PaSplitter`), so it must never be imported during SSR.
 *
 * These thin-wrapper components call `loadCoreJs(...)` from inside `onMount`
 * (browser-only) and then drive the resulting `window.Pa*` API. Import specifiers
 * are static string literals per branch so the bundler can resolve them.
 */
export async function loadCoreJs(
	module:
		| 'splitter'
		| 'range-group'
		| 'pa-stat-fit'
		| 'overflow'
		| 'navbar-dropdown'
		| 'navbar-fit'
		| 'container-breakpoint'
		| 'sidebar-resize'
		| 'sheet-print'
): Promise<void> {
	if (typeof window === 'undefined') return;
	switch (module) {
		case 'splitter':
			await import('@keenmate/pure-admin-core/js/splitter.js');
			break;
		case 'sheet-print':
			// Attaches pureAdmin.printElement / printSheet (single-element print helper).
			await import('@keenmate/pure-admin-core/js/sheet-print.js');
			break;
		case 'range-group':
			await import('@keenmate/pure-admin-core/js/range-group.js');
			break;
		case 'pa-stat-fit':
			await import('@keenmate/pure-admin-core/js/pa-stat-fit.js');
			break;
		case 'overflow':
			await import('@keenmate/pure-admin-core/js/overflow.js');
			break;
		// The four app-shell engines moved DOWN into @keenmate/pure-css (Stage C).
		// They register on window.pureCss and read its event bus / config, so the
		// pure-css foundation runtime must evaluate FIRST — import it before each
		// engine (idempotent: the runtime self-guards with `if (!pc.events)` etc.).
		case 'navbar-dropdown':
			await import('@keenmate/pure-css/js/pure-css.js');
			await import('@keenmate/pure-css/js/navbar-dropdown.js');
			break;
		case 'navbar-fit':
			await import('@keenmate/pure-css/js/pure-css.js');
			await import('@keenmate/pure-css/js/fit.js');
			break;
		case 'container-breakpoint':
			await import('@keenmate/pure-css/js/pure-css.js');
			await import('@keenmate/pure-css/js/container-breakpoint.js');
			break;
		case 'sidebar-resize':
			await import('@keenmate/pure-css/js/pure-css.js');
			await import('@keenmate/pure-css/js/sidebar-resize.js');
			break;
	}
}

// Shared page index for the docs — powers the command palette, the navbar/sidebar
// search entry points, and the /search results page (the type-and-go destination).

export interface DocPage {
	id: string;
	title: string;
	path: string;
	icon: string;
}

export const pages: DocPage[] = [
	{ id: 'getting-started', title: 'Getting Started', path: '/getting-started', icon: '🚀' },
	{ id: 'home', title: 'Dashboard', path: '/', icon: '📊' },
	{ id: 'components', title: 'Components', path: '/components', icon: '🧩' },
	{ id: 'buttons', title: 'Buttons', path: '/buttons', icon: '🔘' },
	{ id: 'cards', title: 'Cards', path: '/cards', icon: '🃏' },
	{ id: 'tabs', title: 'Tabs', path: '/tabs', icon: '📑' },
	{ id: 'badges', title: 'Badges', path: '/badges', icon: '🏷️' },
	{ id: 'lists', title: 'Lists', path: '/lists', icon: '📝' },
	{ id: 'checkbox-lists', title: 'Checkbox Lists', path: '/checkbox-lists', icon: '☑️' },
	{ id: 'code', title: 'Code', path: '/code', icon: '💻' },
	{ id: 'typography', title: 'Typography', path: '/typography', icon: '🔤' },
	{ id: 'alerts', title: 'Alerts', path: '/alerts', icon: '⚠️' },
	{ id: 'callouts', title: 'Callouts', path: '/callouts', icon: '📢' },
	{ id: 'loaders', title: 'Loaders', path: '/loaders', icon: '⏳' },
	{ id: 'toasts', title: 'Toasts', path: '/toasts', icon: '🍞' },
	{ id: 'tooltips', title: 'Tooltips', path: '/tooltips', icon: '💬' },
	{ id: 'modals', title: 'Modals', path: '/modals', icon: '🪟' },
	{ id: 'modal-dialogs', title: 'Modal Dialogs', path: '/modal-dialogs', icon: '💭' },
	{ id: 'popconfirm', title: 'Popconfirm', path: '/popconfirm', icon: '❓' },
	{ id: 'command-palette', title: 'Command Palette', path: '/command-palette', icon: '🎨' },
	{ id: 'forms', title: 'Forms', path: '/forms', icon: '📋' },
	{ id: 'inputs', title: 'Inputs', path: '/inputs', icon: '✏️' },
	{ id: 'grid', title: 'Grid System', path: '/grid', icon: '📐' },
	{ id: 'layouts', title: 'Layouts', path: '/layouts', icon: '📄' },
	{ id: 'tables', title: 'Tables', path: '/tables', icon: '📊' },
	{ id: 'tables-sizing', title: 'Table Sizing', path: '/tables-sizing', icon: '📏' },
	{ id: 'tables-responsive', title: 'Responsive Tables', path: '/tables-responsive', icon: '📱' },
	{ id: 'table-filters', title: 'Table Filters', path: '/table-filters', icon: '🔍' },
	{ id: 'table-multi-select', title: 'Table Multi-Select', path: '/table-multi-select', icon: '☑️' },
	{ id: 'comparison', title: 'Comparison', path: '/comparison', icon: '⚖️' },
	{ id: 'pagers', title: 'Pagers', path: '/pagers', icon: '📄' },
	{ id: 'detail-panel', title: 'Detail Panel', path: '/detail-panel', icon: '📋' },
	{ id: 'data-display', title: 'Data Display', path: '/data-display', icon: '📄' },
	{ id: 'data-display-2', title: 'Data Display v2', path: '/data-display-2', icon: '📄' },
	{ id: 'data-visualization', title: 'Data Visualization', path: '/data-visualization', icon: '📈' },
	{ id: 'range-group', title: 'Range Group', path: '/range-group', icon: '🎚️' },
	{ id: 'splitter', title: 'Splitter', path: '/splitter', icon: '↔️' },
	{ id: 'responsivity', title: 'Responsivity — how it works', path: '/responsivity', icon: '📐' },
	{ id: 'container-breakpoint', title: 'Fit to Size', path: '/container-breakpoint', icon: '↔️' },
	{ id: 'timeline-simple', title: 'Timeline Simple', path: '/timeline-simple', icon: '⏱️' },
	{ id: 'timeline-block', title: 'Timeline Block', path: '/timeline-block', icon: '📦' },
	{ id: 'timeline-feed', title: 'Timeline Feed', path: '/timeline-feed', icon: '📰' },
	{ id: 'theme-variables', title: 'Theme Variables', path: '/theme-variables', icon: '🎨' },
	{ id: 'colors', title: 'Colors', path: '/colors', icon: '🎨' },
	{ id: 'icons', title: 'Icons', path: '/icons', icon: '✨' },
	{ id: 'validations', title: 'Validation Patterns', path: '/validations', icon: '✓' },
	{ id: 'batch-rpc', title: 'Batch RPC', path: '/batch-rpc', icon: '📡' },
	{ id: 'i18n', title: 'Internationalization (i18n)', path: '/i18n', icon: '🌐' },
	{ id: 'auto-theme', title: 'Auto Theme', path: '/auto-theme', icon: '🌓' },
	{ id: 'kpi-dashboard', title: 'KPI Dashboard', path: '/kpi-dashboard', icon: '📊' },
	// KPI showcases — order matches pure-admin sidebar
	{ id: 'kpi-terminal-grid', title: 'KPI · Terminal grid', path: '/kpi-terminal-grid', icon: '📊' },
	{ id: 'kpi-sparkline-list', title: 'KPI · Sparkline list', path: '/kpi-sparkline-list', icon: '📊' },
	{ id: 'kpi-comparison-gauges', title: 'KPI · Comparison gauges', path: '/kpi-comparison-gauges', icon: '📊' },
	{ id: 'kpi-hero-supporting', title: 'KPI · Hero + supporting', path: '/kpi-hero-supporting', icon: '📊' },
	{ id: 'kpi-bento', title: 'KPI · Bento layout', path: '/kpi-bento', icon: '📊' },
	{ id: 'kpi-numeric-strip', title: 'KPI · Numeric strip', path: '/kpi-numeric-strip', icon: '📊' },
	{ id: 'kpi-editorial-minimal', title: 'KPI · Editorial minimal', path: '/kpi-editorial-minimal', icon: '📊' },
	{ id: 'movies', title: 'Movies', path: '/movies', icon: '🎬' },
	{ id: 'movie-detail', title: 'Movie Detail', path: '/movies/detail?id=1', icon: '🎬' },
	{ id: 'movies-panel', title: 'Movies + Panel', path: '/movies-panel', icon: '🎬' }
];

/** Filter pages by title or path (case-insensitive). Empty query → no results. */
export function searchPages(query: string): DocPage[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	return pages.filter((p) => p.title.toLowerCase().includes(q) || p.path.toLowerCase().includes(q));
}

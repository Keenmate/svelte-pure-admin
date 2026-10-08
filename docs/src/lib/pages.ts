// Shared page index for the docs ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ powers the command palette, the navbar/sidebar
// search entry points, and the /search results page (the type-and-go destination).

export interface DocPage {
	id: string;
	title: string;
	path: string;
	icon: string;
}

export const pages: DocPage[] = [
	{ id: 'getting-started', title: 'Getting Started', path: '/getting-started', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'home', title: 'Dashboard', path: '/', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'components', title: 'Components', path: '/components', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂ§ÃÂÃÂ©' },
	{ id: 'buttons', title: 'Buttons', path: '/buttons', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'cards', title: 'Cards', path: '/surfaces/cards', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'tabs', title: 'Tabs', path: '/surfaces/tabs', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'badges', title: 'Badges', path: '/interactive/badges', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ·ÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ' },
	{ id: 'lists', title: 'Lists', path: '/data-display/lists', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'checkbox-lists', title: 'Checkbox Lists', path: '/forms/checkbox-lists', icon: 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ' },
	{ id: 'code', title: 'Code', path: '/data-display/code', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ»' },
	{ id: 'typography', title: 'Typography', path: '/design/typography', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¤' },
	{ id: 'alerts', title: 'Alerts', path: '/feedback/alerts', icon: 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ ÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ' },
	{ id: 'callouts', title: 'Callouts', path: '/feedback/callouts', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¢' },
	{ id: 'loaders', title: 'Loaders', path: '/feedback/loaders', icon: 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ³' },
	{ id: 'toasts', title: 'Toasts', path: '/feedback/toasts', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'tooltips', title: 'Tooltips', path: '/feedback/tooltips', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬' },
	{ id: 'notifications', title: 'Notifications', path: '/feedback/notifications', icon: '🔔' },
	{ id: 'modals', title: 'Modals', path: '/surfaces/modals', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂªÃÂÃÂ' },
	{ id: 'modal-dialogs', title: 'Modal Dialogs', path: '/surfaces/modal-dialogs', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ­' },
	{ id: 'popconfirm', title: 'Popconfirm', path: '/buttons/popconfirm', icon: 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ' },
	{ id: 'command-palette', title: 'Command Palette', path: '/interactive/command-palette', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¨' },
	{ id: 'forms', title: 'Forms', path: '/forms', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'inputs', title: 'Inputs', path: '/forms/inputs', icon: 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ' },
	{ id: 'grid', title: 'Grid System', path: '/layout/grid', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'layouts', title: 'Layouts', path: '/design/layouts', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'tables', title: 'Tables', path: '/tables/standard', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'tables-sizing', title: 'Table Sizing', path: '/tables/sizing', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'tables-responsive', title: 'Responsive Tables', path: '/tables/responsive', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ±' },
	{ id: 'table-filters', title: 'Table Filters', path: '/tables/filters', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'table-multi-select', title: 'Table Multi-Select', path: '/tables/multi-select', icon: 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ' },
	{ id: 'comparison', title: 'Comparison', path: '/tables/comparison', icon: 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ' },
	{ id: 'pagers', title: 'Pagers', path: '/buttons/pagers', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'detail-panel', title: 'Detail Panel', path: '/surfaces/detail-panel', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'data-display', title: 'Data Display', path: '/data-display', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'data-display-2', title: 'Data Display v2', path: '/data-display/data-display-2', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'stats', title: 'Stat Cards', path: '/data-display/stats', icon: '📊' },
	{ id: 'document', title: 'Document', path: '/data-display/document', icon: '📄' },
	{ id: 'sheet', title: 'Sheet', path: '/data-display/sheet', icon: '🧾' },
	{ id: 'data-visualization', title: 'Data Visualization', path: '/data-viz', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'range-group', title: 'Range Group', path: '/forms/range-group', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ' },
	{ id: 'splitter', title: 'Splitter', path: '/surfaces/splitter', icon: 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ' },
	{ id: 'responsivity', title: 'Responsivity ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ how it works', path: '/layout/responsivity', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'responsive-form', title: 'Responsive Form', path: '/layout/responsive-form', icon: '📐' },
	{ id: 'container-breakpoint', title: 'Fit to Size', path: '/layout/container-breakpoint', icon: 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ' },
	{ id: 'timeline-simple', title: 'Timeline Simple', path: '/timeline/simple', icon: 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ±ÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ' },
	{ id: 'timeline-block', title: 'Timeline Block', path: '/timeline/block', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¦' },
	{ id: 'timeline-feed', title: 'Timeline Feed', path: '/timeline/feed', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ°' },
	{ id: 'timeline-advanced', title: 'Timeline Advanced', path: '/timeline/advanced', icon: '⏱' },
	{ id: 'theme-variables', title: 'Theme Variables', path: '/design/theme-variables', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¨' },
	{ id: 'colors', title: 'Colors', path: '/design/colors', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¨' },
	{ id: 'icons', title: 'Icons', path: '/design/icons', icon: 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¨' },
	{ id: 'validations', title: 'Validation Patterns', path: '/forms/validations', icon: 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ' },
	{ id: 'batch-rpc', title: 'Batch RPC', path: '/svelte/batch-rpc', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¡' },
	{ id: 'i18n', title: 'Internationalization (i18n)', path: '/svelte/i18n', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'auto-theme', title: 'Auto Theme', path: '/svelte/auto-theme', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'kpi-dashboard', title: 'KPI Dashboard', path: '/showcases/kpi-dashboard', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	// KPI showcases ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ order matches pure-admin sidebar
	{ id: 'kpi-terminal-grid', title: 'KPI ÃÂÃÂÃÂÃÂ· Terminal grid', path: '/kpi/terminal-grid', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'kpi-sparkline-list', title: 'KPI ÃÂÃÂÃÂÃÂ· Sparkline list', path: '/kpi/sparkline-list', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'kpi-comparison-gauges', title: 'KPI ÃÂÃÂÃÂÃÂ· Comparison gauges', path: '/kpi/comparison-gauges', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'kpi-hero-supporting', title: 'KPI ÃÂÃÂÃÂÃÂ· Hero + supporting', path: '/kpi/hero-supporting', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'kpi-bento', title: 'KPI ÃÂÃÂÃÂÃÂ· Bento layout', path: '/kpi/bento', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'kpi-numeric-strip', title: 'KPI ÃÂÃÂÃÂÃÂ· Numeric strip', path: '/kpi/numeric-strip', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'kpi-editorial-minimal', title: 'KPI ÃÂÃÂÃÂÃÂ· Editorial minimal', path: '/kpi/editorial-minimal', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ' },
	{ id: 'movies', title: 'Movies', path: '/showcases/movies', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬' },
	{ id: 'movie-detail', title: 'Movie Detail', path: '/showcases/movies/detail?id=1', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬' },
	{ id: 'movies-panel', title: 'Movies + Panel', path: '/showcases/movies-panel', icon: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬' }
];

/** Filter pages by title or path (case-insensitive). Empty query ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ no results. */
export function searchPages(query: string): DocPage[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	return pages.filter((p) => p.title.toLowerCase().includes(q) || p.path.toLowerCase().includes(q));
}

// Shared page index for the docs — powers the command palette, the navbar/sidebar
// search entry points, and the /search results page (the type-and-go destination).
//
// `icon` is an icon-provider NAME (a `navIcons` key), NOT a unicode glyph — the
// same key the sidebar passes to `<Icon name>`, so the palette and the sidebar
// render identical glyphs through the configured provider. See `nav-icons.ts`.

export interface DocPage {
	id: string;
	title: string;
	path: string;
	icon: string;
}

export const pages: DocPage[] = [
	{ id: 'getting-started', title: 'Getting Started', path: '/getting-started', icon: 'getting_started' },
	{ id: 'home', title: 'Dashboard', path: '/', icon: 'dashboard' },
	{ id: 'components', title: 'Components', path: '/components', icon: 'components_overview' },
	{ id: 'buttons', title: 'Buttons', path: '/buttons', icon: 'buttons' },
	{ id: 'cards', title: 'Cards', path: '/surfaces/cards', icon: 'cards' },
	{ id: 'tabs', title: 'Tabs', path: '/surfaces/tabs', icon: 'tabs' },
	{ id: 'badges', title: 'Badges', path: '/interactive/badges', icon: 'badges' },
	{ id: 'lists', title: 'Lists', path: '/data-display/lists', icon: 'lists' },
	{ id: 'checkbox-lists', title: 'Checkbox Lists', path: '/forms/checkbox-lists', icon: 'checkbox_lists' },
	{ id: 'code', title: 'Code', path: '/data-display/code', icon: 'code' },
	{ id: 'typography', title: 'Typography', path: '/design/typography', icon: 'typography' },
	{ id: 'alerts', title: 'Alerts', path: '/feedback/alerts', icon: 'alerts' },
	{ id: 'callouts', title: 'Callouts', path: '/feedback/callouts', icon: 'callouts' },
	{ id: 'loaders', title: 'Loaders', path: '/feedback/loaders', icon: 'loaders' },
	{ id: 'toasts', title: 'Toasts', path: '/feedback/toasts', icon: 'toasts' },
	{ id: 'tooltips', title: 'Tooltips', path: '/feedback/tooltips', icon: 'tooltips' },
	{ id: 'notifications', title: 'Notifications', path: '/feedback/notifications', icon: 'notifications' },
	{ id: 'modals', title: 'Modals', path: '/surfaces/modals', icon: 'modals' },
	{ id: 'modal-dialogs', title: 'Modal Dialogs', path: '/surfaces/modal-dialogs', icon: 'modal_dialogs' },
	{ id: 'popconfirm', title: 'Popconfirm', path: '/buttons/popconfirm', icon: 'popconfirm' },
	{ id: 'command-palette', title: 'Command Palette', path: '/interactive/command-palette', icon: 'command_palette' },
	{ id: 'forms', title: 'Forms', path: '/forms', icon: 'forms' },
	{ id: 'inputs', title: 'Inputs', path: '/forms/inputs', icon: 'inputs' },
	{ id: 'grid', title: 'Grid System', path: '/layout/grid', icon: 'grid' },
	{ id: 'layouts', title: 'Layouts', path: '/design/layouts', icon: 'layout' },
	{ id: 'tables', title: 'Tables', path: '/tables/standard', icon: 'table' },
	{ id: 'tables-sizing', title: 'Table Sizing', path: '/tables/sizing', icon: 'sizing' },
	{ id: 'tables-responsive', title: 'Responsive Tables', path: '/tables/responsive', icon: 'table_responsive' },
	{ id: 'table-filters', title: 'Table Filters', path: '/tables/filters', icon: 'table_filters' },
	{ id: 'table-multi-select', title: 'Table Multi-Select', path: '/tables/multi-select', icon: 'table_multiselect' },
	{ id: 'comparison', title: 'Comparison', path: '/tables/comparison', icon: 'table_comparison' },
	{ id: 'pagers', title: 'Pagers', path: '/buttons/pagers', icon: 'pagers' },
	{ id: 'detail-panel', title: 'Detail Panel', path: '/surfaces/detail-panel', icon: 'detail_panel' },
	{ id: 'data-display', title: 'Data Display', path: '/data-display', icon: 'data_display' },
	{ id: 'data-display-2', title: 'Data Display v2', path: '/data-display/data-display-2', icon: 'data_display_2' },
	{ id: 'stats', title: 'Stat Cards', path: '/data-display/stats', icon: 'kpi' },
	{ id: 'document', title: 'Document', path: '/data-display/document', icon: 'document' },
	{ id: 'sheet', title: 'Sheet', path: '/data-display/sheet', icon: 'sheet' },
	{ id: 'data-visualization', title: 'Data Visualization', path: '/data-viz', icon: 'data_visualization' },
	{ id: 'range-group', title: 'Range Group', path: '/forms/range-group', icon: 'range_group' },
	{ id: 'splitter', title: 'Splitter', path: '/surfaces/splitter', icon: 'splitter' },
	{ id: 'responsivity', title: 'Responsivity — how it works', path: '/layout/responsivity', icon: 'responsivity' },
	{ id: 'responsive-form', title: 'Responsive Form', path: '/layout/responsive-form', icon: 'responsivity' },
	{ id: 'container-breakpoint', title: 'Fit to Size', path: '/layout/container-breakpoint', icon: 'container_breakpoint' },
	{ id: 'timeline-simple', title: 'Timeline Simple', path: '/timeline/simple', icon: 'timeline_simple' },
	{ id: 'timeline-block', title: 'Timeline Block', path: '/timeline/block', icon: 'timeline_block' },
	{ id: 'timeline-feed', title: 'Timeline Feed', path: '/timeline/feed', icon: 'timeline_feed' },
	{ id: 'timeline-advanced', title: 'Timeline Advanced', path: '/timeline/advanced', icon: 'timeline' },
	{ id: 'theme-variables', title: 'Theme Variables', path: '/design/theme-variables', icon: 'theme_variables' },
	{ id: 'colors', title: 'Colors', path: '/design/colors', icon: 'colors' },
	{ id: 'icons', title: 'Icons', path: '/design/icons', icon: 'icons' },
	{ id: 'validations', title: 'Validation Patterns', path: '/forms/validations', icon: 'validations' },
	{ id: 'batch-rpc', title: 'Batch RPC', path: '/svelte/batch-rpc', icon: 'batch_rpc' },
	{ id: 'i18n', title: 'Internationalization (i18n)', path: '/svelte/i18n', icon: 'i18n' },
	{ id: 'auto-theme', title: 'Auto Theme', path: '/svelte/auto-theme', icon: 'auto_theme' },
	{ id: 'kpi-dashboard', title: 'KPI Dashboard', path: '/showcases/kpi-dashboard', icon: 'kpi' },
	// KPI showcases — order matches pure-admin sidebar
	{ id: 'kpi-terminal-grid', title: 'KPI · Terminal grid', path: '/kpi/terminal-grid', icon: 'kpi_terminal' },
	{ id: 'kpi-sparkline-list', title: 'KPI · Sparkline list', path: '/kpi/sparkline-list', icon: 'kpi_sparkline' },
	{ id: 'kpi-comparison-gauges', title: 'KPI · Comparison gauges', path: '/kpi/comparison-gauges', icon: 'kpi' },
	{ id: 'kpi-hero-supporting', title: 'KPI · Hero + supporting', path: '/kpi/hero-supporting', icon: 'kpi' },
	{ id: 'kpi-bento', title: 'KPI · Bento layout', path: '/kpi/bento', icon: 'kpi' },
	{ id: 'kpi-numeric-strip', title: 'KPI · Numeric strip', path: '/kpi/numeric-strip', icon: 'kpi_numeric' },
	{ id: 'kpi-editorial-minimal', title: 'KPI · Editorial minimal', path: '/kpi/editorial-minimal', icon: 'kpi_editorial' },
	{ id: 'movies', title: 'Movies', path: '/showcases/movies', icon: 'movies' },
	{ id: 'movie-detail', title: 'Movie Detail', path: '/showcases/movies/detail?id=1', icon: 'movies' },
	{ id: 'movies-panel', title: 'Movies + Panel', path: '/showcases/movies-panel', icon: 'movies' }
];

/** Filter pages by title or path (case-insensitive). Empty query → no results. */
export function searchPages(query: string): DocPage[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	return pages.filter((p) => p.title.toLowerCase().includes(q) || p.path.toLowerCase().includes(q));
}

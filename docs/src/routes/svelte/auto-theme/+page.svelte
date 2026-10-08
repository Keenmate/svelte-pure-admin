<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Heading,
		Paragraph,
		Alert,
		Callout,
		Button,
		Badge,
		Table,
		BasicList,
		Code,
		Strong,
		Select
	} from '@keenmate/svelte-pure-admin';
	import { HighlightedCode } from '$lib/components';
	import { onMount } from 'svelte';

	// Demo state
	let demoThemeMode = $state<'light' | 'dark' | 'auto'>('auto');
	let osPreference = $state<'light' | 'dark'>('light');
	let resolvedTheme = $state<'light' | 'dark'>('light');

	// Detect and track OS preference
	function detectOSPreference(): 'light' | 'dark' {
		if (typeof window === 'undefined') return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	// Calculate resolved theme based on mode and OS preference
	function getResolvedTheme(mode: 'light' | 'dark' | 'auto', osPref: 'light' | 'dark'): 'light' | 'dark' {
		if (mode === 'auto') {
			return osPref;
		}
		return mode;
	}

	// Update resolved theme when mode or OS preference changes
	$effect(() => {
		resolvedTheme = getResolvedTheme(demoThemeMode, osPreference);
	});

	onMount(() => {
		// Initial OS preference detection
		osPreference = detectOSPreference();

		// Listen for OS theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			osPreference = e.matches ? 'dark' : 'light';
		};

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	});

	// Code examples
	const codeConfigType = `// config.ts
ui: {
  /** Default theme (light/dark/auto - auto follows OS preference) */
  theme: 'light' | 'dark' | 'auto';
  // ...
}`;

	const codeSettingsPanel = `// SettingsPanel.svelte - Theme Mode dropdown
<select bind:value={settings.themeMode}>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="auto">Auto (System)</option>
</select>`;

	const codeResolveTheme = `// Resolve 'auto' to actual light/dark based on OS preference
function getResolvedThemeMode(mode: string): 'light' | 'dark' {
  if (mode === 'auto') {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light'; // Default to light on server
  }
  return mode as 'light' | 'dark';
}`;

	const codeMediaQueryListener = `// Listen for OS theme changes when in auto mode
let mediaQuery: MediaQueryList | null = null;

function setupAutoThemeListener() {
  if (typeof window === 'undefined') return;

  // Clean up previous listener
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleOSThemeChange);
    mediaQuery = null;
  }

  // Set up new listener if in auto mode
  if (settings.themeMode === 'auto') {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleOSThemeChange);
  }
}

function handleOSThemeChange(e: MediaQueryListEvent) {
  if (settings.themeMode === 'auto') {
    applyThemeToDOM(e.matches ? 'dark' : 'light');
  }
}`;

	const codeFOUCScript = `// app.html - Prevent flash of unstyled content
<script>
  (function() {
    var themeMode = localStorage.getItem('theme-mode') || 'light';
    var resolvedMode;

    if (themeMode === 'auto') {
      // Check OS preference for auto mode
      resolvedMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      resolvedMode = themeMode;
    }

    document.body.classList.add('pc-mode-' + resolvedMode);
  })();
<\/script>`;

	const codeLocalStorage = `// Theme mode is stored in localStorage
localStorage.setItem('theme-mode', 'auto');  // or 'light' or 'dark'

// Reading the stored value
const themeMode = localStorage.getItem('theme-mode') || 'light';`;

	const codeApplySettings = `function applySettings() {
  // ...

  // Theme mode (light/dark/auto)
  const resolvedMode = getResolvedThemeMode(settings.themeMode);
  applyThemeToDOM(resolvedMode);

  // Set up listener for auto mode
  setupAutoThemeListener();

  // ...
}

function applyThemeToDOM(resolvedMode: 'light' | 'dark') {
  document.body.classList.remove('pc-mode-light', 'pc-mode-dark');
  document.body.classList.add(\`pc-mode-\${resolvedMode}\`);
}`;

	const codeUsageBasic = `// Using the SettingsPanel component
<SettingsPanel
  availableThemes={themes}
  onSettingsChange={(settings) => console.log(settings.themeMode)}
/>

// The themeMode will be 'light', 'dark', or 'auto'`;

	const codeOSSettings = `// How to change OS theme preference for testing:

// Windows 11/10:
// Settings > Personalization > Colors > Choose your mode

// macOS:
// System Preferences > Appearance > Light/Dark

// Linux (GNOME):
// Settings > Appearance > Style

// Chrome DevTools (for testing):
// 1. Open DevTools (F12)
// 2. Cmd/Ctrl + Shift + P
// 3. Type "Emulate CSS prefers-color-scheme"
// 4. Select light or dark`;
</script>

<Callout variant="info" class="mb-4">
	<Strong>Auto Theme Switching</Strong> allows your application to automatically follow the user's operating
	system theme preference. When set to "Auto", the theme switches between light and dark mode based on
	the OS setting and reacts to changes in real-time.
</Callout>

<!-- Interactive Demo -->
<Card titleText="Interactive Demo">
	<Paragraph>
		See how the auto theme feature works. Select a theme mode and observe how it resolves to
		an actual theme based on your OS preference.
	</Paragraph>

	<Grid class="mt-4">
		<Column size="100" md="50">
			<Heading level={5}>Theme Mode Selector</Heading>
			<div class="d-flex align-items-center gap-2 mt-2">
				<Select bind:value={demoThemeMode}>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
					<option value="auto">Auto (System)</option>
				</Select>
			</div>

			<div class="mt-3 p-3 bg-light rounded">
				<Strong>Current State:</Strong>
				<ul class="mt-2 mb-0">
					<li>
						<Code>themeMode</Code>:
						<Badge variant={demoThemeMode === 'auto' ? 'primary' : 'secondary'}>{demoThemeMode}</Badge>
					</li>
					<li>
						<Code>osPreference</Code>:
						<Badge variant={osPreference === 'dark' ? 'dark' : 'light'}>{osPreference}</Badge>
					</li>
					<li>
						<Code>resolvedTheme</Code>:
						<Badge variant={resolvedTheme === 'dark' ? 'warning' : 'success'}>{resolvedTheme}</Badge>
					</li>
				</ul>
			</div>
		</Column>

		<Column size="100" md="50">
			<Heading level={5}>How It Works</Heading>
			<div class="mt-2 p-3 bg-light rounded">
				<BasicList>
					<li>
						<Strong>Light:</Strong> Always uses light theme
					</li>
					<li>
						<Strong>Dark:</Strong> Always uses dark theme
					</li>
					<li>
						<Strong>Auto:</Strong> Follows your OS preference
						<ul class="mt-1">
							<li>OS set to dark → Dark theme</li>
							<li>OS set to light → Light theme</li>
							<li>OS changes → Theme updates automatically</li>
						</ul>
					</li>
				</BasicList>
			</div>

			<Callout variant="warning" class="mt-3">
				<Strong>Try it!</Strong> Change your OS theme setting and watch the <Code>osPreference</Code>
				and <Code>resolvedTheme</Code> values update in real-time (when mode is "Auto").
			</Callout>
		</Column>
	</Grid>

	<Heading level={5} class="mt-4">Preview</Heading>
	<div
		class="p-4 rounded mt-2 d-flex align-items-center justify-content-center"
		style="min-height: 100px; background: {resolvedTheme === 'dark' ? '#1a1a2e' : '#f8f9fa'}; color: {resolvedTheme === 'dark' ? '#e4e4e7' : '#1f2937'}; border: 1px solid {resolvedTheme === 'dark' ? '#374151' : '#e5e7eb'};"
	>
		<div class="text-center">
			<div style="font-size: 2rem;">{resolvedTheme === 'dark' ? '🌙' : '☀️'}</div>
			<Strong>Resolved Theme: {resolvedTheme}</Strong>
			<p class="mb-0 mt-1" style="opacity: 0.7;">
				{#if demoThemeMode === 'auto'}
					Following OS preference ({osPreference})
				{:else}
					Manually set to {demoThemeMode}
				{/if}
			</p>
		</div>
	</div>
</Card>

<!-- Overview -->
<Card titleText="Overview">
	<Paragraph>
		The auto theme feature provides a 3-way toggle for theme selection: <Code>Light</Code>,
		<Code>Dark</Code>, and <Code>Auto</Code>. When set to "Auto", the application automatically
		follows the operating system's color scheme preference using the CSS media query
		<Code>prefers-color-scheme</Code>.
	</Paragraph>

	<BasicList class="mt-3">
		<li><Strong>Three theme modes</Strong> - Light, Dark, and Auto (System)</li>
		<li><Strong>Real-time updates</Strong> - Theme changes instantly when OS preference changes</li>
		<li><Strong>Persistent setting</Strong> - Theme mode saved to localStorage</li>
		<li><Strong>No FOUC</Strong> - Flash of unstyled content prevented with isInline script</li>
		<li><Strong>SSR compatible</Strong> - Graceful fallback on server-side rendering</li>
	</BasicList>

	<Heading level={4} class="mt-4">Theme Mode Values</Heading>
	<Table isStriped size="sm" class="mt-2">
		<thead>
			<tr><th>Value</th><th>Behavior</th><th>Use Case</th></tr>
		</thead>
		<tbody>
			<tr>
				<td><Code>'light'</Code></td>
				<td>Always applies light theme</td>
				<td>User prefers light regardless of OS</td>
			</tr>
			<tr>
				<td><Code>'dark'</Code></td>
				<td>Always applies dark theme</td>
				<td>User prefers dark regardless of OS</td>
			</tr>
			<tr>
				<td><Code>'auto'</Code></td>
				<td>Follows OS preference, updates in real-time</td>
				<td>User wants app to match system theme</td>
			</tr>
		</tbody>
	</Table>
</Card>

<!-- Configuration -->
<Card titleText="Configuration">
	<Paragraph>
		The theme type in <Code>config.ts</Code> now includes the <Code>'auto'</Code> option.
	</Paragraph>

	<HighlightedCode language="typescript" code={codeConfigType} />

	<Heading level={4} class="mt-4">Settings Panel</Heading>
	<Paragraph>
		The SettingsPanel component provides a dropdown with all three theme mode options.
	</Paragraph>

	<HighlightedCode language="svelte" code={codeSettingsPanel} />
</Card>

<!-- Implementation -->
<Card titleText="Implementation Details">
	<Heading level={4}>1. Resolving Auto Mode</Heading>
	<Paragraph>
		When the theme mode is <Code>'auto'</Code>, we use the browser's <Code>matchMedia</Code> API
		to detect the OS preference.
	</Paragraph>
	<HighlightedCode language="typescript" code={codeResolveTheme} />

	<Heading level={4} class="mt-4">2. Real-time OS Theme Detection</Heading>
	<Paragraph>
		A <Code>MediaQueryList</Code> listener is set up to detect when the user changes their OS theme preference.
	</Paragraph>
	<HighlightedCode language="typescript" code={codeMediaQueryListener} />

	<Heading level={4} class="mt-4">3. Applying the Theme</Heading>
	<Paragraph>
		The resolved theme is applied by adding the appropriate CSS class to the body element.
	</Paragraph>
	<HighlightedCode language="typescript" code={codeApplySettings} />

	<Heading level={4} class="mt-4">4. FOUC Prevention</Heading>
	<Paragraph>
		To prevent a flash of unstyled content on page load, an isInline script in <Code>app.html</Code>
		resolves and applies the theme before the page renders.
	</Paragraph>
	<HighlightedCode language="html" code={codeFOUCScript} />
</Card>

<!-- Storage -->
<Card titleText="LocalStorage">
	<Paragraph>
		The theme mode setting is persisted in localStorage under the key <Code>theme-mode</Code>.
	</Paragraph>

	<HighlightedCode language="typescript" code={codeLocalStorage} />

	<Table isStriped size="sm" class="mt-4">
		<thead>
			<tr><th>Key</th><th>Possible Values</th><th>Default</th></tr>
		</thead>
		<tbody>
			<tr>
				<td><Code>theme-mode</Code></td>
				<td><Code>'light'</Code>, <Code>'dark'</Code>, <Code>'auto'</Code></td>
				<td><Code>'light'</Code></td>
			</tr>
		</tbody>
	</Table>

	<Callout variant="info" class="mt-4">
		<Strong>Note:</Strong> When <Code>'auto'</Code> is stored, the FOUC prevention script and
		SettingsPanel both resolve it to the actual theme based on the current OS preference.
	</Callout>
</Card>

<!-- Usage -->
<Card titleText="Usage">
	<Paragraph>
		The auto theme feature is built into the <Code>SettingsPanel</Code> component. Simply include
		the component in your layout and users can select their preferred theme mode.
	</Paragraph>

	<HighlightedCode language="svelte" code={codeUsageBasic} />
</Card>

<!-- Testing -->
<Card titleText="Testing Auto Theme">
	<Paragraph>
		To test the auto theme feature, you can change your OS theme preference or use browser DevTools.
	</Paragraph>

	<HighlightedCode language="bash" code={codeOSSettings} />

	<Alert variant="info" class="mt-4">
		<Strong>Chrome DevTools Tip:</Strong> The easiest way to test is using Chrome DevTools'
		"Emulate CSS prefers-color-scheme" feature. This lets you toggle between light and dark
		without changing your actual OS settings.
	</Alert>
</Card>

<!-- Data Flow -->
<Card titleText="Data Flow">
	<Paragraph>
		Here's how the auto theme system processes theme changes:
	</Paragraph>

	<div class="p-3 bg-light rounded mt-3" style="font-family: monospace; font-size: 0.875rem;">
		<pre class="mb-0">User selects "Auto" in SettingsPanel
         ↓
localStorage['theme-mode'] = 'auto'
         ↓
getResolvedThemeMode('auto') checks prefers-color-scheme
         ↓
Returns 'light' or 'dark' based on OS
         ↓
Applies pc-mode-light or pc-mode-dark to body
         ↓
MediaQueryList listener watches for OS changes
         ↓
On change → reapply resolved theme</pre>
	</div>
</Card>

<!-- Edge Cases -->
<Card titleText="Edge Cases">
	<Heading level={4}>Server-Side Rendering (SSR)</Heading>
	<Paragraph>
		On the server, <Code>window.matchMedia</Code> is not available. The implementation defaults
		to <Code>'light'</Code> on the server, and the client-side hydration corrects it if needed.
	</Paragraph>

	<Heading level={4} class="mt-4">FOUC Prevention</Heading>
	<Paragraph>
		The isInline script in <Code>app.html</Code> runs synchronously before the page renders,
		ensuring the correct theme class is applied immediately. This prevents any flash of the
		wrong theme.
	</Paragraph>

	<Heading level={4} class="mt-4">Listener Cleanup</Heading>
	<Paragraph>
		The MediaQueryList listener is properly cleaned up when:
	</Paragraph>
	<BasicList>
		<li>The user switches away from "Auto" mode</li>
		<li>The SettingsPanel component is destroyed</li>
	</BasicList>
</Card>

<!-- Browser Support -->
<Card titleText="Browser Support">
	<Paragraph>
		The <Code>prefers-color-scheme</Code> media query is supported in all modern browsers:
	</Paragraph>

	<Table isStriped size="sm" class="mt-3">
		<thead>
			<tr><th>Browser</th><th>Version</th><th>Support</th></tr>
		</thead>
		<tbody>
			<tr>
				<td>Chrome</td>
				<td>76+</td>
				<td><Badge variant="success">Full</Badge></td>
			</tr>
			<tr>
				<td>Firefox</td>
				<td>67+</td>
				<td><Badge variant="success">Full</Badge></td>
			</tr>
			<tr>
				<td>Safari</td>
				<td>12.1+</td>
				<td><Badge variant="success">Full</Badge></td>
			</tr>
			<tr>
				<td>Edge</td>
				<td>79+</td>
				<td><Badge variant="success">Full</Badge></td>
			</tr>
			<tr>
				<td>IE 11</td>
				<td>-</td>
				<td><Badge variant="secondary">Fallback to light</Badge></td>
			</tr>
		</tbody>
	</Table>

	<Callout variant="info" class="mt-4">
		For browsers that don't support <Code>prefers-color-scheme</Code>, the auto mode will
		gracefully fall back to the light theme.
	</Callout>
</Card>

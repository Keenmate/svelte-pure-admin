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
		Input,
		Select,
		Spinner,
		i18n,
		_,
		locale
	} from '@keenmate/svelte-pure-admin';
	import { HighlightedCode } from '$lib/components';

	// Demo state
	let demoLoading = $state(false);
	let demoLocale = $state(i18n.currentLocale);
	let demoLanguages = $state([...i18n.languages]);
	let customLanguageCode = $state('');
	let customLanguageName = $state('');

	// Simulated async loader for demo
	async function simulateAsyncLoad(code: string): Promise<object> {
		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Return fake translations based on locale
		const fakeTranslations: Record<string, object> = {
			de: {
				demo: {
					greeting: 'Guten Tag!',
					welcome: 'Willkommen in unserer App'
				}
			},
			fr: {
				demo: {
					greeting: 'Bonjour!',
					welcome: 'Bienvenue dans notre application'
				}
			},
			es: {
				demo: {
					greeting: '¡Hola!',
					welcome: 'Bienvenido a nuestra aplicación'
				}
			}
		};

		return fakeTranslations[code] || { demo: { greeting: `Hello (${code})!` } };
	}

	// Switch locale with loading state
	async function handleLocaleChange(code: string) {
		demoLoading = true;
		try {
			await i18n.setLocale(code);
			demoLocale = code;
		} finally {
			demoLoading = false;
		}
	}

	// Add custom language
	function addCustomLanguage() {
		if (customLanguageCode && customLanguageName) {
			i18n.addLanguage({ code: customLanguageCode, name: customLanguageName });
			demoLanguages = [...i18n.languages];
			customLanguageCode = '';
			customLanguageName = '';
		}
	}

	// Remove language
	function removeLanguage(code: string) {
		i18n.removeLanguage(code);
		demoLanguages = [...i18n.languages];
	}

	// Code examples
	const codeInstall = `npm install @keenmate/svelte-pure-admin`;

	const codeSetupBasic = `// src/routes/+layout.svelte
<script>
  import { initI18n, PureAdminProvider } from '@keenmate/svelte-pure-admin';

  // Initialize i18n with default settings
  initI18n({
    locale: 'en',
    fallbackLocale: 'en'
  });
<\/script>

<PureAdminProvider>
  <slot />
</PureAdminProvider>`;

	const codeI18nService = `import { i18n } from '@keenmate/svelte-pure-admin';

// Access reactive properties
console.log(i18n.currentLocale);  // 'en'
console.log(i18n.languages);      // [{ code: 'en', name: 'English' }, ...]
console.log(i18n.isLoading);      // false

// Switch locale
await i18n.setLocale('cs');

// Manage languages
i18n.addLanguage({ code: 'de', name: 'Deutsch' });
i18n.removeLanguage('cs');
i18n.setLanguages([
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' }
]);`;

	const codeScenario1 = `// Scenario 1: Library defaults (works out of the box)
// No initialization needed - library auto-initializes with en/cs

import { _ } from '@keenmate/svelte-pure-admin';

// Use translations immediately
const message = $_('dialog.confirm'); // "Confirm"`;

	const codeScenario2 = `// Scenario 2: Injected translations from backend
import { i18n } from '@keenmate/svelte-pure-admin';

// Translations embedded in HTML by backend
const ctx = window.__USER_CONTEXT__;

i18n.init({
  locale: ctx.currentLocale,
  languages: ctx.languages,  // [{ code: 'en', name: 'English' }, ...]
  translations: {
    [ctx.currentLocale]: ctx.translations
  }
});`;

	const codeScenario3 = `// Scenario 3: Async loading from API
import { i18n } from '@keenmate/svelte-pure-admin';

i18n.init({
  locale: 'en',
  languages: [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' }
  ],
  translations: {
    en: window.__TRANSLATIONS__  // Initial from server
  },
  loadTranslations: async (locale) => {
    const res = await fetch(\`/api/translations/\${locale}\`);
    return res.json();
  }
});

// Later, when user switches language:
await i18n.setLocale('de');  // Fetches from API, then switches`;

	const codeLanguagePicker = `<script>
  import { i18n, _ } from '@keenmate/svelte-pure-admin';

  async function handleChange(event) {
    await i18n.setLocale(event.target.value);
  }
<\/script>

<select
  value={i18n.currentLocale}
  onchange={handleChange}
  disabled={i18n.isLoading}
>
  {#each i18n.languages as lang}
    <option value={lang.code}>
      {lang.name || lang.code}
    </option>
  {/each}
</select>

{#if i18n.isLoading}
  <span>{$_('common.loading')}</span>
{/if}`;

	const codeUsageComponent = `<script>
  import { _ } from '@keenmate/svelte-pure-admin';
<\/script>

<h1>{$_('dialog.confirm')}</h1>
<p>{$_('dialog.areYouSure')}</p>
<button>{$_('dialog.ok')}</button>
<button>{$_('dialog.cancel')}</button>`;

	const codeUsageService = `// In a .ts service file
import { _ } from 'svelte-i18n';
import { get } from 'svelte/store';

function getLocalizedMessage() {
  // Use get() to read store value in non-reactive context
  return get(_)('dialog.confirm');
}`;

	const codeAddTranslations = `import { i18n } from '@keenmate/svelte-pure-admin';

// Add translations dynamically
i18n.addTranslations('de', {
  myApp: {
    users: {
      title: 'Benutzer',
      create: 'Benutzer erstellen'
    }
  }
});

// Or use addMessages from svelte-i18n
import { addMessages } from '@keenmate/svelte-pure-admin';

addMessages('en', {
  myApp: {
    users: {
      title: 'Users',
      create: 'Create User'
    }
  }
});`;

	const codeOverrideLibrary = `import { registerLibraryTranslations } from '@keenmate/svelte-pure-admin';

// Override library default strings
registerLibraryTranslations('en', {
  dialog: {
    confirm: 'Yes, do it!',
    cancel: 'Nevermind'
  },
  popconfirm: {
    confirm: 'Proceed',
    cancel: 'Go back'
  }
});`;

	const codeInterpolation = `<script>
  import { _ } from '@keenmate/svelte-pure-admin';
<\/script>

<!-- Simple interpolation -->
{$_('greeting', { values: { name: 'John' } })}
<!-- For: greeting: "Hello, {name}!" -->

<!-- Plural forms -->
{$_('items', { values: { count: 5 } })}
<!-- For: items: "{count, plural, one {# item} other {# items}}" -->`;

	const codeExports = `// Everything you need is exported
import {
  // i18n Service (recommended API)
  i18n,

  // Legacy functions (backwards compatible)
  initI18n,
  registerLibraryTranslations,
  loadLocale,
  isLocaleLoaded,

  // Built-in locales
  en, cs,

  // svelte-i18n stores & functions
  _,              // Translation function store
  locale,         // Current locale store
  locales,        // Available locales store
  isLoading,      // Loading state store
  addMessages,    // Add translations
  register,       // Register async loaders
  init,           // Low-level init
  getLocaleFromNavigator,
  getLocaleFromQueryString,
  getLocaleFromHash,
  getLocaleFromPathname
} from '@keenmate/svelte-pure-admin';

// Types
import type {
  Language,
  I18nInitOptions,
  TranslationKeys
} from '@keenmate/svelte-pure-admin';`;

	const codeLanguageType = `interface Language {
  code: string;        // e.g., 'en', 'de', 'cs'
  name?: string;       // e.g., 'English', 'Deutsch'
  nativeName?: string; // e.g., 'English', 'Deutsch'
}`;

	const codeInitOptions = `interface I18nInitOptions {
  /** Initial locale (default: 'en') */
  locale?: string;

  /** Fallback locale when translation is missing (default: 'en') */
  fallbackLocale?: string;

  /** Available languages (string codes or Language objects) */
  languages?: (string | Language)[];

  /** Pre-loaded translations by locale */
  translations?: Record<string, object>;

  /** Async loader for on-demand translation loading */
  loadTranslations?: (locale: string) => Promise<object>;
}`;
</script>

<Callout variant="info" class="mb-4">
	The <Strong>i18n (Internationalization)</Strong> module provides translation support for the library's
	built-in components using <Code>svelte-i18n</Code>. It includes a reactive <Code>i18n</Code> service
	for managing languages and locales.
</Callout>

<!-- Interactive Demo -->
<Card titleText="Interactive Demo">
	<Paragraph>
		Try the i18n service in action. Switch languages, add new ones, and see the reactive state update.
	</Paragraph>

	<Grid class="mt-4">
		<Column size="100" md="50">
			<Heading level={5}>Language Switcher</Heading>
			<div class="d-flex align-items-center gap-2 mt-2">
				<Select
					value={demoLocale}
					onchange={(e) => handleLocaleChange(e.currentTarget.value)}
					disabled={demoLoading}
				>
					{#each demoLanguages as lang}
						<option value={lang.code}>{lang.name || lang.code}</option>
					{/each}
				</Select>
				{#if demoLoading || i18n.isLoading}
					<Spinner size="xs" />
				{/if}
			</div>

			<div class="mt-3 p-3 bg-light rounded">
				<Strong>Current State:</Strong>
				<ul class="mt-2 mb-0">
					<li><Code>currentLocale</Code>: <Badge variant="primary">{i18n.currentLocale}</Badge></li>
					<li><Code>isLoading</Code>: <Badge variant={i18n.isLoading ? 'warning' : 'secondary'}>{i18n.isLoading}</Badge></li>
					<li><Code>languages.length</Code>: <Badge variant="info">{i18n.languages.length}</Badge></li>
				</ul>
			</div>
		</Column>

		<Column size="100" md="50">
			<Heading level={5}>Manage Languages</Heading>

			<div class="mt-2">
				<Strong>Current Languages:</Strong>
				<div class="d-flex flex-wrap gap-1 mt-2">
					{#each demoLanguages as lang}
						<Badge variant="secondary" class="d-flex align-items-center gap-1">
							{lang.name || lang.code} ({lang.code})
							{#if lang.code !== 'en'}
								<button
									class="btn-close btn-close-white ms-1"
									style="font-size: 0.6em; opacity: 0.7;"
									onclick={() => removeLanguage(lang.code)}
									aria-label="Remove"
								></button>
							{/if}
						</Badge>
					{/each}
				</div>
			</div>

			<div class="mt-3">
				<Strong>Add Language:</Strong>
				<div class="d-flex gap-2 mt-2">
					<div style="width: 100px;">
						<Input
							size="sm"
							placeholder="Code (e.g., de)"
							bind:value={customLanguageCode}
						/>
					</div>
					<div style="flex: 1;">
						<Input
							size="sm"
							placeholder="Name (e.g., Deutsch)"
							bind:value={customLanguageName}
						/>
					</div>
					<Button
						variant="primary"
						size="sm"
						onclick={addCustomLanguage}
						disabled={!customLanguageCode || !customLanguageName}
					>
						Add
					</Button>
				</div>
			</div>
		</Column>
	</Grid>

	<Heading level={5} class="mt-4">Live Translation Preview</Heading>
	<div class="p-3 bg-light rounded mt-2">
		<Grid>
			<Column size="100" md="50">
				<Strong>Dialog Keys:</Strong>
				<ul class="mt-2 mb-0">
					<li><Code>dialog.confirm</Code>: {$_('dialog.confirm')}</li>
					<li><Code>dialog.cancel</Code>: {$_('dialog.cancel')}</li>
					<li><Code>dialog.ok</Code>: {$_('dialog.ok')}</li>
					<li><Code>dialog.areYouSure</Code>: {$_('dialog.areYouSure')}</li>
				</ul>
			</Column>
			<Column size="100" md="50">
				<Strong>Other Keys:</Strong>
				<ul class="mt-2 mb-0">
					<li><Code>popconfirm.confirm</Code>: {$_('popconfirm.confirm')}</li>
					<li><Code>popconfirm.cancel</Code>: {$_('popconfirm.cancel')}</li>
					<li><Code>loadMore.loadMore</Code>: {$_('loadMore.loadMore')}</li>
					<li><Code>loadMore.loading</Code>: {$_('loadMore.loading')}</li>
				</ul>
			</Column>
		</Grid>
	</div>
</Card>

<!-- Overview -->
<Card titleText="Overview">
	<Paragraph>
		Pure Admin uses <Code>svelte-i18n</Code> for internationalization with an enhanced <Code>i18n</Code> service
		that provides reactive language management using Svelte 5 runes.
	</Paragraph>

	<BasicList class="mt-3">
		<li><Strong>Built-in translations</Strong> - English and Czech for all library components</li>
		<li><Strong>Reactive i18n service</Strong> - Manage languages and locales with Svelte 5 runes</li>
		<li><Strong>Flexible loading</Strong> - Bundled, injected, or async/API loading strategies</li>
		<li><Strong>Easy setup</Strong> - Works out of the box, or customize with <Code>i18n.init()</Code></li>
		<li><Strong>svelte-i18n compatible</Strong> - Full access to all svelte-i18n features</li>
	</BasicList>

	<Heading level={4} class="mt-4">Reserved Namespaces</Heading>
	<Paragraph>
		The library uses these translation key namespaces for its components:
	</Paragraph>
	<Grid class="mt-3">
		<Column size="100" md="50" lg="25">
			<Badge variant="primary" class="mb-2">dialog.*</Badge>
			<Paragraph color="secondary" class="small">Dialog service (confirm, alert, prompt)</Paragraph>
		</Column>
		<Column size="100" md="50" lg="25">
			<Badge variant="primary" class="mb-2">popconfirm.*</Badge>
			<Paragraph color="secondary" class="small">Popconfirm component</Paragraph>
		</Column>
		<Column size="100" md="50" lg="25">
			<Badge variant="primary" class="mb-2">shortcuts.*</Badge>
			<Paragraph color="secondary" class="small">Shortcut help dialog</Paragraph>
		</Column>
		<Column size="100" md="50" lg="25">
			<Badge variant="primary" class="mb-2">commandPalette.*</Badge>
			<Paragraph color="secondary" class="small">Command palette component</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Loading Scenarios -->
<Card titleText="Loading Scenarios">
	<Paragraph>
		The i18n system supports three loading strategies to fit different application needs.
	</Paragraph>

	<Heading level={4} class="mt-4">
		<Badge variant="success" class="me-2">1</Badge>
		Bundled (Default)
	</Heading>
	<Paragraph>
		Works out of the box with built-in English and Czech translations. No initialization required.
	</Paragraph>
	<HighlightedCode language="typescript" code={codeScenario1} />

	<Heading level={4} class="mt-4">
		<Badge variant="success" class="me-2">2</Badge>
		Injected at Init
	</Heading>
	<Paragraph>
		App provides translations at initialization (e.g., embedded in HTML by backend).
	</Paragraph>
	<HighlightedCode language="typescript" code={codeScenario2} />

	<Heading level={4} class="mt-4">
		<Badge variant="success" class="me-2">3</Badge>
		Async/API Loading
	</Heading>
	<Paragraph>
		Load translations on-demand via custom loader function when switching languages.
	</Paragraph>
	<HighlightedCode language="typescript" code={codeScenario3} />
</Card>

<!-- i18n Service API -->
<Card titleText="i18n Service API">
	<Paragraph>
		The <Code>i18n</Code> service provides a reactive API for managing languages and locales.
	</Paragraph>

	<HighlightedCode language="typescript" code={codeI18nService} />

	<Heading level={4} class="mt-4">Reactive Properties</Heading>
	<Table isStriped size="sm" class="mt-2">
		<thead>
			<tr><th>Property</th><th>Type</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr>
				<td><Code>currentLocale</Code></td>
				<td><Code>string</Code></td>
				<td>Current active locale code</td>
			</tr>
			<tr>
				<td><Code>languages</Code></td>
				<td><Code>Language[]</Code></td>
				<td>Available languages list</td>
			</tr>
			<tr>
				<td><Code>isLoading</Code></td>
				<td><Code>boolean</Code></td>
				<td>True while loading translations asynchronously</td>
			</tr>
			<tr>
				<td><Code>fallbackLocale</Code></td>
				<td><Code>string</Code></td>
				<td>Fallback locale code</td>
			</tr>
			<tr>
				<td><Code>loadedLocales</Code></td>
				<td><Code>Set&lt;string&gt;</Code></td>
				<td>Set of loaded locale codes</td>
			</tr>
		</tbody>
	</Table>

	<Heading level={4} class="mt-4">Methods</Heading>
	<Table isStriped size="sm" class="mt-2">
		<thead>
			<tr><th>Method</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr>
				<td><Code>init(options)</Code></td>
				<td>Initialize with options (locale, languages, translations, loader)</td>
			</tr>
			<tr>
				<td><Code>setLocale(code)</Code></td>
				<td>Switch to a locale (loads async if needed)</td>
			</tr>
			<tr>
				<td><Code>getLanguage(code)</Code></td>
				<td>Get language by code</td>
			</tr>
			<tr>
				<td><Code>isLocaleLoaded(code)</Code></td>
				<td>Check if locale translations are loaded</td>
			</tr>
			<tr>
				<td><Code>setLanguages(langs)</Code></td>
				<td>Replace the entire languages list</td>
			</tr>
			<tr>
				<td><Code>addLanguage(lang)</Code></td>
				<td>Add a language to the list</td>
			</tr>
			<tr>
				<td><Code>removeLanguage(code)</Code></td>
				<td>Remove a language from the list</td>
			</tr>
			<tr>
				<td><Code>addTranslations(code, data)</Code></td>
				<td>Add translations for a locale</td>
			</tr>
			<tr>
				<td><Code>setTranslationLoader(fn)</Code></td>
				<td>Configure the async translation loader</td>
			</tr>
		</tbody>
	</Table>
</Card>

<!-- Language Picker Example -->
<Card titleText="Language Picker Component">
	<Paragraph>
		Build a language picker using the i18n service's reactive properties.
	</Paragraph>

	<HighlightedCode language="svelte" code={codeLanguagePicker} />

	<Callout variant="info" class="mt-4">
		<Strong>Tip:</Strong> The <Code>i18n.isLoading</Code> property lets you show a loading indicator
		while translations are being fetched asynchronously.
	</Callout>
</Card>

<!-- Usage in Components -->
<Card titleText="Using Translations">
	<Paragraph>
		Use the <Code>$_()</Code> store from svelte-i18n to translate strings in your components.
	</Paragraph>

	<Heading level={4} class="mt-4">In Svelte Components (.svelte)</Heading>
	<HighlightedCode language="svelte" code={codeUsageComponent} />

	<Heading level={4} class="mt-4">In Service Files (.ts)</Heading>
	<Paragraph class="small">
		In non-reactive contexts (like service files), use <Code>get()</Code> from <Code>svelte/store</Code> to read the translation.
	</Paragraph>
	<HighlightedCode language="typescript" code={codeUsageService} />

	<Callout variant="info" class="mt-4">
		<Strong>Note:</Strong> The <Code>$_()</Code> syntax is Svelte's store auto-subscription. It only works in .svelte files.
		In .ts files, use <Code>get(_)</Code> instead.
	</Callout>
</Card>

<!-- Adding Your Own Translations -->
<Card titleText="Adding App Translations">
	<Paragraph>
		Add your own translations using the i18n service or <Code>addMessages()</Code>.
	</Paragraph>

	<HighlightedCode language="typescript" code={codeAddTranslations} />
</Card>

<!-- Overriding Library Strings -->
<Card titleText="Overriding Library Strings">
	<Paragraph>
		Want to customize the library's built-in strings? Use <Code>registerLibraryTranslations()</Code>.
	</Paragraph>

	<HighlightedCode language="typescript" code={codeOverrideLibrary} />

	<Callout variant="warning" class="mt-4">
		<Strong>Important:</Strong> Call <Code>registerLibraryTranslations()</Code> after <Code>initI18n()</Code>
		to ensure your overrides take effect.
	</Callout>
</Card>

<!-- Advanced Features -->
<Card titleText="Advanced Features">
	<Heading level={4}>Interpolation & Plurals</Heading>
	<Paragraph class="small">
		svelte-i18n supports ICU message format for interpolation and pluralization.
	</Paragraph>
	<HighlightedCode language="svelte" code={codeInterpolation} />
</Card>

<!-- Built-in Translations -->
<Card titleText="Built-in Translation Keys">
	<Paragraph>
		Here are all the translation keys provided by the library. You can override any of these.
	</Paragraph>

	<Heading level={5} class="mt-4">dialog.*</Heading>
	<Table isStriped size="sm">
		<thead>
			<tr><th>Key</th><th>English Default</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr><td><Code>dialog.confirm</Code></td><td>Confirm</td><td>Confirm dialog title</td></tr>
			<tr><td><Code>dialog.cancel</Code></td><td>Cancel</td><td>Cancel button text</td></tr>
			<tr><td><Code>dialog.ok</Code></td><td>OK</td><td>OK button text</td></tr>
			<tr><td><Code>dialog.alert</Code></td><td>Alert</td><td>Alert dialog title</td></tr>
			<tr><td><Code>dialog.input</Code></td><td>Input</td><td>Prompt dialog title</td></tr>
			<tr><td><Code>dialog.areYouSure</Code></td><td>Are you sure?</td><td>Default confirm message</td></tr>
			<tr><td><Code>dialog.enterValue</Code></td><td>Please enter a value</td><td>Default prompt message</td></tr>
			<tr><td><Code>dialog.defaultTitle</Code></td><td>Dialog</td><td>Default dialog title</td></tr>
		</tbody>
	</Table>

	<Heading level={5} class="mt-4">popconfirm.*</Heading>
	<Table isStriped size="sm">
		<thead>
			<tr><th>Key</th><th>English Default</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr><td><Code>popconfirm.confirm</Code></td><td>Yes</td><td>Confirm button text</td></tr>
			<tr><td><Code>popconfirm.cancel</Code></td><td>No</td><td>Cancel button text</td></tr>
		</tbody>
	</Table>

	<Heading level={5} class="mt-4">shortcuts.*</Heading>
	<Table isStriped size="sm">
		<thead>
			<tr><th>Key</th><th>English Default</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr><td><Code>shortcuts.title</Code></td><td>Keyboard Shortcuts</td><td>Help dialog title</td></tr>
			<tr><td><Code>shortcuts.noShortcuts</Code></td><td>No shortcuts registered</td><td>Empty state message</td></tr>
			<tr><td><Code>shortcuts.generalCategory</Code></td><td>General</td><td>Default category name</td></tr>
			<tr><td><Code>shortcuts.showShortcuts</Code></td><td>Show keyboard shortcuts</td><td>Shortcut description</td></tr>
		</tbody>
	</Table>

	<Heading level={5} class="mt-4">commandPalette.*</Heading>
	<Table isStriped size="sm">
		<thead>
			<tr><th>Key</th><th>English Default</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr><td><Code>commandPalette.placeholder</Code></td><td>Type a command or search...</td><td>Input placeholder</td></tr>
			<tr><td><Code>commandPalette.loading</Code></td><td>Loading...</td><td>Loading indicator</td></tr>
			<tr><td><Code>commandPalette.noResults</Code></td><td>No results found</td><td>Empty search state</td></tr>
			<tr><td><Code>commandPalette.commands</Code></td><td>Commands</td><td>Commands section label</td></tr>
			<tr><td><Code>commandPalette.search</Code></td><td>Search</td><td>Search label</td></tr>
		</tbody>
	</Table>

	<Heading level={5} class="mt-4">loadMore.*</Heading>
	<Table isStriped size="sm">
		<thead>
			<tr><th>Key</th><th>English Default</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr><td><Code>loadMore.loadMore</Code></td><td>Load more</td><td>Button text</td></tr>
			<tr><td><Code>loadMore.loading</Code></td><td>Loading...</td><td>Loading state text</td></tr>
		</tbody>
	</Table>
</Card>

<!-- Type Definitions -->
<Card titleText="Type Definitions">
	<Heading level={4}>Language</Heading>
	<HighlightedCode language="typescript" code={codeLanguageType} />

	<Heading level={4} class="mt-4">I18nInitOptions</Heading>
	<HighlightedCode language="typescript" code={codeInitOptions} />
</Card>

<!-- API Reference -->
<Card titleText="Exports Reference">
	<Paragraph class="small">
		Everything you need is exported from the main package:
	</Paragraph>
	<HighlightedCode language="typescript" code={codeExports} />
</Card>

<!-- Adding a New Language -->
<Card titleText="Adding a New Language">
	<Paragraph>
		To add a new language to your app, you need to provide translations for all keys your app uses.
		You can optionally also provide translations for the library's built-in keys.
	</Paragraph>

	<Alert variant="info" class="mt-4">
		<Strong>Tip:</Strong> Start by copying the English locale file from the library
		(<Code>en.ts</Code>) and translating the values to your target language.
	</Alert>

	<Callout variant="success" class="mt-4">
		<Strong>Contributing:</Strong> If you add translations for a new language, consider contributing
		them back to the library! Create a PR with a new <Code>locales/[lang].ts</Code> file.
	</Callout>
</Card>

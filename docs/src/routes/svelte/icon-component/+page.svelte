<script lang="ts">
	/**
	 * Icon Component — the `<Icon>` component + icon-provider system.
	 *
	 * This is the Svelte-flavoured counterpart to keen-pure-admin's
	 * `/phoenix/icons`. It documents the COMPONENT layer (`<Icon name="…">`,
	 * providers, resolution order). The masked `.pa-icon` CSS primitive itself —
	 * the raw glyph gallery — lives on Design › Icons, kept deliberately "plain"
	 * so the two can be compared across repos.
	 */
	import {
		Heading,
		Paragraph,
		Card,
		Grid,
		Column,
		Code,
		CodeBlock,
		Callout,
		Icon,
		Link
	} from '@keenmate/svelte-pure-admin';

	// Affordances demoed in the first branch (resolved built-in, no provider needed).
	const affordances = ['success', 'danger', 'warning', 'info', 'search', 'check', 'chevron-down'];

	// Nav glyphs — this docs app configures `iconProviders={[svgIcons(navIcons)]}`,
	// so these resolve through the provider (see +layout.svelte).
	const providerGlyphs = ['dashboard', 'colors', 'cards', 'table', 'kpi', 'movies'];

	const codeConfigure = `<script>
  import {
    PureAdminProvider,
    svgIcons,
    fontAwesome,
    combine
  } from '@keenmate/svelte-pure-admin';
  import { lucidePaths } from '$lib/icons'; // { dashboard: '<path …/>', … }
<\/script>

<!-- Ordered list: first provider to return markup wins. Framework
     affordances resolve BEFORE the list, so you never add masked() here. -->
<PureAdminProvider iconProviders={[svgIcons(lucidePaths), fontAwesome()]}>
  {@render children()}
</PureAdminProvider>`;

	const codeProvider = `import type { IconProvider } from '@keenmate/svelte-pure-admin';

// A provider is (name, ctx) => markup string, or '' to pass the name on.
// The name is opaque — the provider parses whatever convention you type.
const tabler: IconProvider = (name, ctx) => {
  const [set, icon] = name.split(' ');
  if (set !== 'tabler') return '';        // not ours → pass
  return \`<svg class="\${ctx.isInteractive ? 'pc-icon-hover-highlight' : ''}"
               width="1em" height="1em" viewBox="0 0 24 24">\${paths[icon]}</svg>\`;
};

// <Icon name="tabler star" />  →  this provider
// <Icon name="success" />      →  framework affordance (never reaches providers)`;

	const codeUsage = `<Icon name="success" />        <!-- affordance → <span class="pa-icon pa-icon--success"> -->
<Icon name="dashboard" />      <!-- provider (svgIcons) → inline Lucide <svg> -->
<Icon name="fa delete" />      <!-- provider (your parser) → Font Awesome -->
<Icon name="nope" />           <!-- no match → renders nothing -->
<Icon name="settings" size="2rem" isInteractive label="Open settings" />`;
</script>

<Paragraph>
	<Code>&lt;Icon name="…"&gt;</Code> is the component layer over the framework's icons. It resolves a
	name to markup through a small, swappable <strong>provider</strong> system, so a project renders icons
	with whatever set(s) it already uses (Font Awesome, inline-SVG Lucide/Tabler, …) without hand-authoring
	elements at each call-site. The raw masked glyph primitive it builds on is catalogued on
	<Link href="/design/icons">Design › Icons</Link>.
</Paragraph>

<!-- ============================================================ -->
<!-- Resolution order -->
<!-- ============================================================ -->
<Card titleText="How a name resolves" class="mt-4">
	<Paragraph>
		<Code>&lt;Icon&gt;</Code> resolves a <Code>name</Code> in two stages (see <Code>resolveIcon</Code> in
		<Code>icon/icon-provider.ts</Code>):
	</Paragraph>
	<ol class="resolve-steps">
		<li>
			<strong>Framework affordance first — built-in &amp; reserved.</strong> If the name is one of the
			closed set of masked structural affordances (<Code>success</Code>, <Code>chevron-down</Code>,
			<Code>close</Code>/<Code>x</Code>, …) it emits
			<Code>{'<span class="pa-icon pa-icon--NAME">'}</Code> and stops. No provider can shadow an
			affordance, so the framework's own glyphs always render zero-config.
		</li>
		<li>
			<strong>Provider list.</strong> Otherwise the name is handed to each provider configured on
			<Code>PureAdminProvider</Code>, in order — the first to return non-empty markup wins.
		</li>
		<li>
			<strong>Nothing.</strong> If no provider matches, <Code>&lt;Icon&gt;</Code> renders nothing (handy
			for data-driven names that may be absent).
		</li>
	</ol>
	<Callout variant="info" class="mt-3">
		{#snippet icon()}<span class="pa-icon pa-icon--info" aria-hidden="true"></span>{/snippet}
		Qualify external names (<Code>"fa close"</Code>, <Code>"tabler star"</Code>) so they don't collide
		with the reserved bare affordance names — a bare <Code>"close"</Code> always resolves to the
		framework glyph.
	</Callout>
</Card>

<!-- ============================================================ -->
<!-- Affordance branch -->
<!-- ============================================================ -->
<Card titleText="1. Affordances — built-in, reserved" class="mt-4">
	<Paragraph>
		Zero config. These resolve to the masked primitive before any provider is consulted, so
		<Code>&lt;Icon&gt;</Code> works out of the box for the framework's structural glyphs.
	</Paragraph>
	<div class="icon-row">
		{#each affordances as name}
			<div class="icon-cell">
				<Icon {name} />
				<code>{name}</code>
			</div>
		{/each}
	</div>
	<CodeBlock language="html">{`<Icon name="success" />
<Icon name="chevron-down" />`}</CodeBlock>
</Card>

<!-- ============================================================ -->
<!-- Provider branch (live, uses the docs' configured provider) -->
<!-- ============================================================ -->
<Card titleText="2. Providers — your icon set(s)" class="mt-4">
	<Paragraph>
		Anything that isn't an affordance goes to the provider list. This docs app configures a single
		inline-SVG provider (<Code>svgIcons(navIcons)</Code>), so the nav glyphs below are real
		<Code>&lt;Icon name="…"&gt;</Code> calls routed through it:
	</Paragraph>
	<div class="icon-row">
		{#each providerGlyphs as name}
			<div class="icon-cell">
				<Icon {name} />
				<code>{name}</code>
			</div>
		{/each}
	</div>

	<Heading level={4} class="mt-6">Built-in providers</Heading>
	<Paragraph>
		Each is a factory returning a provider; compose them in an ordered list. You do <em>not</em> add
		<Code>masked()</Code> — affordances are built-in.
	</Paragraph>
	<ul>
		<li><Code>fontAwesome(opts?)</Code> — <Code>name="user"</Code> → <Code>{'<i class="fa-solid fa-user fa-fw">'}</Code>.</li>
		<li><Code>svgIcons(map, opts?)</Code> — inline <Code>&lt;svg&gt;</Code> from a <Code>{'{ name: innerMarkup }'}</Code> map (Lucide, Tabler, Heroicons-outline, …).</li>
		<li><Code>combine(...providers)</Code> — fold several into one reusable provider (the list already composes; this is for pre-building a single provider).</li>
		<li><Code>masked()</Code> — emits a <Code>pa-icon--NAME</Code> span for an affordance name; rarely needed now that affordances are built-in, kept for advanced composition.</li>
	</ul>

	<Heading level={4} class="mt-6">Configure them</Heading>
	<CodeBlock language="html">{codeConfigure}</CodeBlock>

	<Heading level={4} class="mt-6">Write your own</Heading>
	<Paragraph>
		A provider is a pure <Code>(name, ctx) =&gt; string</Code> — return markup, or <Code>''</Code> to pass
		the name to the next provider. The full render context (<Code>class</Code>, <Code>size</Code>,
		<Code>isInteractive</Code>, <Code>label</Code>) flows to every provider so a set can embed its own
		sizing and hover marker. Parsing a <Code>"set name"</Code> convention is the provider's job —
		<Code>&lt;Icon&gt;</Code> just calls the callbacks in order.
	</Paragraph>
	<CodeBlock language="javascript">{codeProvider}</CodeBlock>
</Card>

<!-- ============================================================ -->
<!-- Context & hover -->
<!-- ============================================================ -->
<Card titleText="Size, accessibility &amp; hover" class="mt-4">
	<ul>
		<li><Code>size</Code> — a CSS length; sets <Code>font-size</Code> + <Code>--pa-icon-size</Code> on the host.</li>
		<li><Code>label</Code> — when set, the icon is exposed as <Code>role="img"</Code> with that name; otherwise it's <Code>aria-hidden</Code>.</li>
		<li>
			<Code>isInteractive</Code> — adds <Code>.pc-icon-hover</Code> so a <em>standalone</em> icon becomes
			its own hover affordance. Inside a <Code>.pa-btn</Code> / nav link / tab the control is already the
			hover context, so you don't need it there. The provider embeds its set's hover marker
			(<Code>pc-icon-hover-fill</Code> for Font Awesome, <Code>pc-icon-hover-highlight</Code> for outline
			SVG, <Code>--pa-icon-src-hover</Code> for masked).
		</li>
	</ul>
	<CodeBlock language="html">{codeUsage}</CodeBlock>
</Card>

<!-- ============================================================ -->
<!-- When to use which -->
<!-- ============================================================ -->
<Card titleText="&lt;Icon&gt; vs a raw .pa-icon span" class="mt-4">
	<Grid>
		<Column size="100" md="50">
			<Heading level={4}>Use <Code>&lt;Icon name&gt;</Code></Heading>
			<ul>
				<li>The name is <strong>data/config-driven</strong> and you don't know its type ahead of time.</li>
				<li>You want <strong>one call-site</strong> that works across your configured icon sets.</li>
				<li>You need the provider's hover marker / size / a11y wiring for free.</li>
			</ul>
		</Column>
		<Column size="100" md="50">
			<Heading level={4}>Use a raw <Code>.pa-icon</Code> span</Heading>
			<ul>
				<li>You're writing a <strong>fixed framework affordance</strong> inline (close button, chevron).</li>
				<li>It's how the library's own components render affordances — no provider dependency.</li>
				<li>See <Link href="/design/icons">Design › Icons</Link> for the full glyph gallery + token chain.</li>
			</ul>
		</Column>
	</Grid>
	<Callout variant="info" class="mt-3">
		{#snippet icon()}<span class="pa-icon pa-icon--info" aria-hidden="true"></span>{/snippet}
		Both emit the same masked span for an affordance — <Code>&lt;Icon name="success"&gt;</Code> and
		<Code>{'<span class="pa-icon pa-icon--success">'}</Code> are interchangeable. <Code>&lt;Icon&gt;</Code>
		adds the provider seam for everything else.
	</Callout>
</Card>

<style>
	.resolve-steps {
		margin: 0.5rem 0 0;
		padding-left: 1.4rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.icon-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin: 1rem 0;
	}
	.icon-cell {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 0.9rem;
		border: 1px solid var(--pc-border-color);
		border-radius: var(--pc-border-radius);
		background: var(--pa-card-bg);
	}
	.icon-cell :global(.pa-icon),
	.icon-cell :global(svg),
	.icon-cell :global(i) {
		font-size: 1.6rem;
		--pa-icon-size: 1.6rem;
		color: var(--pc-text-color-1);
	}
	.icon-cell code {
		font-size: 1.15rem;
		color: var(--pc-text-color-2);
	}
</style>

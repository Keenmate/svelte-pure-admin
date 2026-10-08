<script lang="ts">
	/**
	 * Icons reference — mirrors the pure-admin demo `icons` page structure.
	 * The framework ships structural affordances as a single masked primitive,
	 * `.pa-icon` — raw `<span class="pa-icon pa-icon--NAME">`, how the library's own
	 * chrome renders them. A provider-based `<Icon>` component (which resolves names
	 * through swappable icon sets) is documented separately on `/svelte/icon-component`.
	 * This page catalogues the masked glyphs and shows them inside our components.
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
		Button,
		ButtonGroup,
		Alert,
		Badge,
		Tabs,
		TabItem,
		Link
	} from '@keenmate/svelte-pure-admin';

	// Reference grids — one entry per shipped icon variable (name without the `--` prefix).
	const closeClearRemove = ['x', 'clear', 'remove'];
	const disclosure = [
		'chevron',
		'chevron-up',
		'chevron-right',
		'chevron-down',
		'chevron-left',
		'caret-up',
		'caret-down',
		'expand',
		'collapse'
	];
	const actions = ['add', 'edit', 'delete', 'save', 'copy', 'download'];
	const utility = [
		'search',
		'refresh',
		'filter',
		'check',
		'ellipsis',
		'ellipsis-vertical',
		'link',
		'external-link',
		'settings',
		'bell',
		'user',
		'favorites'
	];
	// Severity marks are shown in their semantic colour (shared with toasts / alerts / callouts / popconfirm).
	const severity = ['info', 'success', 'warning', 'danger'];

	// Sizes used in the "masked primitive" showcase.
	const primitiveSizes = ['1.2rem', '1.6rem', '2.4rem', '3.2rem'];
</script>

<Paragraph>
	The framework's structural icons are drawn with a single masked primitive,
	<Code>.pa-icon</Code>, so every glyph inherits the current text colour, scales with font size, and is
	themeable from one place. At this layer an icon is a raw
	<Code>{'<span class="pa-icon pa-icon--NAME">'}</Code> you drop inside any of our components — this is how
	the library's own chrome renders affordances. There <em>is</em> also an
	<Link href="/svelte/icon-component"><Code>&lt;Icon&gt;</Code> component</Link> that resolves names through
	swappable provider sets (Font Awesome, Lucide, …) — see Svelte › Icon Component. This page lists the
	masked icons that ship as variables, shows them inside components, and explains the hover-to-fill
	affordance.
</Paragraph>

<!-- ============================================================ -->
<!-- The masked primitive -->
<!-- ============================================================ -->
<Card titleText="The masked icon primitive" class="mt-4">
	<Paragraph>
		Each masked glyph is a <Code>{'<span class="pa-icon pa-icon--name">'}</Code>. The glyph is an SVG
		<Code>mask</Code>; the box is painted in <Code>currentColor</Code> and shows through it. That means an
		icon automatically matches its surrounding text colour and scales with <Code>font-size</Code>
		(default <Code>1em</Code>, override with <Code>--pa-icon-size</Code>).
	</Paragraph>

	<div class="primitive-showcase">
		{#each primitiveSizes as size}
			<span class="pa-icon pa-icon--search" style="--pa-icon-size: {size};" aria-hidden="true"></span>
		{/each}
		<span class="pa-icon pa-icon--search" style="--pa-icon-size: 2.4rem; color: var(--pc-accent);" aria-hidden="true"></span>
		<span class="pa-icon pa-icon--search" style="--pa-icon-size: 2.4rem; color: var(--pc-danger);" aria-hidden="true"></span>
	</div>
	<Paragraph class="text-secondary mt-3">
		Same class, sized with <Code>--pa-icon-size</Code> and coloured with <Code>color</Code> /
		<Code>currentColor</Code>.
	</Paragraph>

	<CodeBlock language="html">{`<!-- default 1em, inherits text colour -->
<span class="pa-icon pa-icon--search" aria-hidden="true"></span>

<!-- sized + coloured -->
<span class="pa-icon pa-icon--search"
      style="--pa-icon-size: 2.4rem; color: var(--pc-accent);"></span>`}</CodeBlock>
</Card>

<!-- ============================================================ -->
<!-- Icon variables -->
<!-- ============================================================ -->
<Card titleText="Icon variables" class="mt-4">
	<Paragraph>
		These structural affordances ship as icon variables. Add the modifier class to a <Code>.pa-icon</Code>
		span; each modifier points <Code>--pa-icon-src</Code> at the matching <Code>--pa-icon-name</Code>
		token.
	</Paragraph>

	<Heading level={4}>Close / clear / remove</Heading>
	<div class="icon-ref-grid">
		{#each closeClearRemove as name}
			<div class="icon-ref">
				<span class="pa-icon pa-icon--{name}" aria-hidden="true"></span>
				<code>--{name}</code>
			</div>
		{/each}
	</div>

	<Heading level={4} class="mt-6">Disclosure &amp; direction</Heading>
	<Paragraph class="text-secondary">
		The four chevron directions are one glyph rotated with a transform, so overriding the chevron re-skins
		all four at once. Same for the ellipsis (horizontal / vertical).
	</Paragraph>
	<div class="icon-ref-grid">
		{#each disclosure as name}
			<div class="icon-ref">
				<span class="pa-icon pa-icon--{name}" aria-hidden="true"></span>
				<code>--{name}</code>
			</div>
		{/each}
	</div>

	<Heading level={4} class="mt-6">Actions</Heading>
	<div class="icon-ref-grid">
		{#each actions as name}
			<div class="icon-ref">
				<span class="pa-icon pa-icon--{name}" aria-hidden="true"></span>
				<code>--{name}</code>
			</div>
		{/each}
	</div>

	<Heading level={4} class="mt-6">Utility</Heading>
	<div class="icon-ref-grid">
		{#each utility as name}
			<div class="icon-ref">
				<span class="pa-icon pa-icon--{name}" aria-hidden="true"></span>
				<code>--{name}</code>
			</div>
		{/each}
	</div>

	<Heading level={4} class="mt-6">Severity</Heading>
	<Paragraph class="text-secondary">
		One shared family used by toasts, alerts, callouts, notifications and popconfirm, so every severity
		surface shows the same mark. Shown here in their semantic colours.
	</Paragraph>
	<div class="icon-ref-grid">
		{#each severity as name}
			<div class="icon-ref">
				<span class="pa-icon pa-icon--{name}" style="color: var(--pc-{name});" aria-hidden="true"></span>
				<code>--{name}</code>
			</div>
		{/each}
	</div>
</Card>

<!-- ============================================================ -->
<!-- Using icons with our components -->
<!-- ============================================================ -->
<Card titleText="Using icons with components" class="mt-4">
	<Paragraph>
		Because an icon is just a span, it drops into any component that accepts children or an
		<Code>icon</Code> snippet. A few common placements:
	</Paragraph>

	<Heading level={4}>In buttons</Heading>
	<Paragraph class="text-secondary">
		Icon-only buttons take the glyph as their child; icon+label buttons put it in the <Code>icon</Code>
		snippet so it lands in the centred <Code>.pa-btn__icon</Code> slot.
	</Paragraph>
	<ButtonGroup class="mb-3">
		<Button variant="primary" isIconOnly titleText="Add"><span class="pa-icon pa-icon--add" aria-hidden="true"></span></Button>
		<Button variant="secondary" isIconOnly titleText="Edit"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
		<Button variant="danger" isIconOnly titleText="Delete"><span class="pa-icon pa-icon--delete" aria-hidden="true"></span></Button>
	</ButtonGroup>
	<ButtonGroup>
		<Button variant="secondary">
			{#snippet icon()}<span class="pa-icon pa-icon--download" aria-hidden="true"></span>{/snippet}
			Export
		</Button>
		<Button variant="primary">
			{#snippet icon()}<span class="pa-icon pa-icon--save" aria-hidden="true"></span>{/snippet}
			Save
		</Button>
	</ButtonGroup>
	<CodeBlock language="html">{`<!-- icon-only: glyph is the child -->
<Button variant="danger" isIconOnly titleText="Delete">
  <span class="pa-icon pa-icon--delete" aria-hidden="true"></span>
</Button>

<!-- icon + label: glyph in the icon snippet -->
<Button variant="secondary">
  {#snippet icon()}<span class="pa-icon pa-icon--download" aria-hidden="true"></span>{/snippet}
  Export
</Button>`}</CodeBlock>

	<Heading level={4} class="mt-6">In alerts &amp; callouts</Heading>
	<Paragraph class="text-secondary">
		Pass a severity glyph to the <Code>icon</Code> snippet — it inherits the alert/callout colour via
		<Code>currentColor</Code>.
	</Paragraph>
	<Alert variant="info" class="mb-3">
		{#snippet icon()}<span class="pa-icon pa-icon--info" aria-hidden="true"></span>{/snippet}
		Masked severity marks share one family across every surface.
	</Alert>
	<Callout variant="warning" headingText="Heads up">
		{#snippet icon()}<span class="pa-icon pa-icon--warning" aria-hidden="true"></span>{/snippet}
		The same <Code>.pa-icon--warning</Code> glyph, tinted by the callout.
	</Callout>
	<CodeBlock language="html">{`<Alert variant="info">
  {#snippet icon()}<span class="pa-icon pa-icon--info" aria-hidden="true"></span>{/snippet}
  Masked severity marks share one family across every surface.
</Alert>`}</CodeBlock>

	<Heading level={4} class="mt-6">In tabs &amp; badges</Heading>
	<Tabs class="mb-3">
		<TabItem active>
			{#snippet icon()}<span class="pa-icon pa-icon--user" aria-hidden="true"></span>{/snippet}
			Profile
		</TabItem>
		<TabItem>
			{#snippet icon()}<span class="pa-icon pa-icon--settings" aria-hidden="true"></span>{/snippet}
			Settings
		</TabItem>
	</Tabs>
	<Badge variant="success"><span class="pa-icon pa-icon--check" aria-hidden="true"></span> Verified</Badge>
</Card>

<!-- ============================================================ -->
<!-- Token chain -->
<!-- ============================================================ -->
<Card titleText="How the tokens re-skin" class="mt-4">
	<Paragraph>
		Most icons trace through a shared, cross-ecosystem contract, so a single override re-skins Pure Admin,
		the pure-css shell and the KeenMate web components together:
	</Paragraph>
	<CodeBlock language="css">{`.pa-icon--search  →  var(--pa-icon-src)
                  →  var(--pa-icon-search)
                  →  var(--base-icon-search, /* inline Lucide fallback */)`}</CodeBlock>
	<ul>
		<li>
			<strong><Code>--base-icon-*</Code></strong> — the shared contract (published in
			<Code>@keenmate/base-css-variables</Code> and mirrored by <Code>@keenmate/pure-css</Code>). Override
			once to re-skin everything.
		</li>
		<li>
			<strong><Code>--pa-icon-*</Code></strong> — Pure Admin's family; falls back to an inline Lucide glyph
			so icons always render even without the contract loaded.
		</li>
		<li>
			<strong>pa-only glyphs</strong> — a few (e.g. <Code>--pa-icon-favorites</Code>) are Pure Admin-only
			and are <em>not</em> part of the <Code>--base-*</Code> contract, so they're defined directly with no
			<Code>--base-icon-*</Code> route.
		</li>
	</ul>
	<Paragraph>
		To retarget a single glyph, set its <Code>--pa-icon-name</Code> (or the shared
		<Code>--base-icon-name</Code>) at <Code>:root</Code> or on any subtree.
	</Paragraph>
</Card>

<!-- ============================================================ -->
<!-- Hover-to-fill -->
<!-- ============================================================ -->
<Card titleText="Hover-to-fill (enabled buttons &amp; tabs)" class="mt-4">
	<Paragraph>
		An icon can swap to a <strong>filled</strong> variant when its enabled button or tab is hovered. It's
		opt-in on two axes:
	</Paragraph>
	<ul>
		<li>
			<strong>Per glyph</strong> — an icon opts in by declaring a filled source on
			<Code>--pa-icon-src-hover</Code>. Icons without one are left untouched.
		</li>
		<li>
			<strong>Per context</strong> — the swap only fires inside an <em>enabled</em> <Code>.pa-btn</Code>
			or <Code>.pa-tabs__item</Code> on <Code>:hover</Code>. Disabled controls never react.
		</li>
	</ul>

	<Callout variant="warning" headingText="The default Lucide set is outline-only">
		{#snippet icon()}<span class="pa-icon pa-icon--warning" aria-hidden="true"></span>{/snippet}
		Lucide ships no filled glyphs, so hover-to-fill is <strong>dormant out of the box</strong> — the
		mechanism is present but there's nothing to fill to. To activate it, point
		<Code>--pa-icon-src-hover</Code> at a filled glyph from a set that has one — <strong>Tabler</strong> (a
		Lucide look-alike), Fluent, or Material. The live demo below uses a Tabler regular/filled star pair.
	</Callout>

	<Heading level={4} class="mt-6">Live demo</Heading>
	<Paragraph class="text-secondary">
		Hover each control. The first uses a Tabler outline→filled star and morphs; the second is a Lucide star
		and stays outline (nothing to fill to); the third is the <em>same</em> Tabler star but disabled, so it
		never reacts despite being fillable (proving the disabled gate). No transition —
		<Code>mask-image</Code> can't tween, so the fill is an instant swap.
	</Paragraph>
	<ButtonGroup class="mb-3">
		<Button variant="primary">
			{#snippet icon()}<span class="pa-icon demo-fill-star" aria-hidden="true"></span>{/snippet}
			Favorite (Tabler)
		</Button>
		<Button variant="secondary">
			{#snippet icon()}<span class="pa-icon pa-icon--favorites" aria-hidden="true"></span>{/snippet}
			Favorite (Lucide)
		</Button>
		<Button variant="primary" disabled>
			{#snippet icon()}<span class="pa-icon demo-fill-star" aria-hidden="true"></span>{/snippet}
			Disabled (Tabler)
		</Button>
	</ButtonGroup>

	<Tabs class="hover-fill-tabs">
		<TabItem active>
			{#snippet icon()}<span class="pa-icon demo-fill-star" aria-hidden="true"></span>{/snippet}
			Starred
		</TabItem>
		<TabItem>
			{#snippet icon()}<span class="pa-icon pa-icon--user" aria-hidden="true"></span>{/snippet}
			Profile
		</TabItem>
	</Tabs>

	<Heading level={4} class="mt-6">How to enable it</Heading>
	<Paragraph>
		Define a modifier that declares both a resting (outline) and a hover (filled) source. The framework's
		global rule swaps them on hover:
	</Paragraph>
	<CodeBlock language="css">{`/* your glyph — resting outline + filled-on-hover source */
.pa-icon--star {
  --pa-icon-src:       var(--pa-icon-star);         /* Lucide outline */
  --pa-icon-src-hover: url("…tabler filled star…"); /* filled variant */
}

/* framework rule (ships in core) — no-op unless a glyph declared a hover src. */
.pa-btn:not(:disabled):hover .pa-icon,
.pa-tabs__item:not(:disabled):hover .pa-icon {
  mask-image: var(--pa-icon-src-hover, var(--pa-icon-src));
}`}</CodeBlock>
	<Paragraph class="text-secondary">
		The fallback to <Code>--pa-icon-src</Code> is what makes the rule safe to ship globally: any icon that
		didn't declare a filled source simply keeps its resting glyph.
	</Paragraph>
</Card>

<style>
	/* Reference grid for the icon family */
	.icon-ref-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		gap: 0.75rem;
		margin-top: 1rem;
	}
	.icon-ref {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 0.75rem;
		border: 1px solid var(--pc-border-color);
		border-radius: var(--pc-border-radius);
		background: var(--pa-card-bg);
	}
	.icon-ref .pa-icon {
		--pa-icon-size: 2rem;
		color: var(--pc-text-color-1);
	}
	.icon-ref code {
		font-size: 1.15rem;
		color: var(--pc-text-color-2);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Masked-primitive showcase row */
	.primitive-showcase {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		flex-wrap: wrap;
		margin-top: 1rem;
	}

	.hover-fill-tabs {
		max-width: 32rem;
	}

	/* ── Hover-to-fill live demo ────────────────────────────────────────────
	   Lucide (our default set) is outline-only, so the framework's hover-to-fill
	   is dormant with it. This demo supplies a Tabler regular/filled star pair
	   (Tabler is a Lucide look-alike that ships filled variants) so the swap is
	   actually visible. The core rule in _icons.scss does the rest on hover of
	   an enabled .pa-btn / .pa-tabs__item. */
	.demo-fill-star {
		--pa-icon-src: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23000%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245%22/%3E%3C/svg%3E");
		--pa-icon-src-hover: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22%3E%3Cpath d=%22M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z%22/%3E%3C/svg%3E");
	}
</style>

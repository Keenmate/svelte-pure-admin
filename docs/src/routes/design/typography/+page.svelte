<script lang="ts">
	import {
		Heading,
		Paragraph,
		Text,
		Link,
		Strong,
		Em,
		Card,
		Grid,
		Column,
		Code
	} from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>
	Typography — headings, paragraphs, colours, alignment, and compound semantic styles. The size scale
	is absolute: one name, one size, everywhere.
</Paragraph>

<Card titleText="Headings">
	<Heading level={1}>Heading 1</Heading>
	<Heading level={2}>Heading 2</Heading>
	<Heading level={3}>Heading 3</Heading>
	<Heading level={4}>Heading 4</Heading>
	<Heading level={5}>Heading 5</Heading>
	<Heading level={6}>Heading 6</Heading>
</Card>

<Card titleText="Paragraph Sizes">
	<Paragraph color="secondary" class="mb-4">
		No size is the body default (16px). Each size maps directly to the same-named text-* utility.
	</Paragraph>
	<div style="display: flex; flex-direction: column; gap: 4px;">
		<Paragraph size="xs" class="m-0">text-xs — 12px</Paragraph>
		<Paragraph size="sm" class="m-0">text-sm — 14px (UI-control size)</Paragraph>
		<Paragraph class="m-0">no size — body default (16px)</Paragraph>
		<Paragraph size="lg" class="m-0">text-lg — 18px</Paragraph>
		<Paragraph size="xl" class="m-0">text-xl — 20px</Paragraph>
	</div>
</Card>

<Grid>
	<Column size="100" md="50">
		<Card titleText="Text Colour">
			<Paragraph color="secondary" class="mb-2">
				Neutral text hierarchy. Role colours are in the Inline Text section.
			</Paragraph>
			<div style="display: flex; flex-direction: column; gap: 4px;">
				<Paragraph color="primary" class="m-0">Body text — the default (--pc-text-color-1)</Paragraph>
				<Paragraph color="secondary" class="m-0">Muted — subdued (--pc-text-color-2)</Paragraph>
			</div>
		</Card>
	</Column>
	<Column size="100" md="50">
		<Card titleText="Alignment">
			<Paragraph color="secondary" class="mb-2">Logical, RTL-aware.</Paragraph>
			<div style="display: flex; flex-direction: column; gap: 4px;">
				<Paragraph textAlign="start" class="m-0">Start — leading edge</Paragraph>
				<Paragraph textAlign="center" class="m-0">Center</Paragraph>
				<Paragraph textAlign="end" class="m-0">End — trailing edge</Paragraph>
			</div>
		</Card>
	</Column>
</Grid>

<Card titleText="Semantic Text">
	<Paragraph color="secondary" class="mb-2">Compound shorthands.</Paragraph>
	<div style="display: flex; flex-direction: column; gap: 8px;">
		<Paragraph semantic="lead" class="m-0">
			Lead — an introductory paragraph at 16px with relaxed line-height, for the opening sentence of a
			section.
		</Paragraph>
		<Paragraph semantic="caption" class="m-0">
			Caption — small muted text at 12px, for figure captions and fine print.
		</Paragraph>
	</div>
</Card>

<Grid>
	<Column size="100" md="50">
		<Card titleText="Inline Text">
			<Paragraph>
				Inline spans: <Text variant="secondary">secondary</Text>,
				<Text variant="primary">primary</Text>,
				<Text variant="success">success</Text>,
				<Text variant="danger">danger</Text>,
				<Text variant="warning">warning</Text>,
				<Text variant="info">info</Text>.
			</Paragraph>
			<Paragraph class="m-0">Emphasis: <Strong>strong</Strong> and <Em>em</Em>.</Paragraph>
		</Card>
	</Column>
	<Column size="100" md="50">
		<Card titleText="Links">
			<div style="display: flex; flex-direction: column; gap: 4px;">
				<Link href="#">Default link</Link>
				<Link href="#" class="text-muted">Muted link</Link>
			</div>
		</Card>
	</Column>
</Grid>

<Card titleText="Class Reference">
	<table class="pa-table pa-table--striped pa-table--sm">
		<thead>
			<tr>
				<th>Category</th>
				<th>Classes</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Font size</td>
				<td><Code>text-2xs</Code>, <Code>text-xs</Code>, <Code>text-sm</Code>, <Code>text-base</Code>, <Code>text-lg</Code>, <Code>text-xl</Code>, <Code>text-2xl</Code></td>
			</tr>
			<tr>
				<td>Colour</td>
				<td><Code>text-body</Code>, <Code>text-muted</Code>, <Code>text-primary</Code>, <Code>text-secondary</Code>, <Code>text-success</Code>, <Code>text-danger</Code>, <Code>text-warning</Code>, <Code>text-info</Code></td>
			</tr>
			<tr>
				<td>Alignment</td>
				<td><Code>text-start</Code>, <Code>text-center</Code>, <Code>text-end</Code></td>
			</tr>
			<tr>
				<td>Wrapping</td>
				<td><Code>text-nowrap</Code>, <Code>text-truncate</Code></td>
			</tr>
			<tr>
				<td>Semantic</td>
				<td><Code>text-caption</Code>, <Code>text-lead</Code></td>
			</tr>
		</tbody>
	</table>
</Card>

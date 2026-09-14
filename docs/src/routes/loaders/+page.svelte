<script lang="ts">
	import {
		Heading,
		Paragraph,
		Card,
		Grid,
		Column,
		Spinner,
		Loader,
		LoaderCenter,
		LoaderOverlay,
		CodeBlock
	} from '@keenmate/svelte-pure-admin';
</script>

<!-- Spinner Sizes -->
<Card titleText="Spinner Sizes" class="mb-6">
	<Paragraph class="mb-4 text-secondary">
		Pure Admin's <code>.pa-spinner</code> only ships two sizes: the default and <code>--xs</code>.
		Earlier versions of these docs advertised <code>sm</code>, <code>md</code>, <code>lg</code>,
		<code>xl</code> and <code>2xl</code> modifiers — those CSS rules don't exist in core,
		so they all rendered at the default size. Use <code>&lt;Loader type="ring" size="lg" /&gt;</code>
		(or one of the other animated loaders below) when you need a bigger indicator.
	</Paragraph>
	<Grid>
		<Column size="100" md="1-2" class="text-center mb-4">
			<Spinner />
			<Paragraph class="mt-2 text-secondary">.pa-spinner<br />default (1rem)</Paragraph>
		</Column>
		<Column size="100" md="1-2" class="text-center mb-4">
			<Spinner size="xs" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--xs<br />0.75rem</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Spinner Colors -->
<Card titleText="Spinner Colors" class="mb-6">
	<Grid>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner variant="primary" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--primary</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner variant="secondary" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--secondary</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner variant="success" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--success</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner variant="danger" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--danger</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner variant="warning" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--warning</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner variant="info" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--info</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Inline Spinners -->
<Card titleText="Inline Spinners" class="mb-6">

	<Paragraph class="mb-4">
		<Spinner size="xs" variant="primary" class="d-inline-block mr-2" />
		Loading inline content...
	</Paragraph>
	<Paragraph class="mb-4">
		<Spinner variant="success" class="d-inline-block mr-2" />
		Processing your request...
	</Paragraph>
	<Paragraph>
		<Spinner variant="info" class="d-inline-block mr-2" />
		Fetching data from server...
	</Paragraph>
</Card>

<!-- Centered Loaders -->
<Card titleText="Centered Loaders" class="mb-6">

	<div class="hr-20 position-relative border border-dashed rounded">
		<LoaderOverlay>
			<Loader type="ring" size="lg" color="primary" />
		</LoaderOverlay>
	</div>
</Card>

<!-- Loader with Text -->
<Card titleText="Loaders with Text" class="mb-6">

	<Grid>
		<Column size="100" md="1-2" class="mb-4">
			<LoaderCenter class="hr-15 border border-dashed rounded">
				<Loader type="ring" size="lg" color="primary" />
				<Paragraph class="mt-4 text-secondary">Loading data...</Paragraph>
			</LoaderCenter>
		</Column>
		<Column size="100" md="1-2" class="mb-4">
			<LoaderCenter class="hr-15 border border-dashed rounded">
				<Loader type="ring" size="lg" color="success" />
				<Paragraph class="mt-4 text-secondary">Processing...</Paragraph>
			</LoaderCenter>
		</Column>
	</Grid>
</Card>

<!-- Card Loading State -->
<Card titleText="Card Loading States" class="mb-6">

	<Grid>
		<Column size="100" md="1-3" class="mb-4">
			<Card bodyClass="hr-15 position-relative">
				{#snippet header()}
					<Heading level={4}>Loading Card</Heading>
				{/snippet}
				<LoaderOverlay>
					<Loader type="ring" size="lg" color="primary" />
				</LoaderOverlay>
			</Card>
		</Column>
		<Column size="100" md="1-3" class="mb-4">
			<Card bodyClass="pa-loader-center hr-15">
				{#snippet header()}
					<Heading level={4}>Loading with Text</Heading>
				{/snippet}
				<Loader type="ring" size="lg" color="info" />
				<Paragraph class="mt-4 text-secondary">Fetching data...</Paragraph>
			</Card>
		</Column>
		<Column size="100" md="1-3" class="mb-4">
			<Card>
				{#snippet header()}
					<Heading level={4}>Loaded Content</Heading>
				{/snippet}
				<Paragraph>Content has loaded successfully!</Paragraph>
				<Paragraph class="mt-2">This is what appears after the loader completes.</Paragraph>
			</Card>
		</Column>
	</Grid>
</Card>

<!-- Loader Types -->
<Card titleText="Loader Types" class="mb-6">

	<Grid>
		<!-- Dots Loader -->
		<Column size="100" md="1-3" class="text-center mb-6">
			<Loader type="dots" size="lg" color="primary" />
			<Paragraph class="mt-2 text-secondary"><strong>Dots Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-dots</code></Paragraph>
		</Column>

		<!-- Bars Loader -->
		<Column size="100" md="1-3" class="text-center mb-6">
			<Loader type="bars" size="lg" color="success" />
			<Paragraph class="mt-2 text-secondary"><strong>Bars Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-bars</code></Paragraph>
		</Column>

		<!-- Pulse Loader -->
		<Column size="100" md="1-3" class="text-center mb-6">
			<Loader type="pulse" size="lg" color="danger" />
			<Paragraph class="mt-2 text-secondary"><strong>Pulse Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-pulse</code></Paragraph>
		</Column>

		<!-- Ring Loader -->
		<Column size="100" md="1-3" class="text-center mb-4">
			<Loader type="ring" size="lg" color="warning" />
			<Paragraph class="mt-2 text-secondary"><strong>Ring Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-ring</code></Paragraph>
		</Column>

		<!-- Wave Loader -->
		<Column size="100" md="1-3" class="text-center mb-4">
			<Loader type="wave" size="lg" color="info" />
			<Paragraph class="mt-2 text-secondary"><strong>Wave Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-wave</code></Paragraph>
		</Column>

		<!-- Spinner (existing) -->
		<Column size="100" md="1-3" class="text-center mb-4">
			<Spinner class="text-secondary" />
			<Paragraph class="mt-2 text-secondary"><strong>Spinner (Default)</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-spinner</code></Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Usage Examples -->
<Card titleText="Usage Examples">

	<Heading level={4} class="mb-2">Basic Spinner</Heading>
	<CodeBlock class="mb-4">{`<Spinner />`}</CodeBlock>

	<Heading level={4} class="mb-2">Smaller Spinner</Heading>
	<CodeBlock class="mb-4">{`<Spinner size="xs" />`}</CodeBlock>

	<Heading level={4} class="mb-2">Colored Spinner</Heading>
	<CodeBlock class="mb-4">{`<Spinner variant="primary" />`}</CodeBlock>

	<Heading level={4} class="mb-2">Centered Loader with Overlay</Heading>
	<CodeBlock class="mb-4">{`<LoaderOverlay>
  <Loader type="ring" size="lg" color="primary" />
</LoaderOverlay>`}</CodeBlock>

	<Heading level={4} class="mb-2">Centered Loader with Text</Heading>
	<CodeBlock class="mb-4">{`<LoaderCenter>
  <Loader type="ring" size="lg" color="primary" />
  <Paragraph class="mt-4">Loading...</Paragraph>
</LoaderCenter>`}</CodeBlock>

	<Heading level={4} class="mb-2">Loader Types</Heading>
	<CodeBlock class="mb-4">{`<Loader type="dots" size="lg" color="primary" />
<Loader type="bars" size="lg" color="success" />
<Loader type="pulse" size="lg" color="danger" />
<Loader type="ring" size="lg" color="warning" />
<Loader type="wave" size="lg" color="info" />`}</CodeBlock>
</Card>

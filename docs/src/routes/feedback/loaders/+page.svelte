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
		CodeBlock,
		Code
	} from '@keenmate/svelte-pure-admin';
</script>

<!-- Spinner Sizes -->
<Card titleText="Spinner Sizes" class="mb-6">
	<Paragraph class="mb-4 text-muted">
		Pure Admin's <Code>.pa-spinner</Code> only ships two sizes: the default and <Code>--xs</Code>.
		Earlier versions of these docs advertised <Code>sm</Code>, <Code>md</Code>, <Code>lg</Code>,
		<Code>xl</Code> and <Code>2xl</Code> modifiers — those CSS rules don't exist in core,
		so they all rendered at the default size. Use <Code>&lt;Loader type="ring" size="lg" /&gt;</Code>
		(or one of the other animated loaders below) when you need a bigger indicator.
	</Paragraph>
	<Grid>
		<Column size="100" md="1-2" class="text-center mb-4">
			<Spinner />
			<Paragraph class="mt-2 text-muted">.pa-spinner<br />default (1rem)</Paragraph>
		</Column>
		<Column size="100" md="1-2" class="text-center mb-4">
			<Spinner size="xs" />
			<Paragraph class="mt-2 text-muted">.pa-spinner--xs<br />0.75rem</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Spinner Colors -->
<Card titleText="Spinner Colors" class="mb-6">
	<Grid>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner variant="primary" />
			<Paragraph class="mt-2 text-muted">.pa-spinner--primary</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner variant="secondary" />
			<Paragraph class="mt-2 text-muted">.pa-spinner--secondary</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner variant="success" />
			<Paragraph class="mt-2 text-muted">.pa-spinner--success</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner variant="danger" />
			<Paragraph class="mt-2 text-muted">.pa-spinner--danger</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner variant="warning" />
			<Paragraph class="mt-2 text-muted">.pa-spinner--warning</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner variant="info" />
			<Paragraph class="mt-2 text-muted">.pa-spinner--info</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Inline Spinners -->
<Card titleText="Inline Spinners" class="mb-6">

	<Paragraph class="mb-4">
		<Spinner size="xs" variant="primary" class="d-inline-block me-2" />
		Loading inline content...
	</Paragraph>
	<Paragraph class="mb-4">
		<Spinner variant="success" class="d-inline-block me-2" />
		Processing your request...
	</Paragraph>
	<Paragraph>
		<Spinner variant="info" class="d-inline-block me-2" />
		Fetching data from server...
	</Paragraph>
</Card>

<!-- Centered Loaders -->
<Card titleText="Centered Loaders" class="mb-6">

	<div class="hr-20 position-relative border border-dashed rounded">
		<LoaderOverlay>
			<Loader type="ring" size="lg" variant="primary" />
		</LoaderOverlay>
	</div>
</Card>

<!-- Loader with Text -->
<Card titleText="Loaders with Text" class="mb-6">

	<Grid>
		<Column size="100" md="1-2" class="mb-4">
			<LoaderCenter class="hr-15 border border-dashed rounded">
				<Loader type="ring" size="lg" variant="primary" />
				<Paragraph class="mt-4 text-muted">Loading data...</Paragraph>
			</LoaderCenter>
		</Column>
		<Column size="100" md="1-2" class="mb-4">
			<LoaderCenter class="hr-15 border border-dashed rounded">
				<Loader type="ring" size="lg" variant="success" />
				<Paragraph class="mt-4 text-muted">Processing...</Paragraph>
			</LoaderCenter>
		</Column>
	</Grid>
</Card>

<!-- Card Loading State -->
<Card titleText="Card Loading States" class="mb-6">

	<Grid>
		<Column size="100" md="1-3" class="mb-4">
			<Card bodyClass="hr-15 position-relative" titleText="Loading Card">
				<LoaderOverlay>
					<Loader type="ring" size="lg" variant="primary" />
				</LoaderOverlay>
			</Card>
		</Column>
		<Column size="100" md="1-3" class="mb-4">
			<Card bodyClass="pa-loader-center hr-15" titleText="Loading with Text">
				<Loader type="ring" size="lg" variant="info" />
				<Paragraph class="mt-4 text-muted">Fetching data...</Paragraph>
			</Card>
		</Column>
		<Column size="100" md="1-3" class="mb-4">
			<Card titleText="Loaded Content">
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
			<Loader type="dots" size="lg" variant="primary" />
			<Paragraph class="mt-2 text-muted"><strong>Dots Loader</strong></Paragraph>
			<Paragraph class="mt-2"><Code>.pa-loader-dots</Code></Paragraph>
		</Column>

		<!-- Bars Loader -->
		<Column size="100" md="1-3" class="text-center mb-6">
			<Loader type="bars" size="lg" variant="success" />
			<Paragraph class="mt-2 text-muted"><strong>Bars Loader</strong></Paragraph>
			<Paragraph class="mt-2"><Code>.pa-loader-bars</Code></Paragraph>
		</Column>

		<!-- Pulse Loader -->
		<Column size="100" md="1-3" class="text-center mb-6">
			<Loader type="pulse" size="lg" variant="danger" />
			<Paragraph class="mt-2 text-muted"><strong>Pulse Loader</strong></Paragraph>
			<Paragraph class="mt-2"><Code>.pa-loader-pulse</Code></Paragraph>
		</Column>

		<!-- Ring Loader -->
		<Column size="100" md="1-3" class="text-center mb-4">
			<Loader type="ring" size="lg" variant="warning" />
			<Paragraph class="mt-2 text-muted"><strong>Ring Loader</strong></Paragraph>
			<Paragraph class="mt-2"><Code>.pa-loader-ring</Code></Paragraph>
		</Column>

		<!-- Wave Loader -->
		<Column size="100" md="1-3" class="text-center mb-4">
			<Loader type="wave" size="lg" variant="info" />
			<Paragraph class="mt-2 text-muted"><strong>Wave Loader</strong></Paragraph>
			<Paragraph class="mt-2"><Code>.pa-loader-wave</Code></Paragraph>
		</Column>

		<!-- Grid Loader -->
		<Column size="100" md="1-3" class="text-center mb-4">
			<Loader type="grid" size="lg" variant="primary" />
			<Paragraph class="mt-2 text-muted"><strong>Grid Loader</strong></Paragraph>
			<Paragraph class="mt-2"><Code>.pa-loader-grid</Code></Paragraph>
		</Column>

		<!-- Ripple Loader -->
		<Column size="100" md="1-3" class="text-center mb-4">
			<Loader type="ripple" size="lg" variant="success" />
			<Paragraph class="mt-2 text-muted"><strong>Ripple Loader</strong></Paragraph>
			<Paragraph class="mt-2"><Code>.pa-loader-ripple</Code></Paragraph>
		</Column>

		<!-- Dual Ring Loader -->
		<Column size="100" md="1-3" class="text-center mb-4">
			<Loader type="dual-ring" size="lg" variant="danger" />
			<Paragraph class="mt-2 text-muted"><strong>Dual Ring Loader</strong></Paragraph>
			<Paragraph class="mt-2"><Code>.pa-loader-dual-ring</Code></Paragraph>
		</Column>

		<!-- Spinner (existing) -->
		<Column size="100" md="1-3" class="text-center mb-4">
			<Spinner class="text-muted" />
			<Paragraph class="mt-2 text-muted"><strong>Spinner (Default)</strong></Paragraph>
			<Paragraph class="mt-2"><Code>.pa-spinner</Code></Paragraph>
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
  <Loader type="ring" size="lg" variant="primary" />
</LoaderOverlay>`}</CodeBlock>

	<Heading level={4} class="mb-2">Centered Loader with Text</Heading>
	<CodeBlock class="mb-4">{`<LoaderCenter>
  <Loader type="ring" size="lg" variant="primary" />
  <Paragraph class="mt-4">Loading...</Paragraph>
</LoaderCenter>`}</CodeBlock>

	<Heading level={4} class="mb-2">Loader Types</Heading>
	<CodeBlock class="mb-4">{`<Loader type="dots" size="lg" variant="primary" />
<Loader type="bars" size="lg" variant="success" />
<Loader type="pulse" size="lg" variant="danger" />
<Loader type="ring" size="lg" variant="warning" />
<Loader type="wave" size="lg" variant="info" />
<Loader type="grid" size="lg" variant="primary" />
<Loader type="ripple" size="lg" variant="success" />
<Loader type="dual-ring" size="lg" variant="danger" />`}</CodeBlock>
</Card>

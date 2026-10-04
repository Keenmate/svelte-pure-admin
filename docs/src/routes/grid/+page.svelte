<script lang="ts">
	import { Heading, Paragraph, Card, Grid, Column, Alert, Table, Code, CodeBlock } from '@keenmate/svelte-pure-admin';
</script>

<!-- Overview -->
<Card titleText="Overview">
	<Paragraph color="secondary" class="mb-4">
		Pure Admin uses a custom flexbox grid system with intuitive naming. Columns use <Code>pc-col-&#123;size&#125;</Code> for percentages
		and <Code>pc-col-&#123;x&#125;-&#123;y&#125;</Code> for fractions.
	</Paragraph>

	<Grid>
		<Column size="100" md="50">
			<h4>Key Features</h4>
			<ul style="line-height: 1.8;">
				<li><strong>Gutter:</strong> 0.8rem (8px) per side, 1.6rem (16px) total gap</li>
				<li><strong>Percentage columns:</strong> 5% increments (5, 10, 15... 100)</li>
				<li><strong>Fraction columns:</strong> Halves, thirds, quarters, fifths, sixths, twelfths</li>
				<li><strong>Responsive:</strong> All columns have breakpoint variants</li>
				<li><strong>Offsets:</strong> Left margin in 5% increments</li>
			</ul>
		</Column>
		<Column size="100" md="50">
			<h4>Breakpoints</h4>
			<Table isStriped>
				<thead>
					<tr>
						<th>Prefix</th>
						<th>Min Width</th>
						<th>Example</th>
					</tr>
				</thead>
				<tbody>
					<tr><td><Code>sm</Code></td><td>576px</td><td><Code>pc-col-sm-50</Code></td></tr>
					<tr><td><Code>md</Code></td><td>768px</td><td><Code>pc-col-md-50</Code></td></tr>
					<tr><td><Code>lg</Code></td><td>992px</td><td><Code>pc-col-lg-50</Code></td></tr>
					<tr><td><Code>xl</Code></td><td>1200px</td><td><Code>pc-col-xl-50</Code></td></tr>
				</tbody>
			</Table>
		</Column>
	</Grid>
</Card>

<!-- Basic Usage -->
<Card titleText="Basic Usage" subtitleText="Auto-equal width columns with .pc-col">
	<h4>Two Equal Columns</h4>
	<Grid class="mb-4">
		<Column>
			<div class="grid-demo-cell">.pc-col</div>
		</Column>
		<Column>
			<div class="grid-demo-cell">.pc-col</div>
		</Column>
	</Grid>

	<h4>Three Equal Columns</h4>
	<Grid class="mb-4">
		<Column>
			<div class="grid-demo-cell">.pc-col</div>
		</Column>
		<Column>
			<div class="grid-demo-cell">.pc-col</div>
		</Column>
		<Column>
			<div class="grid-demo-cell">.pc-col</div>
		</Column>
	</Grid>

	<h4>Four Equal Columns</h4>
	<Grid class="mb-4">
		<Column>
			<div class="grid-demo-cell">.pc-col</div>
		</Column>
		<Column>
			<div class="grid-demo-cell">.pc-col</div>
		</Column>
		<Column>
			<div class="grid-demo-cell">.pc-col</div>
		</Column>
		<Column>
			<div class="grid-demo-cell">.pc-col</div>
		</Column>
	</Grid>

	<h4>Auto Width Column</h4>
	<Grid>
		<Column>
			<div class="grid-demo-cell">.pc-col (fills remaining)</div>
		</Column>
		<Column size="auto">
			<div class="grid-demo-cell">.pc-col-auto (content width)</div>
		</Column>
	</Grid>
</Card>

<!-- Percentage Columns -->
<Card titleText="Percentage Columns" subtitleText="Fixed widths in 5% increments: .pc-col-5 through .pc-col-100">
	<Grid class="mb-2">
		<Column size="25"><div class="grid-demo-cell">.pc-col-25</div></Column>
		<Column size="75"><div class="grid-demo-cell">.pc-col-75</div></Column>
	</Grid>
	<Grid class="mb-2">
		<Column size="1-3"><div class="grid-demo-cell">.pc-col-1-3</div></Column>
		<Column size="2-3"><div class="grid-demo-cell">.pc-col-2-3</div></Column>
	</Grid>
	<Grid class="mb-2">
		<Column size="50"><div class="grid-demo-cell">.pc-col-50</div></Column>
		<Column size="50"><div class="grid-demo-cell">.pc-col-50</div></Column>
	</Grid>
	<Grid class="mb-2">
		<Column size="40"><div class="grid-demo-cell">.pc-col-40</div></Column>
		<Column size="60"><div class="grid-demo-cell">.pc-col-60</div></Column>
	</Grid>
	<Grid class="mb-2">
		<Column size="20"><div class="grid-demo-cell">20</div></Column>
		<Column size="20"><div class="grid-demo-cell">20</div></Column>
		<Column size="20"><div class="grid-demo-cell">20</div></Column>
		<Column size="20"><div class="grid-demo-cell">20</div></Column>
		<Column size="20"><div class="grid-demo-cell">20</div></Column>
	</Grid>
	<Grid>
		<Column size="100"><div class="grid-demo-cell">.pc-col-100 (full width)</div></Column>
	</Grid>

	<Alert variant="info" class="mt-4">
		<strong>Available percentages:</strong> 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100
	</Alert>
</Card>

<!-- Fraction Columns -->
<Card titleText="Fraction Columns" subtitleText="Intuitive naming for common layouts: .pc-col-1-3, .pc-col-2-3, etc.">
	<h4>Halves (1/2)</h4>
	<Grid class="mb-4">
		<Column size="1-2"><div class="grid-demo-cell">.pc-col-1-2 (50%)</div></Column>
		<Column size="1-2"><div class="grid-demo-cell">.pc-col-1-2 (50%)</div></Column>
	</Grid>

	<h4>Thirds (1/3, 2/3)</h4>
	<Grid class="mb-2">
		<Column size="1-3"><div class="grid-demo-cell">.pc-col-1-3 (33.3%)</div></Column>
		<Column size="2-3"><div class="grid-demo-cell">.pc-col-2-3 (66.7%)</div></Column>
	</Grid>
	<Grid class="mb-4">
		<Column size="1-3"><div class="grid-demo-cell">1/3</div></Column>
		<Column size="1-3"><div class="grid-demo-cell">1/3</div></Column>
		<Column size="1-3"><div class="grid-demo-cell">1/3</div></Column>
	</Grid>

	<h4>Quarters (1/4, 3/4)</h4>
	<Grid class="mb-2">
		<Column size="1-4"><div class="grid-demo-cell">.pc-col-1-4 (25%)</div></Column>
		<Column size="3-4"><div class="grid-demo-cell">.pc-col-3-4 (75%)</div></Column>
	</Grid>
	<Grid class="mb-4">
		<Column size="1-4"><div class="grid-demo-cell">1/4</div></Column>
		<Column size="1-4"><div class="grid-demo-cell">1/4</div></Column>
		<Column size="1-4"><div class="grid-demo-cell">1/4</div></Column>
		<Column size="1-4"><div class="grid-demo-cell">1/4</div></Column>
	</Grid>

	<h4>Fifths (1/5, 2/5, 3/5, 4/5)</h4>
	<Grid class="mb-2">
		<Column size="1-5"><div class="grid-demo-cell">1/5</div></Column>
		<Column size="4-5"><div class="grid-demo-cell">4/5</div></Column>
	</Grid>
	<Grid class="mb-4">
		<Column size="2-5"><div class="grid-demo-cell">2/5</div></Column>
		<Column size="3-5"><div class="grid-demo-cell">3/5</div></Column>
	</Grid>

	<h4>Sixths (1/6, 5/6)</h4>
	<Grid class="mb-2">
		<Column size="1-6"><div class="grid-demo-cell">1/6</div></Column>
		<Column size="5-6"><div class="grid-demo-cell">5/6</div></Column>
	</Grid>
	<Grid class="mb-4">
		<Column size="1-6"><div class="grid-demo-cell">1/6</div></Column>
		<Column size="1-6"><div class="grid-demo-cell">1/6</div></Column>
		<Column size="1-6"><div class="grid-demo-cell">1/6</div></Column>
		<Column size="1-6"><div class="grid-demo-cell">1/6</div></Column>
		<Column size="1-6"><div class="grid-demo-cell">1/6</div></Column>
		<Column size="1-6"><div class="grid-demo-cell">1/6</div></Column>
	</Grid>

	<h4>Twelfths (1/12, 5/12, 7/12, 11/12)</h4>
	<Grid class="mb-2">
		<Column size="1-12"><div class="grid-demo-cell">1/12</div></Column>
		<Column size="11-12"><div class="grid-demo-cell">11/12</div></Column>
	</Grid>
	<Grid>
		<Column size="5-12"><div class="grid-demo-cell">5/12</div></Column>
		<Column size="7-12"><div class="grid-demo-cell">7/12</div></Column>
	</Grid>
</Card>

<!-- Responsive Grid -->
<Card titleText="Responsive Grid" subtitleText="Stack on mobile, columns on larger screens. Resize your browser to see the effect.">
	<h4>Mobile-First Pattern</h4>
	<Paragraph color="secondary" class="mb-2">Full width on mobile, 50% on medium screens and up:</Paragraph>
	<Grid class="mb-4">
		<Column size="100" md="50"><div class="grid-demo-cell">.pc-col-100 .pc-col-md-50</div></Column>
		<Column size="100" md="50"><div class="grid-demo-cell">.pc-col-100 .pc-col-md-50</div></Column>
	</Grid>

	<h4>Progressive Columns</h4>
	<Paragraph color="secondary" class="mb-2">Different layouts at each breakpoint:</Paragraph>
	<Grid class="mb-4">
		<Column size="100" sm="50" lg="25">
			<div class="grid-demo-cell">100% &rarr; 50% &rarr; 25%</div>
		</Column>
		<Column size="100" sm="50" lg="25">
			<div class="grid-demo-cell">100% &rarr; 50% &rarr; 25%</div>
		</Column>
		<Column size="100" sm="50" lg="25">
			<div class="grid-demo-cell">100% &rarr; 50% &rarr; 25%</div>
		</Column>
		<Column size="100" sm="50" lg="25">
			<div class="grid-demo-cell">100% &rarr; 50% &rarr; 25%</div>
		</Column>
	</Grid>

	<h4>Responsive Fractions</h4>
	<Paragraph color="secondary" class="mb-2">Fractions also support breakpoints:</Paragraph>
	<Grid>
		<Column size="100" md="1-3"><div class="grid-demo-cell">.pc-col-100 .pc-col-md-1-3</div></Column>
		<Column size="100" md="2-3"><div class="grid-demo-cell">.pc-col-100 .pc-col-md-2-3</div></Column>
	</Grid>
</Card>

<!-- Offsets -->
<Card titleText="Offsets" subtitleText={`Push columns with left margin: .pc-offset-{size}`}>
	<h4>Centering with Offsets</h4>
	<Grid class="mb-2">
		<Column size="50" offset="25"><div class="grid-demo-cell">.pc-col-50 .pc-offset-25</div></Column>
	</Grid>
	<Grid class="mb-4">
		<Column size="1-3" class="pc-offset-33"><div class="grid-demo-cell">.pc-col-1-3 .pc-offset-33</div></Column>
	</Grid>

	<h4>Asymmetric Layouts</h4>
	<Grid class="mb-2">
		<Column size="30" offset="10"><div class="grid-demo-cell">.pc-col-30 .pc-offset-10</div></Column>
		<Column size="40" offset="10"><div class="grid-demo-cell">.pc-col-40 .pc-offset-10</div></Column>
	</Grid>

	<h4>Responsive Offsets</h4>
	<Grid>
		<Column size="100" md="50" offsetMd="25">
			<div class="grid-demo-cell">.pc-col-100 .pc-col-md-50 .pc-offset-md-25<br><small>Full width mobile, centered on desktop</small></div>
		</Column>
	</Grid>
</Card>

<!-- Row Alignment -->
<Card titleText="Row Alignment" subtitleText="Control horizontal and vertical alignment of columns">
	<h4>Horizontal Alignment</h4>

	<Paragraph color="secondary" class="mb-2"><Code>.pc-row--center</Code></Paragraph>
	<Grid justify="center" class="mb-2" style="background: var(--base-primary-bg);">
		<Column size="30"><div class="grid-demo-cell">Centered</div></Column>
	</Grid>

	<Paragraph color="secondary" class="mb-2"><Code>.pc-row--end</Code></Paragraph>
	<Grid justify="end" class="mb-2" style="background: var(--base-primary-bg);">
		<Column size="30"><div class="grid-demo-cell">Right aligned</div></Column>
	</Grid>

	<Paragraph color="secondary" class="mb-2"><Code>.pc-row--between</Code></Paragraph>
	<Grid justify="between" class="mb-2" style="background: var(--base-primary-bg);">
		<Column size="20"><div class="grid-demo-cell">Left</div></Column>
		<Column size="20"><div class="grid-demo-cell">Right</div></Column>
	</Grid>

	<Paragraph color="secondary" class="mb-2"><Code>.pc-row--around</Code></Paragraph>
	<Grid justify="around" class="mb-4" style="background: var(--base-primary-bg);">
		<Column size="20"><div class="grid-demo-cell">A</div></Column>
		<Column size="20"><div class="grid-demo-cell">B</div></Column>
		<Column size="20"><div class="grid-demo-cell">C</div></Column>
	</Grid>

	<h4>Vertical Alignment</h4>
	<Grid>
		<Column size="100" md="1-3">
			<Paragraph color="secondary" class="mb-2"><Code>.pc-row--top</Code></Paragraph>
			<Grid align="top" style="background: var(--base-primary-bg); min-height: 100px;">
				<Column><div class="grid-demo-cell">Top</div></Column>
				<Column><div class="grid-demo-cell">Top</div></Column>
			</Grid>
		</Column>
		<Column size="100" md="1-3">
			<Paragraph color="secondary" class="mb-2"><Code>.pc-row--middle</Code></Paragraph>
			<Grid align="middle" style="background: var(--base-primary-bg); min-height: 100px;">
				<Column><div class="grid-demo-cell">Middle</div></Column>
				<Column><div class="grid-demo-cell">Middle</div></Column>
			</Grid>
		</Column>
		<Column size="100" md="1-3">
			<Paragraph color="secondary" class="mb-2"><Code>.pc-row--bottom</Code></Paragraph>
			<Grid align="bottom" style="background: var(--base-primary-bg); min-height: 100px;">
				<Column><div class="grid-demo-cell">Bottom</div></Column>
				<Column><div class="grid-demo-cell">Bottom</div></Column>
			</Grid>
		</Column>
	</Grid>
</Card>

<!-- No Gutter -->
<Card titleText="No Gutter" subtitleText="Remove spacing between columns with .pc-row--no-gutter">
	<h4>Default (with gutter)</h4>
	<Grid class="mb-4">
		<Column size="1-3"><div class="grid-demo-cell">1/3</div></Column>
		<Column size="1-3"><div class="grid-demo-cell">1/3</div></Column>
		<Column size="1-3"><div class="grid-demo-cell">1/3</div></Column>
	</Grid>

	<h4>No Gutter</h4>
	<Grid noGutter>
		<Column size="1-3"><div class="grid-demo-cell">1/3</div></Column>
		<Column size="1-3"><div class="grid-demo-cell">1/3</div></Column>
		<Column size="1-3"><div class="grid-demo-cell">1/3</div></Column>
	</Grid>
</Card>

<!-- Visibility Utilities -->
<Card titleText="Visibility Utilities" subtitleText="Show/hide elements at different breakpoints">
	<Table isStriped class="mb-4">
		<thead>
			<tr>
				<th>Class</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><Code>.pc-hide</Code></td><td>Always hidden</td></tr>
			<tr><td><Code>.pc-show</Code></td><td>Always visible</td></tr>
			<tr><td><Code>.pc-hide-&#123;bp&#125;</Code></td><td>Hidden at breakpoint and up</td></tr>
			<tr><td><Code>.pc-show-&#123;bp&#125;</Code></td><td>Visible at breakpoint and up</td></tr>
			<tr><td><Code>.pc-hide-below-&#123;bp&#125;</Code></td><td>Hidden below breakpoint</td></tr>
			<tr><td><Code>.pc-show-below-&#123;bp&#125;</Code></td><td>Visible below breakpoint</td></tr>
		</tbody>
	</Table>

	<h4>Live Demo (resize browser)</h4>
	<Grid>
		<Column>
			<div class="grid-demo-cell pc-hide-md" style="background: var(--base-danger-color);">
				<strong>Mobile Only</strong><br>.pc-hide-md
			</div>
			<div class="grid-demo-cell pc-hide-below-md" style="background: var(--base-success-color);">
				<strong>Desktop Only</strong><br>.pc-hide-below-md
			</div>
		</Column>
	</Grid>
</Card>

<!-- Nested Grids -->
<Card titleText="Nested Grids" subtitleText="Grids can be nested inside columns">
	<Grid>
		<Column size="1-3">
			<div class="grid-demo-cell">1/3</div>
		</Column>
		<Column size="2-3">
			<div style="background: var(--base-primary-bg); padding: 0.8rem; border-radius: 4px;">
				<Paragraph color="secondary" class="mb-2">Nested grid inside 2/3 column:</Paragraph>
				<Grid>
					<Column size="1-2"><div class="grid-demo-cell" style="background: var(--base-text-color-2);">Nested 1/2</div></Column>
					<Column size="1-2"><div class="grid-demo-cell" style="background: var(--base-text-color-2);">Nested 1/2</div></Column>
				</Grid>
			</div>
		</Column>
	</Grid>
</Card>

<!-- Quick Reference -->
<Card titleText="Quick Reference">
	<Grid>
		<Column size="100" md="50">
			<h4>Percentage Classes</h4>
			<Paragraph color="secondary">
				<Code>.pc-col-5</Code> <Code>.pc-col-10</Code> <Code>.pc-col-15</Code> <Code>.pc-col-20</Code> <Code>.pc-col-25</Code><br>
				<Code>.pc-col-30</Code> <Code>.pc-col-35</Code> <Code>.pc-col-40</Code> <Code>.pc-col-45</Code> <Code>.pc-col-50</Code><br>
				<Code>.pc-col-55</Code> <Code>.pc-col-60</Code> <Code>.pc-col-65</Code> <Code>.pc-col-70</Code> <Code>.pc-col-75</Code><br>
				<Code>.pc-col-80</Code> <Code>.pc-col-85</Code> <Code>.pc-col-90</Code> <Code>.pc-col-95</Code> <Code>.pc-col-100</Code>
			</Paragraph>
		</Column>
		<Column size="100" md="50">
			<h4>Fraction Classes</h4>
			<Paragraph color="secondary">
				<Code>.pc-col-1-2</Code><br>
				<Code>.pc-col-1-3</Code> <Code>.pc-col-2-3</Code><br>
				<Code>.pc-col-1-4</Code> <Code>.pc-col-3-4</Code><br>
				<Code>.pc-col-1-5</Code> <Code>.pc-col-2-5</Code> <Code>.pc-col-3-5</Code> <Code>.pc-col-4-5</Code><br>
				<Code>.pc-col-1-6</Code> <Code>.pc-col-5-6</Code><br>
				<Code>.pc-col-1-12</Code> <Code>.pc-col-5-12</Code> <Code>.pc-col-7-12</Code> <Code>.pc-col-11-12</Code>
			</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Code Examples -->
<Card titleText="Code Examples">
	<Grid>
		<Column size="100" md="50">
			<h4 class="mb-2">Basic Grid</h4>
			<CodeBlock>{`<Grid>
  <Column size="50">Left half</Column>
  <Column size="50">Right half</Column>
</Grid>

<!-- Thirds -->
<Grid>
  <Column size="1-3">One third</Column>
  <Column size="2-3">Two thirds</Column>
</Grid>`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Responsive Grid</h4>
			<CodeBlock>{`<!-- Stack on mobile, columns on desktop -->
<Grid>
  <Column size="100" md="50">
    Full on mobile, half on desktop
  </Column>
  <Column size="100" md="50">
    Full on mobile, half on desktop
  </Column>
</Grid>

<!-- Progressive breakpoints -->
<Column size="100" sm="50" lg="25">
  100% → 50% → 25%
</Column>`}</CodeBlock>
		</Column>
	</Grid>

	<Grid class="mt-4">
		<Column size="100" md="50">
			<h4 class="mb-2">Grid Props</h4>
			<CodeBlock>{`<!-- Alignment -->
<Grid justify="center">...</Grid>
<Grid justify="between">...</Grid>
<Grid align="middle">...</Grid>

<!-- Same height columns -->
<Grid sameHeight>...</Grid>

<!-- No gutter -->
<Grid noGutter>...</Grid>`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Column Props</h4>
			<CodeBlock>{`<!-- Sizes (percentage or fraction) -->
<Column size="50">Half</Column>
<Column size="1-3">One third</Column>

<!-- Responsive -->
<Column size="100" md="50" lg="25">
  Mobile → Tablet → Desktop
</Column>

<!-- Offset -->
<Column size="50" offset="25">
  Centered 50%
</Column>`}</CodeBlock>
		</Column>
	</Grid>
</Card>

<style>
.grid-demo-cell {
	background: #007bff;
	color: white;
	padding: 1rem;
	text-align: center;
	border-radius: 4px;
	font-size: 1.2rem;
	margin-bottom: 0.4rem;
}
</style>

<script lang="ts">
	import { Heading, Paragraph, Card, Grid, Column, Table, Alert, Code, CodeBlock, OrderedList } from '@keenmate/svelte-pure-admin';
</script>

<!-- Introduction -->
<Card titleText="Base CSS Variables for Web Components">
	<Paragraph class="mb-3">
		Pure Admin exports <Code>--base-*</Code> CSS custom properties that enable automatic theming for web components
		like <strong>web-daterangepicker</strong>, <strong>web-multiselect</strong>, and others.
	</Paragraph>

	<Alert variant="info">
		<strong>Purpose:</strong> Web components consume these variables via fallback chains, automatically inheriting
		the current Pure Admin theme colors without any manual configuration.
	</Alert>
</Card>

<!-- How It Works -->
<Card titleText="How It Works">
	<h3 class="mb-2">Architecture</h3>
	<OrderedList class="mb-3">
		<li><strong>Pure Admin defines SCSS variables</strong> - <Code>$base-*</Code> variables in <Code>_variables.scss</Code></li>
		<li><strong>Themes override as needed</strong> - Each theme can customize these base variables</li>
		<li><strong>Mixin outputs CSS properties</strong> - <Code>_base-css-variables.scss</Code> converts SCSS to CSS</li>
		<li><strong>Web components consume</strong> - Components use <Code>var(--base-*, fallback)</Code></li>
	</OrderedList>

	<h3 class="mb-2">Data Flow</h3>
	<CodeBlock class="mb-3">{`_variables.scss          themes/express.scss           Output CSS
────────────────        ─────────────────────        ─────────────
$base-accent-color:     $base-accent-color:          :root {
  #3b82f6 !default;  →    #dc2626;               →    --base-accent-color: #dc2626;
                        @include output-base-vars;     ...
                                                     }`}</CodeBlock>

	<h3 class="mb-2">Web Component Consumption</h3>
	<CodeBlock>{`/* In web component CSS */
:host {
    --ms-accent-color: var(--base-accent-color, #3b82f6);
    --ms-text-color: var(--base-text-color-1, #333);
    --ms-input-bg: var(--base-input-background, #fff);
}`}</CodeBlock>
</Card>

<!-- Variable Reference -->
<Card titleText="Variable Reference" hasPadding={false}>
	<Table isStriped>
		<thead>
			<tr>
				<th>Category</th>
				<th>Count</th>
				<th>Variables</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><strong>Colors</strong></td>
				<td>11</td>
				<td>
					<Code>--base-accent-color</Code>,
					<Code>--base-accent-color-hover</Code>,
					<Code>--base-accent-color-active</Code>,
					<Code>--base-primary-bg</Code>,
					<Code>--base-primary-bg-hover</Code>,
					<Code>--base-text-color-1</Code> to <Code>--base-text-color-4</Code>,
					<Code>--base-text-on-accent</Code>,
					<Code>--base-border-color</Code>
				</td>
			</tr>
			<tr>
				<td><strong>Input Fields</strong></td>
				<td>7</td>
				<td>
					<Code>--base-input-background</Code>,
					<Code>--base-input-color</Code>,
					<Code>--base-input-border</Code>,
					<Code>--base-input-border-hover</Code>,
					<Code>--base-input-border-focus</Code>,
					<Code>--base-input-placeholder-color</Code>,
					<Code>--base-input-background-disabled</Code>
				</td>
			</tr>
			<tr>
				<td><strong>Input Sizes</strong></td>
				<td>5</td>
				<td>
					<Code>--base-input-size-xs-height</Code> (3.1),
					<Code>--base-input-size-sm-height</Code> (3.3),
					<Code>--base-input-size-md-height</Code> (3.5),
					<Code>--base-input-size-lg-height</Code> (3.8),
					<Code>--base-input-size-xl-height</Code> (4.1)
					<br><em>Unitless multipliers for 10px base</em>
				</td>
			</tr>
			<tr>
				<td><strong>Dropdown</strong></td>
				<td>3</td>
				<td>
					<Code>--base-dropdown-background</Code>,
					<Code>--base-dropdown-border</Code>,
					<Code>--base-dropdown-box-shadow</Code>
				</td>
			</tr>
			<tr>
				<td><strong>Tooltip</strong></td>
				<td>2</td>
				<td>
					<Code>--base-tooltip-background</Code>,
					<Code>--base-tooltip-text-color</Code>
				</td>
			</tr>
			<tr>
				<td><strong>Typography</strong></td>
				<td>14</td>
				<td>
					<Code>--base-font-family</Code>,
					<Code>--base-font-size-2xs</Code> to <Code>--base-font-size-2xl</Code> (unitless),
					<Code>--base-font-weight-normal</Code>,
					<Code>--base-font-weight-medium</Code>,
					<Code>--base-font-weight-semibold</Code>,
					<Code>--base-line-height-tight</Code>,
					<Code>--base-line-height-normal</Code>,
					<Code>--base-line-height-relaxed</Code>
				</td>
			</tr>
			<tr>
				<td><strong>Border Radius</strong></td>
				<td>3</td>
				<td>
					<Code>--base-border-radius-sm</Code> (0.4),
					<Code>--base-border-radius-md</Code> (0.6),
					<Code>--base-border-radius-lg</Code> (0.8)
					<br><em>Unitless multipliers for 10px base</em>
				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<td><strong>Total</strong></td>
				<td><strong>45</strong></td>
				<td></td>
			</tr>
		</tfoot>
	</Table>
</Card>

<!-- Current Theme Values -->
<Card titleText="Current Theme Values">
	<Paragraph class="mb-2">These are the <Code>--base-*</Code> CSS variable values from the currently selected theme:</Paragraph>

	<Grid>
		<Column size="50" md="25">
			<h4 class="mb-1">Colors</h4>
			<div class="d-flex align-items-center gap-8 mb-2">
				<div style="width: 2.4rem; height: 2.4rem; border-radius: 0.4rem; background: var(--base-accent-color); border: 1px solid var(--base-border-color);"></div>
				<Code>--base-accent-color</Code>
			</div>
			<div class="d-flex align-items-center gap-8 mb-2">
				<div style="width: 2.4rem; height: 2.4rem; border-radius: 0.4rem; background: var(--base-accent-color-hover); border: 1px solid var(--base-border-color);"></div>
				<Code>--base-accent-color-hover</Code>
			</div>
			<div class="d-flex align-items-center gap-8 mb-2">
				<div style="width: 2.4rem; height: 2.4rem; border-radius: 0.4rem; background: var(--base-primary-bg); border: 1px solid var(--base-border-color);"></div>
				<Code>--base-primary-bg</Code>
			</div>
			<div class="d-flex align-items-center gap-8 mb-2">
				<div style="width: 2.4rem; height: 2.4rem; border-radius: 0.4rem; background: var(--base-border-color); border: 1px solid var(--base-border-color);"></div>
				<Code>--base-border-color</Code>
			</div>
		</Column>
		<Column size="50" md="25">
			<h4 class="mb-1">Text Colors</h4>
			<div class="d-flex align-items-center gap-8 mb-2">
				<div style="width: 2.4rem; height: 2.4rem; border-radius: 0.4rem; background: var(--base-text-color-1); border: 1px solid var(--base-border-color);"></div>
				<Code>--base-text-color-1</Code>
			</div>
			<div class="d-flex align-items-center gap-8 mb-2">
				<div style="width: 2.4rem; height: 2.4rem; border-radius: 0.4rem; background: var(--base-text-color-2); border: 1px solid var(--base-border-color);"></div>
				<Code>--base-text-color-2</Code>
			</div>
			<div class="d-flex align-items-center gap-8 mb-2">
				<div style="width: 2.4rem; height: 2.4rem; border-radius: 0.4rem; background: var(--base-text-color-3); border: 1px solid var(--base-border-color);"></div>
				<Code>--base-text-color-3</Code>
			</div>
			<div class="d-flex align-items-center gap-8 mb-2">
				<div style="width: 2.4rem; height: 2.4rem; border-radius: 0.4rem; background: var(--base-text-color-4); border: 1px solid var(--base-border-color);"></div>
				<Code>--base-text-color-4</Code>
			</div>
		</Column>
		<Column size="50" md="25">
			<h4 class="mb-1">Input Fields</h4>
			<div class="d-flex align-items-center gap-8 mb-2">
				<div style="width: 2.4rem; height: 2.4rem; border-radius: 0.4rem; background: var(--base-input-background); border: 1px solid var(--base-border-color);"></div>
				<Code>--base-input-background</Code>
			</div>
			<div class="d-flex align-items-center gap-8 mb-2">
				<div style="width: 2.4rem; height: 2.4rem; border-radius: 0.4rem; background: var(--base-dropdown-background); border: 1px solid var(--base-border-color);"></div>
				<Code>--base-dropdown-background</Code>
			</div>
			<div class="d-flex align-items-center gap-8 mb-2">
				<div style="width: 2.4rem; height: 2.4rem; border-radius: 0.4rem; background: var(--base-tooltip-background); border: 1px solid var(--base-border-color);"></div>
				<Code>--base-tooltip-background</Code>
			</div>
		</Column>
		<Column size="50" md="25">
			<h4 class="mb-1">Typography</h4>
			<p class="mb-1" style="font-size: calc(var(--base-font-size-2xs, 1.0) * 1rem);"><Code>--base-font-size-2xs</Code> (1.0)</p>
			<p class="mb-1" style="font-size: calc(var(--base-font-size-xs, 1.2) * 1rem);"><Code>--base-font-size-xs</Code> (1.2)</p>
			<p class="mb-1" style="font-size: calc(var(--base-font-size-sm, 1.4) * 1rem);"><Code>--base-font-size-sm</Code> (1.4)</p>
			<p class="mb-1" style="font-size: calc(var(--base-font-size-base, 1.6) * 1rem);"><Code>--base-font-size-base</Code> (1.6)</p>
			<p class="mb-1" style="font-size: calc(var(--base-font-size-lg, 1.8) * 1rem);"><Code>--base-font-size-lg</Code> (1.8)</p>
		</Column>
	</Grid>
</Card>

<!-- Theme Implementation Pattern -->
<Card titleText="Theme Implementation Pattern">
	<Paragraph class="mb-2">Each theme follows this pattern to output base CSS variables:</Paragraph>

	<CodeBlock>{`// themes/express.scss
@import '../variables';

// Override accent color for theme
$accent-color: $express-red;

// Sync base variables with theme colors
$base-accent-color: $accent-color;
$base-accent-color-hover: $express-red-hover;
$base-accent-color-active: lighten($express-red, 15%);

// ... other theme overrides ...

@import '../core';
@import '../utilities';
@import '../base-css-variables';

// Output CSS variables in :root block
:root {
    --page-loader-bg: rgba(0, 0, 0, 0.95);
    --page-loader-spinner-border: #333;
    --page-loader-spinner-accent: #FFCC00;

    // Base CSS variables for web components
    @include output-base-css-variables;
}`}</CodeBlock>
</Card>

<!-- Files Reference -->
<Card titleText="Files Reference" hasPadding={false}>
	<Table isStriped>
		<thead>
			<tr>
				<th>File</th>
				<th>Purpose</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Code>src/scss/_variables.scss</Code></td>
				<td>Contains 45 <Code>$base-*</Code> SCSS variables with <Code>!default</Code> flags</td>
			</tr>
			<tr>
				<td><Code>src/scss/_base-css-variables.scss</Code></td>
				<td>Mixin <Code>output-base-css-variables</Code> that outputs all CSS custom properties</td>
			</tr>
			<tr>
				<td><Code>src/scss/themes/*.scss</Code></td>
				<td>Each theme imports the mixin and includes it in <Code>:root</Code></td>
			</tr>
			<tr>
				<td><Code>docs/BASE_VARIABLES_INTEGRATION_PLAN.md</Code></td>
				<td>Complete implementation plan and architecture documentation</td>
			</tr>
		</tbody>
	</Table>
</Card>

<!-- Benefits -->
<Card titleText="Benefits">
	<Grid>
		<Column size="50" md="25">
			<Alert variant="success">
				<strong>Automatic Theming</strong><br>
				Web components inherit Pure Admin theme colors without configuration
			</Alert>
		</Column>
		<Column size="50" md="25">
			<Alert variant="success">
				<strong>Single Source of Truth</strong><br>
				Pure Admin defines the theme, components follow
			</Alert>
		</Column>
		<Column size="50" md="25">
			<Alert variant="success">
				<strong>No Manual Sync</strong><br>
				Theme changes propagate automatically to all components
			</Alert>
		</Column>
		<Column size="50" md="25">
			<Alert variant="success">
				<strong>9 Themes Supported</strong><br>
				All themes export consistent <Code>--base-*</Code> variables
			</Alert>
		</Column>
	</Grid>
</Card>

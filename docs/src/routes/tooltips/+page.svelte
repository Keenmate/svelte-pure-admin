<script lang="ts">
			import { Heading, Paragraph, Grid, Column, Card, Button, ButtonGroup, Tooltip, Popover, BasicList } from '@keenmate/svelte-pure-admin';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
	/>
</svelte:head>

<div class="pc-layout-container">

	<Grid>
		<!-- Left Column -->
		<Column size="100" lg="1-2">
			<!-- Tooltip Positions & Colors -->
			<Card titleText="Tooltip Positions & Colors" class="mb-4">
				<Grid>
					<Column size="1-2" md="1-4" class="text-center mb-3 p-4">
						<Tooltip text="Tooltip on top">Top</Tooltip>
					</Column>
					<Column size="1-2" md="1-4" class="text-center mb-3 p-4">
						<Tooltip text="Tooltip on right" position="end">Right</Tooltip>
					</Column>
					<Column size="1-2" md="1-4" class="text-center mb-3 p-4">
						<Tooltip text="Tooltip on bottom" position="bottom">Bottom</Tooltip>
					</Column>
					<Column size="1-2" md="1-4" class="text-center mb-3 p-4">
						<Tooltip text="Tooltip on left" position="start">Left</Tooltip>
					</Column>
				</Grid>
				<hr class="my-3" />
				<Grid>
					<Column size="1-3" md="1-5" class="text-center mb-3 p-4">
						<Tooltip text="Default dark">Default</Tooltip>
					</Column>
					<Column size="1-3" md="1-5" class="text-center mb-3 p-4">
						<Tooltip text="Primary blue" variant="primary">Primary</Tooltip>
					</Column>
					<Column size="1-3" md="1-5" class="text-center mb-3 p-4">
						<Tooltip text="Success green" variant="success">Success</Tooltip>
					</Column>
					<Column size="1-2" md="1-5" class="text-center mb-3 p-4">
						<Tooltip text="Warning yellow" variant="warning">Warning</Tooltip>
					</Column>
					<Column size="1-2" md="1-5" class="text-center mb-3 p-4">
						<Tooltip text="Danger red" variant="danger">Danger</Tooltip>
					</Column>
				</Grid>
				<hr class="my-3" />
				<Paragraph class="text-sm mb-3">Theme colors (color-1 to color-9):</Paragraph>
				<Grid>
					<Column class="text-center mb-3 p-2">
						<Tooltip text="Color 1" variant="color-1">1</Tooltip>
					</Column>
					<Column class="text-center mb-3 p-2">
						<Tooltip text="Color 2" variant="color-2">2</Tooltip>
					</Column>
					<Column class="text-center mb-3 p-2">
						<Tooltip text="Color 3" variant="color-3">3</Tooltip>
					</Column>
					<Column class="text-center mb-3 p-2">
						<Tooltip text="Color 4" variant="color-4">4</Tooltip>
					</Column>
					<Column class="text-center mb-3 p-2">
						<Tooltip text="Color 5" variant="color-5">5</Tooltip>
					</Column>
					<Column class="text-center mb-3 p-2">
						<Tooltip text="Color 6" variant="color-6">6</Tooltip>
					</Column>
					<Column class="text-center mb-3 p-2">
						<Tooltip text="Color 7" variant="color-7">7</Tooltip>
					</Column>
					<Column class="text-center mb-3 p-2">
						<Tooltip text="Color 8" variant="color-8">8</Tooltip>
					</Column>
					<Column class="text-center mb-3 p-2">
						<Tooltip text="Color 9" variant="color-9">9</Tooltip>
					</Column>
				</Grid>
			</Card>

			<!-- Buttons with Tooltips -->
			<Card titleText="Buttons & Icon-Only" class="mb-4">
				<Paragraph class="mb-3 text-sm">Regular buttons:</Paragraph>
				<div class="text-center mb-4">
					<ButtonGroup>
						<Tooltip text="Save your changes" position="start">
							<Button variant="primary" size="sm">
								<span class="pa-icon pa-icon--save" aria-hidden="true"></span> Save
							</Button>
						</Tooltip>
						<Tooltip text="Cancel and go back" position="bottom">
							<Button variant="secondary" size="sm">
								<span class="pa-icon pa-icon--x" aria-hidden="true"></span> Cancel
							</Button>
						</Tooltip>
						<Tooltip text="Delete this item" position="bottom">
							<Button variant="danger" size="sm">
								<span class="pa-icon pa-icon--delete" aria-hidden="true"></span> Delete
							</Button>
						</Tooltip>
					</ButtonGroup>
				</div>
				<Paragraph class="mb-3 text-sm">Icon-only buttons:</Paragraph>
				<div class="text-center">
					<ButtonGroup>
						<Tooltip text="Edit" position="bottom">
							<Button variant="primary" size="sm" isIconOnly titleText="">
								<span class="pa-icon pa-icon--edit" aria-hidden="true"></span>
							</Button>
						</Tooltip>
						<Tooltip text="Copy" position="bottom">
							<Button variant="secondary" size="sm" isIconOnly titleText="">
								<span class="pa-icon pa-icon--copy" aria-hidden="true"></span>
							</Button>
						</Tooltip>
						<Tooltip text="Download" position="bottom">
							<Button variant="success" size="sm" isIconOnly titleText="">
								<i class="fa-solid fa-download"></i>
							</Button>
						</Tooltip>
						<Tooltip text="Settings" position="bottom">
							<Button variant="warning" size="sm" isIconOnly titleText="">
								<i class="fa-solid fa-gear"></i>
							</Button>
						</Tooltip>
						<Tooltip text="Delete" position="bottom">
							<Button variant="danger" size="sm" isIconOnly titleText="">
								<span class="pa-icon pa-icon--delete" aria-hidden="true"></span>
							</Button>
						</Tooltip>
						<Tooltip text="Info" position="bottom">
							<Button variant="info" size="sm" isIconOnly titleText="">
								<i class="fa-solid fa-circle-info"></i>
							</Button>
						</Tooltip>
					</ButtonGroup>
				</div>
			</Card>

			<!-- Multiline Tooltips -->
			<Card titleText="Multiline Tooltips" class="mb-4">
				<Paragraph class="mb-3 text-sm">
					Use <code>multiline</code> prop for longer text (20rem width, left-aligned):
				</Paragraph>
				<div class="text-center">
					<ButtonGroup>
						<Tooltip
							text="This button will save your changes to the database. Make sure you have reviewed all fields before clicking. Changes cannot be undone after saving."
							position="bottom"
							multiline
						>
							<Button variant="primary" size="sm">
								<span class="pa-icon pa-icon--save" aria-hidden="true"></span> Save
							</Button>
						</Tooltip>
						<Tooltip
							text="This action will permanently delete the selected item and all associated data. This operation cannot be reversed. Please confirm you want to proceed."
							position="bottom"
							multiline
						>
							<Button variant="danger" size="sm">
								<span class="pa-icon pa-icon--delete" aria-hidden="true"></span> Delete
							</Button>
						</Tooltip>
					</ButtonGroup>
				</div>
			</Card>

			<!-- Inline Text Tooltips -->
			<Card titleText="Inline Text Tooltips" class="mb-4">
				<Paragraph>
					Tooltips can explain <Tooltip
						text="Application Programming Interface"
						variant="primary">API</Tooltip
					> terms,
					<Tooltip text="Cascading Style Sheets" variant="success"
						>CSS</Tooltip
					>, or
					<Tooltip text="HyperText Markup Language" variant="danger"
						>HTML</Tooltip
					> abbreviations.
				</Paragraph>
			</Card>
		</Column>

		<!-- Right Column -->
		<Column size="100" lg="1-2">
			<!-- Popovers -->
			<Card titleText="Popovers - Interactive Help" class="mb-4">
				<Paragraph class="mb-3 text-sm">
					Rich content with links, formatting. Click <strong>?</strong> to open:
				</Paragraph>
				<Grid>
					<Column size="1-2" md="1-4" class="mb-3 text-center p-2">
						<label class="text-sm">
							Basic
							<Popover titleText="Help" placement="bottom">
								<Paragraph>
									Basic popover with <strong>bold</strong>, <em>italic</em>, and <a href="#"
										>links</a
									>.
								</Paragraph>
							</Popover>
						</label>
					</Column>
					<Column size="1-2" md="1-4" class="mb-3 text-center p-2">
						<label class="text-sm">
							With List
							<Popover titleText="Options" placement="bottom">
								<Paragraph>Select from:</Paragraph>
								<BasicList>
									<li>Option A</li>
									<li>Option B</li>
									<li>Option C</li>
								</BasicList>
							</Popover>
						</label>
					</Column>
					<Column size="1-2" md="1-4" class="mb-3 text-center p-2">
						<label class="text-sm">
							Large
							<Popover titleText="Documentation" placement="bottom" size="lg">
								<Paragraph>Use <code>size="lg"</code> prop for wider content (up to 28rem).</Paragraph>
								<Paragraph>
									Perfect for detailed explanations and <a href="/components">documentation</a>.
								</Paragraph>
							</Popover>
						</label>
					</Column>
					<Column size="1-2" md="1-4" class="mb-3 text-center p-2">
						<label class="text-sm">
							Small
							<Popover titleText="Tip" placement="bottom" size="sm">
								<Paragraph>Brief hints use <code>size="sm"</code>.</Paragraph>
							</Popover>
						</label>
					</Column>
				</Grid>
				<hr class="my-3" />
				<Paragraph class="mb-3 text-sm">Text alignment variants:</Paragraph>
				<Grid>
					<Column size="1-3" class="mb-3 text-center p-2">
						<label class="text-sm">
							Left (default)
							<Popover titleText="Left Aligned" placement="bottom">
								<Paragraph>Default alignment is left.</Paragraph>
								<BasicList>
									<li>Lists look natural</li>
									<li>Easy to read</li>
									<li>Best for content</li>
								</BasicList>
							</Popover>
						</label>
					</Column>
					<Column size="1-3" class="mb-3 text-center p-2">
						<label class="text-sm">
							Center
							<Popover titleText="Centered" placement="bottom" alignment="center">
								<Paragraph>Use <code>alignment="center"</code> prop.</Paragraph>
								<Paragraph>Good for short messages or confirmations.</Paragraph>
							</Popover>
						</label>
					</Column>
					<Column size="1-3" class="mb-3 text-center p-2">
						<label class="text-sm">
							End
							<Popover titleText="End Aligned" placement="bottom" alignment="end">
								<Paragraph>Use <code>alignment="end"</code> prop.</Paragraph>
								<Paragraph>For RTL or special layouts.</Paragraph>
							</Popover>
						</label>
					</Column>
				</Grid>
			</Card>

			<!-- Popover Positions -->
			<Card titleText="Popover Positions" class="mb-4">
				<Grid>
					<Column size="1-2" md="1-4" class="text-center mb-3 p-4">
						<span class="text-sm">Top </span>
					<Popover titleText="Top">
						<Paragraph>Appears above trigger.</Paragraph>
					</Popover>
					</Column>
					<Column size="1-2" md="1-4" class="text-center mb-3 p-4">
						<span class="text-sm">Right </span>
					<Popover titleText="Right" placement="end">
						<Paragraph>Appears to the right.</Paragraph>
					</Popover>
					</Column>
					<Column size="1-2" md="1-4" class="text-center mb-3 p-4">
						<span class="text-sm">Bottom </span>
					<Popover titleText="Bottom" placement="bottom">
						<Paragraph>Appears below trigger.</Paragraph>
					</Popover>
					</Column>
					<Column size="1-2" md="1-4" class="text-center mb-3 p-4">
						<span class="text-sm">Left </span>
					<Popover titleText="Left" placement="start">
						<Paragraph>Appears to the left.</Paragraph>
					</Popover>
					</Column>
				</Grid>
			</Card>
		</Column>
	</Grid>

	<!-- Usage Examples -->
	<Card titleText="Code Examples">
		<Grid>
				<Column size="100" md="1-2">
					<Heading level={4} class="mb-2 text-sm">Tooltips</Heading>
					<pre class="mb-3 text-sm"><code
							>&lt;!-- Basic --&gt;
&lt;Tooltip text="Tooltip text"&gt;Hover&lt;/Tooltip&gt;

&lt;!-- Positions: right, bottom, left (default: top) --&gt;
&lt;Tooltip text="..." position="bottom"&gt;...&lt;/Tooltip&gt;

&lt;!-- Colors: primary, success, warning, danger --&gt;
&lt;Tooltip text="..." variant="success"&gt;...&lt;/Tooltip&gt;

&lt;!-- Multiline --&gt;
&lt;Tooltip text="..." multiline&gt;...&lt;/Tooltip&gt;</code
						></pre>
				</Column>
				<Column size="100" md="1-2">
					<Heading level={4} class="mb-2 text-sm">Popovers</Heading>
					<pre class="mb-3 text-sm"><code
							>&lt;!-- Basic --&gt;
&lt;Popover titleText="Title" placement="bottom"&gt;
  &lt;p&gt;Rich &lt;strong&gt;HTML&lt;/strong&gt; content.&lt;/p&gt;
&lt;/Popover&gt;

&lt;!-- Sizes: sm, lg (default: medium) --&gt;
&lt;Popover titleText="Title" size="lg"&gt;...&lt;/Popover&gt;

&lt;!-- Custom trigger --&gt;
&lt;Popover titleText="Title"&gt;
  &#123;#snippet trigger()&#125;&lt;i class="icon"&gt;&lt;/i&gt;&#123;/snippet&#125;
  &lt;p&gt;Content&lt;/p&gt;
&lt;/Popover&gt;</code
						></pre>
				</Column>
		</Grid>
	</Card>
</div>

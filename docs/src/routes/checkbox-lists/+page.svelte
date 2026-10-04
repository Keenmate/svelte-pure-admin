<script lang="ts">
	import { Heading, Paragraph, Card, Checkbox, CheckboxGroup, CheckboxBox, CheckboxList, CheckboxListItem, Button, ButtonGroup, Table, Badge, Alert, Grid, Column, BasicList } from '@keenmate/svelte-pure-admin';
													
	// ===== Card 1: Custom Tri-State Checkbox =====
	let uncheckedDemo = $state(false);
	let checkedDemo = $state(true);
	let indeterminateDemo = $state(false);

	// Size variants (all checked to show checkmark)
	let sizeXs = $state(true);
	let sizeSm = $state(true);
	let sizeDefault = $state(true);
	let sizeLg = $state(true);
	let sizeXl = $state(true);

	// X mark variants (all checked to show X)
	let xMarkXs = $state(true);
	let xMarkSm = $state(true);
	let xMarkDefault = $state(true);
	let xMarkLg = $state(true);
	let xMarkXl = $state(true);

	// ===== Card 2: Select All Pattern =====
	let fruits = $state({
		apple: true,
		banana: false,
		orange: true,
		grape: false
	});

	// Derived: compute select-all state
	const fruitCount = $derived(Object.values(fruits).filter(Boolean).length);
	const totalFruits = 4;
	const selectAllFruits = $derived(fruitCount === totalFruits);
	const selectAllIndeterminate = $derived(fruitCount > 0 && fruitCount < totalFruits);

	function handleSelectAllFruits(e: Event) {
		const checked = (e.target as HTMLInputElement).checked;
		fruits.apple = checked;
		fruits.banana = checked;
		fruits.orange = checked;
		fruits.grape = checked;
	}

	// ===== Card 3: Disabled Checkboxes =====
	let disabledUnchecked = $state(false);
	let disabledChecked = $state(true);
	let disabledIndeterminate = $state(false);

	// ===== Card 4: Basic Checkbox Lists =====
	let basicOptions = $state({
		option1: false,
		option2: true,
		option3: false,
		option4: false
	});

	// With descriptions
	let features = $state({
		email: false,
		sms: true,
		push: false
	});

	// ===== Card 5: Item States =====
	let stateOptions = $state({
		normal: false,
		disabled: false,
		locked1: false,
		locked2: false,
		normalSelected: true
	});

	// ===== Card 6: List Variants =====
	let compactOptions = $state({
		compact1: false,
		compact2: false,
		compact3: false
	});

	let borderedOptions = $state({
		bordered1: false,
		bordered2: false,
		bordered3: false
	});

	let stripedOptions = $state({
		striped1: false,
		striped2: false,
		striped3: false,
		striped4: false
	});

	// ===== Card 7: Checkbox Lists with Actions =====
	let tasks = $state([
		{ id: 'task1', label: 'Complete project proposal', checked: false },
		{ id: 'task2', label: 'Review design mockups', checked: true },
		{ id: 'task3', label: 'Update documentation', checked: false }
	]);

	function editTask(taskId: string) {
		console.log('Edit task:', taskId);
	}

	function deleteTask(taskId: string) {
		tasks = tasks.filter((t) => t.id !== taskId);
	}

	// ===== Card 8: Alternative Layouts =====
	let inlineOptions = $state({
		optionA: false,
		optionB: false,
		optionC: false,
		optionD: false
	});

	let gridOptions = $state({
		grid1: false,
		grid2: false,
		grid3: false,
		grid4: false
	});

	let twoColOptions = $state({
		col21: false,
		col22: false,
		col23: false,
		col24: false
	});

	let threeColOptions = $state({
		col31: false,
		col32: false,
		col33: false,
		col34: false,
		col35: false,
		col36: false
	});

	// ===== Card 9: Tables with Checkboxes (static) =====
	let staticTableData = $state([
		{ id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', statusVariant: 'success' as const, checked: false },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', statusVariant: 'success' as const, checked: true },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Pending', statusVariant: 'warning' as const, checked: false },
		{ id: 4, name: 'Alice Williams', email: 'alice@example.com', status: 'Active', statusVariant: 'success' as const, checked: true },
		{ id: 5, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Inactive', statusVariant: 'danger' as const, checked: false }
	]);

	// ===== Card 10: Interactive Demo =====
	let interactiveTableData = $state([
		{ id: 1, product: 'Laptop Pro 15"', sku: 'LPT-001', price: '$1,299', stock: 'In Stock', stockVariant: 'success' as const, checked: false },
		{ id: 2, product: 'Wireless Mouse', sku: 'MSE-042', price: '$29', stock: 'In Stock', stockVariant: 'success' as const, checked: false },
		{ id: 3, product: 'USB-C Hub', sku: 'HUB-123', price: '$49', stock: 'Low Stock', stockVariant: 'warning' as const, checked: false },
		{ id: 4, product: 'Monitor 27"', sku: 'MON-789', price: '$399', stock: 'Out of Stock', stockVariant: 'danger' as const, checked: false },
		{ id: 5, product: 'Keyboard Mechanical', sku: 'KBD-555', price: '$89', stock: 'In Stock', stockVariant: 'success' as const, checked: false }
	]);

	const interactiveSelectedCount = $derived(interactiveTableData.filter((row) => row.checked).length);
	const interactiveSelectAll = $derived(interactiveSelectedCount === interactiveTableData.length);

	function handleInteractiveSelectAll(e: Event) {
		const checked = (e.target as HTMLInputElement).checked;
		interactiveTableData.forEach((row) => {
			row.checked = checked;
		});
	}
</script>

<!-- Card 1: Custom Tri-State Checkbox -->
<Card titleText="Custom Tri-State Checkbox" subtitleText="Fully styled custom checkboxes with 3 states: unchecked, checked, and indeterminate">

	<Grid>
		<Column size="100" md="50">
			<Heading level={4}>Three States</Heading>
			<div class="d-flex flex-column gap-12">
				<Checkbox id="unchecked-demo" labelText="Unchecked" bind:checked={uncheckedDemo} />
				<Checkbox id="checked-demo" labelText="Checked" bind:checked={checkedDemo} />
				<Checkbox id="indeterminate-demo" labelText="Indeterminate" bind:checked={indeterminateDemo} isIndeterminate={true} />
			</div>
		</Column>
		<Column size="100" md="50">
			<Heading level={4}>Size Variants</Heading>
			<div class="d-flex flex-column gap-12">
				<Checkbox id="size-xs" labelText="Extra Small (xs)" size="xs" bind:checked={sizeXs} />
				<Checkbox id="size-sm" labelText="Small (sm)" size="sm" bind:checked={sizeSm} />
				<Checkbox id="size-default" labelText="Default" bind:checked={sizeDefault} />
				<Checkbox id="size-lg" labelText="Large (lg)" size="lg" bind:checked={sizeLg} />
				<Checkbox id="size-xl" labelText="Extra Large (xl)" size="xl" bind:checked={sizeXl} />
			</div>
		</Column>
		<Column size="100" md="50">
			<Heading level={4}>X Mark Modifier</Heading>
			<div class="d-flex flex-column gap-12">
				<Checkbox id="xmark-xs" labelText="Extra Small with X" size="xs" isXMark bind:checked={xMarkXs} />
				<Checkbox id="xmark-sm" labelText="Small with X" size="sm" isXMark bind:checked={xMarkSm} />
				<Checkbox id="xmark-default" labelText="Default with X" isXMark bind:checked={xMarkDefault} />
				<Checkbox id="xmark-lg" labelText="Large with X" size="lg" isXMark bind:checked={xMarkLg} />
				<Checkbox id="xmark-xl" labelText="Extra Large with X" size="xl" isXMark bind:checked={xMarkXl} />
			</div>
		</Column>
	</Grid>
</Card>

<!-- Card 1b: Custom Glyphs via --base-icon-* -->
<Card
	titleText="Custom Glyphs via --base-icon-*"
	subtitleText="The checkmark and indeterminate dash are SVG masks reading --base-icon-check / --base-icon-indeterminate — the same tokens the web components use. Override those CSS variables (inline, on a wrapper, or in a theme) to swap the glyph without touching the component."
>
	<Grid>
		<Column size="100" md="50">
			<Heading level={4}>Per-checkbox override</Heading>
			<div class="d-flex flex-column gap-12">
				<Checkbox
					id="cg-heart"
					checked
					labelText="Heart glyph"
					style="--base-icon-check: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22black%22%3E%3Cpath d=%22M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z%22/%3E%3C/svg%3E');"
				/>
				<Checkbox
					id="cg-star"
					checked
					labelText="Star glyph"
					style="--base-icon-check: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22black%22%3E%3Cpath d=%22M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.5l7.1-.6z%22/%3E%3C/svg%3E');"
				/>
				<Checkbox
					id="cg-circle"
					checked
					size="lg"
					labelText="Filled circle-check (lg)"
					style="--base-icon-check: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22black%22%3E%3Cpath d=%22M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.1 14.2l-4-4 1.4-1.4 2.6 2.6 5.4-5.4 1.4 1.4-6.8 6.8z%22/%3E%3C/svg%3E');"
				/>
			</div>
		</Column>
		<Column size="100" md="50">
			<Heading level={4}>Group override (wrapper sets both vars)</Heading>
			<CheckboxGroup
				style="--base-icon-check: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22black%22 stroke-width=%223%22 stroke-linecap=%22round%22%3E%3Cpath d=%22M12 5v14M5 12h14%22/%3E%3C/svg%3E'); --base-icon-indeterminate: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22black%22%3E%3Ccircle cx=%2212%22 cy=%2212%22 r=%225%22/%3E%3C/svg%3E');"
			>
				<Checkbox id="cg-plus" checked labelText="Checked → plus glyph" />
				<Checkbox id="cg-dot" isIndeterminate labelText="Indeterminate → dot glyph" />
				<Checkbox id="cg-off" labelText="Unchecked (unaffected)" />
			</CheckboxGroup>
			<Paragraph color="secondary" class="mt-3">Both children inherit the wrapper's <code>--base-icon-*</code> — exactly how a theme would re-skin every checkbox at once.</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Card 2: Select All Pattern -->
<Card titleText="Select All Pattern" subtitleText="Interactive demo showing isIndeterminate state for partial selection">

	<Grid>
		<Column size="100" md="50">
			<div class="d-flex flex-column gap-12">
				<Checkbox
					id="select-all-fruits"
					labelText="Select All Fruits"
					checked={selectAllFruits}
					isIndeterminate={selectAllIndeterminate}
					onchange={handleSelectAllFruits}
					class="font-weight-500"
				/>
				<div class="d-flex flex-column gap-8 ml-10">
					<Checkbox id="fruit-apple" bind:checked={fruits.apple}>
						{#snippet labelSnippet()}
							🍎 Apple
						{/snippet}
					</Checkbox>
					<Checkbox id="fruit-banana" bind:checked={fruits.banana}>
						{#snippet labelSnippet()}
							🍌 Banana
						{/snippet}
					</Checkbox>
					<Checkbox id="fruit-orange" bind:checked={fruits.orange}>
						{#snippet labelSnippet()}
							🍊 Orange
						{/snippet}
					</Checkbox>
					<Checkbox id="fruit-grape" bind:checked={fruits.grape}>
						{#snippet labelSnippet()}
							🍇 Grape
						{/snippet}
					</Checkbox>
				</div>
			</div>
		</Column>
		<Column size="100" md="50">
			<Alert variant="info">
				<strong>How it works:</strong>
				<BasicList class="mt-3 mb-0">
					<li>When <strong>none</strong> are selected → "Select All" is unchecked</li>
					<li>When <strong>some</strong> are selected → "Select All" shows <strong>indeterminate</strong> state (dash)</li>
					<li>When <strong>all</strong> are selected → "Select All" is checked</li>
				</BasicList>
			</Alert>
			<Paragraph color="secondary" class="mt-5">
				<code>checkbox.indeterminate = true</code> is set via JavaScript. The CSS <code>:indeterminate</code> pseudo-class handles the styling.
			</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Card 3: Disabled Checkboxes -->
<Card titleText="Disabled Checkboxes" subtitleText="Disabled state with reduced opacity">

	<div class="d-flex flex-wrap gap-2xl">
		<Checkbox id="disabled-unchecked" labelText="Disabled unchecked" disabled bind:checked={disabledUnchecked} />
		<Checkbox id="disabled-checked" labelText="Disabled checked" disabled bind:checked={disabledChecked} />
		<Checkbox id="disabled-indeterminate" labelText="Disabled indeterminate" disabled isIndeterminate bind:checked={disabledIndeterminate} />
	</div>
</Card>

<hr class="my-8" />
<Heading level={2} class="mb-6">Checkbox Lists</Heading>

<!-- Card 4: Basic Checkbox Lists -->
<Card titleText="Basic Checkbox Lists" subtitleText="Simple vertical checkbox lists with hover effects - full item area is clickable">

	<Grid>
		<Column size="100" md="50">
			<Heading level={4}>Default List</Heading>
			<CheckboxList>
				<CheckboxListItem id="check1" labelText="Option 1" bind:checked={basicOptions.option1} />
				<CheckboxListItem id="check2" labelText="Option 2 (Selected)" bind:checked={basicOptions.option2} />
				<CheckboxListItem id="check3" labelText="Option 3" bind:checked={basicOptions.option3} />
				<CheckboxListItem id="check4" labelText="Option 4 (Disabled)" state="disabled" bind:checked={basicOptions.option4} />
			</CheckboxList>
		</Column>
		<Column size="100" md="50">
			<Heading level={4}>With Descriptions</Heading>
			<CheckboxList>
				<CheckboxListItem
					id="feature1"
					labelText="Email Notifications"
					descriptionText="Receive updates via email"
					bind:checked={features.email}
				/>
				<CheckboxListItem
					id="feature2"
					labelText="SMS Alerts"
					descriptionText="Get urgent alerts via SMS"
					bind:checked={features.sms}
				/>
				<CheckboxListItem
					id="feature3"
					labelText="Push Notifications"
					descriptionText="Browser push notifications"
					bind:checked={features.push}
				/>
			</CheckboxList>
		</Column>
	</Grid>
</Card>

<!-- Card 5: Item States -->
<Card titleText="Item States" subtitleText="Clickable, disabled, and locked states with different visual feedback">

	<Heading level={4}>State Comparison</Heading>
	<CheckboxList variant="bordered">
		<CheckboxListItem id="state1" labelText="Normal clickable option" bind:checked={stateOptions.normal} />
		<CheckboxListItem id="state2" labelText="Disabled - feature not available" state="disabled" bind:checked={stateOptions.disabled} />
		<CheckboxListItem id="state3" labelText="Requires admin permission" state="locked" bind:checked={stateOptions.locked1} />
		<CheckboxListItem id="state4" labelText="Pro feature - upgrade required" state="locked" bind:checked={stateOptions.locked2} />
		<CheckboxListItem id="state5" labelText="Normal selected option" bind:checked={stateOptions.normalSelected} />
	</CheckboxList>

	<Alert variant="info" class="mt-4">
		<small>
			<strong>State differences:</strong><br />
			• <strong>Normal</strong> - Full opacity, pointer cursor, default text color<br />
			• <strong>Disabled</strong> - 50% opacity on entire item, not-allowed cursor, muted color (feature unavailable)<br />
			• <strong>Locked</strong> - 50% opacity on checkbox only, not-allowed cursor, warning color text with 🔒 icon (requires permission)
		</small>
	</Alert>
</Card>

<!-- Card 6: List Variants -->
<Card titleText="List Variants" subtitleText="Different styles for checkbox lists">

	<Grid>
		<Column size="100" md="1-3">
			<Heading level={4}>Compact</Heading>
			<CheckboxList variant="compact">
				<CheckboxListItem id="compact1" labelText="Compact Option 1" bind:checked={compactOptions.compact1} />
				<CheckboxListItem id="compact2" labelText="Compact Option 2" bind:checked={compactOptions.compact2} />
				<CheckboxListItem id="compact3" labelText="Compact Option 3" bind:checked={compactOptions.compact3} />
			</CheckboxList>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={4}>Bordered</Heading>
			<CheckboxList variant="bordered">
				<CheckboxListItem id="bordered1" labelText="Bordered Option 1" bind:checked={borderedOptions.bordered1} />
				<CheckboxListItem id="bordered2" labelText="Bordered Option 2" bind:checked={borderedOptions.bordered2} />
				<CheckboxListItem id="bordered3" labelText="Bordered Option 3" bind:checked={borderedOptions.bordered3} />
			</CheckboxList>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={4}>Striped</Heading>
			<CheckboxList variant="striped">
				<CheckboxListItem id="striped1" labelText="Striped Option 1" bind:checked={stripedOptions.striped1} />
				<CheckboxListItem id="striped2" labelText="Striped Option 2" bind:checked={stripedOptions.striped2} />
				<CheckboxListItem id="striped3" labelText="Striped Option 3" bind:checked={stripedOptions.striped3} />
				<CheckboxListItem id="striped4" labelText="Striped Option 4" bind:checked={stripedOptions.striped4} />
			</CheckboxList>
		</Column>
	</Grid>
</Card>

<!-- Card 7: Checkbox Lists with Actions -->
<Card titleText="Checkbox Lists with Actions" subtitleText="Lists with action buttons for each item">

	<Heading level={4}>Task List</Heading>
	<CheckboxList variant="bordered">
		{#each tasks as task (task.id)}
			<CheckboxListItem id={task.id} labelText={task.label} bind:checked={task.checked}>
				{#snippet actions()}
					<Button size="xs" variant="secondary" isIconOnly onclick={() => editTask(task.id)}>✏️</Button>
					<Button size="xs" variant="danger" isIconOnly onclick={() => deleteTask(task.id)}>🗑️</Button>
				{/snippet}
			</CheckboxListItem>
		{/each}
	</CheckboxList>
</Card>

<!-- Card 8: Alternative Layouts -->
<Card titleText="Alternative Layouts" subtitleText="Inline, grid, and multi-column layouts">

	<Heading level={4}>Inline Layout</Heading>
	<CheckboxList layout="inline">
		<CheckboxListItem id="inline1" labelText="Option A" bind:checked={inlineOptions.optionA} />
		<CheckboxListItem id="inline2" labelText="Option B" bind:checked={inlineOptions.optionB} />
		<CheckboxListItem id="inline3" labelText="Option C" bind:checked={inlineOptions.optionC} />
		<CheckboxListItem id="inline4" labelText="Option D" bind:checked={inlineOptions.optionD} />
	</CheckboxList>

	<Heading level={4} class="mt-6">Grid Layout</Heading>
	<CheckboxList layout="grid">
		<CheckboxListItem id="grid1" labelText="Grid Item 1" bind:checked={gridOptions.grid1} />
		<CheckboxListItem id="grid2" labelText="Grid Item 2" bind:checked={gridOptions.grid2} />
		<CheckboxListItem id="grid3" labelText="Grid Item 3" bind:checked={gridOptions.grid3} />
		<CheckboxListItem id="grid4" labelText="Grid Item 4" bind:checked={gridOptions.grid4} />
	</CheckboxList>

	<Heading level={4} class="mt-6">Two-Column Layout</Heading>
	<CheckboxList layout="2col" variant="bordered">
		<CheckboxListItem id="col2-1" labelText="Column 1 - Item 1" bind:checked={twoColOptions.col21} />
		<CheckboxListItem id="col2-2" labelText="Column 2 - Item 1" bind:checked={twoColOptions.col22} />
		<CheckboxListItem id="col2-3" labelText="Column 1 - Item 2" bind:checked={twoColOptions.col23} />
		<CheckboxListItem id="col2-4" labelText="Column 2 - Item 2" bind:checked={twoColOptions.col24} />
	</CheckboxList>

	<Heading level={4} class="mt-6">Three-Column Layout</Heading>
	<CheckboxList layout="3col" variant="bordered">
		<CheckboxListItem id="col3-1" labelText="Col 1 - Item 1" bind:checked={threeColOptions.col31} />
		<CheckboxListItem id="col3-2" labelText="Col 2 - Item 1" bind:checked={threeColOptions.col32} />
		<CheckboxListItem id="col3-3" labelText="Col 3 - Item 1" bind:checked={threeColOptions.col33} />
		<CheckboxListItem id="col3-4" labelText="Col 1 - Item 2" bind:checked={threeColOptions.col34} />
		<CheckboxListItem id="col3-5" labelText="Col 2 - Item 2" bind:checked={threeColOptions.col35} />
		<CheckboxListItem id="col3-6" labelText="Col 3 - Item 2" bind:checked={threeColOptions.col36} />
	</CheckboxList>
</Card>

<!-- Card 9: Tables with Checkboxes -->
<Card titleText="Tables with Checkboxes" subtitleText="Checkboxes in isTable first column for isRow selection">

	<Table isStriped>
		<thead>
			<tr>
				<th class="pa-table__checkbox-col">
					<CheckboxBox id="select-all" />
				</th>
				<th>Name</th>
				<th>Email</th>
				<th>Status</th>
				<th class="col-auto">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each staticTableData as row (row.id)}
				<tr class:pa-table__row--selected={row.checked}>
					<td class="pa-table__checkbox-col">
						<CheckboxBox checked={row.checked} />
					</td>
					<td>{row.name}</td>
					<td>{row.email}</td>
					<td><Badge variant={row.statusVariant}>{row.status}</Badge></td>
					<td class="col-auto">
						<ButtonGroup>
							<Button size="xs" variant="primary" isIconOnly>👁️</Button>
							<Button size="xs" variant="secondary" isIconOnly>✏️</Button>
							<Button size="xs" variant="danger" isIconOnly>🗑️</Button>
						</ButtonGroup>
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>

<!-- Card 10: Interactive Demo -->
<Card titleText="Interactive Demo" subtitleText="Select-all functionality and row selection">

	<Table isStriped>
		<thead>
			<tr>
				<th class="pa-table__checkbox-col">
					<CheckboxBox id="select-all-demo" checked={interactiveSelectAll} onchange={handleInteractiveSelectAll} />
				</th>
				<th>Product</th>
				<th>SKU</th>
				<th>Price</th>
				<th>Stock</th>
			</tr>
		</thead>
		<tbody>
			{#each interactiveTableData as row (row.id)}
				<tr class:pa-table__row--selected={row.checked}>
					<td class="pa-table__checkbox-col">
						<CheckboxBox bind:checked={row.checked} />
					</td>
					<td>{row.product}</td>
					<td>{row.sku}</td>
					<td>{row.price}</td>
					<td><Badge variant={row.stockVariant}>{row.stock}</Badge></td>
				</tr>
			{/each}
		</tbody>
	</Table>

	{#snippet footer()}
		<div id="selection-info" class="text-sm text-secondary">
			{interactiveSelectedCount} item{interactiveSelectedCount !== 1 ? 's' : ''} selected
		</div>
	{/snippet}
</Card>

<!-- CSS Classes Reference -->
<Card titleText="CSS Classes Reference">
	<Heading level={4}>Custom Checkbox Component</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><code>pa-checkbox</code> - Base custom checkbox (wraps input + box + label)</li>
		<li><code>pa-checkbox__box</code> - Visual checkbox element</li>
		<li><code>pa-checkbox__label</code> - Label text</li>
		<li><code>pa-checkbox--xs</code> - Extra small size</li>
		<li><code>pa-checkbox--sm</code> - Small size</li>
		<li><code>pa-checkbox--lg</code> - Large size</li>
		<li><code>pa-checkbox--xl</code> - Extra large size</li>
		<li><code>pa-checkbox--x</code> - X mark instead of checkmark</li>
		<li><code>pa-checkbox--disabled</code> - Disabled appearance</li>
	</BasicList>

	<Heading level={4} class="mt-4">Checkbox List Container</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><code>pa-checkbox-list</code> - Base list container (vertical)</li>
		<li><code>pa-checkbox-list--compact</code> - Reduced padding</li>
		<li><code>pa-checkbox-list--bordered</code> - Border around list</li>
		<li><code>pa-checkbox-list--striped</code> - Zebra striping</li>
		<li><code>pa-checkbox-list--inline</code> - Horizontal wrapping layout</li>
		<li><code>pa-checkbox-list--grid</code> - Auto-fill grid layout</li>
		<li><code>pa-checkbox-list--2col</code> - Two-column grid</li>
		<li><code>pa-checkbox-list--3col</code> - Three-column grid</li>
	</BasicList>

	<Heading level={4} class="mt-4">Checkbox List Items</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><code>pa-checkbox-list__item</code> - List item</li>
		<li><code>pa-checkbox-list__item--selected</code> - Selected state</li>
		<li><code>pa-checkbox-list__item--disabled</code> - Disabled (feature unavailable)</li>
		<li><code>pa-checkbox-list__item--locked</code> - Locked (requires permission)</li>
		<li><code>pa-checkbox-list__label</code> - Clickable label wrapper</li>
		<li><code>pa-checkbox-list__text</code> - Text content</li>
		<li><code>pa-checkbox-list__description</code> - Secondary description</li>
		<li><code>pa-checkbox-list__actions</code> - Action buttons container</li>
	</BasicList>

	<Heading level={4} class="mt-4">Table Checkboxes</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><code>pa-table__checkbox-col</code> - Checkbox column (minimal width)</li>
		<li><code>pa-table__row--selected</code> - Selected row highlight</li>
	</BasicList>

	<Heading level={4} class="mt-4">Checkbox States (via input)</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><code>:checked</code> - Checked state (checkmark)</li>
		<li><code>:indeterminate</code> - Indeterminate state (dash) - set via JS</li>
		<li><code>:disabled</code> - Disabled state</li>
	</BasicList>
</Card>

<script lang="ts">
	import { Heading, Paragraph, Text, Code, Card, Grid, Column, FormGroup, FormLabel, FormHelp, Input, NumberInput, DateInput, FileInput, RangeInput, ColorInput, Textarea, Select, Checkbox, CheckboxGroup, Radio, RadioGroup, InputGroup, InputGroupPrepend, InputGroupAppend, Button, CodeBlock, BasicList } from '@keenmate/svelte-pure-admin';

	let isSearchMode = $state(false);
</script>

<Paragraph>Comprehensive showcase of all input types, states, sizes, and variations available in the framework.</Paragraph>

<!-- Text Inputs -->
<Card titleText="Text Inputs">
	<Grid>
		<!-- States -->
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Normal</FormLabel>
				<Input placeholder="Enter text" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Disabled</FormLabel>
				<Input placeholder="Disabled" disabled />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Readonly</FormLabel>
				<Input value="Read only value" readonly />
			</FormGroup>
		</Column>

		<!-- Sizes -->
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Extra Small</FormLabel>
				<Input size="xs" placeholder="XS" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Small</FormLabel>
				<Input size="sm" placeholder="Small" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Default</FormLabel>
				<Input placeholder="Default" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Large</FormLabel>
				<Input size="lg" placeholder="Large" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Extra Large</FormLabel>
				<Input size="xl" placeholder="XL" />
			</FormGroup>
		</Column>

		<!-- Validation States -->
		<Column size="100" md="1-3">
			<FormGroup state="success">
				<FormLabel>Success</FormLabel>
				<Input value="Valid input" />
				<FormHelp variant="success">Looks good!</FormHelp>
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup state="warning">
				<FormLabel>Warning</FormLabel>
				<Input value="Warning input" />
				<FormHelp variant="warning">Please check this field</FormHelp>
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup state="error">
				<FormLabel>Error</FormLabel>
				<Input value="Invalid input" />
				<FormHelp variant="error">This field is required</FormHelp>
			</FormGroup>
		</Column>

		<!-- Theme Color Variants -->
		<Column size="100" class="mt-4">
			<FormLabel class="mb-2"><strong>Theme Color Variants</strong> (using --pc-color-* CSS variables)</FormLabel>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Color 1</FormLabel>
				<Input themeColor={1} value="Color 1 input" />
				<FormHelp themeColor={1}>Colored help text</FormHelp>
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Color 2</FormLabel>
				<Input themeColor={2} value="Color 2 input" />
				<FormHelp themeColor={2}>Colored help text</FormHelp>
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Color 3</FormLabel>
				<Input themeColor={3} value="Color 3 input" />
				<FormHelp>Gray help text (no color class)</FormHelp>
			</FormGroup>
		</Column>
	</Grid>
</Card>

<!-- Input Groups -->
<Card titleText="Input Groups (Prepend/Append)">
	<Grid>
		<!-- Prepend -->
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>With Prepend</FormLabel>
				<InputGroup>
					<InputGroupPrepend>@</InputGroupPrepend>
					<Input placeholder="username" />
				</InputGroup>
			</FormGroup>
		</Column>

		<!-- Append -->
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>With Append</FormLabel>
				<InputGroup>
					<Input placeholder="0.00" />
					<InputGroupAppend>.00</InputGroupAppend>
				</InputGroup>
			</FormGroup>
		</Column>

		<!-- Both -->
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>With Both (prepend uses <Code>wr-3</Code> for fixed width)</FormLabel>
				<InputGroup>
					<InputGroupPrepend class="wr-3">$</InputGroupPrepend>
					<Input placeholder="0.00" />
					<InputGroupAppend>.00</InputGroupAppend>
				</InputGroup>
			</FormGroup>
		</Column>

		<!-- Button Append -->
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>With Button</FormLabel>
				<InputGroup>
					<Input placeholder="Search..." />
					<Button variant="primary" isInputGroupButton>Go</Button>
				</InputGroup>
			</FormGroup>
		</Column>

		<!-- Multiple Prepends/Appends -->
		<Column size="100">
			<FormGroup>
				<FormLabel>Multiple Prepends & Appends</FormLabel>
				<InputGroup>
					<InputGroupPrepend>https://</InputGroupPrepend>
					<InputGroupPrepend>www.</InputGroupPrepend>
					<Input placeholder="example" />
					<InputGroupAppend>.com</InputGroupAppend>
					<InputGroupAppend>🔗</InputGroupAppend>
				</InputGroup>
			</FormGroup>
		</Column>

		<!-- Toggle Mode Button (Filter / Search) + Go -->
		<Column size="100">
			<FormGroup>
				<FormLabel>Toggle Mode Button (Filter / Search) + Go</FormLabel>
				<InputGroup>
					<Button
						variant="primary"
						isInputGroupButton
						titleText={isSearchMode ? 'Search mode — click to switch to Filter' : 'Filter mode — click to switch to Search'}
						onclick={() => isSearchMode = !isSearchMode}
					>
						<span class="pa-icon {isSearchMode ? 'pa-icon--search' : 'pa-icon--filter'}" aria-hidden="true"></span>
					</Button>
					<Input placeholder={isSearchMode ? 'Search...' : 'Filter...'} />
					<Button variant="primary" isInputGroupButton>Go</Button>
				</InputGroup>
				<FormHelp>Click the icon button to switch between Filter and Search modes</FormHelp>
			</FormGroup>
		</Column>

		<!-- Tip -->
		<Column size="100" class="mt-3">
			<Text variant="secondary" class="text-sm"><strong>Tip:</strong> Use width utilities (<Code>wr-*</Code> for rem-based, <Code>w-*</Code> for percentage-based) on prepend/append elements to control their width.</Text>
		</Column>
	</Grid>
</Card>

<!-- Input Types -->
<Card titleText="Input Types">
	<Grid>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Email</FormLabel>
				<Input type="email" placeholder="user@example.com" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Password</FormLabel>
				<Input type="password" placeholder="••••••••" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Number</FormLabel>
				<NumberInput placeholder="0" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Tel</FormLabel>
				<Input type="tel" placeholder="+1 (555) 123-4567" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>URL</FormLabel>
				<Input type="url" placeholder="https://example.com" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Search</FormLabel>
				<Input type="search" placeholder="Search..." />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Date</FormLabel>
				<DateInput type="date" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Time</FormLabel>
				<DateInput type="time" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>DateTime</FormLabel>
				<DateInput type="datetime-local" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Month</FormLabel>
				<DateInput type="month" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Week</FormLabel>
				<DateInput type="week" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Color</FormLabel>
				<ColorInput value="#ff0000" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>File</FormLabel>
				<FileInput />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Range</FormLabel>
				<RangeInput />
			</FormGroup>
		</Column>
	</Grid>
</Card>

<!-- Selects -->
<Card titleText="Select Dropdowns">
	<Grid>
		<!-- States -->
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Normal</FormLabel>
				<Select>
					<option>Choose option...</option>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
				</Select>
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Disabled</FormLabel>
				<Select disabled>
					<option>Disabled</option>
				</Select>
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Multiple</FormLabel>
				<!-- Multiple selects use the native element (blessed shape — matches the
				     core snippet + keen demo); the Select component covers single selects. -->
				<select class="pa-select" multiple>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
					<option>Option 4</option>
				</select>
			</FormGroup>
		</Column>

		<!-- Sizes -->
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Extra Small</FormLabel>
				<Select size="xs">
					<option>XS</option>
				</Select>
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Small</FormLabel>
				<Select size="sm">
					<option>Small</option>
				</Select>
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Default</FormLabel>
				<Select>
					<option>Default</option>
				</Select>
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Large</FormLabel>
				<Select size="lg">
					<option>Large</option>
				</Select>
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Extra Large</FormLabel>
				<Select size="xl">
					<option>XL</option>
				</Select>
			</FormGroup>
		</Column>
	</Grid>
</Card>

<!-- Textareas -->
<Card titleText="Textareas">
	<Grid>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Normal</FormLabel>
				<Textarea placeholder="Enter your message..." />
			</FormGroup>
		</Column>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Disabled</FormLabel>
				<Textarea placeholder="Disabled" disabled />
			</FormGroup>
		</Column>

		<!-- Sizes -->
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Extra Small</FormLabel>
				<Textarea size="xs" placeholder="XS" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Small</FormLabel>
				<Textarea size="sm" placeholder="Small" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Default</FormLabel>
				<Textarea placeholder="Default" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Large</FormLabel>
				<Textarea size="lg" placeholder="Large" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Extra Large</FormLabel>
				<Textarea size="xl" placeholder="XL" />
			</FormGroup>
		</Column>
	</Grid>
</Card>

<!-- Checkboxes & Radios -->
<Card titleText="Checkboxes & Radios">
	<Grid>
		<!-- Checkboxes -->
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Checkboxes</FormLabel>
				<CheckboxGroup>
					<Checkbox id="input-check1" checked labelText="Option 1 (checked)" />
					<Checkbox id="input-check2" labelText="Option 2" />
					<Checkbox id="input-check3" disabled labelText="Option 3 (disabled)" />
				</CheckboxGroup>
			</FormGroup>
		</Column>

		<!-- Radios -->
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Radio Buttons</FormLabel>
				<RadioGroup>
					<Radio name="radio-demo" value="a" labelText="Option A (selected)" />
					<Radio name="radio-demo" value="b" labelText="Option B" />
					<Radio name="radio-demo" value="c" disabled labelText="Option C (disabled)" />
				</RadioGroup>
			</FormGroup>
		</Column>

		<!-- Checkbox Sizes -->
		<Column size="100">
			<FormGroup>
				<FormLabel>Checkbox Sizes</FormLabel>
				<CheckboxGroup>
					<Checkbox id="size-check-xs" size="xs" checked labelText="Extra Small" />
					<Checkbox id="size-check-sm" size="sm" checked labelText="Small" />
					<Checkbox id="size-check-default" checked labelText="Default" />
					<Checkbox id="size-check-lg" size="lg" checked labelText="Large" />
					<Checkbox id="size-check-xl" size="xl" checked labelText="Extra Large" />
				</CheckboxGroup>
			</FormGroup>
		</Column>

		<!-- Radio Sizes -->
		<Column size="100">
			<FormGroup>
				<FormLabel>Radio Sizes</FormLabel>
				<RadioGroup>
					<Radio name="size-demo" value="xs" size="xs" labelText="Extra Small" />
					<Radio name="size-demo" value="sm" size="sm" labelText="Small" />
					<Radio name="size-demo" value="default" labelText="Default" />
					<Radio name="size-demo" value="lg" size="lg" labelText="Large" />
					<Radio name="size-demo" value="xl" size="xl" labelText="Extra Large" />
				</RadioGroup>
			</FormGroup>
		</Column>
	</Grid>
</Card>

<!-- Width Variations -->
<Card titleText="Width Variations">
	<FormGroup>
		<FormLabel>Auto Width (inline)</FormLabel>
		<Input class="w-auto d-inline-block" placeholder="Auto width" />
	</FormGroup>
	<FormGroup>
		<FormLabel>25% Width</FormLabel>
		<Input class="w-25" placeholder="25%" />
	</FormGroup>
	<FormGroup>
		<FormLabel>50% Width</FormLabel>
		<Input class="w-50" placeholder="50%" />
	</FormGroup>
	<FormGroup>
		<FormLabel>75% Width</FormLabel>
		<Input class="w-75" placeholder="75%" />
	</FormGroup>
	<FormGroup>
		<FormLabel>100% Width (full width)</FormLabel>
		<Input class="w-100" placeholder="100%" />
	</FormGroup>
</Card>

<!-- Code Examples -->
<Card titleText="Code Examples">
	<Grid>
		<Column size="100" md="50">
			<h4 class="mb-2">Basic Input with Sizes</h4>
			<CodeBlock>{`<FormGroup>
  <FormLabel>Label</FormLabel>
  <Input placeholder="Enter text" />
  <FormHelp>Help text</FormHelp>
</FormGroup>

<!-- Sizes: xs, sm, (default), lg, xl -->
<Input size="xs" placeholder="Extra Small" />
<Input size="sm" placeholder="Small" />
<Input placeholder="Default" />
<Input size="lg" placeholder="Large" />
<Input size="xl" placeholder="Extra Large" />`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Validation States</h4>
			<CodeBlock>{`<!-- Success state -->
<FormGroup state="success">
  <FormLabel>Valid Input</FormLabel>
  <Input value="Correct value" />
  <FormHelp>Looks good!</FormHelp>
</FormGroup>

<!-- Warning state -->
<FormGroup state="warning">
  <FormLabel>Warning</FormLabel>
  <Input value="Check this" />
  <FormHelp>Please review</FormHelp>
</FormGroup>

<!-- Error state -->
<FormGroup state="error">
  <FormLabel>Invalid</FormLabel>
  <Input value="Wrong value" />
  <FormHelp>This field is required</FormHelp>
</FormGroup>`}</CodeBlock>
		</Column>
	</Grid>

	<h4 class="mb-2 mt-4">Input Groups (Prepend/Append)</h4>
	<CodeBlock>{`<!-- With prepend -->
<InputGroup>
  <InputGroupPrepend>@</InputGroupPrepend>
  <Input placeholder="username" />
</InputGroup>

<!-- With append -->
<InputGroup>
  <Input placeholder="0.00" />
  <InputGroupAppend>.00</InputGroupAppend>
</InputGroup>

<!-- With both + button -->
<InputGroup>
  <InputGroupPrepend>$</InputGroupPrepend>
  <Input placeholder="Amount" />
  <InputGroupAppend>.00</InputGroupAppend>
  <Button variant="primary" isInputGroupButton>Go</Button>
</InputGroup>

<!-- Toggle Mode Button (Filter / Search) + Go -->
<InputGroup>
  <Button variant="primary" isInputGroupButton onclick={toggleMode}>
    <span class="pa-icon {isSearch ? 'pa-icon--search' : 'pa-icon--filter'}" aria-hidden="true"></span>
  </Button>
  <Input placeholder={isSearch ? 'Search...' : 'Filter...'} />
  <Button variant="primary" isInputGroupButton>Go</Button>
</InputGroup>

<!-- Multiple prepends/appends -->
<InputGroup>
  <InputGroupPrepend>https://</InputGroupPrepend>
  <InputGroupPrepend>www.</InputGroupPrepend>
  <Input placeholder="example" />
  <InputGroupAppend>.com</InputGroupAppend>
</InputGroup>`}</CodeBlock>

	<Grid class="mt-4">
		<Column size="100" md="50">
			<h4 class="mb-2">Select & Textarea</h4>
			<CodeBlock>{`<!-- Select dropdown -->
<Select>
  <option>Choose...</option>
  <option>Option 1</option>
  <option>Option 2</option>
</Select>

<!-- Multiple select (use native element) -->
<select class="pa-select" multiple>
  <option>Option 1</option>
  <option>Option 2</option>
</select>

<!-- Textarea -->
<Textarea placeholder="Enter message..." />
<Textarea rows={5} />`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Checkboxes & Radios</h4>
			<CodeBlock>{`<!-- Checkbox group -->
<CheckboxGroup>
  <Checkbox labelText="Option 1" checked />
  <Checkbox labelText="Option 2" />
  <Checkbox labelText="Disabled" disabled />
</CheckboxGroup>

<!-- Radio group -->
<RadioGroup name="demo">
  <Radio labelText="Option A" checked />
  <Radio labelText="Option B" />
  <Radio labelText="Disabled" disabled />
</RadioGroup>

<!-- Sizes: xs, sm, (default), lg, xl -->
<Checkbox size="sm" labelText="Small" />
<Radio size="lg" labelText="Large" />`}</CodeBlock>
		</Column>
	</Grid>
</Card>

<!-- CSS Classes Reference -->
<Card titleText="CSS Classes Reference">
	<Heading level={4}>Text Inputs</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-input</Code> - Base input styling</li>
		<li><Code>pa-input--xs</Code> - Extra small input</li>
		<li><Code>pa-input--sm</Code> - Small input</li>
		<li><Code>pa-input--lg</Code> - Large input</li>
		<li><Code>pa-input--xl</Code> - Extra large input</li>
	</BasicList>

	<Heading level={4} class="mt-4">Select Dropdowns</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-select</Code> - Base select styling</li>
		<li><Code>pa-select--xs</Code> - Extra small select</li>
		<li><Code>pa-select--sm</Code> - Small select</li>
		<li><Code>pa-select--lg</Code> - Large select</li>
		<li><Code>pa-select--xl</Code> - Extra large select</li>
	</BasicList>

	<Heading level={4} class="mt-4">Textareas</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-textarea</Code> - Base textarea styling</li>
		<li><Code>pa-textarea--xs</Code> - Extra small textarea</li>
		<li><Code>pa-textarea--sm</Code> - Small textarea</li>
		<li><Code>pa-textarea--lg</Code> - Large textarea</li>
		<li><Code>pa-textarea--xl</Code> - Extra large textarea</li>
	</BasicList>

	<Heading level={4} class="mt-4">Input Groups</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-input-group</Code> - Container for input with addons</li>
		<li><Code>pa-input-group__prepend</Code> - Addon before input</li>
		<li><Code>pa-input-group__append</Code> - Addon after input</li>
		<li><Code>pa-input-group__button</Code> - Button addon</li>
		<li><Code>pa-input-group--xs</Code> - Extra small input group</li>
		<li><Code>pa-input-group--sm</Code> - Small input group</li>
		<li><Code>pa-input-group--lg</Code> - Large input group</li>
		<li><Code>pa-input-group--xl</Code> - Extra large input group</li>
	</BasicList>

	<Heading level={4} class="mt-4">Form Layout</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-form</Code> - Form container with label styling</li>
		<li><Code>pa-form-group</Code> - Form field container with spacing</li>
		<li><Code>pa-form-group--horizontal</Code> - Horizontal label/input layout</li>
		<li><Code>pa-form-actions</Code> - Container for form buttons</li>
	</BasicList>

	<Heading level={4} class="mt-4">Validation States (on form-group)</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-form-group--success</Code> - Success state (green border)</li>
		<li><Code>pa-form-group--warning</Code> - Warning state (yellow border)</li>
		<li><Code>pa-form-group--error</Code> - Error state (red border)</li>
	</BasicList>

	<Heading level={4} class="mt-4">Validation States (on input)</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-input--success</Code>, <Code>pa-select--success</Code>, <Code>pa-textarea--success</Code> - Success state</li>
		<li><Code>pa-input--warning</Code>, <Code>pa-select--warning</Code>, <Code>pa-textarea--warning</Code> - Warning state</li>
		<li><Code>pa-input--error</Code>, <Code>pa-select--error</Code>, <Code>pa-textarea--error</Code> - Error state</li>
	</BasicList>

	<Heading level={4} class="mt-4">Theme Color Variants (on input)</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-input--color-1</Code> through <Code>pa-input--color-9</Code> - Theme color slots</li>
		<li><Code>pa-select--color-1</Code> through <Code>pa-select--color-9</Code> - Theme color slots</li>
		<li><Code>pa-textarea--color-1</Code> through <Code>pa-textarea--color-9</Code> - Theme color slots</li>
	</BasicList>

	<Heading level={4} class="mt-4">Help Text</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-form-help</Code> - Help text below input</li>
		<li><Code>pa-form-help--success</Code> - Success colored help text</li>
		<li><Code>pa-form-help--warning</Code> - Warning colored help text</li>
		<li><Code>pa-form-help--error</Code> - Error colored help text</li>
		<li><Code>pa-form-help--color-1</Code> through <Code>pa-form-help--color-9</Code> - Theme color slots</li>
	</BasicList>

	<Heading level={4} class="mt-4">Checkboxes</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-checkbox-group</Code> - Container for multiple checkboxes</li>
		<li><Code>pa-checkbox</Code> - Checkbox wrapper (label element)</li>
		<li><Code>pa-checkbox__box</Code> - Custom checkbox visual</li>
		<li><Code>pa-checkbox__label</Code> - Checkbox label text</li>
		<li><Code>pa-checkbox--xs</Code> - Extra small checkbox</li>
		<li><Code>pa-checkbox--sm</Code> - Small checkbox</li>
		<li><Code>pa-checkbox--lg</Code> - Large checkbox</li>
		<li><Code>pa-checkbox--xl</Code> - Extra large checkbox</li>
		<li><Code>pa-checkbox--x</Code> - X mark instead of checkmark</li>
		<li><Code>pa-checkbox--disabled</Code> - Disabled state</li>
	</BasicList>

	<Heading level={4} class="mt-4">Radio Buttons</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-radio-group</Code> - Container for multiple radios</li>
		<li><Code>pa-radio</Code> - Radio button wrapper (label element)</li>
		<li><Code>pa-radio__label</Code> - Radio label text</li>
		<li><Code>pa-radio--xs</Code> - Extra small radio</li>
		<li><Code>pa-radio--sm</Code> - Small radio</li>
		<li><Code>pa-radio--lg</Code> - Large radio</li>
		<li><Code>pa-radio--xl</Code> - Extra large radio</li>
	</BasicList>
</Card>

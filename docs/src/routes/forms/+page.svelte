<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Card,
		TableCard,
		Form,
		FormGroup,
		FormLabel,
		FormHelp,
		Input,
		NumberInput,
		DateInput,
		Textarea,
		Select,
		Checkbox,
		CheckboxGroup,
		Radio,
		RadioGroup,
		InputGroup,
		InputGroupPrepend,
		InputGroupAppend,
		Button,
		ButtonGroup,
		Callout,
		Grid,
		Column,
		Table,
		Code,
		Paragraph
	} from '@keenmate/svelte-pure-admin';

	// Form state bindings
	let textInput = $state('');
	let emailInput = $state('');
	let passwordInput = $state('');
	let numberInput = $state<number | null>(null);
	let basicSelect = $state('');
	let dateInput = $state('');
	let textareaValue = $state('');

	// Contact form
	let firstName = $state('');
	let lastName = $state('');
	let address = $state('');

	// Quick settings
	let settingName = $state('');
	let notificationPref = $state('');

	// Three column layout
	let fname = $state('');
	let lname = $state('');
	let email3 = $state('');
	let phone = $state('');
	let country = $state('United States');
	let zip = $state('');

	// Input groups
	let prependInput = $state('');
	let appendInput = $state('');
	let bothInput = $state('');
	let buttonAppend = $state('');
	let prependButton = $state('');
	let appendButton = $state('');
	let buttonAppendInput = $state(1);
	let fullGroup = $state('');
	let quantityInput = $state(1);

	// Form states
	let readonlyInput = $state('Read only value');
	let helpInput = $state('');
	let errorInput = $state('');
	let successInput = $state('Valid input');

	// Checkboxes
	let check1 = $state(true);
	let check2 = $state(false);

	// Radios
	let radioGroup = $state('a');
	let radioSizes = $state('xs');

	// Tri-state demo
	let twoState = $state(true);
	let triCycle = $state(0); // 0 unchecked · 1 checked · 2 indeterminate
	const triChecked = $derived(triCycle === 1);
	const triIndeterminate = $derived(triCycle === 2);
	function cycleTri() {
		triCycle = (triCycle + 1) % 3;
	}

	// Checkbox sizes
	let checkXs = $state(true);
	let checkSm = $state(true);
	let checkDefault = $state(true);
	let checkLg = $state(true);
	let checkXl = $state(true);

	// Label position — radio groups
	let rlEnd = $state('1');
	let rlStart = $state('1');
	let rlTop = $state('1');

	// Orientation & required — radio groups
	let radioHoriz = $state('low');
	let reqPriority = $state('');

	// Horizontal form
	let hFname = $state('');
	let hLname = $state('');
	let hEmail = $state('');
	let hPhone = $state('');
	let hDept = $state('');
	let hTitle = $state('');
	let hAddress = $state('');
	let hCity = $state('');
	let hZip = $state('');

	// Live size measurement — mirrors the vanilla demo's inline script that
	// reads the rendered input/button offsetHeight per row of the sizes table.
	let sizesRef: HTMLElement;
	let measured = $state<{ input: string; button: string }[]>([]);
	onMount(() => {
		const rows = sizesRef.querySelectorAll('tbody tr');
		measured = Array.from(rows).map((row) => {
			const input = row.querySelector('.pa-input') as HTMLElement | null;
			const button = row.querySelector('.pa-btn') as HTMLElement | null;
			return {
				input: input ? `${input.offsetHeight}px` : '-',
				button: button ? `${button.offsetHeight}px` : '-'
			};
		});
	});
</script>

<Paragraph>Complete set of form elements with various styles and states for data input.</Paragraph>

<!-- Input Sizes Reference -->
<TableCard titleText="Input Sizes Reference" isScrollable>
	<div bind:this={sizesRef}>
		<Table isStriped>
			<thead>
				<tr>
					<th>Size</th>
					<th>Class</th>
					<th>Font Size</th>
					<th>Padding (v/h)</th>
					<th>Input + Button</th>
					<th>Input Height</th>
					<th>Button Height</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><strong>XS</strong></td>
					<td><Code>--xs</Code></td>
					<td>1.2rem (12px)</td>
					<td>0.6rem / 0.8rem</td>
					<td>
						<div class="d-flex align-items-center gap-sm">
							<div style="width: 120px;"><Input type="text" size="xs" placeholder="Extra small" /></div>
							<Button variant="primary" size="xs">Submit</Button>
						</div>
					</td>
					<td>{measured[0]?.input ?? '-'}</td>
					<td>{measured[0]?.button ?? '-'}</td>
				</tr>
				<tr>
					<td><strong>SM</strong></td>
					<td><Code>--sm</Code></td>
					<td>1.4rem (14px)</td>
					<td>0.8rem / 0.8rem</td>
					<td>
						<div class="d-flex align-items-center gap-sm">
							<div style="width: 120px;"><Input type="text" size="sm" placeholder="Small" /></div>
							<Button variant="primary" size="sm">Submit</Button>
						</div>
					</td>
					<td>{measured[1]?.input ?? '-'}</td>
					<td>{measured[1]?.button ?? '-'}</td>
				</tr>
				<tr>
					<td><strong>Default</strong></td>
					<td>(none)</td>
					<td>1.4rem (14px)</td>
					<td>0.8rem / 0.8rem</td>
					<td>
						<div class="d-flex align-items-center gap-sm">
							<div style="width: 120px;"><Input type="text" placeholder="Default" /></div>
							<Button variant="primary">Submit</Button>
						</div>
					</td>
					<td>{measured[2]?.input ?? '-'}</td>
					<td>{measured[2]?.button ?? '-'}</td>
				</tr>
				<tr>
					<td><strong>LG</strong></td>
					<td><Code>--lg</Code></td>
					<td>1.6rem (16px)</td>
					<td>0.8rem / 0.8rem</td>
					<td>
						<div class="d-flex align-items-center gap-sm">
							<div style="width: 120px;"><Input type="text" size="lg" placeholder="Large" /></div>
							<Button variant="primary" size="lg">Submit</Button>
						</div>
					</td>
					<td>{measured[3]?.input ?? '-'}</td>
					<td>{measured[3]?.button ?? '-'}</td>
				</tr>
				<tr>
					<td><strong>XL</strong></td>
					<td><Code>--xl</Code></td>
					<td>1.8rem (18px)</td>
					<td>0.8rem / 0.8rem</td>
					<td>
						<div class="d-flex align-items-center gap-sm">
							<div style="width: 120px;"><Input type="text" size="xl" placeholder="Extra large" /></div>
							<Button variant="primary" size="xl">Submit</Button>
						</div>
					</td>
					<td>{measured[4]?.input ?? '-'}</td>
					<td>{measured[4]?.button ?? '-'}</td>
				</tr>
			</tbody>
		</Table>
	</div>
</TableCard>

<!-- Form with Buttons in Header -->
<Card titleText="User Profile">
	{#snippet headerActions()}
		<Button variant="secondary" size="sm">
			{#snippet icon()}×{/snippet}
			Cancel
		</Button>
		<Button variant="success" size="sm">
			{#snippet icon()}✓{/snippet}
			Save
		</Button>
	{/snippet}

	<Form>
		<Grid>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="text-input">Text Input</FormLabel>
					<Input id="text-input" placeholder="Enter text" required bind:value={textInput} />
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="email-input">Email Input</FormLabel>
					<Input type="email" id="email-input" placeholder="user@example.com" required bind:value={emailInput} />
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="password-input">Password Input</FormLabel>
					<Input type="password" id="password-input" placeholder="Enter password" bind:value={passwordInput} />
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="number-input">Number Input</FormLabel>
					<NumberInput id="number-input" placeholder="0" bind:value={numberInput} />
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="basic-select">Select Dropdown</FormLabel>
					<Select id="basic-select" required bind:value={basicSelect}>
						<option>Choose an option...</option>
						<option>Option 1</option>
						<option>Option 2</option>
						<option>Option 3</option>
					</Select>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="date-input">Date Input</FormLabel>
					<DateInput id="date-input" bind:value={dateInput} />
				</FormGroup>
			</Column>

			<Column size="100">
				<FormGroup>
					<FormLabel for="textarea">Textarea (Full Width)</FormLabel>
					<Textarea id="textarea" placeholder="Enter your message here..." required bind:value={textareaValue} />
				</FormGroup>
			</Column>
		</Grid>
	</Form>
</Card>

<!-- Form with Buttons in Footer -->
<Card titleText="Contact Information">
	<Form>
		<Grid>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="fname2">First Name</FormLabel>
					<Input id="fname2" placeholder="John" bind:value={firstName} />
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="lname2">Last Name</FormLabel>
					<Input id="lname2" placeholder="Doe" bind:value={lastName} />
				</FormGroup>
			</Column>

			<Column size="100">
				<FormGroup>
					<FormLabel for="address">Address</FormLabel>
					<Input id="address" placeholder="123 Main St" bind:value={address} />
				</FormGroup>
			</Column>
		</Grid>
	</Form>

	{#snippet footer()}
		<ButtonGroup>
			<Button variant="secondary">
				{#snippet icon()}←{/snippet}
				Back
			</Button>
			<Button variant="light">
				{#snippet icon()}🗑{/snippet}
				Delete
			</Button>
		</ButtonGroup>
		<ButtonGroup class="ml-auto">
			<Button variant="secondary">Cancel</Button>
			<Button variant="success">
				{#snippet icon()}✓{/snippet}
				Save Changes
			</Button>
		</ButtonGroup>
	{/snippet}
</Card>

<!-- Form with Buttons in Body -->
<Card titleText="Quick Settings">
	<Form>
		<FormGroup>
			<FormLabel for="setting1">Setting Name</FormLabel>
			<Input id="setting1" placeholder="Enter value" bind:value={settingName} />
		</FormGroup>

		<FormGroup>
			<FormLabel for="setting2">Notification Preference</FormLabel>
			<Select id="setting2" bind:value={notificationPref}>
				<option>All notifications</option>
				<option>Important only</option>
				<option>None</option>
			</Select>
		</FormGroup>

		<ButtonGroup>
			<Button variant="secondary">Cancel</Button>
			<Button variant="primary">
				{#snippet icon()}📄{/snippet}
				Preview
			</Button>
			<Button variant="success">
				{#snippet icon()}✓{/snippet}
				Apply
			</Button>
		</ButtonGroup>
	</Form>
</Card>

<!-- Three Column Compact Form -->
<Card titleText="Compact Three Column Layout">
	<Form>
		<Grid>
			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="fname">First Name</FormLabel>
					<Input id="fname" placeholder="John" bind:value={fname} />
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="lname">Last Name</FormLabel>
					<Input id="lname" placeholder="Doe" bind:value={lname} />
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="email3">Email</FormLabel>
					<Input type="email" id="email3" placeholder="john@example.com" bind:value={email3} />
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="phone">Phone</FormLabel>
					<Input type="tel" id="phone" placeholder="+1 234 567 8900" bind:value={phone} />
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="country">Country</FormLabel>
					<Select id="country" bind:value={country}>
						<option>United States</option>
						<option>Canada</option>
						<option>United Kingdom</option>
					</Select>
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="zip">ZIP Code</FormLabel>
					<Input id="zip" placeholder="12345" bind:value={zip} />
				</FormGroup>
			</Column>
		</Grid>
	</Form>
</Card>

<!-- Input Groups with Icons -->
<Card titleText="Input Groups">
	<Form>
		<Grid>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="prepend-input">Input with Prepended Text</FormLabel>
					<InputGroup>
						<InputGroupPrepend>@</InputGroupPrepend>
						<Input id="prepend-input" placeholder="username" bind:value={prependInput} />
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="append-input">Input with Appended Text</FormLabel>
					<InputGroup>
						<Input id="append-input" placeholder="0.00" bind:value={appendInput} />
						<InputGroupAppend>USD</InputGroupAppend>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="both-input">Input with Both Prepend and Append</FormLabel>
					<InputGroup>
						<InputGroupPrepend>$</InputGroupPrepend>
						<Input id="both-input" placeholder="0.00" bind:value={bothInput} />
						<InputGroupAppend>.00</InputGroupAppend>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="button-append">Input with Button</FormLabel>
					<InputGroup>
						<Input id="button-append" placeholder="Search..." bind:value={buttonAppend} />
						<Button variant="primary" isInputGroupButton>Search</Button>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="prepend-button">Prepend + Input + Button</FormLabel>
					<InputGroup>
						<InputGroupPrepend>🔍</InputGroupPrepend>
						<Input id="prepend-button" placeholder="Search..." bind:value={prependButton} />
						<Button variant="primary" isInputGroupButton>Go</Button>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="append-button">Input + Append + Button</FormLabel>
					<InputGroup>
						<Input id="append-button" placeholder="Enter amount" bind:value={appendButton} />
						<InputGroupAppend>USD</InputGroupAppend>
						<Button variant="success" isInputGroupButton>Convert</Button>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="button-append-input">Button + Input + Append</FormLabel>
					<InputGroup>
						<Button variant="secondary" isInputGroupButton>-</Button>
						<NumberInput id="button-append-input" bind:value={buttonAppendInput} />
						<InputGroupAppend>items</InputGroupAppend>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="full-group">Prepend + Input + Append + Button</FormLabel>
					<InputGroup>
						<InputGroupPrepend>https://</InputGroupPrepend>
						<Input id="full-group" placeholder="example.com" bind:value={fullGroup} />
						<InputGroupAppend>.com</InputGroupAppend>
						<Button variant="primary" isInputGroupButton>Visit</Button>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="quantity-input">Button + Input + Button (Quantity)</FormLabel>
					<InputGroup>
						<Button variant="secondary" isInputGroupButton>-</Button>
						<NumberInput id="quantity-input" bind:value={quantityInput} class="text-center" />
						<Button variant="secondary" isInputGroupButton>+</Button>
					</InputGroup>
				</FormGroup>
			</Column>
		</Grid>
	</Form>
</Card>

<!-- Form States -->
<Card titleText="Form States">
	<Form>
		<Grid>
			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="disabled-input">Disabled Input</FormLabel>
					<Input id="disabled-input" placeholder="Disabled" disabled />
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="readonly-input">Readonly Input</FormLabel>
					<Input id="readonly-input" bind:value={readonlyInput} readonly />
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="help-input">Input with Help Text</FormLabel>
					<Input id="help-input" placeholder="Username" bind:value={helpInput} />
					<FormHelp>Must be 3-20 characters long</FormHelp>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup isError>
					<FormLabel for="error-input">Input with Error</FormLabel>
					<Input id="error-input" state="error" placeholder="Invalid input" bind:value={errorInput} />
					<FormHelp variant="error">This field is required</FormHelp>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup isSuccess>
					<FormLabel for="success-input">Input with Success</FormLabel>
					<Input id="success-input" state="success" bind:value={successInput} />
					<FormHelp variant="success">Looks good!</FormHelp>
				</FormGroup>
			</Column>
		</Grid>
	</Form>
</Card>

<!-- Input Sizes -->
<Card titleText="Input Sizes">
	<Form>
		<FormGroup>
			<FormLabel for="xs-input">Extra Small Input</FormLabel>
			<Input id="xs-input" size="xs" placeholder="Extra small" />
		</FormGroup>

		<FormGroup>
			<FormLabel for="sm-input">Small Input</FormLabel>
			<Input id="sm-input" size="sm" placeholder="Small" />
		</FormGroup>

		<FormGroup>
			<FormLabel for="normal-input">Normal Input (Default)</FormLabel>
			<Input id="normal-input" placeholder="Normal" />
		</FormGroup>

		<FormGroup>
			<FormLabel for="lg-input">Large Input</FormLabel>
			<Input id="lg-input" size="lg" placeholder="Large" />
		</FormGroup>

		<FormGroup>
			<FormLabel for="xl-input">Extra Large Input</FormLabel>
			<Input id="xl-input" size="xl" placeholder="Extra large" />
		</FormGroup>
	</Form>
</Card>

<!-- Checkboxes and Radio Buttons — basics + tri-state -->
<Card titleText="Checkboxes & Radio Buttons">
	<Form>
		<FormGroup>
			<FormLabel>Checkboxes (Custom Tri-State)</FormLabel>
			<CheckboxGroup>
				<Checkbox id="check1" labelText="Option 1 (checked)" bind:checked={check1} />
				<Checkbox id="check2" labelText="Option 2" bind:checked={check2} />
				<Checkbox id="check3" labelText="Option 3 (disabled)" disabled />
			</CheckboxGroup>
		</FormGroup>

		<FormGroup>
			<FormLabel>Radio Buttons</FormLabel>
			<RadioGroup>
				<Radio name="radio-group" value="a" bind:group={radioGroup} labelText="Choice A (selected)" />
				<Radio name="radio-group" value="b" bind:group={radioGroup} labelText="Choice B" />
				<Radio name="radio-group" value="c" disabled labelText="Choice C (disabled)" />
			</RadioGroup>
		</FormGroup>

		<FormGroup>
			<FormLabel>Two-state &amp; Three-state (indeterminate)</FormLabel>
			<CheckboxGroup>
				<!-- Two-state: a normal checkbox -->
				<Checkbox id="cb-two" labelText="Two-state (checked / unchecked)" bind:checked={twoState} />
				<!-- Static indeterminate -->
				<Checkbox id="cb-indet" labelText="Indeterminate (mixed) — static" isIndeterminate />
				<!-- Three-state cycler: click cycles unchecked → checked → indeterminate -->
				<Checkbox
					id="cb-tri"
					labelText="Three-state — click to cycle"
					checked={triChecked}
					isIndeterminate={triIndeterminate}
					onchange={cycleTri}
				/>
			</CheckboxGroup>
		</FormGroup>
	</Form>
</Card>

<!-- Label position — each sub-demo gets its own heading -->
<Card
	titleText="Label Position"
	descriptionText="One position per group. End/start stack; top reads best in an auto-flow grid."
>
	<Form>
		<FormGroup class="mb-2xl">
			<FormLabel>Checkbox · label end &amp; start</FormLabel>
			<Grid>
				<Column size="100" md="1-2">
					<CheckboxGroup>
						<Checkbox id="lp-ce-1" labelPosition="end" labelText="End · Option 1" checked />
						<Checkbox id="lp-ce-2" labelPosition="end" labelText="End · Option 2" />
						<Checkbox id="lp-ce-3" labelPosition="end" labelText="End · Option 3" checked />
					</CheckboxGroup>
				</Column>
				<Column size="100" md="1-2">
					<CheckboxGroup>
						<Checkbox id="lp-cs-1" labelPosition="start" labelText="Start · Option 1" checked />
						<Checkbox id="lp-cs-2" labelPosition="start" labelText="Start · Option 2" />
						<Checkbox id="lp-cs-3" labelPosition="start" labelText="Start · Option 3" checked />
					</CheckboxGroup>
				</Column>
			</Grid>
		</FormGroup>

		<FormGroup class="mb-2xl">
			<FormLabel>Checkbox · label top (auto-flow grid, 6 options)</FormLabel>
			<CheckboxGroup layout="grid">
				<Checkbox id="lp-ct-1" labelPosition="top" labelText="Top · Option 1" checked />
				<Checkbox id="lp-ct-2" labelPosition="top" labelText="Top · Option 2" />
				<Checkbox id="lp-ct-3" labelPosition="top" labelText="Top · Option 3" checked />
				<Checkbox id="lp-ct-4" labelPosition="top" labelText="Top · Option 4" />
				<Checkbox id="lp-ct-5" labelPosition="top" labelText="Top · Option 5" checked />
				<Checkbox id="lp-ct-6" labelPosition="top" labelText="Top · Option 6" />
			</CheckboxGroup>
		</FormGroup>

		<FormGroup class="mb-2xl">
			<FormLabel>Radio · label end &amp; start</FormLabel>
			<Grid>
				<Column size="100" md="1-2">
					<RadioGroup>
						<Radio name="rl-end" value="1" labelPosition="end" bind:group={rlEnd} labelText="End · Option 1" />
						<Radio name="rl-end" value="2" labelPosition="end" bind:group={rlEnd} labelText="End · Option 2" />
						<Radio name="rl-end" value="3" labelPosition="end" bind:group={rlEnd} labelText="End · Option 3" />
					</RadioGroup>
				</Column>
				<Column size="100" md="1-2">
					<RadioGroup>
						<Radio name="rl-start" value="1" labelPosition="start" bind:group={rlStart} labelText="Start · Option 1" />
						<Radio name="rl-start" value="2" labelPosition="start" bind:group={rlStart} labelText="Start · Option 2" />
						<Radio name="rl-start" value="3" labelPosition="start" bind:group={rlStart} labelText="Start · Option 3" />
					</RadioGroup>
				</Column>
			</Grid>
		</FormGroup>

		<FormGroup>
			<FormLabel>Radio · label top (auto-flow grid, 6 options)</FormLabel>
			<RadioGroup layout="grid">
				<Radio name="rl-top" value="1" labelPosition="top" bind:group={rlTop} labelText="Top · Option 1" />
				<Radio name="rl-top" value="2" labelPosition="top" bind:group={rlTop} labelText="Top · Option 2" />
				<Radio name="rl-top" value="3" labelPosition="top" bind:group={rlTop} labelText="Top · Option 3" />
				<Radio name="rl-top" value="4" labelPosition="top" bind:group={rlTop} labelText="Top · Option 4" />
				<Radio name="rl-top" value="5" labelPosition="top" bind:group={rlTop} labelText="Top · Option 5" />
				<Radio name="rl-top" value="6" labelPosition="top" bind:group={rlTop} labelText="Top · Option 6" />
			</RadioGroup>
		</FormGroup>
	</Form>
</Card>

<!-- Orientation & required -->
<Card titleText="Orientation &amp; Required">
	<Callout variant="info" headingText="How the required asterisk is placed">
		{#snippet icon()}<span class="pa-icon pa-icon--info" aria-hidden="true"></span>{/snippet}
		<p>
			The danger <strong>*</strong> is driven by the native <Code>required</Code> attribute — no class
			needed. Where it lands depends on the field's shape:
		</p>
		<ul>
			<li>
				<strong>Simple fields</strong> (input / select / textarea) → the group's <Code>&lt;label&gt;</Code>,
				via <Code>.pa-form-group:has(:required) &gt; label</Code>.
			</li>
			<li>
				<strong>Grouped choices</strong> (radios/checkboxes inside a <Code>.pa-radio-group</Code> /
				<Code>.pa-checkbox-group</Code>) → the requirement belongs to the group, so the
				<strong>*</strong> sits once on the group <strong>heading</strong> and the per-option markers
				are suppressed. See <em>Priority</em> below.
			</li>
			<li>
				<strong>Standalone choice</strong> (a lone <Code>.pa-checkbox</Code> / <Code>.pa-radio</Code>,
				e.g. a consent box with no <Code>*-group</Code> wrapper) → the <strong>*</strong> sits on its
				<strong>own</strong> option label. See <em>I accept the terms</em> below.
			</li>
			<li>
				<strong>Complex widgets</strong> with no native control (image browser, dropzone, web component)
				→ add <Code>.pa-form-group--required</Code> to the group as the explicit trigger.
			</li>
		</ul>
		<p class="mb-0">
			The first “Horizontal orientation” group has no <Code>required</Code>, so it shows no marker.
		</p>
	</Callout>
	<Form>
		<FormGroup>
			<FormLabel>Horizontal orientation</FormLabel>
			<CheckboxGroup layout="horizontal">
				<Checkbox id="ho-red" labelText="Red" checked />
				<Checkbox id="ho-green" labelText="Green" />
				<Checkbox id="ho-blue" labelText="Blue" />
			</CheckboxGroup>
			<RadioGroup layout="horizontal">
				<Radio name="radio-horiz" value="low" bind:group={radioHoriz} labelText="Low" />
				<Radio name="radio-horiz" value="medium" bind:group={radioHoriz} labelText="Medium" />
				<Radio name="radio-horiz" value="high" bind:group={radioHoriz} labelText="High" />
			</RadioGroup>
		</FormGroup>

		<!-- Grouped choice: the requirement belongs to the group ("pick one"),
		     so the asterisk sits once on the GROUP HEADING — the options stay clean. -->
		<FormGroup>
			<FormLabel>Priority (required group)</FormLabel>
			<RadioGroup layout="horizontal">
				<Radio name="req-priority" value="low" required bind:group={reqPriority} labelText="Low" />
				<Radio name="req-priority" value="medium" required bind:group={reqPriority} labelText="Medium" />
				<Radio name="req-priority" value="high" required bind:group={reqPriority} labelText="High" />
			</RadioGroup>
		</FormGroup>

		<!-- Standalone consent checkbox (no *-group wrapper): the requirement IS
		     this one control, so the asterisk sits on its OWN option label. -->
		<FormGroup>
			<Checkbox id="consent" required labelText="I accept the terms" />
		</FormGroup>
	</Form>
</Card>

<!-- Checkbox and Radio Sizes -->
<Card titleText="Checkbox & Radio Sizes">
	<Form>
		<Grid>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>Checkbox Sizes</FormLabel>
					<CheckboxGroup>
						<Checkbox id="check-xs" size="xs" labelText="Extra Small (12px)" bind:checked={checkXs} />
						<Checkbox id="check-sm" size="sm" labelText="Small (14px)" bind:checked={checkSm} />
						<Checkbox id="check-default" labelText="Default (16px)" bind:checked={checkDefault} />
						<Checkbox id="check-lg" size="lg" labelText="Large (20px)" bind:checked={checkLg} />
						<Checkbox id="check-xl" size="xl" labelText="Extra Large (24px)" bind:checked={checkXl} />
					</CheckboxGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>Radio Button Sizes</FormLabel>
					<RadioGroup>
						<Radio name="radio-sizes" value="xs" size="xs" bind:group={radioSizes} labelText="Extra Small (12px)" />
						<Radio name="radio-sizes" value="sm" size="sm" bind:group={radioSizes} labelText="Small (14px)" />
						<Radio name="radio-sizes" value="default" bind:group={radioSizes} labelText="Default (16px)" />
						<Radio name="radio-sizes" value="lg" size="lg" bind:group={radioSizes} labelText="Large (20px)" />
						<Radio name="radio-sizes" value="xl" size="xl" bind:group={radioSizes} labelText="Extra Large (24px)" />
					</RadioGroup>
				</FormGroup>
			</Column>
		</Grid>
	</Form>
</Card>

<!-- Horizontal Form Layout -->
<Card>
	{#snippet header()}
		<h3>Horizontal Form Layout</h3>
		<Paragraph class="pa-text--sm pa-text--secondary m-0">Labels on the left, inputs on the right with varying field widths</Paragraph>
	{/snippet}

	<Form>
		<!-- Line 1: First Name, Last Name, Email (equal widths) -->
		<Grid>
			<!-- First Name -->
			<Column size="100" md="1-3">
				<FormGroup isHorizontal>
					<FormLabel for="h-fname">First Name</FormLabel>
					<Input id="h-fname" placeholder="John" bind:value={hFname} />
				</FormGroup>
			</Column>

			<!-- Last Name -->
			<Column size="100" md="1-3">
				<FormGroup isHorizontal>
					<FormLabel for="h-lname">Last Name</FormLabel>
					<Input id="h-lname" placeholder="Doe" bind:value={hLname} />
				</FormGroup>
			</Column>

			<!-- Email -->
			<Column size="100" md="1-3">
				<FormGroup isHorizontal>
					<FormLabel for="h-email">Email</FormLabel>
					<Input type="email" id="h-email" placeholder="john.doe@company.com" bind:value={hEmail} />
				</FormGroup>
			</Column>
		</Grid>

		<!-- Line 2: Phone (smaller), Department (larger), Job Title (medium) -->
		<Grid>
			<!-- Phone -->
			<Column size="100" md="25">
				<FormGroup isHorizontal>
					<FormLabel for="h-phone">Phone</FormLabel>
					<Input type="tel" id="h-phone" placeholder="+1 555-0123" bind:value={hPhone} />
				</FormGroup>
			</Column>

			<!-- Department -->
			<Column size="100" md="5-12">
				<FormGroup isHorizontal>
					<FormLabel for="h-dept">Department</FormLabel>
					<Select id="h-dept" bind:value={hDept}>
						<option value="">Select department...</option>
						<option value="engineering">Engineering</option>
						<option value="marketing">Marketing</option>
						<option value="sales">Sales</option>
						<option value="hr">Human Resources</option>
					</Select>
				</FormGroup>
			</Column>

			<!-- Job Title -->
			<Column size="100" md="1-3">
				<FormGroup isHorizontal>
					<FormLabel for="h-title">Job Title</FormLabel>
					<Input id="h-title" placeholder="Senior Developer" bind:value={hTitle} />
				</FormGroup>
			</Column>
		</Grid>

		<!-- Line 3: Address (larger), City (medium), Zip (small) -->
		<Grid>
			<!-- Address -->
			<Column size="100" md="50">
				<FormGroup isHorizontal>
					<FormLabel for="h-address">Address</FormLabel>
					<Input id="h-address" placeholder="123 Main Street" bind:value={hAddress} />
				</FormGroup>
			</Column>

			<!-- City -->
			<Column size="100" md="1-3">
				<FormGroup isHorizontal>
					<FormLabel for="h-city">City</FormLabel>
					<Input id="h-city" placeholder="San Francisco" bind:value={hCity} />
				</FormGroup>
			</Column>

			<!-- Zip Code -->
			<Column size="100" md="15">
				<FormGroup isHorizontal>
					<FormLabel for="h-zip">Zip</FormLabel>
					<Input id="h-zip" placeholder="94102" bind:value={hZip} />
				</FormGroup>
			</Column>
		</Grid>

		<!-- Submit Buttons -->
		<Grid>
			<Column size="100" class="text-right mt-3">
				<ButtonGroup>
					<Button variant="secondary">Cancel</Button>
					<Button variant="primary">Submit</Button>
				</ButtonGroup>
			</Column>
		</Grid>
	</Form>

	{#snippet footer()}
		<Paragraph class="pa-text--sm pa-text--secondary m-0">
			<strong>Layout pattern:</strong> Each field uses <Code>.pa-form-group--horizontal</Code> (label left, input right) inside <Code>pc-col-*</Code> columns.
			Line 1: equal widths (1/3 each).
			Line 2: varying sizes (1/4 + 5/12 + 1/3).
			Line 3: very different sizes (1/2 + 1/3 + 1/6).
		</Paragraph>
	{/snippet}
</Card>

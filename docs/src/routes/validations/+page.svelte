<script lang="ts">
	import {
		Card,
		Form,
		FormGroup,
		FormLabel,
		FormHelp,
		Input,
		DateInput,
		Textarea,
		Select,
		Checkbox,
		Button,
		FormActions,
		Grid,
		Column,
		Heading,
		Paragraph,
		Strong,
		Em,
		Text,
		Link,
		Divider,
		SmallText,
		Alert,
		Callout,
		InputGroup,
		InputGroupAppend,
		Badge,
		Toast,
		ToastContainer,
		BasicList,
		Code
	} from '@keenmate/svelte-pure-admin';

	let showToast = $state(false);

	// Pattern 8: Validation Timing state
	// -- On Input (real-time) --
	let onInputEmail = $state('');
	let onInputError = $derived(() => {
		if (!onInputEmail) return '';
		if (!onInputEmail.includes('@')) return 'Must contain @';
		if (!onInputEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Invalid email format';
		return '';
	});

	// -- On Blur --
	let onBlurEmail = $state('');
	let onBlurTouched = $state(false);
	let onBlurError = $derived(() => {
		if (!onBlurTouched) return '';
		if (!onBlurEmail) return 'Email is required';
		if (!onBlurEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Invalid email format';
		return '';
	});

	// -- On Submit --
	let onSubmitEmail = $state('');
	let onSubmitError = $state('');
	let onSubmitSuccess = $state(false);
	function handleSubmitValidation() {
		onSubmitSuccess = false;
		if (!onSubmitEmail) {
			onSubmitError = 'Email is required';
		} else if (!onSubmitEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			onSubmitError = 'Invalid email format';
		} else {
			onSubmitError = '';
			onSubmitSuccess = true;
		}
	}
</script>

<Paragraph>Different UI patterns for displaying form validation errors. Choose the pattern that best fits your UX requirements.</Paragraph>

<!-- Pattern 1: Inline Field Errors -->
<Card titleText="1. Inline Field Errors">
	<Paragraph class="mb-3">The most common pattern. Error messages appear directly below each field. Best for forms where users need immediate field-level feedback.</Paragraph>

	<Form>
		<Grid>
			<Column size="100" md="50">
				<FormGroup state="error">
					<FormLabel>Email Address</FormLabel>
					<Input type="email" value="invalid-email" state="error" required />
					<FormHelp variant="error">Please enter a valid email address</FormHelp>
				</FormGroup>
			</Column>
			<Column size="100" md="50">
				<FormGroup state="error">
					<FormLabel>Password</FormLabel>
					<Input type="password" value="123" state="error" required />
					<FormHelp variant="error">Password must be at least 8 characters</FormHelp>
				</FormGroup>
			</Column>
			<Column size="100" md="50">
				<FormGroup state="success">
					<FormLabel>Username</FormLabel>
					<Input type="text" value="johndoe" state="success" required />
					<FormHelp variant="success">Username is available</FormHelp>
				</FormGroup>
			</Column>
			<Column size="100" md="50">
				<FormGroup state="warning">
					<FormLabel>Phone Number</FormLabel>
					<Input type="tel" value="555-1234" state="warning" />
					<FormHelp variant="warning">Consider adding country code for international format</FormHelp>
				</FormGroup>
			</Column>
		</Grid>
	</Form>

	<Callout variant="info" class="mt-4">
		<Strong>Usage:</Strong> Add <Code>pa-form-group--error</Code> to the form group and <Code>pa-form-help--error</Code> to the help text.
	</Callout>
</Card>

<!-- Pattern 2: Summary Block -->
<Card titleText="2. Summary Block (Top of Form)">
	<Paragraph class="mb-3">All errors collected in a single alert at the top. Good for accessibility and giving users a quick overview of all issues.</Paragraph>

	<Form>
		<Alert variant="danger" class="mb-4">
			<Strong>Please fix the following errors:</Strong>
			<BasicList class="mt-0 mb-0">
				<li>First name is required</li>
				<li>Email address is not valid</li>
				<li>Password must contain at least one uppercase letter</li>
				<li>Please accept the terms and conditions</li>
			</BasicList>
		</Alert>

		<Grid>
			<Column size="100" md="50">
				<FormGroup state="error">
					<FormLabel>First Name</FormLabel>
					<Input type="text" placeholder="Enter first name" state="error" required />
				</FormGroup>
			</Column>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>Last Name</FormLabel>
					<Input type="text" value="Smith" />
				</FormGroup>
			</Column>
			<Column size="100" md="50">
				<FormGroup state="error">
					<FormLabel>Email</FormLabel>
					<Input type="email" value="not-an-email" state="error" required />
				</FormGroup>
			</Column>
			<Column size="100" md="50">
				<FormGroup state="error">
					<FormLabel>Password</FormLabel>
					<Input type="password" value="password" state="error" required />
				</FormGroup>
			</Column>
			<Column size="100">
				<FormGroup state="error">
					<Checkbox id="terms">
						{#snippet labelSnippet()}I accept the terms and conditions <Text variant="danger">*</Text>{/snippet}
					</Checkbox>
				</FormGroup>
			</Column>
		</Grid>
	</Form>

	<Callout variant="info" class="mt-4">
		<Strong>Best Practice:</Strong> Combine summary isBlock with isInline errors for maximum accessibility. Screen readers can announce all errors at once.
	</Callout>
</Card>

<!-- Pattern 3: Inline + Summary Combined -->
<Card titleText="3. Combined: Summary + Inline (Recommended)">
	<Paragraph class="mb-3">The best of both worlds. Summary for overview, isInline for specific guidance. Most accessible approach.</Paragraph>

	<Form>
		<Alert variant="danger" class="mb-4">
			<Strong>2 errors found:</Strong>
			<BasicList class="mt-0 mb-0">
				<li><Link href="#card-number">Card number</Link> - Invalid card number format</li>
				<li><Link href="#cvv">CVV</Link> - Must be 3 or 4 digits</li>
			</BasicList>
		</Alert>

		<Grid>
			<Column size="100" md="50">
				<FormGroup state="error">
					<FormLabel for="card-number">Card Number</FormLabel>
					<Input type="text" id="card-number" value="1234-5678-XXXX" state="error" required />
					<FormHelp variant="error">Invalid card number format. Please use 16 digits.</FormHelp>
				</FormGroup>
			</Column>
			<Column size="100" md="25">
				<FormGroup state="success">
					<FormLabel>Expiry Date</FormLabel>
					<Input type="text" value="12/25" state="success" />
					<FormHelp variant="success">Valid</FormHelp>
				</FormGroup>
			</Column>
			<Column size="100" md="25">
				<FormGroup state="error">
					<FormLabel for="cvv">CVV</FormLabel>
					<Input type="text" id="cvv" value="12" state="error" required />
					<FormHelp variant="error">Must be 3 or 4 digits</FormHelp>
				</FormGroup>
			</Column>
		</Grid>
	</Form>

	<Callout variant="success" class="mt-4">
		<Strong>Tip:</Strong> Make summary items clickable links that jump to the relevant field using anchor IDs.
	</Callout>
</Card>

<!-- Pattern 4: Border + Icon Only -->
<Card titleText="4. Border + Icon Only (Minimal)">
	<Paragraph class="mb-3">Space-efficient but less informative. Red border and icon indicate error without text message. User must infer the issue or hover/click for details.</Paragraph>

	<Form>
		<Grid>
			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel>Username</FormLabel>
					<InputGroup>
						<Input type="text" value="" state="error" />
						<InputGroupAppend>
							<Text variant="danger" titleText="This field is required">!</Text>
						</InputGroupAppend>
					</InputGroup>
				</FormGroup>
			</Column>
			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel>Email</FormLabel>
					<InputGroup>
						<Input type="email" value="bad@" state="error" />
						<InputGroupAppend>
							<Text variant="danger" titleText="Invalid email format">!</Text>
						</InputGroupAppend>
					</InputGroup>
				</FormGroup>
			</Column>
			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel>Password</FormLabel>
					<InputGroup>
						<Input type="password" value="securepass123" state="success" />
						<InputGroupAppend>
							<Text variant="success">&#10003;</Text>
						</InputGroupAppend>
					</InputGroup>
				</FormGroup>
			</Column>
		</Grid>
	</Form>

	<Callout variant="warning" class="mt-4">
		<Strong>Caution:</Strong> This pattern provides poor accessibility. Consider using tooltips or aria-describedby for screen readers.
	</Callout>
</Card>

<!-- Pattern 5: Right-side Indicators -->
<Card titleText="5. Right-side Indicators">
	<Paragraph class="mb-3">Error text positioned to the right of the input. Works well in horizontal form layouts with more screen real estate.</Paragraph>

	<Form>
		<FormGroup horizontal class="align-items-center">
			<FormLabel class="pc-col-md-25" for="company-name">Company Name</FormLabel>
			<Column class="pc-col-md-40">
				<Input type="text" id="company-name" value="" state="error" />
			</Column>
			<Column class="pc-col-md-35">
				<FormHelp variant="error" class="mt-0">Company name is required</FormHelp>
			</Column>
		</FormGroup>
		<FormGroup horizontal class="align-items-center">
			<FormLabel class="pc-col-md-25" for="website-url">Website URL</FormLabel>
			<Column class="pc-col-md-40">
				<Input type="url" id="website-url" value="not-a-url" state="error" />
			</Column>
			<Column class="pc-col-md-35">
				<FormHelp variant="error" class="mt-0">Please enter a valid URL (e.g., https://example.com)</FormHelp>
			</Column>
		</FormGroup>
		<FormGroup horizontal class="align-items-center">
			<FormLabel class="pc-col-md-25" for="industry-select">Industry</FormLabel>
			<Column class="pc-col-md-40">
				<Select id="industry-select" state="success">
					<option>Technology</option>
				</Select>
			</Column>
			<Column class="pc-col-md-35">
				<FormHelp variant="success" class="mt-0">&#10003; Valid selection</FormHelp>
			</Column>
		</FormGroup>
	</Form>
</Card>

<!-- Pattern 6: Helper Text Transforms to Error -->
<Card titleText="6. Helper Text Transforms to Error">
	<Paragraph class="mb-3">Helper text below the field transforms into error text when validation fails. Maintains consistent spacing.</Paragraph>

	<Form>
		<Grid>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>Bio</FormLabel>
					<Textarea rows={3} value="This is my bio text that keeps going and going..." />
					<FormHelp>Maximum 100 characters (85/100)</FormHelp>
				</FormGroup>
			</Column>
			<Column size="100" md="50">
				<FormGroup state="error">
					<FormLabel>Bio (Over Limit)</FormLabel>
					<Textarea rows={3} state="error" value="This is my bio text that keeps going and going and going until it exceeds the character limit which causes a validation error..." />
					<FormHelp variant="error">Maximum 100 characters exceeded (142/100)</FormHelp>
				</FormGroup>
			</Column>
		</Grid>
	</Form>
</Card>

<!-- Pattern 7: Toast Notifications -->
<Card titleText="7. Toast Notifications">
	<Paragraph class="mb-3">Validation errors shown as toast notifications. Best for submit-level errors or async validation (e.g., server-side checks).</Paragraph>

	<Form>
		<Grid>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>Email</FormLabel>
					<Input type="email" value="user@example.com" />
				</FormGroup>
			</Column>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>Password</FormLabel>
					<Input type="password" value="password123" />
				</FormGroup>
			</Column>
			<Column size="100">
				<Button variant="primary" onclick={() => showToast = true}>Submit (Shows Toast)</Button>
			</Column>
		</Grid>
	</Form>

	<!-- Simulated toast preview -->
	<Card class="mt-4 bg-light" hasPadding>
		<Paragraph class="text-muted mb-2"><Em>Toast preview (normally appears in corner):</Em></Paragraph>
		<Toast variant="danger" titleText="Validation Failed" messageText="Invalid credentials. Please check your email and password." show={true} duration={0} />
	</Card>

	<Callout variant="warning" class="mt-4">
		<Strong>Note:</Strong> Toasts are ephemeral. Don't use them as the only validation feedback - users may miss them.
	</Callout>
</Card>

<!-- Pattern 8: Validation Timing -->
<Card titleText="8. Validation Timing Strategies">
	<Paragraph class="mb-3">When to trigger validation affects user experience significantly. Try each approach below.</Paragraph>

	<Grid>
		<Column size="100" md="1-3">
			<Card variant="warning" titleText="On Input (Real-time)">
				<FormGroup state={onInputError() ? 'error' : onInputEmail ? 'success' : undefined}>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						bind:value={onInputEmail}
						state={onInputError() ? 'error' : onInputEmail ? 'success' : undefined}
						placeholder="Type to see validation..."
					/>
					{#if onInputError()}
						<FormHelp variant="error">{onInputError()}</FormHelp>
					{:else if onInputEmail}
						<FormHelp variant="success">Looks good!</FormHelp>
					{/if}
				</FormGroup>
				<SmallText class="mt-2 text-muted">Validates on every keystroke. Can feel aggressive.</SmallText>
			</Card>
		</Column>
		<Column size="100" md="1-3">
			<Card variant="success" titleText="On Blur (Recommended)">
				<FormGroup state={onBlurError() ? 'error' : (onBlurTouched && onBlurEmail) ? 'success' : undefined}>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						bind:value={onBlurEmail}
						state={onBlurError() ? 'error' : (onBlurTouched && onBlurEmail) ? 'success' : undefined}
						placeholder="Tab out to validate..."
						onblur={() => onBlurTouched = true}
					/>
					{#if onBlurError()}
						<FormHelp variant="error">{onBlurError()}</FormHelp>
					{:else if onBlurTouched && onBlurEmail}
						<FormHelp variant="success">Looks good!</FormHelp>
					{/if}
				</FormGroup>
				<SmallText class="mt-2 text-muted">Validates when field loses focus. Good balance.</SmallText>
			</Card>
		</Column>
		<Column size="100" md="1-3">
			<Card titleText="On Submit">
				<FormGroup state={onSubmitError ? 'error' : onSubmitSuccess ? 'success' : undefined}>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						bind:value={onSubmitEmail}
						state={onSubmitError ? 'error' : onSubmitSuccess ? 'success' : undefined}
						placeholder="No validation until submit"
						oninput={() => { onSubmitError = ''; onSubmitSuccess = false; }}
					/>
					{#if onSubmitError}
						<FormHelp variant="error">{onSubmitError}</FormHelp>
					{:else if onSubmitSuccess}
						<FormHelp variant="success">Looks good!</FormHelp>
					{/if}
				</FormGroup>
				<Button variant="info" size="sm" class="mt-2" onclick={handleSubmitValidation}>Submit</Button>
				<SmallText class="mt-2 text-muted">All errors shown at once on submit. Traditional approach.</SmallText>
			</Card>
		</Column>
	</Grid>
</Card>

<!-- Pattern 9: Multi-field Validation -->
<Card titleText="9. Multi-field / Cross-field Validation">
	<Paragraph class="mb-3">When validation depends on multiple fields (e.g., password confirmation, date ranges).</Paragraph>

	<Form>
		<Grid>
			<Column size="100" md="50">
				<FormGroup state="success">
					<FormLabel>New Password</FormLabel>
					<Input type="password" value="SecurePass123!" state="success" />
					<FormHelp variant="success">Strong password</FormHelp>
				</FormGroup>
			</Column>
			<Column size="100" md="50">
				<FormGroup state="error">
					<FormLabel>Confirm Password</FormLabel>
					<Input type="password" value="SecurePass123" state="error" />
					<FormHelp variant="error">Passwords do not match</FormHelp>
				</FormGroup>
			</Column>
		</Grid>

		<Divider spacing="my-4" />

		<Grid>
			<Column size="100" md="50">
				<FormGroup state="error">
					<FormLabel>Start Date</FormLabel>
					<DateInput value="2025-12-31" state="error" />
				</FormGroup>
			</Column>
			<Column size="100" md="50">
				<FormGroup state="error">
					<FormLabel>End Date</FormLabel>
					<DateInput value="2025-01-01" state="error" />
				</FormGroup>
			</Column>
			<Column size="100">
				<Alert variant="danger">
					End date must be after start date
				</Alert>
			</Column>
		</Grid>
	</Form>
</Card>

<!-- Pattern 10: Progressive/Stepped Validation -->
<Card titleText="10. Progressive Validation (Multi-step Forms)">
	<Paragraph class="mb-3">Validate each step before allowing progression. Prevents users from reaching the end with invalid data.</Paragraph>

	<!-- Step indicators -->
	<Grid class="mb-4">
		<Column size="1-3" class="text-center">
			<Badge variant="success" size="lg">1</Badge>
			<Paragraph class="mt-2 text-success">Account</Paragraph>
		</Column>
		<Column size="1-3" class="text-center">
			<Badge variant="danger" size="lg">2</Badge>
			<Paragraph class="mt-2 text-danger">Profile</Paragraph>
		</Column>
		<Column size="1-3" class="text-center">
			<Badge size="lg" class="pa-badge--default">3</Badge>
			<Paragraph class="mt-2 text-muted">Confirm</Paragraph>
		</Column>
	</Grid>

	<Alert variant="danger" class="mb-3">
		Please complete all required fields in Step 2 before proceeding.
	</Alert>

	<Form>
		<Grid>
			<Column size="100" md="50">
				<FormGroup state="error">
					<FormLabel>Display Name</FormLabel>
					<Input type="text" placeholder="Enter display name" state="error" required />
					<FormHelp variant="error">Display name is required</FormHelp>
				</FormGroup>
			</Column>
			<Column size="100" md="50">
				<FormGroup state="success">
					<FormLabel>Avatar URL</FormLabel>
					<Input type="url" value="https://example.com/avatar.jpg" state="success" />
					<FormHelp variant="success">Valid URL</FormHelp>
				</FormGroup>
			</Column>
		</Grid>
		<FormActions>
			<Button variant="secondary">Back</Button>
			<Button variant="primary" disabled>Next Step</Button>
		</FormActions>
	</Form>
</Card>

<!-- CSS Classes Reference -->
<Card titleText="CSS Classes Reference">
	<Heading level={4}>Form Group States</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-form-group--success</Code> - Success state (green)</li>
		<li><Code>pa-form-group--warning</Code> - Warning state (yellow/orange)</li>
		<li><Code>pa-form-group--error</Code> - Error state (red)</li>
	</BasicList>

	<Heading level={4} class="mt-4">Input States</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-input--success</Code> - Success border on input</li>
		<li><Code>pa-input--warning</Code> - Warning border on input</li>
		<li><Code>pa-input--error</Code> - Error border on input</li>
	</BasicList>

	<Heading level={4} class="mt-4">Help/Message Text</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-form-help</Code> - Base help text styling</li>
		<li><Code>pa-form-help--success</Code> - Green help text</li>
		<li><Code>pa-form-help--warning</Code> - Yellow/orange help text</li>
		<li><Code>pa-form-help--error</Code> - Red help text</li>
	</BasicList>

	<Heading level={4} class="mt-4">Alert Variants (for Summary Blocks)</Heading>
	<BasicList spacing="compact">
		<li><Code>pa-alert pa-alert--danger</Code> - Error summary block</li>
		<li><Code>pa-alert pa-alert--warning</Code> - Warning summary block</li>
		<li><Code>pa-alert pa-alert--success</Code> - Success message block</li>
		<li><Code>pa-alert pa-alert--info</Code> - Info message block</li>
	</BasicList>

	<Heading level={4} class="mt-4">Text Utility Classes</Heading>
	<BasicList spacing="compact">
		<li><Code>text-danger</Code> - Red text color</li>
		<li><Code>text-warning</Code> - Yellow/orange text color</li>
		<li><Code>text-success</Code> - Green text color</li>
		<li><Code>text-muted</Code> - Muted/gray text color</li>
	</BasicList>
</Card>

<ToastContainer position="top-end">
	<Toast variant="danger" titleText="Validation Failed" messageText="Invalid credentials. Please check your email and password." bind:show={showToast} duration={4000} />
</ToastContainer>

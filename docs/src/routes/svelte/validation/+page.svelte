<script lang="ts">
	import {
		Card,
		FormGroup,
		FormLabel,
		FormHelp,
		FormField,
		FormErrorSummary,
		Input,
		NumberInput,
		DateInput,
		Textarea,
		Select,
		Button,
		ButtonGroup,
		Grid,
		Column,
		Heading,
		Paragraph,
		Strong,
		Alert,
		Callout,
		BasicList,
		Link
	} from '@keenmate/svelte-pure-admin';
	import { HighlightedCode } from '$lib/components';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';

	// ==========================================
	// Test 1: Basic Email Validation
	// ==========================================
	const test1Schema = z.object({
		email: z.string().min(1, 'Email is required').email('Please enter a valid email address')
	});

	const {
		form: form1,
		errors: errors1,
		touched: touched1,
		data: data1,
		reset: reset1
	} = createForm<z.infer<typeof test1Schema>>({
		extend: validator({ schema: test1Schema }),
		onSubmit: () => {
			test1Saved = true;
			test1Submitted = false;
			setTimeout(() => (test1Saved = false), 3000);
		},
		onError: () => {
			test1Submitted = true;
		}
	});

	let test1Saved = $state(false);
	let test1Submitted = $state(false);

	// Collect all Test 1 errors for summary
	const test1AllErrors = $derived(() => {
		const result: Array<{ field: string; id: string; message: string }> = [];
		if ($errors1.email?.[0]) {
			result.push({ field: 'Email', id: 'test1-email', message: $errors1.email[0] });
		}
		return result;
	});

	function resetTest1() {
		reset1();
		test1Saved = false;
		test1Submitted = false;
	}

	// ==========================================
	// Test 2: Multiple Fields Validation
	// ==========================================
	const test2Schema = z.object({
		name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
		age: z.coerce
			.number({ invalid_type_error: 'Age is required' })
			.min(0, 'Age cannot be negative')
			.max(150, 'Please enter a valid age'),
		bio: z.string().max(200, 'Bio must be 200 characters or less').optional()
	});

	const {
		form: form2,
		errors: errors2,
		touched: touched2,
		data: data2,
		reset: reset2
	} = createForm<z.infer<typeof test2Schema>>({
		extend: validator({ schema: test2Schema }),
		onSubmit: () => {
			test2Saved = true;
			test2Submitted = false;
			setTimeout(() => (test2Saved = false), 3000);
		},
		onError: () => {
			test2Submitted = true;
		}
	});

	let test2Saved = $state(false);
	let test2Submitted = $state(false);

	// Collect all Test 2 errors for summary
	const test2AllErrors = $derived(() => {
		const result: Array<{ field: string; id: string; message: string }> = [];
		if ($errors2.name?.[0]) {
			result.push({ field: 'Name', id: 'test2-name', message: $errors2.name[0] });
		}
		if ($errors2.age?.[0]) {
			result.push({ field: 'Age', id: 'test2-age', message: $errors2.age[0] });
		}
		if ($errors2.bio?.[0]) {
			result.push({ field: 'Bio', id: 'test2-bio', message: $errors2.bio[0] });
		}
		return result;
	});

	function resetTest2() {
		reset2();
		test2Saved = false;
		test2Submitted = false;
	}

	// ==========================================
	// Test 3: Touched Behavior (manual demo)
	// ==========================================
	let test3Value = $state('');
	let test3Touched = $state(false);
	const test3Errors = ['This error is always present'];

	function resetTest3() {
		test3Value = '';
		test3Touched = false;
	}

	// ==========================================
	// Test 4: Select and Date Validation
	// ==========================================
	const test4Schema = z.object({
		country: z.string().min(1, 'Please select a country'),
		birthDate: z.string().min(1, 'Date is required').refine(
			(val) => {
				if (!val) return true;
				return new Date(val) <= new Date();
			},
			{ message: 'Date cannot be in the future' }
		)
	});

	const {
		form: form4,
		errors: errors4,
		touched: touched4,
		reset: reset4
	} = createForm<z.infer<typeof test4Schema>>({
		extend: validator({ schema: test4Schema }),
		onSubmit: () => {
			test4Saved = true;
			test4Submitted = false;
			setTimeout(() => (test4Saved = false), 3000);
		},
		onError: () => {
			test4Submitted = true;
		}
	});

	let test4Saved = $state(false);
	let test4Submitted = $state(false);

	// Collect all Test 4 errors for summary
	const test4AllErrors = $derived(() => {
		const result: Array<{ field: string; id: string; message: string }> = [];
		if ($errors4.country?.[0]) {
			result.push({ field: 'Country', id: 'test4-country', message: $errors4.country[0] });
		}
		if ($errors4.birthDate?.[0]) {
			result.push({ field: 'Birth Date', id: 'test4-birthDate', message: $errors4.birthDate[0] });
		}
		return result;
	});

	function resetTest4() {
		reset4();
		test4Saved = false;
		test4Submitted = false;
	}

	// ==========================================
	// Test 5: Password with Real-time Validation
	// ==========================================
	const test5Schema = z
		.object({
			password: z
				.string()
				.min(1, 'Password is required')
				.min(8, 'Password must be at least 8 characters')
				.regex(/[A-Z]/, 'Password must contain an uppercase letter')
				.regex(/[0-9]/, 'Password must contain a number'),
			confirm: z.string().min(1, 'Please confirm your password')
		})
		.refine((data) => data.password === data.confirm, {
			message: 'Passwords do not match',
			path: ['confirm']
		});

	const {
		form: form5,
		errors: errors5,
		touched: touched5,
		data: data5,
		reset: reset5
	} = createForm<z.infer<typeof test5Schema>>({
		extend: validator({ schema: test5Schema }),
		onSubmit: () => {
			test5Saved = true;
			test5Submitted = false;
			setTimeout(() => (test5Saved = false), 3000);
		},
		onError: () => {
			test5Submitted = true;
		}
	});

	let test5Saved = $state(false);
	let test5Submitted = $state(false);

	// Collect all Test 5 errors for summary
	const test5AllErrors = $derived(() => {
		const result: Array<{ field: string; id: string; message: string }> = [];
		if ($errors5.password?.[0]) {
			result.push({ field: 'Password', id: 'test5-password', message: $errors5.password[0] });
		}
		if ($errors5.confirm?.[0]) {
			result.push({ field: 'Confirm Password', id: 'test5-confirm', message: $errors5.confirm[0] });
		}
		return result;
	});

	function resetTest5() {
		reset5();
		test5Saved = false;
		test5Submitted = false;
	}

	// ==========================================
	// Real Use Case: Create User Form
	// ==========================================
	const createUserSchema = z.object({
		firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
		lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
		email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
		role: z.string().min(1, 'Please select a role'),
		department: z.string().min(1, 'Please select a department')
	});

	type CreateUserData = z.infer<typeof createUserSchema>;

	let createUserSubmitted = $state(false);
	let createUserSaving = $state(false);
	let createUserSuccess = $state(false);
	let createUserServerError = $state<string | null>(null);
	let createdUser = $state<CreateUserData | null>(null);

	// Simulated API call
	async function saveUserToApi(data: CreateUserData): Promise<{ success: boolean; error?: string }> {
		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// Simulate server-side validation (email already exists)
		if (data.email === 'admin@example.com') {
			return { success: false, error: 'This email address is already registered' };
		}

		// Simulate random server error (10% chance)
		if (Math.random() < 0.1) {
			return { success: false, error: 'Server error. Please try again.' };
		}

		// Success
		return { success: true };
	}

	const {
		form: createUserForm,
		errors: createUserErrors,
		touched: createUserTouched,
		data: createUserData,
		reset: resetCreateUserForm
	} = createForm<CreateUserData>({
		extend: validator({ schema: createUserSchema }),
		onSubmit: async (values) => {
			createUserSaving = true;
			createUserServerError = null;

			const result = await saveUserToApi(values);

			createUserSaving = false;

			if (result.success) {
				createUserSuccess = true;
				createdUser = values;
				createUserSubmitted = false;
			} else {
				createUserServerError = result.error ?? 'Unknown error';
			}
		}
	});

	// Collect all Create User errors for summary
	const createUserAllErrors = $derived(() => {
		const result: Array<{ field: string; id: string; message: string }> = [];
		if ($createUserErrors.firstName?.[0]) {
			result.push({ field: 'First Name', id: 'create-user-firstName', message: $createUserErrors.firstName[0] });
		}
		if ($createUserErrors.lastName?.[0]) {
			result.push({ field: 'Last Name', id: 'create-user-lastName', message: $createUserErrors.lastName[0] });
		}
		if ($createUserErrors.email?.[0]) {
			result.push({ field: 'Email', id: 'create-user-email', message: $createUserErrors.email[0] });
		}
		if ($createUserErrors.role?.[0]) {
			result.push({ field: 'Role', id: 'create-user-role', message: $createUserErrors.role[0] });
		}
		if ($createUserErrors.department?.[0]) {
			result.push({ field: 'Department', id: 'create-user-department', message: $createUserErrors.department[0] });
		}
		return result;
	});

	function resetCreateUser() {
		resetCreateUserForm();
		createUserSubmitted = false;
		createUserSaving = false;
		createUserSuccess = false;
		createUserServerError = null;
		createdUser = null;
	}

	// ==========================================
	// Test 6: State Override (manual demo)
	// ==========================================
	let test6Value = $state('has error but shows success');
	let test6ManualState = $state<'success' | 'warning' | 'error' | undefined>('success');

	// ==========================================
	// Bring your own validation (no library)
	// Validation here is just a function + a little $state. No felte, no zod.
	// ==========================================
	let byoEmail = $state('');
	let byoTouched = $state(false);

	// Compute errors however you want — plain TS, re-runs on every change.
	const byoErrors = $derived.by(() => {
		if (!byoTouched) return [];
		const value = byoEmail.trim();
		if (value === '') return ['Email is required'];
		if (!value.includes('@') || !value.includes('.')) return ['Please enter a valid email address'];
		return [];
	});

	// Lower-level variant: drive FormGroup/FormHelp yourself, no FormField.
	let byoPwd = $state('');
	let byoPwdTouched = $state(false);
	const byoPwdState = $derived<'success' | 'error' | undefined>(
		!byoPwdTouched ? undefined : byoPwd.length >= 8 ? 'success' : 'error'
	);

	const codeByoLogic = `// No library — validation is just a function over your own $state.
let email = $state('');
let touched = $state(false);

const errors = $derived.by(() => {
  if (!touched) return [];
  const v = email.trim();
  if (v === '') return ['Email is required'];
  if (!v.includes('@') || !v.includes('.')) return ['Enter a valid email'];
  return [];
});`;

	const codeByoTemplate = `<FormField labelText="Email" {errors} {touched}>
  {#snippet children({ errors, touched, state })}
    <Input
      type="email"
      bind:value={email}
      oninput={() => (touched = true)}
      {errors}
      {touched}
      {state}
    />
  {/snippet}
</FormField>`;

	// Code examples
	const codeFelteSetup = `import { createForm } from 'felte';
import { validator } from '@felte/validator-zod';
import { z } from 'zod';
import { FormField, Input, Button } from '@keenmate/svelte-pure-admin';

const schema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email')
});

const { form, errors, touched, data } = createForm<z.infer<typeof schema>>({
  extend: validator({ schema }),
  onSubmit: (values) => {
    console.log('Valid:', values);
  }
});`;

	const codeFelteTemplate = `<form use:form>
  <FormField
    labelText="Email"
    required
    helpText="Enter your email"
    successMessage="Valid email"
    errors={$errors.email}
    touched={$touched.email ?? false}
    hasValue={!!$data.email}
  >
    {#snippet children({ errors, touched })}
      <Input name="email" {errors} {touched} />
    {/snippet}
  </FormField>
  <Button type="submit">Save</Button>
</form>`;

	const codeZodSchema = `// Simple field
email: z.string().min(1, 'Required').email('Invalid email')

// Number with coercion (for input fields)
age: z.coerce.number().min(0).max(150)

// Optional with max length
bio: z.string().max(200).optional()

// Password with multiple rules
password: z.string()
  .min(8, 'Min 8 characters')
  .regex(/[A-Z]/, 'Need uppercase')
  .regex(/[0-9]/, 'Need number')

// Cross-field validation (confirm password)
.refine(data => data.password === data.confirm, {
  message: 'Passwords do not match',
  path: ['confirm']
})`;
</script>

<Callout variant="info" class="mb-4">
	<strong>svelte-pure-admin's form components are validation-agnostic.</strong> They take plain data
	props (<code>errors</code>, <code>touched</code>, <code>state</code>) and depend on
	<strong>no</strong> validation library — there is no <code>felte</code> or <code>zod</code> in the
	package. Bring whatever you like: a schema library, server-side errors, or a few lines of
	hand-rolled logic.
</Callout>

<Paragraph class="mb-4">
	The tests below use <a href="https://felte.dev">Felte</a> + <a href="https://zod.dev">Zod</a> as
	<em>one</em> convenient, type-safe example — it eliminates boilerplate, and its
	<code>errors</code> / <code>touched</code> output maps straight onto the props these components
	expect. But it's entirely optional. Jump to the
	<strong>Bring Your Own Validation</strong> section at the bottom to see the exact same components
	driven by a plain function, with no library at all.
</Paragraph>

<!-- Setup -->
<Card titleText="Felte Setup">
	<Heading level={4}>1. Install Dependencies</Heading>
	<HighlightedCode language="bash" code="npm install felte @felte/validator-zod zod" />

	<Heading level={4} class="mt-4">2. Create Form with Schema</Heading>
	<HighlightedCode language="typescript" code={codeFelteSetup} />

	<Heading level={4} class="mt-4">3. Use in Template</Heading>
	<HighlightedCode language="svelte" code={codeFelteTemplate} />

	<Callout variant="success" class="mt-4">
		<strong>That's it!</strong> Felte handles touched state, validation on blur/change, and form submission.
		No manual state management needed.
	</Callout>
</Card>

<!-- Zod Patterns -->
<Card titleText="Common Zod Patterns">
	<HighlightedCode language="typescript" code={codeZodSchema} />
</Card>

<Heading level={2} class="mt-5 mb-4">Interactive Tests</Heading>

<Paragraph>Each form in this section uses Felte with Zod validation. (For the no-library version, see <Strong>Bring Your Own Validation</Strong> below.)</Paragraph>

<!-- Test 1: Basic Email -->
<Card titleText="Test 1: Basic Email Validation">
	{#if test1Saved}
		<Alert variant="success" class="mb-4">Email saved successfully!</Alert>
	{/if}

	<FormErrorSummary errors={test1AllErrors()} show={test1Submitted} />

	<form use:form1>
		<FormField
			labelText="Email Address"
			required
			helpText="Enter a valid email address"
			successMessage="Valid email address"
			errors={$errors1.email}
			touched={$touched1.email ?? false}
			hasValue={!!$data1?.email}
		>
			{#snippet children({ errors, touched })}
				<Input type="email" name="email" id="test1-email" placeholder="Enter your email" {errors} {touched} />
			{/snippet}
		</FormField>

		<ButtonGroup class="mt-4">
			<Button type="submit" variant="primary" onclick={() => (test1Submitted = true)}>Save</Button>
			<Button type="button" variant="secondary" onclick={resetTest1}>Reset</Button>
		</ButtonGroup>
	</form>
</Card>

<!-- Test 2: Multiple Fields -->
<Card titleText="Test 2: Multiple Fields Validation">
	{#if test2Saved}
		<Alert variant="success" class="mb-4">Profile saved successfully!</Alert>
	{/if}

	<FormErrorSummary errors={test2AllErrors()} show={test2Submitted} />

	<form use:form2>
		<Grid>
			<Column size="100" md="1-3">
				<FormField
					labelText="Name"
					required
					errors={$errors2.name}
					touched={$touched2.name ?? false}
				>
					{#snippet children({ errors, touched })}
						<Input name="name" id="test2-name" placeholder="Your name" {errors} {touched} />
					{/snippet}
				</FormField>
			</Column>
			<Column size="100" md="1-3">
				<FormField
					labelText="Age"
					required
					errors={$errors2.age}
					touched={$touched2.age ?? false}
				>
					{#snippet children({ errors, touched })}
						<NumberInput name="age" id="test2-age" placeholder="Your age" {errors} {touched} />
					{/snippet}
				</FormField>
			</Column>
			<Column size="100" md="1-3">
				<FormField
					labelText="Bio (optional, max 200 chars)"
					helpText="{($data2.bio ?? '').length}/200 characters"
					errors={$errors2.bio}
					touched={$touched2.bio ?? false}
				>
					{#snippet children({ errors, touched })}
						<Textarea name="bio" id="test2-bio" placeholder="Tell us about yourself" rows={2} {errors} {touched} />
					{/snippet}
				</FormField>
			</Column>
		</Grid>

		<ButtonGroup class="mt-4">
			<Button type="submit" variant="primary" onclick={() => (test2Submitted = true)}>Save Profile</Button>
			<Button type="button" variant="secondary" onclick={resetTest2}>Reset</Button>
		</ButtonGroup>
	</form>
</Card>

<!-- Test 3: Touched Behavior -->
<Card titleText="Test 3: Touched Behavior">
	<Paragraph class="mb-4">
		Both inputs have the same error, but only the touched one shows error styling.
		This demonstrates how <code>touched</code> controls error visibility.
	</Paragraph>

	<Grid>
		<Column size="100" md="50">
			<FormField
				labelText="touched=false (pristine)"
				helpText="Error exists but not shown"
				errors={test3Errors}
				touched={false}
			>
				{#snippet children({ errors, touched })}
					<Input placeholder="Type here" bind:value={test3Value} {errors} {touched} />
				{/snippet}
			</FormField>
		</Column>
		<Column size="100" md="50">
			<FormField
				labelText="touched=true"
				errors={test3Errors}
				touched={true}
			>
				{#snippet children({ errors, touched })}
					<Input placeholder="Same value as left" value={test3Value} {errors} {touched} />
				{/snippet}
			</FormField>
		</Column>
	</Grid>

	<ButtonGroup class="mt-4">
		<Button variant="secondary" onclick={resetTest3}>Reset</Button>
	</ButtonGroup>
</Card>

<!-- Test 4: Select and Date -->
<Card titleText="Test 4: Select & Date Validation">
	{#if test4Saved}
		<Alert variant="success" class="mb-4">Location data saved!</Alert>
	{/if}

	<FormErrorSummary errors={test4AllErrors()} show={test4Submitted} />

	<form use:form4>
		<Grid>
			<Column size="100" md="50">
				<FormField
					labelText="Country"
					required
					errors={$errors4.country}
					touched={$touched4.country ?? false}
				>
					{#snippet children({ errors, touched })}
						<Select name="country" id="test4-country" {errors} {touched}>
							<option value="">Select a country...</option>
							<option value="us">United States</option>
							<option value="uk">United Kingdom</option>
							<option value="ca">Canada</option>
							<option value="au">Australia</option>
							<option value="de">Germany</option>
						</Select>
					{/snippet}
				</FormField>
			</Column>
			<Column size="100" md="50">
				<FormField
					labelText="Birth Date (not in future)"
					required
					errors={$errors4.birthDate}
					touched={$touched4.birthDate ?? false}
				>
					{#snippet children({ errors, touched })}
						<DateInput name="birthDate" id="test4-birthDate" {errors} {touched} />
					{/snippet}
				</FormField>
			</Column>
		</Grid>

		<ButtonGroup class="mt-4">
			<Button type="submit" variant="primary" onclick={() => (test4Submitted = true)}>Save Location</Button>
			<Button type="button" variant="secondary" onclick={resetTest4}>Reset</Button>
		</ButtonGroup>
	</form>
</Card>

<!-- Test 5: Password with Real-time Validation -->
<Card titleText="Test 5: Password with Cross-Field Validation">
	{#if test5Saved}
		<Alert variant="success" class="mb-4">Password set successfully!</Alert>
	{/if}

	<FormErrorSummary errors={test5AllErrors()} show={test5Submitted} />

	<Paragraph class="mb-4">
		Password requires: 8+ characters, uppercase letter, and a number. Uses Zod's
		<code>.refine()</code> for cross-field validation.
	</Paragraph>

	<form use:form5>
		<Grid>
			<Column size="100" md="50">
				<FormField
					labelText="Password"
					required
					helpText="Min 8 chars, 1 uppercase, 1 number"
					successMessage="Password meets requirements"
					errors={$errors5.password}
					touched={$touched5.password ?? false}
					hasValue={!!$data5.password}
				>
					{#snippet children({ errors, touched })}
						<Input type="password" name="password" id="test5-password" placeholder="Enter password" {errors} {touched} />
					{/snippet}
				</FormField>
			</Column>
			<Column size="100" md="50">
				<FormField
					labelText="Confirm Password"
					required
					successMessage="Passwords match!"
					errors={$errors5.confirm}
					touched={$touched5.confirm ?? false}
					hasValue={!!$data5.confirm}
				>
					{#snippet children({ errors, touched })}
						<Input type="password" name="confirm" id="test5-confirm" placeholder="Confirm password" {errors} {touched} />
					{/snippet}
				</FormField>
			</Column>
		</Grid>

		<ButtonGroup class="mt-4">
			<Button type="submit" variant="primary" onclick={() => (test5Submitted = true)}>Set Password</Button>
			<Button type="button" variant="secondary" onclick={resetTest5}>Reset</Button>
		</ButtonGroup>
	</form>
</Card>

<!-- Real Use Case: Create User -->
<Card titleText="Real Use Case: Create User Form">
	<Callout variant="info" class="mb-4">
		This demonstrates a realistic form with async API submission, loading states, and server-side error handling.
		Try submitting with <code>admin@example.com</code> to see a server-side validation error.
	</Callout>

	{#if createUserSuccess && createdUser}
		<Alert variant="success" class="mb-4">
			<Strong>User created successfully!</Strong>
			<Paragraph class="mb-0 mt-2">
				Created: {createdUser.firstName} {createdUser.lastName} ({createdUser.email}) as {createdUser.role} in {createdUser.department}
			</Paragraph>
		</Alert>
	{/if}

	{#if createUserServerError}
		<Alert variant="danger" class="mb-4">
			<Strong>Server Error:</Strong> {createUserServerError}
		</Alert>
	{/if}

	<FormErrorSummary errors={createUserAllErrors()} show={createUserSubmitted} />

	<form use:createUserForm>
		<Grid>
			<Column size="100" md="50">
				<FormField
					labelText="First Name"
					required
					errors={$createUserErrors.firstName}
					touched={$createUserTouched.firstName ?? false}
				>
					{#snippet children({ errors, touched })}
						<Input name="firstName" id="create-user-firstName" placeholder="John" {errors} {touched} />
					{/snippet}
				</FormField>
			</Column>
			<Column size="100" md="50">
				<FormField
					labelText="Last Name"
					required
					errors={$createUserErrors.lastName}
					touched={$createUserTouched.lastName ?? false}
				>
					{#snippet children({ errors, touched })}
						<Input name="lastName" id="create-user-lastName" placeholder="Doe" {errors} {touched} />
					{/snippet}
				</FormField>
			</Column>
		</Grid>

		<FormField
			labelText="Email"
			required
			helpText="Use admin@example.com to test server-side validation error"
			errors={$createUserErrors.email}
			touched={$createUserTouched.email ?? false}
		>
			{#snippet children({ errors, touched })}
				<Input type="email" name="email" id="create-user-email" placeholder="john.doe@company.com" {errors} {touched} />
			{/snippet}
		</FormField>

		<Grid>
			<Column size="100" md="50">
				<FormField
					labelText="Role"
					required
					errors={$createUserErrors.role}
					touched={$createUserTouched.role ?? false}
				>
					{#snippet children({ errors, touched })}
						<Select name="role" id="create-user-role" {errors} {touched}>
							<option value="">Select a role...</option>
							<option value="Developer">Developer</option>
							<option value="Designer">Designer</option>
							<option value="Manager">Manager</option>
							<option value="Admin">Admin</option>
						</Select>
					{/snippet}
				</FormField>
			</Column>
			<Column size="100" md="50">
				<FormField
					labelText="Department"
					required
					errors={$createUserErrors.department}
					touched={$createUserTouched.department ?? false}
				>
					{#snippet children({ errors, touched })}
						<Select name="department" id="create-user-department" {errors} {touched}>
							<option value="">Select a department...</option>
							<option value="Engineering">Engineering</option>
							<option value="Product">Product</option>
							<option value="Marketing">Marketing</option>
							<option value="Sales">Sales</option>
							<option value="HR">Human Resources</option>
						</Select>
					{/snippet}
				</FormField>
			</Column>
		</Grid>

		<ButtonGroup class="mt-4">
			<Button
				type="submit"
				variant="primary"
				disabled={createUserSaving}
				onclick={() => (createUserSubmitted = true)}
			>
				{#if createUserSaving}
					Creating User...
				{:else}
					Create User
				{/if}
			</Button>
			<Button type="button" variant="secondary" onclick={resetCreateUser} disabled={createUserSaving}>
				Reset
			</Button>
		</ButtonGroup>
	</form>
</Card>

<!-- Test 6: State Override -->
<Card titleText="Test 6: Manual State Override">
	<Paragraph class="mb-4">
		The <code>state</code> prop takes precedence over auto-derived state from <code>errors</code>.
		This is useful when you need manual control.
	</Paragraph>

	<Grid>
		<Column size="100" md="50">
			<FormField
				labelText="Input with errors + manual state"
				helpText="state='{test6ManualState}' overrides errors"
				errors={['This error is ignored visually']}
				touched={true}
				state={test6ManualState}
			>
				{#snippet children({ errors, touched, state })}
					<Input bind:value={test6Value} {errors} {touched} {state} />
				{/snippet}
			</FormField>
		</Column>
		<Column size="100" md="50">
			<FormField labelText="Change manual state:">
				{#snippet children()}
					<Select bind:value={test6ManualState}>
						<option value={undefined}>undefined (use errors)</option>
						<option value="success">success</option>
						<option value="warning">warning</option>
						<option value="error">error</option>
					</Select>
				{/snippet}
			</FormField>
		</Column>
	</Grid>
</Card>

<!-- Aria-Invalid Check -->
<Card titleText="Test 7: Accessibility (aria-invalid)">
	<Paragraph class="mb-4">
		Open browser DevTools and inspect these inputs to verify <code>aria-invalid</code> attribute.
	</Paragraph>

	<Grid>
		<Column size="100" md="50">
			<FormField
				labelText="Has errors + touched"
				errors={['Error!']}
				touched={true}
			>
				{#snippet children({ errors, touched })}
					<Input placeholder="Inspect me - has aria-invalid=true" {errors} {touched} />
				{/snippet}
			</FormField>
		</Column>
		<Column size="100" md="50">
			<FormField
				labelText="No errors"
				helpText="Should NOT have aria-invalid attribute"
			>
				{#snippet children()}
					<Input placeholder="Inspect me - no aria-invalid" />
				{/snippet}
			</FormField>
		</Column>
	</Grid>
</Card>

<!-- Bring Your Own Validation (no library) -->
<Heading level={2} class="mt-5 mb-4">Bring Your Own Validation</Heading>

<Callout variant="success" class="mb-4">
	Everything below uses <Strong>no validation library</Strong> — no Felte, no Zod. The form
	components take plain <code>errors</code> / <code>touched</code> / <code>state</code> props, so a
	plain function and a little <code>$state</code> is all you need. Swap in your own rules, a
	different schema library, or server-side errors exactly the same way.
</Callout>

<Card titleText="Hand-rolled validation with FormField">
	<Paragraph class="mb-4">
		Type an email. Validation runs on every keystroke via a plain <code>$derived</code> function and
		feeds its result straight into <code>FormField</code>'s <code>errors</code> prop — the very same
		prop Felte would populate. Nothing else is different.
	</Paragraph>

	<Grid>
		<Column size="100" md="50">
			<FormField
				labelText="Email"
				helpText="We'll never share it."
				errors={byoErrors}
				touched={byoTouched}
			>
				{#snippet children({ errors, touched, state })}
					<Input
						type="email"
						placeholder="you@example.com"
						bind:value={byoEmail}
						oninput={() => (byoTouched = true)}
						{errors}
						{touched}
						{state}
					/>
				{/snippet}
			</FormField>
		</Column>
		<Column size="100" md="50">
			<Heading level={4}>The validation</Heading>
			<HighlightedCode language="typescript" code={codeByoLogic} />
			<Heading level={4} class="mt-4">The template</Heading>
			<HighlightedCode language="svelte" code={codeByoTemplate} />
		</Column>
	</Grid>
</Card>

<Card titleText="Even lower level — FormGroup + FormHelp, no FormField">
	<Paragraph class="mb-4">
		You don't even need <code>FormField</code>. Drop to <code>FormGroup</code>,
		<code>FormHelp</code> and <code>Input</code> and set the <code>state</code> and message
		yourself. Type at least 8 characters to see it flip to success.
	</Paragraph>

	<Grid>
		<Column size="100" md="50">
			<FormGroup state={byoPwdState}>
				<FormLabel>Password</FormLabel>
				<Input
					type="password"
					placeholder="At least 8 characters"
					bind:value={byoPwd}
					state={byoPwdState}
					oninput={() => (byoPwdTouched = true)}
					onblur={() => (byoPwdTouched = true)}
				/>
				{#if byoPwdState === 'error'}
					<FormHelp variant="error">Password must be at least 8 characters</FormHelp>
				{:else if byoPwdState === 'success'}
					<FormHelp variant="success">Looks good</FormHelp>
				{:else}
					<FormHelp>Minimum 8 characters</FormHelp>
				{/if}
			</FormGroup>
		</Column>
	</Grid>
</Card>

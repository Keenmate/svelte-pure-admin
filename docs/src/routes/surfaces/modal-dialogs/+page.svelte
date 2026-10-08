<script lang="ts">
	import { Paragraph, Code, CodeBlock, Heading, Card, Button, ButtonGroup, Alert, Callout, Table, dialogService, toastService, ToastContainer } from '@keenmate/svelte-pure-admin';
				
	// Result state for confirm dialogs
	let confirmResult = $state<{ result: boolean; shown: boolean }>({ result: false, shown: false });

	// Result state for prompt dialogs
	let promptResult = $state<{ value: string | null; shown: boolean }>({ value: null, shown: false });

	// Result state for custom dialogs
	let customResult = $state<{ value: unknown; shown: boolean }>({ value: null, shown: false });

	// Position examples
	async function positionCenter() {
		await dialogService.alert({
			title: 'Centered Dialog',
			message: 'This dialog is centered in the viewport (default behavior).',
			variant: 'primary',
			position: 'center'
		});
	}

	async function positionTop() {
		await dialogService.alert({
			title: 'Top Position',
			message: 'This dialog appears near the top of the viewport. Useful for less intrusive notifications.',
			variant: 'primary',
			position: 'top'
		});
	}

	async function promptTop() {
		const result = await dialogService.prompt({
			title: 'Quick Input',
			message: 'Enter a value:',
			placeholder: 'Type here...',
			variant: 'success',
			position: 'top'
		});
		if (result !== null) {
			await dialogService.alert({
				title: 'You entered',
				message: result || '(empty)',
				variant: 'success',
				position: 'top'
			});
		}
	}

	async function confirmTop() {
		const result = await dialogService.confirm({
			title: 'Delete Item?',
			message: 'This action cannot be undone.',
			variant: 'danger',
			position: 'top',
			confirmText: 'Delete',
			cancelText: 'Cancel'
		});
		showConfirmResult(result);
	}

	// Confirm examples
	async function confirmPrimary() {
		const result = await dialogService.confirm({
			title: 'Primary Confirm',
			message: 'This is a primary styled confirmation dialog.',
			variant: 'primary'
		});
		showConfirmResult(result);
	}

	async function confirmSuccess() {
		const result = await dialogService.confirm({
			title: 'Success Confirm',
			message: 'Do you want to proceed with this action?',
			variant: 'success'
		});
		showConfirmResult(result);
	}

	async function confirmWarning() {
		const result = await dialogService.confirm({
			title: 'Warning',
			message: 'This action may have unintended consequences.',
			variant: 'warning'
		});
		showConfirmResult(result);
	}

	async function confirmDanger() {
		const result = await dialogService.confirm({
			title: 'Delete Item',
			message: 'This action cannot be undone. Are you sure?',
			variant: 'danger',
			confirmText: 'Delete',
			cancelText: 'Keep It'
		});
		showConfirmResult(result);
	}

	async function confirmCustomText() {
		const result = await dialogService.confirm({
			title: 'Save Changes?',
			message: 'You have unsaved changes. What would you like to do?',
			confirmText: 'Save Changes',
			cancelText: 'Discard',
			variant: 'primary'
		});
		showConfirmResult(result);
	}

	async function confirmLarge() {
		const result = await dialogService.confirm({
			title: 'Large Dialog',
			message: 'This is a larger modal dialog. You can use different sizes: sm, md, lg, xl.',
			size: 'lg',
			variant: 'primary'
		});
		showConfirmResult(result);
	}

	function showConfirmResult(result: boolean) {
		confirmResult = { result, shown: true };
	}

	// Alert examples
	async function alertPrimary() {
		await dialogService.alert({
			title: 'Information',
			message: 'This is a primary alert dialog.',
			variant: 'primary'
		});
	}

	async function alertSuccess() {
		await dialogService.alert({
			title: 'Success!',
			message: 'Your changes have been saved successfully.',
			variant: 'success',
			okText: 'Great!'
		});
	}

	async function alertWarning() {
		await dialogService.alert({
			title: 'Warning',
			message: 'Your session will expire in 5 minutes.',
			variant: 'warning',
			okText: 'Got It'
		});
	}

	async function alertDanger() {
		await dialogService.alert({
			title: 'Error',
			message: 'An error occurred while processing your request.',
			variant: 'danger',
			okText: 'Close'
		});
	}

	// Prompt examples
	async function promptBasic() {
		const result = await dialogService.prompt({
			title: 'Enter Your Name',
			message: 'Please enter your full name:',
			placeholder: 'John Doe'
		});
		showPromptResult(result);
	}

	async function promptWithDefault() {
		const result = await dialogService.prompt({
			title: 'Edit Username',
			message: 'Enter a new username:',
			defaultValue: 'johndoe123',
			placeholder: 'username'
		});
		showPromptResult(result);
	}

	async function promptWithValidation() {
		const result = await dialogService.prompt({
			title: 'Enter Email',
			message: 'Please enter a valid email address:',
			placeholder: 'user@example.com',
			validator: (value) => {
				if (!value) return 'Email is required';
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
					return 'Please enter a valid email address';
				}
				return true;
			}
		});
		showPromptResult(result);
	}

	function showPromptResult(result: string | null) {
		promptResult = { value: result, shown: true };
	}

	// Sequential dialogs example
	async function sequentialDialogs() {
		const name = await dialogService.prompt({
			title: 'Step 1 of 3',
			message: 'Enter your name:',
			placeholder: 'John Doe',
			variant: 'primary'
		});

		if (name === null) return;

		const email = await dialogService.prompt({
			title: 'Step 2 of 3',
			message: 'Enter your email:',
			placeholder: 'john@example.com',
			variant: 'primary',
			validator: (value) => {
				if (!value) return 'Email is required';
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
					return 'Please enter a valid email address';
				}
				return true;
			}
		});

		if (email === null) return;

		const confirmed = await dialogService.confirm({
			title: 'Step 3 of 3 - Confirm',
			message: `Please confirm your details:\n\nName: ${name}\nEmail: ${email}`,
			confirmText: 'Register',
			variant: 'success'
		});

		if (confirmed) {
			await dialogService.alert({
				title: 'Registration Complete!',
				message: `Welcome, ${name}! A confirmation email has been sent to ${email}.`,
				variant: 'success',
				okText: 'Get Started'
			});
		}
	}

	// Custom dialog examples
	async function customSaveChanges() {
		const result = await dialogService.custom<'save' | 'discard' | 'cancel'>({
			title: 'Unsaved Changes',
			message: 'You have unsaved changes. What would you like to do?',
			variant: 'warning',
			dismissValue: 'cancel',
			buttons: [
				{ label: 'Cancel', value: 'cancel', variant: 'secondary' },
				{ label: 'Discard', value: 'discard', variant: 'danger', isOutline: true },
				{ label: 'Save', value: 'save', variant: 'success' }
			]
		});
		showCustomResult(result);
	}

	async function customDeleteOptions() {
		const result = await dialogService.custom<'permanent' | 'trash' | 'cancel'>({
			title: 'Delete File',
			message: 'How would you like to delete this file?',
			variant: 'danger',
			dismissValue: 'cancel',
			buttons: [
				{ label: 'Cancel', value: 'cancel', variant: 'secondary' },
				{ label: 'Move to Trash', value: 'trash', variant: 'warning' },
				{ label: 'Delete Permanently', value: 'permanent', variant: 'danger' }
			]
		});
		showCustomResult(result);
	}

	async function customFeedback() {
		const result = await dialogService.custom<1 | 2 | 3 | 4 | 5 | null>({
			title: 'Rate Your Experience',
			message: 'How satisfied are you with our service?',
			variant: 'primary',
			size: 'md',
			dismissValue: null,
			buttons: [
				{ label: '1 - Poor', value: 1, variant: 'danger', isOutline: true },
				{ label: '2', value: 2, variant: 'warning', isOutline: true },
				{ label: '3', value: 3, variant: 'secondary', isOutline: true },
				{ label: '4', value: 4, variant: 'info', isOutline: true },
				{ label: '5 - Excellent', value: 5, variant: 'success', isOutline: true }
			]
		});
		showCustomResult(result);
	}

	async function customMergeConflict() {
		const result = await dialogService.custom<'ours' | 'theirs' | 'manual' | 'abort'>({
			title: 'Merge Conflict',
			message: 'There is a conflict between your changes and the remote version.',
			variant: 'warning',
			size: 'lg',
			dismissValue: 'abort',
			buttons: [
				{ label: 'Abort Merge', value: 'abort', variant: 'secondary' },
				{ label: 'Keep Ours', value: 'ours', variant: 'info' },
				{ label: 'Keep Theirs', value: 'theirs', variant: 'warning' },
				{ label: 'Manual Resolve', value: 'manual', variant: 'primary' }
			]
		});
		showCustomResult(result);
	}

	function showCustomResult(result: unknown) {
		customResult = { value: result, shown: true };
	}

	const basicUsageCode = `// Confirm dialog
const confirmed = await dialogService.confirm({
  title: 'Delete Item?',
  message: 'This action cannot be undone.',
  variant: 'danger'
});

if (confirmed) {
  // User clicked OK
}

// Alert dialog
await dialogService.alert({
  title: 'Success!',
  message: 'Your changes have been saved.',
  variant: 'success'
});

// Prompt dialog
const name = await dialogService.prompt({
  title: 'Enter Name',
  message: 'Please enter your name:',
  defaultValue: 'John Doe'
});

if (name !== null) {
  console.log('User entered:', name);
}`;

	const positionCode = `// Center position (default)
await dialogService.alert({
  title: 'Centered',
  message: 'This dialog is centered.',
  position: 'center'  // default
});

// Top position
await dialogService.prompt({
  title: 'Top Position',
  message: 'This dialog appears near the top.',
  position: 'top'
});`;

	const sequentialCode = `async function sequentialDialogs() {
  const name = await dialogService.prompt({
    title: 'Step 1 of 3',
    message: 'Enter your name:'
  });

  if (name === null) return;

  const email = await dialogService.prompt({
    title: 'Step 2 of 3',
    message: 'Enter your email:'
  });

  if (email === null) return;

  const confirmed = await dialogService.confirm({
    title: 'Step 3 of 3',
    message: \`Confirm: \${name} <\${email}>\`,
    variant: 'success'
  });

  if (confirmed) {
    await dialogService.alert({
      title: 'Complete!',
      message: 'Registration successful.',
      variant: 'success'
    });
  }
}`;

	const customCode = `// Custom dialog with typed return values
const result = await dialogService.custom<'save' | 'discard' | 'cancel'>({
  title: 'Unsaved Changes',
  message: 'You have unsaved changes.',
  variant: 'warning',
  dismissValue: 'cancel',  // Returned on Escape/backdrop click
  buttons: [
    { label: 'Cancel', value: 'cancel', variant: 'secondary' },
    { label: 'Discard', value: 'discard', variant: 'danger', isOutline: true },
    { label: 'Save', value: 'save', variant: 'success' }
  ]
});

switch (result) {
  case 'save':
    await saveDocument();
    break;
  case 'discard':
    discardChanges();
    break;
  case 'cancel':
    // User cancelled
    break;
}`;

	// Banded "document changed" confirm — the svelte idiom of keen's server-driven
	// dialog: await the promise, then toast each outcome. `isBanded` is newly
	// supported by dialogService. The ✕/backdrop/Escape dismiss resolves the
	// promise too (confirm → false), so no separate dismiss event is needed.
	async function documentChanged() {
		const reload = await dialogService.confirm({
			title: 'Document changed',
			message: 'Someone else updated this document. Reload their version? Your unsaved changes will be lost.',
			variant: 'warning',
			isBanded: true,
			position: 'top',
			confirmText: 'Reload theirs',
			cancelText: 'Keep mine'
		});

		if (reload) {
			toastService.show({ variant: 'warning', titleText: 'Document reloaded', messageText: 'Loaded the latest version; your edits were discarded.' });
		} else {
			toastService.show({ variant: 'success', titleText: 'Kept your version', messageText: 'Your local changes were preserved.' });
		}
	}

	// Forced choice — `closeOnBackdrop: false` now actually sticks: clicking the
	// backdrop no longer dismisses (Escape still cancels, matching core's
	// modal-dialogs.js). Previously the option was accepted but ignored.
	async function forcedChoice() {
		const ok = await dialogService.confirm({
			title: 'Are you sure?',
			message: 'Clicking outside will NOT dismiss this — pick a button. (Escape still cancels.)',
			variant: 'danger',
			confirmText: 'Yes, do it',
			cancelText: 'No',
			closeOnBackdrop: false
		});
		toastService.show({ variant: 'info', titleText: ok ? 'Confirmed' : 'Cancelled', messageText: `You chose ${ok ? 'yes' : 'no'}.` });
	}

	const serverStyleCode = `// svelte idiom of keen's server-driven dialog: await + toast.
const reload = await dialogService.confirm({
  title: 'Document changed',
  message: 'Someone else updated this document. Reload their version?',
  variant: 'warning', isBanded: true, position: 'top',   // isBanded: new
  confirmText: 'Reload theirs', cancelText: 'Keep mine'
});
reload
  ? toastService.show({ variant: 'warning', titleText: 'Document reloaded', messageText: '…' })
  : toastService.show({ variant: 'success', titleText: 'Kept your version', messageText: '…' });

// Forced choice: closeOnBackdrop:false now sticks (Escape still cancels).
await dialogService.confirm({ closeOnBackdrop: false, confirmText: 'Yes', cancelText: 'No' });`;
</script>

<!-- When to use -->
<Callout variant="warning" headingText="dialogService is for simple text-only dialogs">
	The <Code>message</Code> property only accepts a plain string rendered as a <Code>{'<Paragraph>'}</Code>.
	For complex body content — forms, formatted text, grids, tables, or any Svelte components — use a <Code>{'<Modal>'}</Code> component directly instead. See the <a href="/surfaces/modals">Modals</a> page for examples.
</Callout>

<!-- Basic Usage -->
<Card titleText="Basic Usage" class="pa-section">
	<Paragraph>All dialog functions return Promises, so you can use <Code>async/await</Code> for clean, synchronous-looking code:</Paragraph>

	<CodeBlock class="mt-4">{basicUsageCode}</CodeBlock>
</Card>

<!-- Confirm Dialogs -->
<Card titleText="Confirm Dialogs" class="pa-section">
	<Paragraph>Two-button dialogs that return <Code>true</Code> (confirmed) or <Code>false</Code> (cancelled).</Paragraph>

	<ButtonGroup class="mt-4">
		<Button variant="primary" onclick={confirmPrimary}>Primary Confirm</Button>
		<Button variant="success" onclick={confirmSuccess}>Success Confirm</Button>
		<Button variant="warning" onclick={confirmWarning}>Warning Confirm</Button>
		<Button variant="danger" onclick={confirmDanger}>Danger Confirm</Button>
		<Button variant="secondary" onclick={confirmCustomText}>Custom Text</Button>
		<Button variant="secondary" onclick={confirmLarge}>Large Size</Button>
	</ButtonGroup>

	{#if confirmResult.shown}
		<Alert variant={confirmResult.result ? 'success' : 'secondary'} class="mt-4">
			<strong>Result:</strong> {confirmResult.result ? 'User clicked OK (true)' : 'User clicked Cancel (false)'}
		</Alert>
	{/if}
</Card>

<!-- Dialog → Toast + banded + forced choice -->
<Card titleText="Outcome → Toast (banded + forced choice)" class="pa-section">
	<Paragraph>
		The svelte counterpart of keen's server-driven dialog: <Code>await</Code> the promise, then raise a
		<a href="/feedback/toasts">toast</a> for the outcome. <Code>isBanded</Code> is newly supported by
		<Code>dialogService</Code>, and <Code>closeOnBackdrop: false</Code> now actually sticks (the backdrop
		no longer dismisses; Escape still cancels — matching core's <Code>modal-dialogs.js</Code>).
	</Paragraph>

	<ButtonGroup class="mt-4">
		<Button variant="warning" onclick={documentChanged}>Someone edited this document…</Button>
		<Button variant="danger" onclick={forcedChoice}>Forced choice (no backdrop dismiss)</Button>
	</ButtonGroup>

	<CodeBlock class="mt-4">{serverStyleCode}</CodeBlock>
</Card>

<!-- Position Options -->
<Card titleText="Position Options" class="pa-section">
	<Paragraph>Dialogs can be positioned in the <strong>center</strong> (default) or at the <strong>top</strong> of the viewport.</Paragraph>

	<ButtonGroup class="mt-4">
		<Button variant="primary" onclick={positionCenter}>Center (Default)</Button>
		<Button variant="primary" onclick={positionTop}>Top Position</Button>
		<Button variant="success" onclick={promptTop}>Prompt (Top)</Button>
		<Button variant="danger" onclick={confirmTop}>Confirm (Top)</Button>
	</ButtonGroup>

	<CodeBlock class="mt-4">{positionCode}</CodeBlock>
</Card>

<!-- Alert Dialogs -->
<Card titleText="Alert Dialogs" class="pa-section">
	<Paragraph>Single-button dialogs for notifications. Just wait for the user to acknowledge.</Paragraph>

	<ButtonGroup class="mt-4">
		<Button variant="primary" onclick={alertPrimary}>Primary Alert</Button>
		<Button variant="success" onclick={alertSuccess}>Success Alert</Button>
		<Button variant="warning" onclick={alertWarning}>Warning Alert</Button>
		<Button variant="danger" onclick={alertDanger}>Danger Alert</Button>
	</ButtonGroup>
</Card>

<!-- Prompt Dialogs -->
<Card titleText="Prompt Dialogs" class="pa-section">
	<Paragraph>Text input dialogs that return the entered value (or <Code>null</Code> if cancelled).</Paragraph>

	<ButtonGroup class="mt-4">
		<Button variant="primary" onclick={promptBasic}>Basic Prompt</Button>
		<Button variant="primary" onclick={promptWithDefault}>With Default Value</Button>
		<Button variant="primary" onclick={promptWithValidation}>With Validation</Button>
	</ButtonGroup>

	{#if promptResult.shown}
		<Alert variant={promptResult.value !== null ? 'success' : 'secondary'} class="mt-4">
			<strong>You entered:</strong> {promptResult.value !== null ? (promptResult.value || '(empty string)') : 'User cancelled (returned null)'}
		</Alert>
	{/if}
</Card>

<!-- Sequential Dialogs -->
<Card titleText="Sequential Dialogs" class="pa-section">
	<Paragraph>Chain multiple dialogs together using async/await:</Paragraph>

	<Button variant="primary" onclick={sequentialDialogs} class="mt-4">
		Run Sequential Flow
	</Button>

	<CodeBlock class="mt-4">{sequentialCode}</CodeBlock>
</Card>

<!-- Custom Dialogs -->
<Card titleText="Custom Dialogs" class="pa-section">
	<Paragraph>Define your own buttons with typed return values using <Code>dialogService.custom()</Code>.</Paragraph>

	<ButtonGroup class="mt-4">
		<Button variant="warning" onclick={customSaveChanges}>Save Changes</Button>
		<Button variant="danger" onclick={customDeleteOptions}>Delete Options</Button>
		<Button variant="primary" onclick={customFeedback}>Feedback Rating</Button>
		<Button variant="warning" onclick={customMergeConflict}>Merge Conflict</Button>
	</ButtonGroup>

	{#if customResult.shown}
		<Alert variant="info" class="mt-4">
			<strong>Result:</strong> <Code>{JSON.stringify(customResult.value)}</Code>
		</Alert>
	{/if}

	<CodeBlock class="mt-4">{customCode}</CodeBlock>
</Card>

<!-- API Reference -->
<Card titleText="API Reference" class="pa-section">

	<Heading level={4} class="mt-0">dialogService.confirm(options)</Heading>
	<Paragraph>Returns <Code>Promise&lt;boolean&gt;</Code></Paragraph>
	<Table isStriped>
		<thead>
			<tr>
				<th>Option</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Code>title</Code></td>
				<td>string</td>
				<td>'Confirm'</td>
				<td>Dialog title</td>
			</tr>
			<tr>
				<td><Code>message</Code></td>
				<td>string</td>
				<td>'Are you sure?'</td>
				<td>Dialog message</td>
			</tr>
			<tr>
				<td><Code>confirmText</Code></td>
				<td>string</td>
				<td>'OK'</td>
				<td>Confirm button text</td>
			</tr>
			<tr>
				<td><Code>cancelText</Code></td>
				<td>string</td>
				<td>'Cancel'</td>
				<td>Cancel button text</td>
			</tr>
			<tr>
				<td><Code>variant</Code></td>
				<td>string</td>
				<td>'primary'</td>
				<td>Header theme: primary, success, warning, danger</td>
			</tr>
			<tr>
				<td><Code>confirmVariant</Code></td>
				<td>string</td>
				<td>(same as variant)</td>
				<td>Confirm button style</td>
			</tr>
			<tr>
				<td><Code>size</Code></td>
				<td>string</td>
				<td>'sm'</td>
				<td>Modal size: sm, md, lg, xl</td>
			</tr>
			<tr>
				<td><Code>position</Code></td>
				<td>string</td>
				<td>'center'</td>
				<td>Vertical position: center, top</td>
			</tr>
			<tr>
				<td><Code>closeOnBackdrop</Code></td>
				<td>boolean</td>
				<td>true</td>
				<td>Close when clicking outside</td>
			</tr>
		</tbody>
	</Table>

	<Heading level={4} class="mt-8">dialogService.alert(options)</Heading>
	<Paragraph>Returns <Code>Promise&lt;void&gt;</Code></Paragraph>
	<Table isStriped>
		<thead>
			<tr>
				<th>Option</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Code>title</Code></td>
				<td>string</td>
				<td>'Alert'</td>
				<td>Dialog title</td>
			</tr>
			<tr>
				<td><Code>message</Code></td>
				<td>string</td>
				<td>''</td>
				<td>Dialog message</td>
			</tr>
			<tr>
				<td><Code>okText</Code></td>
				<td>string</td>
				<td>'OK'</td>
				<td>Button text</td>
			</tr>
			<tr>
				<td><Code>variant</Code></td>
				<td>string</td>
				<td>'primary'</td>
				<td>Header and button theme</td>
			</tr>
			<tr>
				<td><Code>size</Code></td>
				<td>string</td>
				<td>'sm'</td>
				<td>Modal size</td>
			</tr>
			<tr>
				<td><Code>position</Code></td>
				<td>string</td>
				<td>'center'</td>
				<td>Vertical position: center, top</td>
			</tr>
		</tbody>
	</Table>

	<Heading level={4} class="mt-8">dialogService.prompt(options)</Heading>
	<Paragraph>Returns <Code>Promise&lt;string | null&gt;</Code></Paragraph>
	<Table isStriped>
		<thead>
			<tr>
				<th>Option</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Code>title</Code></td>
				<td>string</td>
				<td>'Input'</td>
				<td>Dialog title</td>
			</tr>
			<tr>
				<td><Code>message</Code></td>
				<td>string</td>
				<td>'Enter value:'</td>
				<td>Dialog message</td>
			</tr>
			<tr>
				<td><Code>defaultValue</Code></td>
				<td>string</td>
				<td>''</td>
				<td>Initial input value</td>
			</tr>
			<tr>
				<td><Code>placeholder</Code></td>
				<td>string</td>
				<td>''</td>
				<td>Input placeholder</td>
			</tr>
			<tr>
				<td><Code>confirmText</Code></td>
				<td>string</td>
				<td>'OK'</td>
				<td>Confirm button text</td>
			</tr>
			<tr>
				<td><Code>cancelText</Code></td>
				<td>string</td>
				<td>'Cancel'</td>
				<td>Cancel button text</td>
			</tr>
			<tr>
				<td><Code>validator</Code></td>
				<td>function</td>
				<td>null</td>
				<td>Validation function: (value) =&gt; true | string</td>
			</tr>
			<tr>
				<td><Code>variant</Code></td>
				<td>string</td>
				<td>'primary'</td>
				<td>Header theme</td>
			</tr>
			<tr>
				<td><Code>size</Code></td>
				<td>string</td>
				<td>'sm'</td>
				<td>Modal size</td>
			</tr>
			<tr>
				<td><Code>position</Code></td>
				<td>string</td>
				<td>'center'</td>
				<td>Vertical position: center, top</td>
			</tr>
		</tbody>
	</Table>

	<Heading level={4} class="mt-8">dialogService.custom&lt;T&gt;(options)</Heading>
	<Paragraph>Returns <Code>Promise&lt;T&gt;</Code> - the value of the clicked button</Paragraph>
	<Table isStriped>
		<thead>
			<tr>
				<th>Option</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Code>title</Code></td>
				<td>string</td>
				<td>'Dialog'</td>
				<td>Dialog title</td>
			</tr>
			<tr>
				<td><Code>message</Code></td>
				<td>string</td>
				<td>''</td>
				<td>Dialog message</td>
			</tr>
			<tr>
				<td><Code>buttons</Code></td>
				<td>DialogButton[]</td>
				<td>(required)</td>
				<td>Array of button definitions</td>
			</tr>
			<tr>
				<td><Code>dismissValue</Code></td>
				<td>T</td>
				<td>undefined</td>
				<td>Value returned on Escape/backdrop click</td>
			</tr>
			<tr>
				<td><Code>variant</Code></td>
				<td>string</td>
				<td>'primary'</td>
				<td>Header theme</td>
			</tr>
			<tr>
				<td><Code>size</Code></td>
				<td>string</td>
				<td>'sm'</td>
				<td>Modal size: sm, md, lg, xl</td>
			</tr>
			<tr>
				<td><Code>position</Code></td>
				<td>string</td>
				<td>'center'</td>
				<td>Vertical position: center, top</td>
			</tr>
			<tr>
				<td><Code>class</Code></td>
				<td>string</td>
				<td>''</td>
				<td>Additional modal class</td>
			</tr>
			<tr>
				<td><Code>bodyClass</Code></td>
				<td>string</td>
				<td>''</td>
				<td>Additional body class</td>
			</tr>
			<tr>
				<td><Code>footerClass</Code></td>
				<td>string</td>
				<td>''</td>
				<td>Additional footer class</td>
			</tr>
		</tbody>
	</Table>

	<Heading level={4} class="mt-8">DialogButton&lt;T&gt;</Heading>
	<Paragraph>Button definition for custom dialogs</Paragraph>
	<Table isStriped>
		<thead>
			<tr>
				<th>Property</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Code>label</Code></td>
				<td>string</td>
				<td>(required)</td>
				<td>Button text</td>
			</tr>
			<tr>
				<td><Code>value</Code></td>
				<td>T</td>
				<td>(required)</td>
				<td>Value returned when clicked</td>
			</tr>
			<tr>
				<td><Code>variant</Code></td>
				<td>string</td>
				<td>'secondary'</td>
				<td>Button style variant</td>
			</tr>
			<tr>
				<td><Code>outline</Code></td>
				<td>boolean</td>
				<td>false</td>
				<td>Use isOutline button style</td>
			</tr>
			<tr>
				<td><Code>class</Code></td>
				<td>string</td>
				<td>''</td>
				<td>Additional button class</td>
			</tr>
			<tr>
				<td><Code>disabled</Code></td>
				<td>boolean</td>
				<td>false</td>
				<td>Disable the button</td>
			</tr>
		</tbody>
	</Table>
</Card>

<!-- Renders the toasts raised by the "Outcome → Toast" card above. -->
<ToastContainer position="top-end" />

<script lang="ts">
	import {
		Heading,
		Paragraph,
		Card,
		Grid,
		Column,
		Button,
		ButtonGroup,
		ToastContainer,
		CodeBlock,
		toastService
	} from '@keenmate/svelte-pure-admin';

	type Variant = 'primary' | 'success' | 'danger' | 'warning' | 'info';

	const variantSampleText: Record<Variant, { titleText: string; messageText: string }> = {
		primary: { titleText: 'Primary', messageText: 'This is a primary toast notification.' },
		success: { titleText: 'Success!', messageText: 'Your action was completed successfully.' },
		danger:  { titleText: 'Error',   messageText: 'An error occurred. Please try again.' },
		warning: { titleText: 'Warning', messageText: 'Please review this warning message.' },
		info:    { titleText: 'Information', messageText: 'Here is some useful information for you.' }
	};

	function fire(variant: Variant, opts: Partial<Parameters<typeof toastService.show>[0]> = {}) {
		const sample = variantSampleText[variant];
		toastService.show({
			variant,
			titleText: sample.titleText,
			messageText: sample.messageText,
			...opts
		});
	}

	function showStackingDemo() {
		toastService.success({ titleText: 'First Toast',  messageText: 'This is the first notification' });
		setTimeout(() => toastService.warning({ titleText: 'Second Toast', messageText: 'This is the second notification' }), 300);
		setTimeout(() => toastService.info({ titleText: 'Third Toast', messageText: 'This is the third notification' }),    600);
	}

	function fireUndoToast() {
		toastService.show({
			variant: 'danger',
			titleText: 'Item Deleted',
			messageText: '3 items moved to trash.',
			duration: 0,
			actions: [
				{ label: 'Undo',    variant: 'danger',    onclick: () => alert('Undo!') },
				{ label: 'Dismiss', variant: 'secondary' }
			]
		});
	}

	function fireRetryToast() {
		toastService.show({
			variant: 'warning',
			titleText: 'Upload Failed',
			messageText: 'Failed to upload report.pdf. Check your connection.',
			duration: 0,
			actions: [
				{ label: 'Retry',  variant: 'warning',   onclick: () => alert('Retrying...') },
				{ label: 'Cancel', variant: 'secondary' }
			]
		});
	}

	function fireUpdateToast() {
		toastService.show({
			variant: 'info',
			titleText: 'Update Available',
			messageText: 'Version 2.4.0 is ready to install.',
			duration: 0,
			actions: [
				{ label: 'Install Now', variant: 'info',      onclick: () => alert('Installing...') },
				{ label: 'Later',       variant: 'secondary' }
			]
		});
	}

	function fireFilledActionToast() {
		toastService.show({
			variant: 'success',
			isFilled: true,
			titleText: 'Feedback Sent',
			messageText: 'Thank you for your feedback!',
			duration: 0,
			actions: [
				{ label: 'Great', variant: 'success' },
				{ label: 'Close', variant: 'secondary' }
			]
		});
	}

	function firePersistentDismissibleToast() {
		const id = toastService.warning({
			titleText: 'Long-running task',
			messageText: 'This toast will dismiss itself in 8 seconds, or you can close it now.',
			duration: 0
		});
		setTimeout(() => toastService.dismiss(id), 8000);
	}
</script>

<!-- One container per position so the demo can show all 6 simultaneously.
     In a real app you typically mount only one. -->
<ToastContainer position="top-end" />
<ToastContainer position="top-center" />
<ToastContainer position="top-start" />
<ToastContainer position="bottom-end" />
<ToastContainer position="bottom-center" />
<ToastContainer position="bottom-start" />

<Paragraph>
	Temporary notification messages with auto-dismiss and smooth animations. Drive them
	imperatively via <code>toastService</code> — mount one <code>&lt;ToastContainer /&gt;</code>
	in your layout and call <code>toastService.show({'{ ... }'})</code> from anywhere.
</Paragraph>

<!-- 1. The basics -->
<Card titleText="Quick start">
	<CodeBlock>{`import { toastService, ToastContainer } from '@keenmate/svelte-pure-admin';

// Mount once in your root layout:
//   <ToastContainer position="top-end" />

// Anywhere in your app:
toastService.success('Saved!');
toastService.danger({ titleText: 'Failed', messageText: 'Could not save record' });

// Full control:
const id = toastService.show({
	variant: 'info',
	titleText: 'Processing',
	messageText: 'Please wait...',
	duration: 0,             // 0 = persistent until user dismisses
	maxWidth: '40rem',
	actions: [
		{ label: 'Cancel', variant: 'secondary', onclick: () => abort() }
	]
});

// Dismiss programmatically when done:
toastService.dismiss(id);

// Or dismiss everything:
toastService.dismissAll();`}</CodeBlock>

	<Paragraph class="mt-4">
		Sugar methods (<code>success</code>, <code>danger</code>, <code>warning</code>,
		<code>info</code>, <code>primary</code>) accept either a string (just the message) or
		a partial options object.
	</Paragraph>
</Card>

<!-- 2. Toast Positions -->
<Card titleText="Positions">
	<Paragraph>
		Each toast can target a position via the <code>position</code> option. Mount a
		<code>&lt;ToastContainer position="..." /&gt;</code> for every position you intend to use.
	</Paragraph>
	<Grid class="mt-4">
		<Column size="100" md="1-3">
			<Button variant="primary" isBlock onclick={() => fire('warning', { position: 'top-start' })}>
				Top Start
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="primary" isBlock onclick={() => fire('info',    { position: 'top-center' })}>
				Top Center
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="primary" isBlock onclick={() => fire('success', { position: 'top-end' })}>
				Top End (default)
			</Button>
		</Column>
	</Grid>
	<Grid class="mt-4">
		<Column size="100" md="1-3">
			<Button variant="secondary" isBlock onclick={() => fire('success', { position: 'bottom-start' })}>
				Bottom Start
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="secondary" isBlock onclick={() => fire('primary', { position: 'bottom-center' })}>
				Bottom Center
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="secondary" isBlock onclick={() => fire('danger',  { position: 'bottom-end' })}>
				Bottom End
			</Button>
		</Column>
	</Grid>
</Card>

<!-- 3. Variants -->
<Card titleText="Variants">
	<ButtonGroup>
		<Button variant="primary" onclick={() => toastService.primary('A primary notification.')}>Primary</Button>
		<Button variant="success" onclick={() => toastService.success('Operation completed successfully.')}>Success</Button>
		<Button variant="danger"  onclick={() => toastService.danger('Something went wrong.')}>Danger</Button>
		<Button variant="warning" onclick={() => toastService.warning('Heads up — review this.')}>Warning</Button>
		<Button variant="info"    onclick={() => toastService.info('Just so you know...')}>Info</Button>
	</ButtonGroup>
</Card>

<!-- 4. Progress bar -->
<Card titleText="Progress bar">
	<Heading level={4}>Standard</Heading>
	<ButtonGroup>
		<Button variant="primary" onclick={() => fire('primary', { shouldShowProgress: true })}>Primary</Button>
		<Button variant="success" onclick={() => fire('success', { shouldShowProgress: true })}>Success</Button>
		<Button variant="danger"  onclick={() => fire('danger',  { shouldShowProgress: true })}>Danger</Button>
		<Button variant="warning" onclick={() => fire('warning', { shouldShowProgress: true })}>Warning</Button>
		<Button variant="info"    onclick={() => fire('info',    { shouldShowProgress: true })}>Info</Button>
	</ButtonGroup>

	<Heading level={4} class="mt-4">Filled</Heading>
	<ButtonGroup>
		<Button variant="primary" onclick={() => fire('primary', { shouldShowProgress: true, isFilled: true })}>Primary</Button>
		<Button variant="success" onclick={() => fire('success', { shouldShowProgress: true, isFilled: true })}>Success</Button>
		<Button variant="danger"  onclick={() => fire('danger',  { shouldShowProgress: true, isFilled: true })}>Danger</Button>
		<Button variant="warning" onclick={() => fire('warning', { shouldShowProgress: true, isFilled: true })}>Warning</Button>
		<Button variant="info"    onclick={() => fire('info',    { shouldShowProgress: true, isFilled: true })}>Info</Button>
	</ButtonGroup>

	<Heading level={4} class="mt-4">Custom progress color</Heading>
	<ButtonGroup>
		<Button variant="primary" onclick={() => fire('primary', { shouldShowProgress: true, progressColor: '#e74c3c' })}>Red progress</Button>
		<Button variant="success" onclick={() => fire('success', { shouldShowProgress: true, progressColor: '#8b5cf6' })}>Purple progress</Button>
		<Button variant="info"    onclick={() => fire('info',    { shouldShowProgress: true, progressColor: '#14b8a6' })}>Teal progress</Button>
	</ButtonGroup>

	<Paragraph color="secondary" class="mt-4">
		Progress bar shows time remaining before auto-dismiss (default 5s — pass <code>duration</code> to change it).
	</Paragraph>
</Card>

<!-- 5. Persistent toasts -->
<Card titleText="Persistent toasts (manual or programmatic dismiss)">
	<Grid>
		<Column size="100" md="1-3">
			<Button variant="warning" isBlock onclick={() => fire('warning', { duration: 0, titleText: 'Important Warning', messageText: 'This is an important warning. Click the close button to dismiss.' })}>
				Important Warning
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="danger" isBlock onclick={() => fire('danger', { duration: 0, titleText: 'Critical Error', messageText: 'Critical error detected! This message will remain until you acknowledge it.' })}>
				Critical Error
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="info" isBlock onclick={firePersistentDismissibleToast}>
				Programmatic 8s dismiss
			</Button>
		</Column>
	</Grid>
	<Paragraph color="secondary" class="mt-4">
		<code>duration: 0</code> stays until manually closed. Capture the id from
		<code>show()</code> to dismiss programmatically (<code>toastService.dismiss(id)</code>).
	</Paragraph>
</Card>

<!-- 6. Action toasts -->
<Card
	titleText="Action toasts"
	subtitleText="Buttons separated from the body by a horizontal rule. Clicking an action dismisses the toast unless keepOpen is true."
>
	<ButtonGroup>
		<Button variant="danger"  onclick={fireUndoToast}>Undo Delete</Button>
		<Button variant="warning" onclick={fireRetryToast}>Retry Failed</Button>
		<Button variant="info"    onclick={fireUpdateToast}>Update Available</Button>
		<Button variant="success" onclick={fireFilledActionToast}>Filled + Actions</Button>
	</ButtonGroup>

	<CodeBlock class="mt-4">{`toastService.show({
	variant: 'danger',
	titleText: 'Item Deleted',
	messageText: '3 items moved to trash.',
	duration: 0,
	actions: [
		{ label: 'Undo',    variant: 'danger',    onclick: id => restore() },
		{ label: 'Dismiss', variant: 'secondary' }
	]
});`}</CodeBlock>
</Card>

<!-- 7. Stacking -->
<Card titleText="Multiple toasts (stacking)">
	<Button variant="primary" onclick={showStackingDemo}>Show 3 Toasts</Button>
	<Paragraph color="secondary" class="mt-4">
		Toasts automatically stack vertically in the container. Container width ratchets up
		to the widest toast and resets when empty.
	</Paragraph>
</Card>

<!-- 8. Filled variants -->
<Card titleText="Filled variants">
	<ButtonGroup>
		<Button variant="primary" onclick={() => fire('primary', { isFilled: true, titleText: 'Filled Primary', messageText: 'Full-color primary toast.' })}>Filled Primary</Button>
		<Button variant="success" onclick={() => fire('success', { isFilled: true, titleText: 'Filled Success', messageText: 'Full-color success toast.' })}>Filled Success</Button>
		<Button variant="danger"  onclick={() => fire('danger',  { isFilled: true, titleText: 'Filled Danger',  messageText: 'Full-color danger toast.' })}>Filled Danger</Button>
		<Button variant="warning" onclick={() => fire('warning', { isFilled: true, titleText: 'Filled Warning', messageText: 'Full-color warning toast.' })}>Filled Warning</Button>
		<Button variant="info"    onclick={() => fire('info',    { isFilled: true, titleText: 'Filled Info',    messageText: 'Full-color info toast.' })}>Filled Info</Button>
	</ButtonGroup>
</Card>

<!-- 9. Theme color toasts -->
<Card
	titleText="Theme color toasts"
	subtitleText="Use custom theme color slots (1-9). Colors are defined by the active theme."
>
	<ButtonGroup>
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as n}
			<Button themeColor={n as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} onclick={() => fire('primary', { themeColor: n as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, titleText: `Color ${n}`, messageText: `Theme color slot ${n} toast.` })}>Color {n}</Button>
		{/each}
	</ButtonGroup>

	<Heading level={4} class="mt-4">Filled</Heading>
	<ButtonGroup>
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as n}
			<Button themeColor={n as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} onclick={() => fire('primary', { themeColor: n as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, isFilled: true, titleText: `Filled Color ${n}`, messageText: `Filled theme color slot ${n} toast.` })}>Color {n}</Button>
		{/each}
	</ButtonGroup>
</Card>

<!-- 10. Bulk dismiss -->
<Card titleText="Bulk dismiss">
	<ButtonGroup>
		<Button variant="primary" onclick={showStackingDemo}>Spawn 3 toasts</Button>
		<Button variant="danger" isOutline onclick={() => toastService.dismissAll()}>Dismiss all</Button>
	</ButtonGroup>
</Card>

<!-- 11. CSS Classes Reference -->
<Card titleText="CSS classes reference">
	<Heading level={4}>Toast container</Heading>
	<CodeBlock>{`pa-toast-container              — Fixed-position wrapper
pa-toast-container--top-end     — Top end (default)
pa-toast-container--top-center  — Top center
pa-toast-container--top-start   — Top start
pa-toast-container--bottom-end  — Bottom end
pa-toast-container--bottom-center — Bottom center
pa-toast-container--bottom-start  — Bottom start`}</CodeBlock>

	<Heading level={4} class="mt-4">Toast item</Heading>
	<CodeBlock>{`pa-toast                — Base toast element
pa-toast--show          — Visible state
pa-toast--hide          — Dismissing state
pa-toast__icon          — Icon container
pa-toast__content       — Content wrapper
pa-toast__title         — Title text
pa-toast__message       — Message text
pa-toast__actions       — Action buttons container (border-top separator)
pa-toast__close         — Close button
pa-toast__progress      — Progress bar`}</CodeBlock>

	<Heading level={4} class="mt-4">Toast variants</Heading>
	<CodeBlock>{`pa-toast--primary / --success / --danger / --warning / --info
pa-toast--filled-primary / --filled-success / --filled-danger / --filled-warning / --filled-info
pa-toast--color-1 through --color-9
pa-toast--filled-color-1 through --filled-color-9`}</CodeBlock>
</Card>

<!-- 12. Service API -->
<Card titleText="Service API">
	<CodeBlock>{`type ToastVariant  = 'primary' | 'success' | 'danger' | 'warning' | 'info';
type ToastPosition = 'top-end' | 'top-center' | 'top-start'
                   | 'bottom-end' | 'bottom-center' | 'bottom-start';

interface ToastAction {
	label: string;
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	isOutline?: boolean;
	onclick?: (id: string) => void;
	keepOpen?: boolean;        // default false — toast auto-dismisses after action fires
}

interface ToastOptions {
	titleText: string;
	messageText: string;
	variant?: ToastVariant;
	themeColor?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
	isFilled?: boolean;
	duration?: number;          // ms; 0 = persistent
	shouldShowProgress?: boolean;
	progressColor?: string;
	maxWidth?: string;          // CSS width (e.g. '50rem')
	actions?: ToastAction[];
	iconClass?: string;         // FontAwesome class
	class?: string;
	position?: ToastPosition;   // default 'top-end'
}

toastService.show(options): string         // returns toast id
toastService.success(input): string        // input: string | Partial<ToastOptions>
toastService.danger(input): string
toastService.warning(input): string
toastService.info(input): string
toastService.primary(input): string
toastService.dismiss(id): void
toastService.dismissAll(): void`}</CodeBlock>
</Card>

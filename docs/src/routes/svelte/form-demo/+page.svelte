<script lang="ts">
	import {
		Paragraph,
		Heading,
		Card,
		TableCard,
		Grid,
		Column,
		FormGroup,
		FormLabel,
		FormHelp,
		Input,
		DateInput,
		Select,
		Textarea,
		Checkbox,
		Button,
		Alert,
		Callout,
		Badge,
		Table,
		Popconfirm,
		Toast,
		ToastContainer,
		BasicList,
		Link,
		Code,
		Text
	} from '@keenmate/svelte-pure-admin';
	import { tick } from 'svelte';

	type Entry = {
		id: number;
		first_name: string;
		last_name: string;
		email: string;
		department: string;
		start_date: string;
		bio: string;
		inserted_at: Date;
	};

	type Alertish = {
		variant: 'success' | 'danger' | 'info' | 'warning';
		title: string;
		message: string;
	} | null;

	type FieldErrors = Partial<Record<
		'first_name' | 'last_name' | 'email' | 'department' | 'start_date' | 'bio',
		string
	>>;

	const DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'Support', 'Product'];

	const FORCED_ERRORS: Required<FieldErrors> = {
		first_name: 'forced error: first name is bad',
		last_name: 'forced error: last name is bad',
		email: 'forced error: email is bad',
		department: 'forced error: pick a different one',
		start_date: 'forced error: date is off',
		bio: 'forced error: rewrite this'
	};

	// Seed rows — kept in sync with pure-admin/form-demo.js and keen-pure-admin/form_demo_live.ex
	// so all three demos show the same initial state.
	const SEED = [
		{
			first_name: 'Dale',
			last_name: 'Cooper',
			email: 'dale.cooper@twinpeaks.example',
			department: 'Support',
			start_date: '2024-02-24',
			bio: 'Damn fine coffee enthusiast. FBI-level attention to detail.',
			seconds_ago: 90
		},
		{
			first_name: 'Audrey',
			last_name: 'Horne',
			email: 'audrey.horne@twinpeaks.example',
			department: 'Sales',
			start_date: '2023-09-12',
			bio: 'Great Northern hospitality brought to enterprise accounts.',
			seconds_ago: 5 * 3600
		},
		{
			first_name: 'Donna',
			last_name: 'Hayward',
			email: 'donna.hayward@twinpeaks.example',
			department: 'Marketing',
			start_date: '2025-01-07',
			bio: '',
			seconds_ago: 3 * 86_400
		}
	];

	function seedEntries(): Entry[] {
		const now = Date.now();
		return SEED.map((e, i) => ({
			id: i + 1,
			first_name: e.first_name,
			last_name: e.last_name,
			email: e.email,
			department: e.department,
			start_date: e.start_date,
			bio: e.bio,
			inserted_at: new Date(now - e.seconds_ago * 1000)
		}));
	}

	// Form field state
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let department = $state('');
	let startDate = $state('');
	let bio = $state('');
	let forceErrors = $state(false);

	// Errors + alert
	let errors = $state<FieldErrors>({});
	let alertState = $state<Alertish>(null);

	// Table state
	const initialEntries = seedEntries();
	let entries = $state<Entry[]>(initialEntries);
	let nextId = $state(initialEntries.length + 1);
	let editingId = $state<number | null>(null);

	// Clock for relative-time reactivity
	let nowTick = $state(Date.now());
	$effect(() => {
		const interval = setInterval(() => {
			nowTick = Date.now();
		}, 30_000);
		return () => clearInterval(interval);
	});

	// Clear All popconfirm
	let showClearAllConfirm = $state(false);
	let clearAllTrigger = $state<HTMLElement | null>(null);

	// Delete toasts with undo
	type UndoToast = {
		id: number;
		removed: Entry;
		removedIndex: number;
		restored: boolean;
	};
	let undoToasts = $state<UndoToast[]>([]);
	let nextToastId = 1;

	const submitLabel = $derived(editingId !== null ? 'Update Entry' : 'Save Entry');

	function validate(): FieldErrors {
		if (forceErrors) return { ...FORCED_ERRORS };

		const e: FieldErrors = {};
		if (!firstName.trim()) e.first_name = 'first name is required';
		if (!lastName.trim()) e.last_name = 'last name is required';

		const mail = email.trim();
		if (!mail) e.email = 'email is required';
		else if (!(mail.includes('@') && mail.includes('.')))
			e.email = 'enter a valid email address';

		return e;
	}

	function clearFormFields() {
		firstName = '';
		lastName = '';
		email = '';
		department = '';
		startDate = '';
		bio = '';
	}

	function resetForm() {
		clearFormFields();
		errors = {};
		alertState = null;
	}

	function simulateServerSave(): Promise<{ ok: true } | { ok: false; error: string }> {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (Math.random() < 0.1) {
					resolve({ ok: false, error: 'Server is unavailable — please try again.' });
				} else {
					resolve({ ok: true });
				}
			}, 150);
		});
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		const v = validate();
		if (Object.keys(v).length > 0) {
			errors = v;
			alertState = {
				variant: 'danger',
				title: 'Validation failed',
				message: 'Please fix the errors below.'
			};
			return;
		}

		errors = {};
		alertState = null;

		const result = await simulateServerSave();
		if (!result.ok) {
			alertState = {
				variant: 'danger',
				title: editingId !== null ? 'Could not update entry' : 'Could not save entry',
				message: result.error
			};
			return;
		}

		const values = {
			first_name: firstName.trim(),
			last_name: lastName.trim(),
			email: email.trim(),
			department,
			start_date: startDate,
			bio: bio.trim()
		};

		if (editingId !== null) {
			const idx = entries.findIndex((x) => x.id === editingId);
			if (idx >= 0) {
				entries[idx] = {
					...entries[idx],
					...values,
					inserted_at: new Date()
				};
				entries = [...entries];
			}
			exitEditMode();
			alertState = { variant: 'success', title: 'Updated', message: 'Entry changes saved.' };
		} else {
			entries = [
				{
					id: nextId,
					...values,
					inserted_at: new Date()
				},
				...entries
			];
			nextId += 1;

			// Keep force-errors state across repeated submits so you can iterate on styles
			clearFormFields();
			alertState = { variant: 'success', title: 'Saved', message: 'Entry added to the list below.' };
		}
	}

	function enterEditMode(entry: Entry) {
		editingId = entry.id;
		firstName = entry.first_name ?? '';
		lastName = entry.last_name ?? '';
		email = entry.email ?? '';
		department = entry.department ?? '';
		startDate = entry.start_date ?? '';
		bio = entry.bio ?? '';
		forceErrors = false;
		errors = {};
		alertState = {
			variant: 'info',
			title: 'Edit mode',
			message: 'Make changes and click Update Entry.'
		};

		// Scroll form into view
		tick().then(() => {
			const formEl = document.getElementById('form-demo-form');
			formEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	}

	function exitEditMode() {
		editingId = null;
		clearFormFields();
		errors = {};
	}

	function cancelEdit() {
		exitEditMode();
		alertState = null;
	}

	function handleReset() {
		clearFormFields();
		errors = {};
		alertState = null;
		// force-errors is cleared too on explicit reset
		forceErrors = false;
	}

	function deleteEntry(entry: Entry) {
		const idx = entries.findIndex((x) => x.id === entry.id);
		if (idx < 0) return;

		const removed = entries[idx];
		entries = entries.filter((_, i) => i !== idx);

		if (editingId === entry.id) exitEditMode();

		undoToasts = [
			...undoToasts,
			{ id: nextToastId++, removed, removedIndex: idx, restored: false }
		];
	}

	function undoDelete(toast: UndoToast) {
		if (toast.restored) return;
		toast.restored = true;

		const insertAt = Math.min(toast.removedIndex, entries.length);
		entries = [...entries.slice(0, insertAt), toast.removed, ...entries.slice(insertAt)];

		undoToasts = undoToasts.filter((t) => t.id !== toast.id);
	}

	function dismissUndoToast(toast: UndoToast) {
		undoToasts = undoToasts.filter((t) => t.id !== toast.id);
	}

	function clearAll() {
		if (entries.length === 0) return;
		entries = [];
		if (editingId !== null) exitEditMode();
		alertState = { variant: 'info', title: 'Cleared', message: 'All entries removed.' };
	}

	// Formatting helpers
	function fullName(e: Entry): string {
		return [e.first_name, e.last_name].filter(Boolean).join(' ');
	}

	function truncate(s: string, max: number): string {
		if (!s) return '';
		return s.length > max ? s.slice(0, max) + '…' : s;
	}

	// Matches PureAdmin.DateTime.relative/2 and pure-admin's relativeTime() so all
	// three demos produce the same phrasing.
	function relativeTime(dt: Date, now: number = nowTick): string {
		const diff = Math.round((now - dt.getTime()) / 1000);
		const abs = Math.abs(diff);
		const future = diff < 0;
		const wrap = (p: string) => (future ? `in ${p}` : `${p} ago`);

		if (abs <= 5) return 'now';
		if (abs < 60) return wrap(`${abs} seconds`);
		if (abs < 120) return future ? 'in a minute' : 'a minute ago';
		if (abs < 3600) return wrap(`${Math.floor(abs / 60)} minutes`);
		if (abs < 7200) return future ? 'in an hour' : 'an hour ago';
		if (abs < 86400) return wrap(`${Math.floor(abs / 3600)} hours`);
		if (abs < 172800) return future ? 'tomorrow' : 'yesterday';
		if (abs < 604800) return wrap(`${Math.floor(abs / 86400)} days`);
		if (abs < 1209600) return future ? 'in a week' : 'a week ago';
		if (abs < 2592000) return wrap(`${Math.floor(abs / 604800)} weeks`);
		if (abs < 5184000) return future ? 'in a month' : 'a month ago';
		if (abs < 31536000) return wrap(`${Math.floor(abs / 2592000)} months`);
		if (abs < 63072000) return future ? 'in a year' : 'a year ago';
		return wrap(`${Math.floor(abs / 31536000)} years`);
	}

	const MONTH_NAMES = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	function longDateTime(dt: Date): string {
		const pad = (n: number) => String(n).padStart(2, '0');
		return `${MONTH_NAMES[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()} at ` +
			`${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
	}
</script>

<Paragraph>
	End-to-end example of building a CRUD form with svelte-pure-admin components wired through
	Svelte 5 runes. Submissions land in an in-memory store scoped to this browser tab, and the
	table below renders them with inline editing, a toast-based <em>Undo</em> on delete, and a
	simulated server failure so you can see how error states are surfaced.
</Paragraph>

<Callout variant="info" class="mb-4">
	<strong>Things to try:</strong>
	<ul class="mt-2 mb-0">
		<li>Submit valid data — the form resets and a success alert replaces any prior status.</li>
		<li>
			Tick <em>Force validation errors</em> before saving — typed values stick and every field
			shows an inline error via the <Code>errors</Code> prop on each input.
		</li>
		<li>
			Click the pencil to edit a row inline; the submit button switches to
			<em>Update Entry</em> and a <em>Cancel</em> button appears.
		</li>
		<li>
			Click × to delete — the entry disappears and a toast with an <em>Undo</em> action gives
			you a few seconds to bring it back.
		</li>
		<li>
			Save with no network luck — submits have a ~10% chance of a simulated failure, which
			renders a dismissible danger alert without clearing the form.
		</li>
		<li>
			Refresh the page — entries reset to the three seed rows, so you can <em>Clear All</em>
			and reload to get back to a clean demo state.
		</li>
	</ul>
</Callout>

<!-- New Entry -->
<Card titleText={editingId !== null ? 'Edit Entry' : 'New Entry'} isHeaderUnderlined>
	{#if alertState}
		<Alert
			variant={alertState.variant}
			isDismissible
			class="mb-4"
			ondismiss={() => (alertState = null)}
		>
			<strong>{alertState.title}</strong>
			<p class="mb-0">{alertState.message}</p>
		</Alert>
	{/if}

	<form id="form-demo-form" onsubmit={handleSubmit} novalidate>
		<Grid>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>First Name</FormLabel>
					<Input
						id="fd-first-name"
						name="first_name"
						placeholder="Jane"
						autocomplete="given-name"
						bind:value={firstName}
						errors={errors.first_name}
						required
					/>
					{#if errors.first_name}
						<FormHelp variant="error">{errors.first_name}</FormHelp>
					{/if}
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>Last Name</FormLabel>
					<Input
						id="fd-last-name"
						name="last_name"
						placeholder="Doe"
						autocomplete="family-name"
						bind:value={lastName}
						errors={errors.last_name}
						required
					/>
					{#if errors.last_name}
						<FormHelp variant="error">{errors.last_name}</FormHelp>
					{/if}
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						id="fd-email"
						name="email"
						placeholder="jane@example.com"
						autocomplete="email"
						bind:value={email}
						errors={errors.email}
						required
					/>
					{#if errors.email}
						<FormHelp variant="error">{errors.email}</FormHelp>
					{/if}
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>Department</FormLabel>
					<Select
						id="fd-department"
						name="department"
						bind:value={department}
						errors={errors.department}
					>
						<option value="">Choose a department...</option>
						{#each DEPARTMENTS as dept}
							<option value={dept}>{dept}</option>
						{/each}
					</Select>
					{#if errors.department}
						<FormHelp variant="error">{errors.department}</FormHelp>
					{/if}
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>Start Date</FormLabel>
					<DateInput
						id="fd-start-date"
						name="start_date"
						bind:value={startDate}
						errors={errors.start_date}
					/>
					{#if errors.start_date}
						<FormHelp variant="error">{errors.start_date}</FormHelp>
					{/if}
				</FormGroup>
			</Column>

			<Column size="100">
				<FormGroup>
					<FormLabel>Bio</FormLabel>
					<Textarea
						id="fd-bio"
						name="bio"
						rows={3}
						placeholder="A few words about this person..."
						bind:value={bio}
						errors={errors.bio}
					/>
					{#if errors.bio}
						<FormHelp variant="error">{errors.bio}</FormHelp>
					{/if}
				</FormGroup>
			</Column>

			<Column size="100">
				<FormGroup>
					<Checkbox
						id="fd-force-errors"
						name="force_errors"
						bind:checked={forceErrors}
						labelText="Force validation errors on every field (for testing that values stick and errors render)"
					/>
				</FormGroup>
			</Column>
		</Grid>

		<div class="pa-form-actions justify-content-end">
			{#if editingId !== null}
				<Button type="button" variant="secondary" onclick={cancelEdit}>Cancel</Button>
			{:else}
				<Button type="button" variant="secondary" onclick={handleReset}>Reset</Button>
			{/if}
			<Button type="submit" variant="primary">
				<span class="pa-icon pa-icon--save" aria-hidden="true"></span>
				{submitLabel}
			</Button>
		</div>
	</form>
</Card>

<!-- Stored Submissions -->
<TableCard titleText="Stored Submissions" isScrollable>
	{#snippet headerActions()}
		<Badge variant="secondary">{entries.length} total</Badge>
		{#if entries.length > 0}
			<Button
				variant="danger"
				size="sm"
				onclick={(e: MouseEvent) => {
					clearAllTrigger = e.currentTarget as HTMLElement;
					showClearAllConfirm = !showClearAllConfirm;
				}}
			>
				<span class="pa-icon pa-icon--delete" aria-hidden="true"></span> Clear All
			</Button>
		{/if}
	{/snippet}

	{#if entries.length === 0}
		<Callout variant="info" class="m-3">
			No submissions yet. Fill in the form above and click <strong>Save Entry</strong>.
		</Callout>
	{:else}
		<Table isStriped isHover>
			<thead>
				<tr>
					<th style="width:88px"></th>
					<th>Name</th>
					<th>Email</th>
					<th>Department</th>
					<th>Start Date</th>
					<th>Bio</th>
					<th>Submitted</th>
				</tr>
			</thead>
			<tbody>
				{#each entries as e (e.id)}
					<tr class:is-editing={e.id === editingId}>
						<td>
							<div class="pa-btn-group">
								<Button
									variant="danger"
									size="xs"
									title="Delete entry"
									onclick={() => deleteEntry(e)}
								>
									<span class="pa-icon pa-icon--remove" aria-hidden="true"></span>
								</Button>
								<Button
									variant="secondary"
									size="xs"
									title="Edit entry"
									onclick={() => enterEditMode(e)}
								>
									<span class="pa-icon pa-icon--edit" aria-hidden="true"></span>
								</Button>
							</div>
						</td>
						<td>{fullName(e)}</td>
						<td><Link href={`mailto:${e.email}`}>{e.email}</Link></td>
						<td>
							{#if e.department}
								<Badge variant="info">{e.department}</Badge>
							{:else}
								<Text variant="secondary">—</Text>
							{/if}
						</td>
						<td>
							{#if e.start_date}
								{e.start_date}
							{:else}
								<Text variant="secondary">—</Text>
							{/if}
						</td>
						<td>
							{#if e.bio}
								<span title={e.bio}>{truncate(e.bio, 60)}</span>
							{:else}
								<Text variant="secondary">—</Text>
							{/if}
						</td>
						<td>
							<Text variant="secondary" titleText={longDateTime(e.inserted_at)}>
								{relativeTime(e.inserted_at)}
							</Text>
						</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/if}
</TableCard>

<Popconfirm
	bind:show={showClearAllConfirm}
	trigger={clearAllTrigger}
	messageText="Remove all stored submissions?"
	icon="danger"
	confirmText="Clear all"
	confirmVariant="danger"
	onconfirm={clearAll}
/>

<!-- How it works -->
<Card titleText="How it works">
	<Heading level={4}>Form binding</Heading>
	<BasicList spacing="compact">
		<li>
			Each field is a Svelte 5 <Code>$state</Code> primitive, bound to an
			<Code>Input</Code> / <Code>Select</Code> / <Code>Textarea</Code> via
			<Code>bind:value</Code>. Errors are a single <Code>FieldErrors</Code> record and flow
			into each input through the <Code>errors</Code> prop — the control auto-applies
			<Code>pa-input--error</Code> and sets <Code>aria-invalid</Code>.
		</li>
		<li>
			Validation returns a plain <Code>{'{ field: message }'}</Code> object; the renderer
			shows inline <Code>FormHelp</Code> under each flagged field. The <em>Force validation
			errors</em> checkbox short-circuits validation to a fixed error map so you can inspect all
			six states without crafting bad input.
		</li>
		<li>
			A successful submit clears only the inputs — the <em>Force validation errors</em>
			checkbox keeps its state so you can submit repeatedly while tweaking styles. Explicit
			<em>Reset</em> also resets the checkbox.
		</li>
	</BasicList>

	<Heading level={4} class="mt-4">State &amp; UX</Heading>
	<BasicList spacing="compact">
		<li>
			Entries are a reactive <Code>$state</Code> array keyed by an incrementing id. The table
			re-renders via Svelte's keyed <Code>{'{#each}'}</Code> on every change — simple, and
			small enough that manual diffing isn't worth the complexity.
		</li>
		<li>
			The summary alert above the form uses <strong>replace</strong> semantics: each outcome
			(validation failure, simulated server error, success, edit-mode entry) overwrites the
			previous banner so stacking never happens.
		</li>
		<li>
			Delete uses the optimistic <em>toast + undo</em> pattern via the <Code>Toast</Code>
			component rendered into a <Code>ToastContainer</Code>. The row disappears immediately;
			an <em>Undo</em> button on the toast restores it at its original position before the
			toast auto-dismisses.
		</li>
		<li>
			The destructive bulk action (<em>Clear All</em>) uses <Code>Popconfirm</Code> because
			there's no undo affordance — losing the whole set silently would be surprising.
		</li>
		<li>
			Submits are run through a <Code>simulateServerSave()</Code> promise that resolves with
			a ~10% failure rate after a short delay, so the success / danger alert paths are both
			exercisable without tooling.
		</li>
		<li>
			The <em>Submitted</em> column uses a local <Code>relativeTime()</Code> function whose
			buckets match <Code>PureAdmin.DateTime.relative/2</Code> and
			pure-admin's <Code>form-demo.js</Code>; a 30-second tick forces re-render so phrasing
			stays current.
		</li>
	</BasicList>
</Card>

<!-- Toast container with undo toasts -->
<ToastContainer position="top-end">
	{#each undoToasts as toast (toast.id)}
		<Toast
			variant="info"
			titleText="Entry removed"
			messageText={`${fullName(toast.removed) || 'Entry'} was deleted.`}
			duration={6000}
			onclose={() => dismissUndoToast(toast)}
		>
			{#snippet actions()}
				<Button size="xs" variant="primary" onclick={() => undoDelete(toast)}>Undo</Button>
				<Button size="xs" variant="secondary" onclick={() => dismissUndoToast(toast)}>
					Dismiss
				</Button>
			{/snippet}
		</Toast>
	{/each}
</ToastContainer>

<style>
	.pa-form-actions {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
		margin-top: 1rem;
	}

	.is-editing {
		background-color: var(--pc-color-primary-bg-subtle, rgba(0, 123, 255, 0.08));
	}
</style>

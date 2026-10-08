<script lang="ts">
	import {
		Heading,
		Paragraph,
		Card,
		Badge,
		Alert,
		ContainerBreakpoint,
		Breaker,
		Form,
		FormGroup,
		FormLabel,
		FormHelp,
		FormActions,
		Input,
		Select,
		Textarea,
		Button,
		CodeBlock
	} from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>
	A responsive form that adapts to <strong>its own width</strong>, not the viewport. <code>&lt;ContainerBreakpoint&gt;</code>
	maps the container's inline size to a named <code>mode</code> (compact / comfy / wide); <code>&lt;Breaker&gt;</code>
	shows or hides secondary fields per mode while keeping them mounted, so field state survives a resize. Drag the
	splitter / resize the window and watch fields appear and disappear.
</Paragraph>

<Alert variant="info">
	Essentials (name, email) are always visible. Secondary fields (phone, company) appear from
	<strong>comfy</strong> up; tertiary fields (role, notes) only in <strong>wide</strong>.
</Alert>

<Card titleText="New contact" hasPadding={false} bodyClass="p-4">
	<ContainerBreakpoint steps={{ compact: 0, comfy: 34, wide: 64 }} initial="comfy">
		{#snippet children({ mode })}
			<div class="mb-3">
				Current mode: <Badge variant="primary">{mode}</Badge>
			</div>

			<Form>
				<FormGroup>
					<FormLabel>Full name</FormLabel>
					<Input id="rf-name" name="name" placeholder="Jane Doe" required />
				</FormGroup>
				<FormGroup>
					<FormLabel>Email</FormLabel>
					<Input id="rf-email" type="email" name="email" placeholder="jane@acme.com" required />
				</FormGroup>

				<Breaker {mode} show="comfy wide">
					<FormGroup>
						<FormLabel>Phone</FormLabel>
						<Input id="rf-phone" type="tel" name="phone" placeholder="+1 555 0142" />
					</FormGroup>
					<FormGroup>
						<FormLabel>Company</FormLabel>
						<Input id="rf-company" name="company" placeholder="Acme Inc." />
					</FormGroup>
				</Breaker>

				<Breaker {mode} show="wide">
					<FormGroup>
						<FormLabel>Role</FormLabel>
						<Select id="rf-role" name="role">
							<option value="">Select a role…</option>
							<option value="owner">Owner</option>
							<option value="admin">Admin</option>
							<option value="member">Member</option>
						</Select>
					</FormGroup>
					<FormGroup>
						<FormLabel>Notes</FormLabel>
						<Textarea id="rf-notes" name="notes" placeholder="Anything else we should know?" />
						<FormHelp>Only shown when the form has room to breathe.</FormHelp>
					</FormGroup>
				</Breaker>

				<FormActions>
					<Button variant="primary">Save contact</Button>
					<Button variant="secondary">Cancel</Button>
				</FormActions>
			</Form>
		{/snippet}
	</ContainerBreakpoint>
</Card>

<Card titleText="Usage">
	<Heading level={4}>Container-aware field folding</Heading>
	<CodeBlock language="html">{`<ContainerBreakpoint steps={{ compact: 0, comfy: 34, wide: 64 }} initial="comfy">
  {#snippet children({ mode })}
    <FormGroup> …essentials, always visible… </FormGroup>

    <Breaker {mode} show="comfy wide">
      <FormGroup> …secondary fields… </FormGroup>
    </Breaker>

    <Breaker {mode} show="wide">
      <FormGroup> …tertiary fields… </FormGroup>
    </Breaker>
  {/snippet}
</ContainerBreakpoint>`}</CodeBlock>
</Card>

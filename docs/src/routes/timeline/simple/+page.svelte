<script lang="ts">
			import { Heading, Paragraph, Card, Timeline, TimelineItem, Button, Alert, BasicList, CodeBlock } from '@keenmate/svelte-pure-admin';
	import type { TimelineItemVariant } from '@keenmate/svelte-pure-admin';

	// Example: System log data from API/database
	interface SystemLog {
		id: number;
		timestamp: string;
		level: 'info' | 'success' | 'warning' | 'error';
		message: string;
		isCritical: boolean;
	}

	const systemLogs: SystemLog[] = [
		{ id: 1, timestamp: '09:00 AM', level: 'info', message: 'System startup initialized', isCritical: false },
		{ id: 2, timestamp: '09:15 AM', level: 'success', message: 'Database connection established successfully', isCritical: false },
		{ id: 3, timestamp: '09:30 AM', level: 'info', message: 'Running scheduled maintenance tasks', isCritical: false },
		{ id: 4, timestamp: '10:00 AM', level: 'warning', message: 'High memory usage detected (85%)', isCritical: false },
		{ id: 5, timestamp: '10:15 AM', level: 'error', message: 'Critical error in payment processor - investigation required', isCritical: true },
		{ id: 6, timestamp: '10:30 AM', level: 'success', message: 'Payment processor issue resolved', isCritical: false },
	];

	// Map log level to timeline variant
	function getLogVariant(log: SystemLog): TimelineItemVariant {
		const map: Record<string, TimelineItemVariant> = {
			info: 'info',
			success: 'success',
			warning: 'warning',
			error: 'danger'
		};
		return map[log.level] || 'secondary';
	}

	// Transform message for display (add prefix for critical items)
	function getDisplayMessage(log: SystemLog): string {
		return log.isCritical ? `🚨 CRITICAL: ${log.message}` : log.message;
	}

	// Handle log click
	function handleLogClick(log: SystemLog, event: MouseEvent) {
		console.log('Log clicked:', log);
		alert(`Log ID: ${log.id}\nLevel: ${log.level}\nTime: ${log.timestamp}\n\n${log.message}`);
	}

	// Example: Activity feed data with pagination
	interface Activity {
		id: number;
		time: string;
		type: 'user' | 'system' | 'feature' | 'warning' | 'billing';
		message: string;
	}

	const allActivities: Activity[] = [
		{ id: 1, time: '2 hours ago', type: 'user', message: 'User Sarah Johnson completed onboarding process' },
		{ id: 2, time: '3 hours ago', type: 'feature', message: 'New feature request submitted: Dark mode toggle' },
		{ id: 3, time: '5 hours ago', type: 'system', message: 'System update v2.3.1 deployed successfully' },
		{ id: 4, time: '1 day ago', type: 'warning', message: 'Storage usage approaching 80% capacity' },
		{ id: 5, time: '2 days ago', type: 'billing', message: 'Monthly billing cycle completed' },
		{ id: 6, time: '3 days ago', type: 'user', message: 'New user registration: Mike Chen' },
		{ id: 7, time: '4 days ago', type: 'feature', message: 'Feature launched: Email notifications' },
		{ id: 8, time: '5 days ago', type: 'system', message: 'Database backup completed successfully' },
		{ id: 9, time: '6 days ago', type: 'warning', message: 'High CPU usage detected on server-02' },
		{ id: 10, time: '1 week ago', type: 'billing', message: 'Invoice sent to 150 customers' },
		{ id: 11, time: '1 week ago', type: 'user', message: 'User Emma Wilson upgraded to Pro plan' },
		{ id: 12, time: '1 week ago', type: 'system', message: 'Security patch 3.2.1 applied' },
	];

	// Pagination state
	let visibleCount = $state(5);
	const pageSize = 5;

	// Get visible activities
	const visibleActivities = $derived(allActivities.slice(0, visibleCount));

	// Check if there are more to load
	const hasMore = $derived(visibleCount < allActivities.length);

	// Load more function
	function loadMore() {
		visibleCount = Math.min(visibleCount + pageSize, allActivities.length);
	}

	// Map activity type to variant
	function getActivityVariant(activity: Activity): TimelineItemVariant {
		const map: Record<string, TimelineItemVariant> = {
			user: 'success',
			system: 'info',
			feature: 'primary',
			warning: 'warning',
			billing: 'secondary'
		};
		return map[activity.type] || 'secondary';
	}
</script>

<!-- Color-coded Events -->
<Card titleText="Color-coded Events">

	<Timeline variant="simple">
		<TimelineItem timeText="09:00 AM" variant="primary">
			System startup initialized
		</TimelineItem>
		<TimelineItem timeText="09:15 AM" variant="success">
			Database connection established successfully
		</TimelineItem>
		<TimelineItem timeText="09:30 AM" variant="info">
			Running scheduled maintenance tasks
		</TimelineItem>
		<TimelineItem timeText="10:00 AM" variant="warning">
			High memory usage detected (85%)
		</TimelineItem>
		<TimelineItem timeText="10:15 AM" variant="danger">
			Critical error in payment processor - investigation required
		</TimelineItem>
		<TimelineItem timeText="10:30 AM" variant="success">
			Payment processor issue resolved
		</TimelineItem>
		<TimelineItem timeText="11:00 AM" variant="secondary">
			System backup completed
		</TimelineItem>
		<TimelineItem timeText="11:30 AM" variant="primary">
			New deployment scheduled for 2:00 PM
		</TimelineItem>
	</Timeline>
</Card>

<!-- Filled Bullets -->
<Card titleText="Filled Bullets">

	<Timeline variant="simple">
		<TimelineItem timeText="Jan 2025" variant="primary" isFilled>
			Project kickoff meeting with stakeholders
		</TimelineItem>
		<TimelineItem timeText="Feb 2025" variant="success" isFilled>
			Phase 1 development completed
		</TimelineItem>
		<TimelineItem timeText="Mar 2025" variant="info" isFilled>
			User acceptance testing in progress
		</TimelineItem>
		<TimelineItem timeText="Apr 2025" variant="warning" isFilled>
			Performance optimization required before launch
		</TimelineItem>
		<TimelineItem timeText="May 2025" variant="secondary" isFilled>
			Production deployment scheduled
		</TimelineItem>
	</Timeline>
</Card>

<!-- Data-Driven Timeline (KeenMate Pattern) -->
<Card titleText="Data-Driven Timeline (KeenMate Pattern)">
	{#snippet header()}
		<Paragraph>
			Timeline populated from database/API data with member mappings and callbacks
		</Paragraph>
	{/snippet}

	<Heading level={4}>Using Callbacks for Transformation</Heading>
	<Paragraph>Click items to view details. Critical items get 🚨 prefix via callback.</Paragraph>

	<Timeline
		variant="simple"
		data={systemLogs}
		timeMember="timestamp"
		getVariantCallback={getLogVariant}
		getContentCallback={getDisplayMessage}
		filledMember="isCritical"
		onitemclick={handleLogClick}
		idMember="id"
	/>

	<Alert variant="success">
		<small>
			<strong>Callbacks = Simple Transformations:</strong> Use
			<code>getVariantCallback</code> to map your data's status field to timeline colors. Use
			<code>getContentCallback</code> to transform messages (like adding prefixes). For complex
			rendering, use templates instead!
		</small>
	</Alert>
</Card>

<!-- Load More Example -->
<Card titleText="Timeline with Load More (Pagination)">
	{#snippet header()}
		<Paragraph>
			Data-driven timeline with pagination - showing {visibleActivities.length} of {allActivities.length} activities
		</Paragraph>
	{/snippet}

	<Timeline
		variant="simple"
		data={visibleActivities}
		timeMember="time"
		contentMember="message"
		getVariantCallback={getActivityVariant}
		idMember="id"
	/>

	{#if hasMore}
		<div class="mt-4 text-center">
			<Button variant="secondary" size="sm" onclick={loadMore}>
				Load more events ({allActivities.length - visibleCount} remaining)
			</Button>
		</div>
	{:else}
		<div class="mt-4 text-center">
			<Paragraph color="secondary" class="text-sm">
				All activities loaded
			</Paragraph>
		</div>
	{/if}
</Card>

<!-- Virtual Scroll Example -->
<Card titleText="Virtual Scroll (Large Dataset)">

	<Paragraph class="mb-4">For very large timelines with hundreds or thousands of events, virtual scrolling can improve performance.</Paragraph>

	<!-- NOTE: Virtual scroll requires pa-virtual-scroll component which doesn't exist yet -->
	<!-- Using regular timeline for now with note -->
	<div class="maxhr-40 overflow-y-auto border rounded p-4">
		<Timeline variant="simple">
			{#each Array.from({ length: 50 }, (_, i) => i) as index}
				<TimelineItem
					timeText={`Event ${index + 1}`}
					variant={(['primary', 'secondary', 'success', 'info', 'warning', 'danger'] as const)[index % 6]}
				>
					Activity log entry #{index + 1} - {['User login', 'File uploaded', 'Settings changed', 'Report generated', 'Email sent', 'Task completed'][index % 6]}
				</TimelineItem>
			{/each}
		</Timeline>
	</div>

	<Paragraph class="mt-4 text-secondary text-sm">
		<strong>Note:</strong> True virtual scrolling with <code>pa-virtual-scroll</code> component is not yet implemented.
		This example uses regular scrolling with overflow.
	</Paragraph>
</Card>

<!-- Usage Examples -->
<Card titleText="Usage Examples">

	<Heading level={4}>Basic Timeline</Heading>
	<CodeBlock class="mb-4">{`<Timeline variant="simple">
  <TimelineItem timeText="09:00 AM" variant="primary">
    Event description
  </TimelineItem>
  <TimelineItem timeText="10:00 AM" variant="success">
    Another event
  </TimelineItem>
</Timeline>`}</CodeBlock>

	<Heading level={4}>Filled Bullets</Heading>
	<CodeBlock class="mb-4">{`<TimelineItem timeText="Jan 2025" variant="primary" isFilled>
  Milestone completed
</TimelineItem>`}</CodeBlock>

	<Heading level={4}>Available Variants</Heading>
	<BasicList>
		<li><code>variant="primary"</code> - Blue (default system events)</li>
		<li><code>variant="secondary"</code> - Gray (routine events)</li>
		<li><code>variant="success"</code> - Green (successful operations)</li>
		<li><code>variant="info"</code> - Cyan (informational messages)</li>
		<li><code>variant="warning"</code> - Orange (warnings)</li>
		<li><code>variant="danger"</code> - Red (errors/critical events)</li>
	</BasicList>
</Card>

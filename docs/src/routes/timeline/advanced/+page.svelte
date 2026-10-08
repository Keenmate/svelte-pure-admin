<script lang="ts">
	import { Heading, Paragraph, Card, Timeline, TimelineItem, CodeBlock } from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>
	The <strong>advanced</strong> (alternating) timeline zig-zags items left/right of a central spine, each with a
	date and an icon marker. Pass <code>date</code> + <code>iconText</code> on each <code>&lt;TimelineItem&gt;</code>
	and <code>variant="alternating"</code> on the <code>&lt;Timeline&gt;</code>. Use <code>alignment</code> to force a
	side, or <code>isSingleColumn</code> to collapse to one column.
</Paragraph>

<Card titleText="Alternating timeline">
	<Timeline variant="alternating">
		<TimelineItem variant="success" date="Jan 15, 2024" iconText="🚀">
			<strong>Project Started</strong> — kicked off with the initial planning meeting.
		</TimelineItem>
		<TimelineItem variant="info" date="Feb 28, 2024" iconText="🎨">
			<strong>Design Phase Complete</strong> — all wireframes and mockups approved by stakeholders.
		</TimelineItem>
		<TimelineItem variant="warning" date="Mar 15, 2024" iconText="⚙️">
			<strong>Development In Progress</strong> — frontend and backend underway, ~60% complete.
		</TimelineItem>
		<TimelineItem variant="primary" date="Apr 1, 2024" iconText="🧪">
			<strong>Testing Phase</strong> — QA testing has begun; bug fixes addressed as found.
		</TimelineItem>
		<TimelineItem variant="danger" date="May 1, 2024" iconText="🎯">
			<strong>Launch</strong> — target date for the production release.
		</TimelineItem>
	</Timeline>
</Card>

<Card titleText="Forced to one side (alignment)">
	{#snippet header()}
		<Paragraph>Set <code>alignment="start"</code> to keep every item on the start side instead of zig-zagging.</Paragraph>
	{/snippet}
	<Timeline variant="alternating" alignment="start">
		<TimelineItem variant="primary" date="09:00" iconText="1">Stand-up and sprint planning.</TimelineItem>
		<TimelineItem variant="success" date="12:30" iconText="2">Feature branch merged to main.</TimelineItem>
		<TimelineItem variant="info" date="16:00" iconText="3">Design review with the product team.</TimelineItem>
	</Timeline>
</Card>

<Card titleText="Usage">
	<Heading level={4}>Alternating</Heading>
	<CodeBlock language="html" class="mb-4">{`<Timeline variant="alternating">
  <TimelineItem variant="success" date="Jan 15, 2024" iconText="🚀">
    Project started
  </TimelineItem>
  <TimelineItem variant="info" date="Feb 28, 2024" iconText="🎨">
    Design phase complete
  </TimelineItem>
</Timeline>`}</CodeBlock>

	<Heading level={4}>Force one side / single column</Heading>
	<CodeBlock language="html">{`<Timeline variant="alternating" alignment="start"> … </Timeline>
<Timeline variant="alternating" isSingleColumn> … </Timeline>`}</CodeBlock>
</Card>

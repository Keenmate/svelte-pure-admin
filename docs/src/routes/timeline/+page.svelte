<script lang="ts">
	import {
		Heading,
		Paragraph,
		Card,
		Timeline,
		TimelineItem,
		Button,
		Badge,
		CodeBlock,
		BasicList,
		Callout
	} from '@keenmate/svelte-pure-admin';
</script>

<!-- Activity Feed -->
<Card titleText="Activity Feed">

	<Timeline variant="feed">
		<TimelineItem
			avatarUrl="https://ui-avatars.com/api/?name=Luna+Bonifacio&background=3b82f6&color=fff"
			variant="primary"
		>
							<div>
					<strong>Luna Bonifacio</strong> changed 2 attributes
				</div>
				<div class="text-muted text-sm mt-1">
					Jan 21, 2021
				</div>
		</TimelineItem>

		<TimelineItem
			avatarUrl="https://ui-avatars.com/api/?name=Yoan+Almedia&background=10b981&color=fff"
			variant="success"
		>
							<div>
					<strong>Yoan Almedia</strong> moved Eric Lubin to "Technical Test"
				</div>
				<div class="text-muted text-sm mt-1">
					Jan 20, 2021
				</div>
		</TimelineItem>

		<TimelineItem
			avatarUrl="https://ui-avatars.com/api/?name=Yoan+Almedia&background=10b981&color=fff"
			variant="info"
		>
							<div>
					<strong>Yoan Almedia</strong> commented on an assignment
				</div>
				<div class="text-muted text-sm mt-1">
					Jan 20, 2021
				</div>
				<Callout variant="info" class="mt-3">
					<Paragraph class="mb-0 text-sm text-muted">
						"I've reviewed the candidate's technical test submission. The code quality is excellent and demonstrates strong understanding of React patterns. I recommend moving forward with the next interview stage."
					</Paragraph>
				</Callout>
		</TimelineItem>

		<TimelineItem
			avatarUrl="https://ui-avatars.com/api/?name=Sarah+Chen&background=f59e0b&color=fff"
			variant="warning"
		>
							<div>
					<strong>Sarah Chen</strong> attached 3 files to project
				</div>
				<div class="text-muted text-sm mt-1">
					Jan 19, 2021
				</div>
				<div class="d-flex flex-wrap gap-sm mt-3">
					<Badge variant="secondary">
						{#snippet icon()}<i class="fa-solid fa-file-pdf"></i>{/snippet}
						design-specs.pdf
					</Badge>
					<Badge variant="secondary">
						{#snippet icon()}<i class="fa-solid fa-file-image"></i>{/snippet}
						mockup-v2.png
					</Badge>
					<Badge variant="secondary">
						{#snippet icon()}<i class="fa-solid fa-file-code"></i>{/snippet}
						components.zip
					</Badge>
				</div>
		</TimelineItem>

		<TimelineItem
			avatarUrl="https://ui-avatars.com/api/?name=Mike+Johnson&background=8b5cf6&color=fff"
			variant="success"
		>
							<div>
					<strong>Mike Johnson</strong> completed "Design Review" task
				</div>
				<div class="text-muted text-sm mt-1">
					Jan 18, 2021
				</div>
		</TimelineItem>

		<TimelineItem
			avatarUrl="https://ui-avatars.com/api/?name=Emma+Davis&background=ec4899&color=fff"
			variant="danger"
		>
							<div>
					<strong>Emma Davis</strong> reported a critical bug
				</div>
				<div class="text-muted text-sm mt-1">
					Jan 17, 2021
				</div>
				<Callout variant="danger" class="mt-3">
					<Paragraph class="mb-0 text-sm text-muted">
						<strong class="text-danger">URGENT:</strong> Payment processing fails when cart total exceeds $1000. Multiple customers affected. Needs immediate attention.
					</Paragraph>
				</Callout>
		</TimelineItem>

		<TimelineItem
			avatarUrl="https://ui-avatars.com/api/?name=Alex+Rodriguez&background=06b6d4&color=fff"
			variant="info"
		>
							<div>
					<strong>Alex Rodriguez</strong> created new branch "feature/user-profiles"
				</div>
				<div class="text-muted text-sm mt-1">
					Jan 16, 2021
				</div>
		</TimelineItem>
	</Timeline>
</Card>

<!-- Team Collaboration Feed -->
<Card titleText="Team Collaboration Feed">

	<Timeline variant="feed">
		<TimelineItem
			avatarUrl="https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff"
			variant="primary"
		>
							<div>
					<strong>John Doe</strong> started a new project
				</div>
				<div class="text-muted text-sm mt-1">
					2 hours ago
				</div>
		</TimelineItem>

		<TimelineItem
			avatarUrl="https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff"
			variant="success"
		>
							<div>
					<strong>Jane Smith</strong> merged pull request #142
				</div>
				<div class="text-muted text-sm mt-1">
					5 hours ago
				</div>
		</TimelineItem>

		<TimelineItem
			avatarUrl="https://ui-avatars.com/api/?name=Bob+Wilson&background=f59e0b&color=fff"
			variant="warning"
		>
							<div>
					<strong>Bob Wilson</strong> requested code review
				</div>
				<div class="text-muted text-sm mt-1">
					1 day ago
				</div>
		</TimelineItem>
	</Timeline>

	<div class="mt-4 text-center">
		<Button variant="secondary" size="sm">
			Load more activity
		</Button>
	</div>
</Card>

<!-- Usage Examples -->
<Card titleText="Usage Examples">

	<Heading level={4}>Basic Feed Timeline</Heading>
	<CodeBlock language="html" class="mb-4">&lt;Timeline variant="feed"&gt;
  &lt;TimelineItem
    avatarUrl="https://ui-avatars.com/api/?name=User+Name"
    variant="primary"
  &gt;
    &lt;div&gt;
      &lt;strong&gt;User Name&lt;/strong&gt; performed an action
    &lt;/div&gt;
    &lt;div class="text-muted"&gt;2 hours ago&lt;/div&gt;
  &lt;/TimelineItem&gt;
&lt;/Timeline&gt;</CodeBlock>

	<Heading level={4}>With Comment/Additional Content</Heading>
	<CodeBlock language="html" class="mb-4">&lt;TimelineItem avatarUrl="..." variant="info"&gt;
  &lt;div&gt;&lt;strong&gt;User&lt;/strong&gt; commented&lt;/div&gt;
  &lt;div class="text-muted"&gt;1 hour ago&lt;/div&gt;
  &lt;div class="pa-callout pa-callout--info mt-3"&gt;
    Comment text here
  &lt;/div&gt;
&lt;/TimelineItem&gt;</CodeBlock>

	<Heading level={4}>UI Avatars Integration</Heading>
	<Paragraph>Generate avatars dynamically using UI Avatars API:</Paragraph>
	<CodeBlock class="mb-4">https://ui-avatars.com/api/?name=First+Last&background=3b82f6&color=fff</CodeBlock>

	<Heading level={4}>Best Practices</Heading>
	<BasicList>
		<li>Use <code>variant="feed"</code> for social activity feeds and audit logs</li>
		<li>Include user avatars for better visual identification</li>
		<li>Show relative timestamps (2 hours ago, 1 day ago) for recent activity</li>
		<li>Use color variants to indicate action types (success for completions, warning for reviews, danger for errors)</li>
		<li>Add metadata badges for file attachments or additional context</li>
		<li>Include "Load more" button for pagination</li>
	</BasicList>
</Card>

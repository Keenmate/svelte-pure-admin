<script lang="ts">
	import { Heading, Paragraph, Card, Timeline, TimelineItem, Button, BasicList } from '@keenmate/svelte-pure-admin';
	import { HighlightedCode } from '$lib/components';

	// Example: Activity feed data from API/database
	interface Activity {
		id: number;
		user: string;
		avatarUrl: string;
		action: string;
		time: string;
		comment?: string;
	}

	const activities: Activity[] = [
		{
			id: 1,
			user: 'John Doe',
			avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
			action: 'created a new project',
			time: '2 hours ago'
		},
		{
			id: 2,
			user: 'Jane Smith',
			avatarUrl: 'https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff',
			action: 'uploaded 3 files',
			time: '5 hours ago'
		},
		{
			id: 3,
			user: 'Luna Bonifacio',
			avatarUrl: 'https://ui-avatars.com/api/?name=Luna+B&background=0D8ABC&color=fff',
			action: 'commented on Issue #123',
			time: '1 hour ago',
			comment: "This looks great! I've tested it on multiple browsers and everything works perfectly."
		}
	];

	// Example: Date-organized activities
	interface DateSection {
		date: string;
		dateIcon: string;
		activities: {
			id: number;
			time: string;
			user: string;
			avatarUrl: string;
			action: string;
		}[];
	}

	const dateSections: DateSection[] = [
		{
			date: 'January 22, 2025',
			dateIcon: '📅',
			activities: [
				{
					id: 4,
					time: '14:32',
					user: 'Sarah Chen',
					avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=0D8ABC&color=fff',
					action: 'merged pull request #456'
				},
				{
					id: 5,
					time: '12:15',
					user: 'Mike Johnson',
					avatarUrl: 'https://ui-avatars.com/api/?name=Mike+J&background=0D8ABC&color=fff',
					action: 'deployed to production'
				}
			]
		},
		{
			date: 'January 21, 2025',
			dateIcon: '📅',
			activities: [
				{
					id: 6,
					time: '18:45',
					user: 'Emma Davis',
					avatarUrl: 'https://ui-avatars.com/api/?name=Emma+D&background=0D8ABC&color=fff',
					action: 'updated documentation'
				},
				{
					id: 7,
					time: '16:20',
					user: 'Alex Rodriguez',
					avatarUrl: 'https://ui-avatars.com/api/?name=Alex+R&background=0D8ABC&color=fff',
					action: 'fixed critical bug in authentication'
				}
			]
		}
	];

	// Code examples (stored as constants to avoid Svelte parsing template syntax)
	const codeBasicFeedItem = `<Timeline variant="feed">
  <TimelineItem avatarUrl="..." avatarAlt="John Doe">
    <span><a href="#">John Doe</a> created a new project</span>
    <time>2 hours ago</time>
  </TimelineItem>
</Timeline>`;

	const codeFeedItemWithComment = `<TimelineItem avatarUrl="..." avatarAlt="Luna">
  <span><a href="#">Luna</a> commented on <a href="#">Issue #123</a></span>
  <time>1 hour ago</time>

  ` + '{#snippet commentTemplate()}' + `
    <p>This looks great!</p>
  ` + '{/snippet}' + `
</TimelineItem>`;

	const codeDateHeader = `<TimelineItem isDateHeader iconText="📅">
  January 22, 2025
</TimelineItem>`;

	const codeFeedItemWithTime = `<TimelineItem timeText="14:32" avatarUrl="..." avatarAlt="Sarah">
  <span><a href="#">Sarah Chen</a> merged pull request</span>
</TimelineItem>`;
</script>

<!-- Basic Feed Timeline -->
<Card titleText="Basic Feed Timeline">

	<Timeline variant="feed">
		<TimelineItem avatarUrl="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" avatarAlt="John Doe">
			<span><a href="#">John Doe</a> created a new project</span>
			<time>2 hours ago</time>
		</TimelineItem>

		<TimelineItem avatarUrl="https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff" avatarAlt="Jane Smith">
			<span><a href="#">Jane Smith</a> uploaded 3 files</span>
			<time>5 hours ago</time>
		</TimelineItem>

		<TimelineItem avatarUrl="https://ui-avatars.com/api/?name=Mike+Chen&background=0D8ABC&color=fff" avatarAlt="Mike Chen">
			<span><a href="#">Mike Chen</a> completed sprint tasks</span>
			<time>1 day ago</time>
		</TimelineItem>
	</Timeline>
</Card>

<!-- Feed Timeline with Comments -->
<Card titleText="Feed Timeline with Comments">

	<Timeline variant="feed">
		<TimelineItem avatarUrl="https://ui-avatars.com/api/?name=Luna+B&background=0D8ABC&color=fff" avatarAlt="Luna Bonifacio">
			<span><a href="#">Luna Bonifacio</a> commented on <a href="#">Issue #123</a></span>
			<time>1 hour ago</time>

			{#snippet commentTemplate()}
				<Paragraph>This looks great! I've tested it on multiple browsers and everything works perfectly.</Paragraph>
			{/snippet}
		</TimelineItem>

		<TimelineItem avatarUrl="https://ui-avatars.com/api/?name=David+K&background=0D8ABC&color=fff" avatarAlt="David Kim">
			<span><a href="#">David Kim</a> replied to <a href="#">Pull Request #456</a></span>
			<time>3 hours ago</time>

			{#snippet commentTemplate()}
				<Paragraph>I've reviewed the changes and they look solid. Just a minor suggestion about the error handling.</Paragraph>
			{/snippet}
		</TimelineItem>

		<TimelineItem avatarUrl="https://ui-avatars.com/api/?name=Sarah+L&background=0D8ABC&color=fff" avatarAlt="Sarah Lee">
			<span><a href="#">Sarah Lee</a> mentioned you in <a href="#">Task #789</a></span>
			<time>5 hours ago</time>

			{#snippet commentTemplate()}
				<Paragraph>@you Could you review this before the end of the day? Thanks!</Paragraph>
			{/snippet}
		</TimelineItem>
	</Timeline>
</Card>

<!-- Feed Timeline with Date Headers -->
<Card titleText="Feed Timeline with Date Headers">

	<Timeline variant="feed">
		<!-- Date header -->
		<TimelineItem isDateHeader iconText="📅">
			January 22, 2025
		</TimelineItem>

		<TimelineItem timeText="14:32" avatarUrl="https://ui-avatars.com/api/?name=Sarah+Chen&background=0D8ABC&color=fff" avatarAlt="Sarah Chen">
			<span><a href="#">Sarah Chen</a> merged pull request #456</span>
		</TimelineItem>

		<TimelineItem timeText="12:15" avatarUrl="https://ui-avatars.com/api/?name=Mike+J&background=0D8ABC&color=fff" avatarAlt="Mike Johnson">
			<span><a href="#">Mike Johnson</a> deployed to production</span>
		</TimelineItem>

		<!-- Another date header -->
		<TimelineItem isDateHeader iconText="📅">
			January 21, 2025
		</TimelineItem>

		<TimelineItem timeText="18:45" avatarUrl="https://ui-avatars.com/api/?name=Emma+D&background=0D8ABC&color=fff" avatarAlt="Emma Davis">
			<span><a href="#">Emma Davis</a> updated documentation</span>
		</TimelineItem>

		<TimelineItem timeText="16:20" avatarUrl="https://ui-avatars.com/api/?name=Alex+R&background=0D8ABC&color=fff" avatarAlt="Alex Rodriguez">
			<span><a href="#">Alex Rodriguez</a> fixed critical bug in authentication</span>
		</TimelineItem>
	</Timeline>
</Card>

<!-- Data-Driven Feed Timeline -->
<Card titleText="Data-Driven Feed Timeline">
	{#snippet header()}
		<Paragraph>Timeline populated from database/API data</Paragraph>
	{/snippet}

	<Timeline
		variant="feed"
		data={activities}
		avatarUrlMember="avatarUrl"
		idMember="id"
		getContentCallback={(activity) => `${activity.user} ${activity.action}`}
		commentMember="comment"
	>
		{#snippet contentTemplate(activity)}
			<span><a href="#">{activity.user}</a> {activity.action}</span>
			<time>{activity.time}</time>
		{/snippet}
	</Timeline>
</Card>

<!-- Data-Driven with Date Sections -->
<Card titleText="Data-Driven with Date Sections">
	{#snippet header()}
		<Paragraph>Organized by date with time prefixes</Paragraph>
	{/snippet}

	<Timeline variant="feed">
		{#each dateSections as section}
			<TimelineItem isDateHeader iconText={section.dateIcon}>
				{section.date}
			</TimelineItem>

			{#each section.activities as activity}
				<TimelineItem timeText={activity.time} avatarUrl={activity.avatarUrl} avatarAlt={activity.user}>
					<span><a href="#">{activity.user}</a> {activity.action}</span>
				</TimelineItem>
			{/each}
		{/each}
	</Timeline>
</Card>

<!-- Usage Examples -->
<Card titleText="Usage Examples">

	<Heading level={4}>Basic Feed Item</Heading>
	<HighlightedCode code={codeBasicFeedItem} language="svelte" class="mb-4" />

	<Heading level={4}>Feed Item with Comment</Heading>
	<HighlightedCode code={codeFeedItemWithComment} language="svelte" class="mb-4" />

	<Heading level={4}>Date Header</Heading>
	<HighlightedCode code={codeDateHeader} language="svelte" class="mb-4" />

	<Heading level={4}>Feed Item with Time Prefix</Heading>
	<HighlightedCode code={codeFeedItemWithTime} language="svelte" class="mb-4" />

	<Heading level={4}>Best Practices</Heading>
	<BasicList>
		<li>Use <code>variant="feed"</code> for activity feeds and social timelines</li>
		<li>Include avatar images for better user recognition</li>
		<li>Use date headers to organize activities by day</li>
		<li>Add time prefixes for precise timestamps</li>
		<li>Use comment snippets for replies and extended content</li>
		<li>Link usernames and referenced items for navigation</li>
		<li>Keep activity descriptions concise and action-focused</li>
	</BasicList>
</Card>

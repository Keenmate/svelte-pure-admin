<script lang="ts">
	import {
		Heading,
		Paragraph,
		Card,
		Button,
		NotificationsPanel,
		CodeBlock,
		type NotificationItem
	} from '@keenmate/svelte-pure-admin';

	const items: NotificationItem[] = [
		{
			id: 1,
			titleText: 'New comment on your post',
			messageText: 'Dale Cooper replied to "Damn fine coffee".',
			timeText: '2 min ago',
			isUnread: true,
			iconClass: 'fa-solid fa-comment',
			iconVariant: 'primary'
		},
		{
			id: 2,
			titleText: 'Deployment succeeded',
			messageText: 'Build #482 shipped to production.',
			timeText: '1 hour ago',
			isUnread: true,
			iconClass: 'fa-solid fa-circle-check',
			iconVariant: 'success'
		},
		{
			id: 3,
			titleText: 'Storage almost full',
			messageText: 'You have used 92% of your plan quota.',
			timeText: '3 hours ago',
			iconClass: 'fa-solid fa-triangle-exclamation',
			iconVariant: 'warning'
		},
		{
			id: 4,
			titleText: 'Payment failed',
			messageText: 'We could not charge the card ending 4242.',
			timeText: 'Yesterday',
			iconClass: 'fa-solid fa-circle-xmark',
			iconVariant: 'danger'
		}
	];

	let unread = $state(items.filter((i) => i.isUnread).length);

	function markAllRead() {
		unread = 0;
	}
</script>

<Paragraph>
	<code>&lt;NotificationsPanel&gt;</code> renders Pure Admin's <code>.pa-notifications</code> list in two modes: a
	<strong>dropdown panel</strong> (mounted beside a bell button) and a <strong>page view</strong> — a bare list
	with optional bulk-select checkboxes and hover-revealed per-item actions.
</Paragraph>

<Card titleText="Dropdown panel">
	{#snippet header()}
		<Paragraph>The panel as it appears under the navbar bell. {unread} unread.</Paragraph>
	{/snippet}
	<div class="maxwr-110">
		<NotificationsPanel
			{items}
			show
			titleText="Notifications"
			markAllReadText="Mark all as read"
			footerText="View all notifications"
			onmarkallread={markAllRead}
		/>
	</div>
</Card>

<Card titleText="Page view — with bulk-select + actions">
	{#snippet header()}
		<Paragraph>Full-width list (<code>isPageView</code>) with selection checkboxes and per-item actions.</Paragraph>
	{/snippet}
	<NotificationsPanel {items} isPageView shouldShowCheckboxes>
		{#snippet itemActions(item)}
			<Button variant="secondary" size="xs">Mark read</Button>
			<Button variant="danger" size="xs">Dismiss</Button>
		{/snippet}
	</NotificationsPanel>
</Card>

<Card titleText="Usage">
	<Heading level={4}>Data</Heading>
	<CodeBlock language="javascript" class="mb-4">{`const items: NotificationItem[] = [
  {
    id: 1,
    titleText: 'Deployment succeeded',
    messageText: 'Build #482 shipped to production.',
    timeText: '1 hour ago',
    isUnread: true,
    iconClass: 'fa-solid fa-circle-check',
    iconVariant: 'success'
  }
];`}</CodeBlock>

	<Heading level={4}>Dropdown panel</Heading>
	<CodeBlock language="html" class="mb-4">{`<NotificationsPanel
  {items}
  show
  titleText="Notifications"
  onmarkallread={markAllRead}
/>`}</CodeBlock>

	<Heading level={4}>Page view with actions</Heading>
	<CodeBlock language="html">{`<NotificationsPanel {items} isPageView shouldShowCheckboxes>
  {#snippet itemActions(item)}
    <Button variant="secondary" size="xs">Mark read</Button>
  {/snippet}
</NotificationsPanel>`}</CodeBlock>
</Card>

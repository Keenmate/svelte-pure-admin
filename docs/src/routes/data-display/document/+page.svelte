<script lang="ts">
	import {
		Heading,
		Paragraph,
		Card,
		Document,
		DocumentSection,
		DocumentText,
		CodeBlock
	} from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>
	<code>&lt;Document&gt;</code> is a Word-style hierarchical, auto-numbered document. Nest
	<code>&lt;DocumentSection&gt;</code> inside one another and the outline number (1, 1.1, 1.1.1 …) is generated
	by CSS counters — you never write it, so reordering or inserting a section renumbers everything
	automatically (up to six levels). Body copy goes in <code>&lt;DocumentText&gt;</code>.
</Paragraph>

<Card titleText="Auto-numbered (default)">
	<Document>
		<DocumentSection heading="Introduction">
			<DocumentText>This top-level section renders as "1 Introduction".</DocumentText>

			<DocumentSection heading="Scope" level={3}>
				<DocumentText>Nested one level — renders as "1.1 Scope".</DocumentText>
			</DocumentSection>

			<DocumentSection heading="Goals" level={3}>
				<DocumentText>Renders as "1.2 Goals".</DocumentText>

				<DocumentSection heading="Detail" level={4}>
					<DocumentText>Two levels deep — renders as "1.2.1 Detail".</DocumentText>
				</DocumentSection>
			</DocumentSection>
		</DocumentSection>

		<DocumentSection heading="Architecture">
			<DocumentText>A new top-level section renders as "2 Architecture".</DocumentText>
		</DocumentSection>
	</Document>
</Card>

<Card titleText="Manual numbering">
	{#snippet header()}
		<Paragraph>
			Set <code>isManual</code> on the container and author each number via the section's
			<code>number</code> prop — useful for appendices or non-decimal schemes.
		</Paragraph>
	{/snippet}
	<Document isManual>
		<DocumentSection heading="Appendix" number="A">
			<DocumentText>Author-written "A".</DocumentText>

			<DocumentSection heading="Glossary" number="A.1" level={3}>
				<DocumentText>Author-written "A.1".</DocumentText>
			</DocumentSection>
		</DocumentSection>
	</Document>
</Card>

<Card titleText="Flush — no indentation">
	{#snippet header()}
		<Paragraph>With <code>isFlush</code> the per-level indentation is dropped; the number chain still conveys depth.</Paragraph>
	{/snippet}
	<Document isFlush>
		<DocumentSection heading="Requirements">
			<DocumentSection heading="Performance" level={3}>
				<DocumentText>No indentation; "1.1" still communicates depth.</DocumentText>
			</DocumentSection>
		</DocumentSection>
	</Document>
</Card>

<Card titleText="Usage">
	<Heading level={4}>Auto-numbered</Heading>
	<CodeBlock language="html" class="mb-4">{`<Document>
  <DocumentSection heading="Introduction">
    <DocumentText>Renders as "1 Introduction".</DocumentText>
    <DocumentSection heading="Scope" level={3}>
      <DocumentText>Renders as "1.1 Scope".</DocumentText>
    </DocumentSection>
  </DocumentSection>
</Document>`}</CodeBlock>

	<Heading level={4}>Manual numbering</Heading>
	<CodeBlock language="html">{`<Document isManual>
  <DocumentSection heading="Appendix" number="A">
    <DocumentSection heading="Glossary" number="A.1" level={3} />
  </DocumentSection>
</Document>`}</CodeBlock>
</Card>

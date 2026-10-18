<script lang="ts">
	import {
		Heading,
		Paragraph,
		Card,
		Document,
		DocumentSection,
		DocumentText,
		CodeBlock,
		Code
	} from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>
	<Code>&lt;Document&gt;</Code> is a Word-style hierarchical, auto-numbered document. Nest
	<Code>&lt;DocumentSection&gt;</Code> inside one another and the outline number (1, 1.1, 1.1.1 …) is generated
	by CSS counters — you never write it, so reordering or inserting a section renumbers everything
	automatically (up to six levels). Body copy goes in <Code>&lt;DocumentText&gt;</Code>.
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
	{#snippet description()}
		Set <Code>isManual</Code> on the container and author each number via the section's
		<Code>number</Code> prop — useful for appendices or non-decimal schemes.
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
	{#snippet description()}
		With <Code>isFlush</Code> the per-level indentation is dropped; the number chain still conveys depth.
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

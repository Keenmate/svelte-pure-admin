<script lang="ts">
			import { Heading, Paragraph, Card, Grid, Column, Code, CodeBlock, CodeBlockWithHeader } from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>Display code snippets, JSON data, configuration files, and terminal output with syntax highlighting and copy functionality.</Paragraph>

<!-- Inline Code -->
<Card titleText="Inline Code">
	<Paragraph>Use the <code>&lt;code&gt;</code> element for isInline code references like <code>npm install</code> or <code>const myVariable = true</code>.</Paragraph>
	<Paragraph>Configure the server using <code>config.json</code> and set <code>port: 3000</code> in the configuration file.</Paragraph>
	<Paragraph>Import components with <code>import {`{ Button }`} from 'react'</code> syntax.</Paragraph>
</Card>

<!-- Basic Code Blocks -->
<Card titleText="Basic Code Blocks">
	<Grid>
		<Column size="100" md="1-2">
			<Heading level={4}>JavaScript</Heading>
			<Code language="javascript">{`function greet(name) {
    return \`Hello, \${name}!\`;
}

const result = greet('World');
console.log(result);`}</Code>
		</Column>

		<Column size="100" md="1-2">
			<Heading level={4}>JSON</Heading>
			<Code language="json">{`{
    "name": "Pure Admin",
    "version": "1.0.0",
    "theme": "corporate",
    "features": [
        "responsive",
        "themeable",
        "lightweight"
    ]
}`}</Code>
		</Column>

		<Column size="100" md="1-2">
			<Heading level={4}>HTML</Heading>
			<Code language="html">{`<div class="pa-card">
    <div class="pa-card__header">
        <h3>Card Title</h3>
    </div>
    <div class="pa-card__body">
        Content here
    </div>
</div>`}</Code>
		</Column>

		<Column size="100" md="1-2">
			<Heading level={4}>CSS</Heading>
			<Code language="css">{`.pa-btn {
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    background-color: #3b82f6;
    color: #ffffff;
}`}</Code>
		</Column>
	</Grid>
</Card>

<!-- Code Blocks with Headers and Copy -->
<Card titleText="Code Blocks with Headers">
	<Grid>
		<Column size="100" md="1-2">
			<CodeBlockWithHeader titleText="server.js">{`const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000);`}</CodeBlockWithHeader>
		</Column>

		<Column size="100" md="1-2">
			<CodeBlockWithHeader titleText="package.json" language="json">{`{
    "name": "my-app",
    "version": "1.0.0",
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js"
    }
}`}</CodeBlockWithHeader>
		</Column>
	</Grid>
</Card>

<!-- Terminal/Bash Output -->
<Card titleText="Terminal Output">
	<Grid>
		<Column size="100" md="1-2">
			<Heading level={4}>Bash Commands</Heading>
			<Code language="bash">{`$ npm install
$ npm run build
$ npm start

Server running on port 3000...`}</Code>
		</Column>

		<Column size="100" md="1-2">
			<Heading level={4}>SQL Query</Heading>
			<Code language="sql">{`SELECT users.name, orders.total
FROM users
INNER JOIN orders
    ON users.id = orders.user_id
WHERE orders.status = 'completed'
ORDER BY orders.total DESC;`}</Code>
		</Column>
	</Grid>
</Card>

<!-- Compact Code Blocks -->
<Card titleText="Compact Variant">
	<Paragraph>Use <code>.pa-code--compact</code> for smaller code snippets.</Paragraph>
	<CodeBlock language="python" isCompact>{`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`}</CodeBlock>
</Card>

<!-- All Language Variants -->
<Card titleText="Language Accent Colors">
	<Paragraph>Code blocks with language-specific colored left borders for visual identification.</Paragraph>

	<Grid>
		<Column size="100" md="1-3">
			<Heading level={5}>JavaScript</Heading>
			<CodeBlock language="javascript" isCompact>console.log('Hello');</CodeBlock>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={5}>JSON</Heading>
			<CodeBlock language="json" isCompact>{`{"key": "value"}`}</CodeBlock>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={5}>HTML</Heading>
			<CodeBlock language="html" isCompact>{`<div>Hello</div>`}</CodeBlock>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={5}>CSS</Heading>
			<CodeBlock language="css" isCompact>.class {`{ color: red; }`}</CodeBlock>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={5}>Bash</Heading>
			<CodeBlock language="bash" isCompact>$ npm install</CodeBlock>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={5}>SQL</Heading>
			<CodeBlock language="sql" isCompact>SELECT * FROM users;</CodeBlock>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={5}>Python</Heading>
			<CodeBlock language="python" isCompact>print("Hello World")</CodeBlock>
		</Column>
	</Grid>
</Card>

<!-- Usage Examples -->
<Card titleText="Usage Examples">
	<Heading level={4}>Inline Code</Heading>
	<Code language="html">{`<Paragraph>Use <code>inline code</code> for references.</Paragraph>`}</Code>

	<Heading level={4}>Basic Code Block</Heading>
	<Code language="html">{`<pre class="pa-code pa-code--javascript">
const greeting = 'Hello';
console.log(greeting);
</pre>`}</Code>

	<Heading level={4}>Code Block with Header</Heading>
	<Code language="html">{`<div class="pa-code-block">
    <div class="pa-code-block__header">
        <span class="pa-code-block__title">filename.js</span>
        <button class="pa-btn pa-btn--xs">Copy</button>
    </div>
    <div class="pa-code-block__body">
        <pre class="pa-code">// your code here</pre>
    </div>
</div>`}</Code>
</Card>

<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Heading,
		Paragraph,
		Alert,
		Callout,
		Button,
		ButtonGroup,
		Badge,
		Table,
		FormGroup,
		FormLabel,
		Input,
		Spinner,
		BasicList,
		createBatch,
		pureDataConfig,
		commonResponseConfig
	} from '@keenmate/svelte-pure-admin';
	import type {
		BatchResult,
		BatchResponse,
		RpcTransport,
		RpcTransportConfig
	} from '@keenmate/svelte-pure-admin';
	import { HighlightedCode } from '$lib/components';

	// ==========================================
	// Mock Transport for Demo
	// ==========================================

	// Simulated data
	const mockData: Record<string, unknown> = {
		'common.getCountries': [
			{ code: 'CZ', name: 'Czechia' },
			{ code: 'US', name: 'United States' },
			{ code: 'DE', name: 'Germany' },
			{ code: 'UK', name: 'United Kingdom' }
		],
		'common.getCurrencies': [
			{ code: 'CZK', name: 'Czech Koruna' },
			{ code: 'USD', name: 'US Dollar' },
			{ code: 'EUR', name: 'Euro' },
			{ code: 'GBP', name: 'British Pound' }
		],
		'common.getPaymentTerms': [
			{ id: 1, name: 'Net 30', days: 30 },
			{ id: 2, name: 'Net 60', days: 60 },
			{ id: 3, name: 'Due on Receipt', days: 0 }
		],
		'users.getActive': [
			{ id: 1, name: 'John Doe', email: 'john@example.com' },
			{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
			{ id: 3, name: 'Bob Wilson', email: 'bob@example.com' }
		],
		'orders.getDetail': { id: 123, customer: 'Acme Corp', total: 1500.00, status: 'pending' }
	};

	// Create a mock transport that simulates network delay
	function createMockTransport(delay: number = 500): RpcTransport {
		const config: RpcTransportConfig = {
			parseResponse: (raw) => raw as BatchResponse,
			parseCallResult: (raw) => raw
		};

		return {
			async sendBatch(request) {
				// Simulate network delay
				await new Promise((resolve) => setTimeout(resolve, delay));

				const results: BatchResult[] = request.batch.map((call) => {
					// Simulate error for unknown methods
					if (!mockData[call.method]) {
						return {
							id: call.id,
							error: {
								code: 'NOT_FOUND',
								message: `Method "${call.method}" not found`
							}
						};
					}

					return {
						id: call.id,
						result: mockData[call.method]
					};
				});

				return { batch: results };
			},
			config
		};
	}

	// ==========================================
	// Demo State
	// ==========================================

	let loading = $state(false);
	let countries = $state<Array<{ code: string; name: string }>>([]);
	let currencies = $state<Array<{ code: string; name: string }>>([]);
	let paymentTerms = $state<Array<{ id: number; name: string; days: number }>>([]);
	let users = $state<Array<{ id: number; name: string; email: string }>>([]);
	let orderDetail = $state<{ id: number; customer: string; total: number; status: string } | null>(null);
	let errors = $state<Record<string, string>>({});
	let executionTime = $state<number | null>(null);
	let callCount = $state(0);

	// Demo 2: Error handling state
	let demo2Loading = $state(false);
	let demo2Results = $state<Array<{ method: string; success: boolean; data?: unknown; error?: string }>>([]);

	// ==========================================
	// Demo Functions
	// ==========================================

	async function runBatchDemo() {
		loading = true;
		errors = {};
		const startTime = performance.now();

		const transport = createMockTransport(300);
		const batch = createBatch(transport);

		// Queue all calls
		const calls = {
			countries: batch.add<Array<{ code: string; name: string }>>('common.getCountries'),
			currencies: batch.add<Array<{ code: string; name: string }>>('common.getCurrencies'),
			paymentTerms: batch.add<Array<{ id: number; name: string; days: number }>>('common.getPaymentTerms'),
			users: batch.add<Array<{ id: number; name: string; email: string }>>('users.getActive'),
			order: batch.add<{ id: number; customer: string; total: number; status: string }>('orders.getDetail')
		};

		callCount = batch.size;

		try {
			// Execute all in one request
			await batch.execute();

			// Collect results
			countries = await calls.countries;
			currencies = await calls.currencies;
			paymentTerms = await calls.paymentTerms;
			users = await calls.users;
			orderDetail = await calls.order;
		} catch (error) {
			errors.batch = error instanceof Error ? error.message : 'Batch failed';
		}

		executionTime = Math.round(performance.now() - startTime);
		loading = false;
	}

	async function runSequentialDemo() {
		loading = true;
		errors = {};
		const startTime = performance.now();

		const transport = createMockTransport(300);

		// Simulate sequential calls (5 separate requests)
		callCount = 5;

		try {
			// Each call takes ~300ms sequentially = ~1500ms total
			const batch1 = createBatch(transport);
			const p1 = batch1.add<Array<{ code: string; name: string }>>('common.getCountries');
			await batch1.execute();
			countries = await p1;

			const batch2 = createBatch(transport);
			const p2 = batch2.add<Array<{ code: string; name: string }>>('common.getCurrencies');
			await batch2.execute();
			currencies = await p2;

			const batch3 = createBatch(transport);
			const p3 = batch3.add<Array<{ id: number; name: string; days: number }>>('common.getPaymentTerms');
			await batch3.execute();
			paymentTerms = await p3;

			const batch4 = createBatch(transport);
			const p4 = batch4.add<Array<{ id: number; name: string; email: string }>>('users.getActive');
			await batch4.execute();
			users = await p4;

			const batch5 = createBatch(transport);
			const p5 = batch5.add<{ id: number; customer: string; total: number; status: string }>('orders.getDetail');
			await batch5.execute();
			orderDetail = await p5;
		} catch (error) {
			errors.batch = error instanceof Error ? error.message : 'Request failed';
		}

		executionTime = Math.round(performance.now() - startTime);
		loading = false;
	}

	async function runErrorDemo() {
		demo2Loading = true;
		demo2Results = [];

		const transport = createMockTransport(200);
		const batch = createBatch(transport);

		// Mix of valid and invalid calls
		const calls = [
			{ method: 'common.getCountries', promise: batch.add('common.getCountries') },
			{ method: 'invalid.method', promise: batch.add('invalid.method') },
			{ method: 'users.getActive', promise: batch.add('users.getActive') },
			{ method: 'another.invalid', promise: batch.add('another.invalid') }
		];

		await batch.execute();

		// Collect results - each resolves/rejects independently
		const results: Array<{ method: string; success: boolean; data?: unknown; error?: string }> = [];

		for (const call of calls) {
			try {
				const data = await call.promise;
				results.push({ method: call.method, success: true, data });
			} catch (error) {
				const err = error as { code?: string; message?: string };
				results.push({
					method: call.method,
					success: false,
					error: err.message || 'Unknown error'
				});
			}
		}

		demo2Results = results;
		demo2Loading = false;
	}

	function reset() {
		countries = [];
		currencies = [];
		paymentTerms = [];
		users = [];
		orderDetail = null;
		errors = {};
		executionTime = null;
		callCount = 0;
		demo2Results = [];
	}

	// ==========================================
	// Code Examples (stored as constants to avoid Svelte parsing issues)
	// ==========================================

	const codeBasicUsage = `import { createBatch, createSignalRTransport } from '@keenmate/svelte-pure-admin';

// Create transport
const transport = createSignalRTransport(hubConnection, {
  parseResponse: (raw) => raw.data,
  parseCallResult: (raw) => raw
});

// Create batch and add calls
const batch = createBatch(transport);
const countries = batch.add<Country[]>('common.getCountries');
const currencies = batch.add<Currency[]>('common.getCurrencies');
const users = batch.add<User[]>('users.getActive', { limit: 100 });

// Execute - single request, all promises resolve
await batch.execute();

// Access results
console.log(await countries);  // Country[]
console.log(await currencies); // Currency[]
console.log(await users);      // User[]`;

	const codeErrorHandling = `const batch = createBatch(transport);

const usersPromise = batch.add('users.getAll');
const ordersPromise = batch.add('orders.getInvalid'); // Will fail

await batch.execute();

// Each promise resolves/rejects independently
const users = await usersPromise; // Resolves with data

try {
  const orders = await ordersPromise;
} catch (error) {
  // error.code = "NOT_FOUND"
  // error.message = "Method not found"
}`;

	const codeTransformResults = `const batch = createBatch(transport);

// Use .then() to transform results - standard Promise chaining
const country = batch.add<Country[]>('common.getCountry', { id: 1 })
  .then(arr => arr[0]);  // Extract first item

const settings = batch.add<ApiResponse>('system.getConfig')
  .then(res => res.data.settings);  // Unwrap nested data

const userCount = batch.add<User[]>('users.getAll')
  .then(users => users.length);  // Transform to count

await batch.execute();

// Results are already transformed
const c = await country;    // Country (not Country[])
const s = await settings;   // Settings object
const n = await userCount;  // number`;

	const codeSignalR = `import { createSignalRTransport, commonResponseConfig } from '@keenmate/svelte-pure-admin';

const transport = createSignalRTransport(hubConnection, {
  ...commonResponseConfig,
  // Backend returns: { isOk: true, data: { batch: [...] } }
});`;

	const codePhoenix = `import { createPhoenixTransport, pureDataConfig } from '@keenmate/svelte-pure-admin';

const transport = createPhoenixTransport(channel, {
  ...pureDataConfig,
  // Backend returns data directly: { batch: [...] }
});`;

	const codeHttp = `import { createHttpTransport, pureDataConfig } from '@keenmate/svelte-pure-admin';

const transport = createHttpTransport('/api/rpc/batch', pureDataConfig, {
  headers: { 'X-API-Key': 'my-static-key' }
});`;

	// Authentication examples
	const codeHttpDynamicAuth = `import { createHttpTransport, pureDataConfig } from '@keenmate/svelte-pure-admin';
import { authStore } from '$lib/stores/auth';

const transport = createHttpTransport('/api/rpc/batch', pureDataConfig, {
  // Dynamic headers - called before each request
  getHeaders: () => ({
    'Authorization': \`Bearer \${authStore.accessToken}\`
  }),

  // Send cookies with request
  fetchOptions: {
    credentials: 'include'
  }
});`;

	const codeHttpInterceptors = `import { createHttpTransport, commonResponseConfig } from '@keenmate/svelte-pure-admin';

const transport = createHttpTransport('/api/rpc/batch', commonResponseConfig, {
  // Async headers - can refresh token if needed
  getHeaders: async () => {
    await refreshTokenIfExpired();
    return { 'Authorization': \`Bearer \${getAccessToken()}\` };
  },

  // Before request interceptor
  onBeforeRequest: (request, init) => {
    console.log(\`Sending batch with \${request.batch.length} calls\`);
    // Modify init if needed
    init.credentials = 'include';
  },

  // After response interceptor
  onAfterResponse: (response) => {
    if (response.status === 401) {
      // Handle unauthorized - redirect to login, etc.
      window.location.href = '/login';
    }
  },

  timeout: 60000  // 60 second timeout
});`;

	const codeSignalRAuth = `import { HubConnectionBuilder } from '@microsoft/signalr';
import { createSignalRTransport, commonResponseConfig } from '@keenmate/svelte-pure-admin';

// Auth is configured on the connection itself
const connection = new HubConnectionBuilder()
  .withUrl('/api/hub', {
    // Dynamic access token
    accessTokenFactory: () => authStore.accessToken
  })
  .withAutomaticReconnect()
  .build();

// Transport just uses the authenticated connection
const transport = createSignalRTransport(connection, commonResponseConfig);`;

	const codePhoenixAuth = `import { Socket } from 'phoenix';
import { createPhoenixTransport, pureDataConfig } from '@keenmate/svelte-pure-admin';

// Auth is configured on the socket
const socket = new Socket('/socket', {
  params: () => ({ token: authStore.accessToken })
});
socket.connect();

const channel = socket.channel('rpc:batch', {});
channel.join();

const transport = createPhoenixTransport(channel, pureDataConfig);`;

	// Request metadata examples
	const codeRequestMetadata = `import { createHttpTransport, pureDataConfig } from '@keenmate/svelte-pure-admin';
import { getSessionId } from '$lib/session';

const transport = createHttpTransport('/api/rpc/batch', pureDataConfig, {
  // Metadata is added to request body as 'meta' field
  getRequestMetadata: () => ({
    sessionId: getSessionId(),
    tenantId: currentTenant.id,
    clientVersion: APP_VERSION
  })
});

// Request body becomes:
// {
//   "batch": [{ "id": "1", "method": "users.getAll" }, ...],
//   "meta": { "sessionId": "abc-123", "tenantId": "t-456", "clientVersion": "1.0.0" }
// }`;

	const codeSessionSetup = `// src/lib/session.svelte.ts
let sessionId = $state<string>('');

export function setSessionId(id: string) {
  sessionId = id;
}

export function getSessionId() {
  return sessionId;
}

// +layout.server.ts
export const load = async () => {
  const sessionId = crypto.randomUUID(); // Or from your session store
  return { sessionId };
};

// +layout.svelte
<` + `script>
  import { setSessionId } from '$lib/session.svelte';
  let { data } = $props();
  setSessionId(data.sessionId);
</` + `script>

<footer>Session: {data.sessionId}</footer>`;

	const codeCommonResponse = `// Backend returns:
// Batch: { isOk: true, data: { batch: [...] } }
// Per call: { isOk: true, data: actualData }

import { commonResponseConfig } from '@keenmate/svelte-pure-admin';

const transport = createSignalRTransport(conn, {
  ...commonResponseConfig
});`;

	const codePureData = `// Backend returns:
// { batch: [{ id, result }, ...] }
// Results are not wrapped

import { pureDataConfig } from '@keenmate/svelte-pure-admin';

const transport = createPhoenixTransport(channel, {
  ...pureDataConfig
});`;

	const codeRealWorld = `<` + `script lang="ts">
  import { onMount } from 'svelte';
  import { createBatch } from '@keenmate/svelte-pure-admin';
  import { signalrTransport } from '$lib/transport';

  let countries = $state([]);
  let currencies = $state([]);
  let paymentTerms = $state([]);
  let deliveryMethods = $state([]);
  let taxRates = $state([]);
  let warehouses = $state([]);
  let units = $state([]);
  let orderDetail = $state(null);

  let loading = $state(true);
  let errors = $state<Record<string, Error>>({});

  export let orderId: number;

  onMount(async () => {
    const batch = createBatch(signalrTransport);

    // Queue all calls - 8 calls, 1 request!
    const calls = {
      countries: batch.add('common.getCountries'),
      currencies: batch.add('common.getCurrencies'),
      paymentTerms: batch.add('common.getPaymentTerms'),
      deliveryMethods: batch.add('common.getDeliveryMethods'),
      taxRates: batch.add('common.getTaxRates'),
      warehouses: batch.add('common.getWarehouses'),
      units: batch.add('common.getUnits'),
      order: batch.add('orders.getDetail', { id: orderId })
    };

    await batch.execute();

    // Collect results with error handling
    countries = await calls.countries.catch(e => { errors.countries = e; return []; });
    currencies = await calls.currencies.catch(e => { errors.currencies = e; return []; });
    paymentTerms = await calls.paymentTerms.catch(e => { errors.paymentTerms = e; return []; });
    deliveryMethods = await calls.deliveryMethods.catch(e => { errors.deliveryMethods = e; return []; });
    taxRates = await calls.taxRates.catch(e => { errors.taxRates = e; return []; });
    warehouses = await calls.warehouses.catch(e => { errors.warehouses = e; return []; });
    units = await calls.units.catch(e => { errors.units = e; return []; });
    orderDetail = await calls.order; // Let this one throw if failed

    loading = false;
  });
<` + `/script>`;

	const codeRequestFormat = `{
  "batch": [
    { "id": "1", "method": "common.getCountries", "params": {} },
    { "id": "2", "method": "common.getCurrencies", "params": {} },
    { "id": "3", "method": "users.getActive", "params": { "limit": 100 } }
  ]
}`;

	const codeResponseFormat = `{
  "batch": [
    { "id": "1", "result": [{"code": "CZ", "name": "Czechia"}, ...] },
    { "id": "2", "result": [{"code": "CZK", "name": "Czech Koruna"}, ...] },
    { "id": "3", "error": { "code": "UNAUTHORIZED", "message": "..." } }
  ]
}`;
</script>

<Callout variant="info" class="mb-4">
	The <strong>Batch RPC Service</strong> allows you to collect multiple RPC calls into a single request,
	reducing round-trips and enabling backend parallelization. This is especially useful for detail forms
	with multiple dropdowns that all need data on mount.
</Callout>

<!-- Overview -->
<Card titleText="Overview">
	<Paragraph>
		When loading a detail form with multiple comboboxes (e.g., 7 dropdowns + business data), each typically needs a separate RPC call.
		The Batch RPC Service solves this by:
	</Paragraph>

	<BasicList class="mt-3">
		<li><strong>Collecting calls</strong> - Queue multiple RPC calls before sending</li>
		<li><strong>Single request</strong> - Send all calls in one message over WebSocket/HTTP</li>
		<li><strong>Backend parallelization</strong> - Backend can process all calls in parallel</li>
		<li><strong>Independent resolution</strong> - Each call's promise resolves/rejects independently</li>
	</BasicList>

	<Heading level={4} class="mt-4">Basic Usage</Heading>
	<HighlightedCode language="typescript" code={codeBasicUsage} />
</Card>

<!-- Live Demo -->
<Card titleText="Live Demo: Batch vs Sequential">
	<Paragraph class="mb-4">
		Compare the performance difference between batched and sequential requests.
		The mock transport simulates 300ms network delay per request.
	</Paragraph>

	<Grid class="mb-4">
		<Column size="100" md="50">
			<ButtonGroup>
				<Button variant="primary" onclick={runBatchDemo} disabled={loading}>
					{#if loading}
						<Spinner size="xs" class="me-2" /> Running...
					{:else}
						Run Batched (1 request)
					{/if}
				</Button>
				<Button variant="secondary" onclick={runSequentialDemo} disabled={loading}>
					{#if loading}
						<Spinner size="xs" class="me-2" /> Running...
					{:else}
						Run Sequential (5 requests)
					{/if}
				</Button>
			</ButtonGroup>
		</Column>
		<Column size="100" md="50">
			<Button variant="light" onclick={reset} disabled={loading}>Reset</Button>
		</Column>
	</Grid>

	{#if executionTime !== null}
		<Alert variant={executionTime < 500 ? 'success' : 'warning'} class="mb-4">
			<strong>Completed in {executionTime}ms</strong> ({callCount} calls)
			{#if executionTime < 500}
				- Batched execution is ~5x faster!
			{:else}
				- Sequential requests add up quickly
			{/if}
		</Alert>
	{/if}

	{#if errors.batch}
		<Alert variant="danger" class="mb-4">{errors.batch}</Alert>
	{/if}

	{#if countries.length > 0 || currencies.length > 0}
		<Grid>
			<Column size="100" md="50" lg="1-3">
				<Heading level={5}>Countries ({countries.length})</Heading>
				<Table isStriped size="xs">
					<thead>
						<tr><th>Code</th><th>Name</th></tr>
					</thead>
					<tbody>
						{#each countries as country}
							<tr><td>{country.code}</td><td>{country.name}</td></tr>
						{/each}
					</tbody>
				</Table>
			</Column>
			<Column size="100" md="50" lg="1-3">
				<Heading level={5}>Currencies ({currencies.length})</Heading>
				<Table isStriped size="xs">
					<thead>
						<tr><th>Code</th><th>Name</th></tr>
					</thead>
					<tbody>
						{#each currencies as currency}
							<tr><td>{currency.code}</td><td>{currency.name}</td></tr>
						{/each}
					</tbody>
				</Table>
			</Column>
			<Column size="100" md="50" lg="1-3">
				<Heading level={5}>Users ({users.length})</Heading>
				<Table isStriped size="xs">
					<thead>
						<tr><th>Name</th><th>Email</th></tr>
					</thead>
					<tbody>
						{#each users as user}
							<tr><td>{user.name}</td><td>{user.email}</td></tr>
						{/each}
					</tbody>
				</Table>
			</Column>
		</Grid>

		{#if orderDetail}
			<Card class="mt-4" titleText="Order Detail">
				<Grid>
					<Column size="50" md="25">
						<FormGroup>
							<FormLabel>Order ID</FormLabel>
							<Input value={String(orderDetail.id)} readonly />
						</FormGroup>
					</Column>
					<Column size="50" md="25">
						<FormGroup>
							<FormLabel>Customer</FormLabel>
							<Input value={orderDetail.customer} readonly />
						</FormGroup>
					</Column>
					<Column size="50" md="25">
						<FormGroup>
							<FormLabel>Total</FormLabel>
							<Input value={`$${orderDetail.total.toFixed(2)}`} readonly />
						</FormGroup>
					</Column>
					<Column size="50" md="25">
						<FormGroup>
							<FormLabel>Status</FormLabel>
							<Badge variant={orderDetail.status === 'pending' ? 'warning' : 'success'}>
								{orderDetail.status}
							</Badge>
						</FormGroup>
					</Column>
				</Grid>
			</Card>
		{/if}
	{/if}
</Card>

<!-- Error Handling Demo -->
<Card titleText="Error Handling: Partial Failures">
	<Paragraph class="mb-4">
		Each call in a batch resolves or rejects <strong>independently</strong>.
		If one call fails, others still succeed.
	</Paragraph>

	<Button variant="primary" onclick={runErrorDemo} disabled={demo2Loading} class="mb-4">
		{#if demo2Loading}
			<Spinner size="xs" class="me-2" /> Running...
		{:else}
			Run Mixed Calls (2 valid, 2 invalid)
		{/if}
	</Button>

	{#if demo2Results.length > 0}
		<Table isStriped>
			<thead>
				<tr>
					<th>Method</th>
					<th>Status</th>
					<th>Result</th>
				</tr>
			</thead>
			<tbody>
				{#each demo2Results as result}
					<tr>
						<td><code>{result.method}</code></td>
						<td>
							<Badge variant={result.success ? 'success' : 'danger'}>
								{result.success ? 'Success' : 'Error'}
							</Badge>
						</td>
						<td>
							{#if result.success}
								{JSON.stringify(result.data).slice(0, 50)}...
							{:else}
								<span class="text-danger">{result.error}</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/if}

	<Heading level={4} class="mt-4">Error Handling Pattern</Heading>
	<HighlightedCode language="typescript" code={codeErrorHandling} />
</Card>

<!-- Transforming Results -->
<Card titleText="Transforming Results">
	<Paragraph>
		Use standard Promise <code>.then()</code> chaining to transform results before awaiting.
		This is useful when endpoints return arrays for single items or nested response structures.
	</Paragraph>

	<HighlightedCode language="typescript" code={codeTransformResults} />

	<Callout variant="info" class="mt-4">
		<strong>Tip:</strong> Since <code>batch.add()</code> returns a Promise, you can use any Promise method:
		<code>.then()</code>, <code>.catch()</code>, <code>.finally()</code>, or combine with <code>Promise.all()</code>.
	</Callout>
</Card>

<!-- Transport Adapters -->
<Card titleText="Transport Adapters">
	<Paragraph>
		The batch RPC is <strong>transport-agnostic</strong>. Use the factory functions to create adapters for your backend.
	</Paragraph>

	<Heading level={4} class="mt-4">SignalR (ASP.NET)</Heading>
	<HighlightedCode language="typescript" code={codeSignalR} />

	<Heading level={4} class="mt-4">Phoenix Channels (Elixir)</Heading>
	<HighlightedCode language="typescript" code={codePhoenix} />

	<Heading level={4} class="mt-4">HTTP/REST</Heading>
	<HighlightedCode language="typescript" code={codeHttp} />
</Card>

<!-- Transport Authentication -->
<Card titleText="Transport Authentication">
	<Paragraph>
		Each transport type handles authentication differently. HTTP transport supports dynamic headers and interceptors,
		while SignalR and Phoenix configure auth on the connection itself.
	</Paragraph>

	<Heading level={4} class="mt-4">HTTP: Dynamic Headers & Cookies</Heading>
	<Paragraph class="small">
		Use <code>getHeaders</code> callback for tokens that may change, and <code>fetchOptions.credentials</code> for cookies.
	</Paragraph>
	<HighlightedCode language="typescript" code={codeHttpDynamicAuth} />

	<Heading level={4} class="mt-4">HTTP: Request/Response Interceptors</Heading>
	<Paragraph class="small">
		Use interceptors for logging, metrics, or handling specific status codes like 401.
	</Paragraph>
	<HighlightedCode language="typescript" code={codeHttpInterceptors} />

	<Heading level={4} class="mt-4">SignalR: Access Token Factory</Heading>
	<Paragraph class="small">
		Auth is configured on the connection builder, not the transport.
	</Paragraph>
	<HighlightedCode language="typescript" code={codeSignalRAuth} />

	<Heading level={4} class="mt-4">Phoenix: Socket Params</Heading>
	<Paragraph class="small">
		Auth is configured on the socket connection, not the transport.
	</Paragraph>
	<HighlightedCode language="typescript" code={codePhoenixAuth} />

	<Callout variant="info" class="mt-4">
		<strong>Note:</strong> For SignalR and Phoenix, the transport is just a thin wrapper around your authenticated connection.
		All auth configuration happens when you create the connection/socket.
	</Callout>
</Card>

<!-- Request Metadata -->
<Card titleText="Request Metadata (Session ID, Tenant ID, etc.)">
	<Paragraph>
		Use <code>getRequestMetadata</code> to add contextual data to every batch request body.
		This is useful for session tracking, multi-tenancy, or debugging.
	</Paragraph>

	<Heading level={4} class="mt-4">Adding Metadata to Requests</Heading>
	<HighlightedCode language="typescript" code={codeRequestMetadata} />

	<Heading level={4} class="mt-4">Server-Generated Session ID Example</Heading>
	<Paragraph class="small">
		Session ID generated on server, passed to client, displayed in footer, and sent with every request.
	</Paragraph>
	<HighlightedCode language="typescript" code={codeSessionSetup} />

	<Callout variant="info" class="mt-4">
		<strong>All transports support this:</strong> <code>getRequestMetadata</code> is available on
		<code>createHttpTransport</code>, <code>createSignalRTransport</code>, and <code>createPhoenixTransport</code>.
	</Callout>
</Card>

<!-- Configuration Presets -->
<Card titleText="Configuration Presets">
	<Paragraph>
		Two presets are provided for common response patterns:
	</Paragraph>

	<Grid class="mt-4">
		<Column size="100" md="50">
			<Heading level={5}>commonResponseConfig</Heading>
			<Paragraph class="small">
				For ASP.NET with CommonResponse wrapper pattern.
			</Paragraph>
			<HighlightedCode language="typescript" code={codeCommonResponse} />
		</Column>
		<Column size="100" md="50">
			<Heading level={5}>pureDataConfig</Heading>
			<Paragraph class="small">
				For Phoenix or clean REST APIs returning data directly.
			</Paragraph>
			<HighlightedCode language="typescript" code={codePureData} />
		</Column>
	</Grid>
</Card>

<!-- Real-World Example -->
<Card titleText="Real-World Example: Order Form">
	<Paragraph>
		Here's how you'd use batch RPC to load all data for an order detail form:
	</Paragraph>

	<HighlightedCode language="svelte" code={codeRealWorld} />
</Card>

<!-- Wire Protocol -->
<Card titleText="Wire Protocol">
	<Paragraph>
		The batch RPC uses a simple JSON protocol for requests and responses.
	</Paragraph>

	<Grid class="mt-4">
		<Column size="100" md="50">
			<Heading level={5}>Request Format</Heading>
			<HighlightedCode language="json" code={codeRequestFormat} />
		</Column>
		<Column size="100" md="50">
			<Heading level={5}>Response Format</Heading>
			<HighlightedCode language="json" code={codeResponseFormat} />
		</Column>
	</Grid>
</Card>

<!-- API Reference -->
<Card titleText="API Reference">
	<Heading level={4}>createBatch(transport)</Heading>
	<Paragraph>Creates a new batch for collecting and executing RPC calls.</Paragraph>
	<Table isStriped size="xs" class="mt-2">
		<thead>
			<tr><th>Method</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr>
				<td><code>add&lt;T&gt;(method, params?)</code></td>
				<td>Add a call to the batch. Returns <code>Promise&lt;T&gt;</code> that resolves after execute().</td>
			</tr>
			<tr>
				<td><code>execute()</code></td>
				<td>Send all queued calls as a single request. Returns <code>Promise&lt;void&gt;</code>.</td>
			</tr>
			<tr>
				<td><code>size</code></td>
				<td>Number of calls currently in the batch (readonly).</td>
			</tr>
			<tr>
				<td><code>executed</code></td>
				<td>Whether the batch has been executed (readonly).</td>
			</tr>
		</tbody>
	</Table>

	<Heading level={4} class="mt-4">Transport Factories</Heading>
	<Table isStriped size="xs" class="mt-2">
		<thead>
			<tr><th>Function</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr>
				<td><code>createSignalRTransport(connection, config)</code></td>
				<td>Create transport for ASP.NET SignalR hubs.</td>
			</tr>
			<tr>
				<td><code>createPhoenixTransport(channel, config)</code></td>
				<td>Create transport for Elixir Phoenix channels.</td>
			</tr>
			<tr>
				<td><code>createHttpTransport(url, config, options?)</code></td>
				<td>Create transport for REST API endpoints.</td>
			</tr>
		</tbody>
	</Table>

	<Heading level={4} class="mt-4">RpcTransportConfig</Heading>
	<Table isStriped size="xs" class="mt-2">
		<thead>
			<tr><th>Property</th><th>Type</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr>
				<td><code>parseResponse</code></td>
				<td><code>(raw) =&gt; BatchResponse</code></td>
				<td>Parse raw transport response into BatchResponse format.</td>
			</tr>
			<tr>
				<td><code>parseCallResult?</code></td>
				<td><code>(raw) =&gt; unknown</code></td>
				<td>Unwrap individual call results (e.g., CommonResponse.data).</td>
			</tr>
			<tr>
				<td><code>isError?</code></td>
				<td><code>(result) =&gt; boolean</code></td>
				<td>Determine if a result is an error. Default: checks for error field.</td>
			</tr>
			<tr>
				<td><code>parseError?</code></td>
				<td><code>(result) =&gt; RpcError</code></td>
				<td>Extract error details from a failed result.</td>
			</tr>
		</tbody>
	</Table>

	<Heading level={4} class="mt-4">HttpTransportOptions</Heading>
	<Table isStriped size="xs" class="mt-2">
		<thead>
			<tr><th>Property</th><th>Type</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr>
				<td><code>headers?</code></td>
				<td><code>Record&lt;string, string&gt;</code></td>
				<td>Static headers to include with each request.</td>
			</tr>
			<tr>
				<td><code>getHeaders?</code></td>
				<td><code>() =&gt; Record | Promise</code></td>
				<td>Dynamic headers callback - called before each request. Use for auth tokens.</td>
			</tr>
			<tr>
				<td><code>getRequestMetadata?</code></td>
				<td><code>() =&gt; Record | Promise</code></td>
				<td>Request metadata callback - adds <code>meta</code> field to request body (sessionId, tenantId, etc.).</td>
			</tr>
			<tr>
				<td><code>onBeforeRequest?</code></td>
				<td><code>(request, init) =&gt; void</code></td>
				<td>Request interceptor - called before each request is sent.</td>
			</tr>
			<tr>
				<td><code>onAfterResponse?</code></td>
				<td><code>(response) =&gt; void</code></td>
				<td>Response interceptor - handle status codes, logging, etc.</td>
			</tr>
			<tr>
				<td><code>fetchOptions?</code></td>
				<td><code>RequestInit</code></td>
				<td>Additional fetch options (e.g., <code>credentials: 'include'</code>).</td>
			</tr>
			<tr>
				<td><code>fetchFn?</code></td>
				<td><code>typeof fetch</code></td>
				<td>Custom fetch function. Default: globalThis.fetch.</td>
			</tr>
			<tr>
				<td><code>timeout?</code></td>
				<td><code>number</code></td>
				<td>Request timeout in milliseconds. Default: 30000.</td>
			</tr>
		</tbody>
	</Table>

	<Heading level={4} class="mt-4">SignalRTransportOptions / PhoenixTransportOptions</Heading>
	<Table isStriped size="xs" class="mt-2">
		<thead>
			<tr><th>Property</th><th>Type</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr>
				<td><code>methodName?</code> / <code>eventName?</code></td>
				<td><code>string</code></td>
				<td>Hub method or channel event name. Default: "BatchInvoke" / "batch_invoke".</td>
			</tr>
			<tr>
				<td><code>getRequestMetadata?</code></td>
				<td><code>() =&gt; Record | Promise</code></td>
				<td>Request metadata callback - adds <code>meta</code> field to request body.</td>
			</tr>
			<tr>
				<td><code>timeout?</code></td>
				<td><code>number</code></td>
				<td>Request timeout in milliseconds (Phoenix only). Default: 30000.</td>
			</tr>
		</tbody>
	</Table>
</Card>

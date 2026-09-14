<script lang="ts">
	import { Paragraph, Card, Table, TableCard, TableContainer, ButtonGroup, Button } from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>Table size variants synchronized with button/input sizes. Each variant provides enough space for buttons and inputs of the same size.</Paragraph>

<!-- XS Size Table -->
<Card>
	{#snippet title()}XS Size <code>pa-table--xs</code>{/snippet}
	<Paragraph>Compact rows - fits button/input XS. Best for dense data grids.</Paragraph>
	<TableContainer>
		<Table size="xs">
			<thead>
				<tr>
					<th class="col-auto">Actions</th>
					<th>Name</th>
					<th>Position</th>
					<th>Office</th>
					<th>Age</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="xs">Edit</Button>
							<Button variant="danger" size="xs">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Tiger Nixon</td>
					<td>System Architect</td>
					<td>Edinburgh</td>
					<td>61</td>
				</tr>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="xs">Edit</Button>
							<Button variant="danger" size="xs">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Garrett Winters</td>
					<td>Accountant</td>
					<td>Tokyo</td>
					<td>63</td>
				</tr>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="xs">Edit</Button>
							<Button variant="danger" size="xs">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Ashton Cox</td>
					<td>Junior Technical Author</td>
					<td>San Francisco</td>
					<td>66</td>
				</tr>
			</tbody>
		</Table>
	</TableContainer>
</Card>

<!-- Default Size Table -->
<Card>
	{#snippet title()}Default Size <code>pa-table</code>{/snippet}
	<Paragraph>Standard rows - fits button/input SM and default sizes.</Paragraph>
	<TableContainer>
		<Table>
			<thead>
				<tr>
					<th class="col-auto">Actions</th>
					<th>Name</th>
					<th>Position</th>
					<th>Office</th>
					<th>Age</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="sm">Edit</Button>
							<Button variant="danger" size="sm">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Tiger Nixon</td>
					<td>System Architect</td>
					<td>Edinburgh</td>
					<td>61</td>
				</tr>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="sm">Edit</Button>
							<Button variant="danger" size="sm">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Garrett Winters</td>
					<td>Accountant</td>
					<td>Tokyo</td>
					<td>63</td>
				</tr>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="sm">Edit</Button>
							<Button variant="danger" size="sm">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Ashton Cox</td>
					<td>Junior Technical Author</td>
					<td>San Francisco</td>
					<td>66</td>
				</tr>
			</tbody>
		</Table>
	</TableContainer>
</Card>

<!-- SM Size Table -->
<Card>
	{#snippet title()}SM Size <code>pa-table--sm</code>{/snippet}
	<Paragraph>Slightly wider horizontal padding than default.</Paragraph>
	<TableContainer>
		<Table size="sm">
			<thead>
				<tr>
					<th class="col-auto">Actions</th>
					<th>Name</th>
					<th>Position</th>
					<th>Office</th>
					<th>Age</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="sm">Edit</Button>
							<Button variant="danger" size="sm">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Tiger Nixon</td>
					<td>System Architect</td>
					<td>Edinburgh</td>
					<td>61</td>
				</tr>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="sm">Edit</Button>
							<Button variant="danger" size="sm">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Garrett Winters</td>
					<td>Accountant</td>
					<td>Tokyo</td>
					<td>63</td>
				</tr>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="sm">Edit</Button>
							<Button variant="danger" size="sm">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Ashton Cox</td>
					<td>Junior Technical Author</td>
					<td>San Francisco</td>
					<td>66</td>
				</tr>
			</tbody>
		</Table>
	</TableContainer>
</Card>

<!-- LG Size Table -->
<Card>
	{#snippet title()}LG Size <code>pa-table--lg</code>{/snippet}
	<Paragraph>Spacious rows - fits button/input LG. Good for forms in tables.</Paragraph>
	<TableContainer>
		<Table size="lg">
			<thead>
				<tr>
					<th class="col-auto">Actions</th>
					<th>Name</th>
					<th>Position</th>
					<th>Office</th>
					<th>Age</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="lg">Edit</Button>
							<Button variant="danger" size="lg">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Tiger Nixon</td>
					<td>System Architect</td>
					<td>Edinburgh</td>
					<td>61</td>
				</tr>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="lg">Edit</Button>
							<Button variant="danger" size="lg">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Garrett Winters</td>
					<td>Accountant</td>
					<td>Tokyo</td>
					<td>63</td>
				</tr>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="lg">Edit</Button>
							<Button variant="danger" size="lg">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Ashton Cox</td>
					<td>Junior Technical Author</td>
					<td>San Francisco</td>
					<td>66</td>
				</tr>
			</tbody>
		</Table>
	</TableContainer>
</Card>

<!-- XL Size Table -->
<Card>
	{#snippet title()}XL Size <code>pa-table--xl</code>{/snippet}
	<Paragraph>Extra spacious rows - fits button/input XL. Best for presentation tables.</Paragraph>
	<TableContainer>
		<Table size="xl">
			<thead>
				<tr>
					<th class="col-auto">Actions</th>
					<th>Name</th>
					<th>Position</th>
					<th>Office</th>
					<th>Age</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="xl">Edit</Button>
							<Button variant="danger" size="xl">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Tiger Nixon</td>
					<td>System Architect</td>
					<td>Edinburgh</td>
					<td>61</td>
				</tr>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="xl">Edit</Button>
							<Button variant="danger" size="xl">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Garrett Winters</td>
					<td>Accountant</td>
					<td>Tokyo</td>
					<td>63</td>
				</tr>
				<tr>
					<td class="col-auto">
						<ButtonGroup>
							<Button variant="secondary" size="xl">Edit</Button>
							<Button variant="danger" size="xl">Delete</Button>
						</ButtonGroup>
					</td>
					<td>Ashton Cox</td>
					<td>Junior Technical Author</td>
					<td>San Francisco</td>
					<td>66</td>
				</tr>
			</tbody>
		</Table>
	</TableContainer>
</Card>

<!-- Size Reference -->
<TableCard titleText="Size Reference">
	<Table>
		<thead>
			<tr>
				<th>Size</th>
				<th>Class</th>
				<th>Padding</th>
				<th>Best for</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>XS</td>
				<td><code>pa-table--xs</code></td>
				<td>0.6rem 0.8rem</td>
				<td>Dense data grids, logs</td>
			</tr>
			<tr>
				<td>Default</td>
				<td><code>pa-table</code></td>
				<td>0.8rem 0.8rem</td>
				<td>Standard tables</td>
			</tr>
			<tr>
				<td>SM</td>
				<td><code>pa-table--sm</code></td>
				<td>0.8rem 1rem</td>
				<td>Slightly wider spacing</td>
			</tr>
			<tr>
				<td>LG</td>
				<td><code>pa-table--lg</code></td>
				<td>0.8rem 1.4rem</td>
				<td>Forms in tables</td>
			</tr>
			<tr>
				<td>XL</td>
				<td><code>pa-table--xl</code></td>
				<td>0.8rem 1.6rem</td>
				<td>Presentation tables</td>
			</tr>
		</tbody>
	</Table>
</TableCard>

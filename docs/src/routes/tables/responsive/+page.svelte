<script lang="ts">
	import { Paragraph, Card, TableCard, Grid, Column, Table, Badge, Button, ButtonGroup, Alert, BasicList, Code, CodeBlock } from '@keenmate/svelte-pure-admin';
</script>

<!-- How It Works -->
<Card titleText="How It Works" class="mb-4">
	<Grid>
		<Column size="100" md="1-3">
			<h4 class="mb-2">Desktop (&gt;1024px)</h4>
			<BasicList>
				<li>Standard table layout with columns</li>
				<li>Headers visible at top</li>
				<li>Data in rows and columns</li>
				<li>Full table width displayed</li>
			</BasicList>
		</Column>
		<Column size="100" md="1-3">
			<h4 class="mb-2">Tablet (769px - 1024px)</h4>
			<BasicList>
				<li>Table becomes horizontally scrollable</li>
				<li>Maintains desktop structure</li>
				<li>Prevents cramped columns</li>
				<li>Smooth scrolling on touch devices</li>
			</BasicList>
		</Column>
		<Column size="100" md="1-3">
			<h4 class="mb-2">Mobile (≤768px)</h4>
			<BasicList>
				<li>Each row becomes a card</li>
				<li>Headers hidden</li>
				<li>Labels from <Code>data-label</Code></li>
				<li>Label: Value pattern</li>
				<li>Stacked vertically</li>
			</BasicList>
		</Column>
	</Grid>

	<Alert variant="info" class="mt-4">
		<strong>Try it:</strong> Resize your browser window to see the responsive behavior:
		<BasicList class="mt-2">
			<li><strong>1024px → 769px:</strong> Table becomes scrollable (prevents cramping)</li>
			<li><strong>768px and below:</strong> Transforms into stacked cards</li>
		</BasicList>
	</Alert>
</Card>

<!-- Basic Responsive Table -->
<TableCard titleText="Basic Responsive Table" descriptionText="Simple user data table with automatic mobile transformation" class="mb-4">
	<Table isResponsive>
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Email</th>
				<th>Role</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td data-label="ID">#1001</td>
				<td data-label="Name">John Doe</td>
				<td data-label="Email">john.doe@example.com</td>
				<td data-label="Role">Admin</td>
				<td data-label="Status"><Badge variant="success">Active</Badge></td>
			</tr>
			<tr>
				<td data-label="ID">#1002</td>
				<td data-label="Name">Jane Smith</td>
				<td data-label="Email">jane.smith@example.com</td>
				<td data-label="Role">Editor</td>
				<td data-label="Status"><Badge variant="warning">Pending</Badge></td>
			</tr>
			<tr>
				<td data-label="ID">#1003</td>
				<td data-label="Name">Bob Johnson</td>
				<td data-label="Email">bob.johnson@example.com</td>
				<td data-label="Role">Viewer</td>
				<td data-label="Status"><Badge variant="success">Active</Badge></td>
			</tr>
			<tr>
				<td data-label="ID">#1004</td>
				<td data-label="Name">Alice Williams</td>
				<td data-label="Email">alice.w@example.com</td>
				<td data-label="Role">Editor</td>
				<td data-label="Status"><Badge variant="danger">Inactive</Badge></td>
			</tr>
		</tbody>
	</Table>
</TableCard>

<!-- Product Table -->
<TableCard titleText="Product Catalog" descriptionText="E-commerce product table with images, prices, and stock status" class="mb-4">
	<Table isResponsive isStriped>
		<thead>
			<tr>
				<th class="col-auto">Actions</th>
				<th>Product</th>
				<th>Category</th>
				<th>Price</th>
				<th>Stock</th>
				<th>Rating</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td data-label="Actions" class="col-auto">
					<ButtonGroup>
						<Button size="xs" variant="primary" isIconOnly titleText="View">👁️</Button>
						<Button size="xs" variant="secondary" isIconOnly titleText="Edit"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
					</ButtonGroup>
				</td>
				<td data-label="Product"><strong>MacBook Pro 16"</strong></td>
				<td data-label="Category">Laptops</td>
				<td data-label="Price">$2,499.00</td>
				<td data-label="Stock"><Badge variant="success">In Stock</Badge></td>
				<td data-label="Rating">⭐⭐⭐⭐⭐ (4.8)</td>
			</tr>
			<tr>
				<td data-label="Actions" class="col-auto">
					<ButtonGroup>
						<Button size="xs" variant="primary" isIconOnly titleText="View">👁️</Button>
						<Button size="xs" variant="secondary" isIconOnly titleText="Edit"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
					</ButtonGroup>
				</td>
				<td data-label="Product"><strong>iPhone 15 Pro</strong></td>
				<td data-label="Category">Smartphones</td>
				<td data-label="Price">$999.00</td>
				<td data-label="Stock"><Badge variant="warning">Low Stock</Badge></td>
				<td data-label="Rating">⭐⭐⭐⭐⭐ (4.9)</td>
			</tr>
			<tr>
				<td data-label="Actions" class="col-auto">
					<ButtonGroup>
						<Button size="xs" variant="primary" isIconOnly titleText="View">👁️</Button>
						<Button size="xs" variant="secondary" isIconOnly titleText="Edit"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
					</ButtonGroup>
				</td>
				<td data-label="Product"><strong>AirPods Pro (2nd gen)</strong></td>
				<td data-label="Category">Audio</td>
				<td data-label="Price">$249.00</td>
				<td data-label="Stock"><Badge variant="success">In Stock</Badge></td>
				<td data-label="Rating">⭐⭐⭐⭐ (4.6)</td>
			</tr>
			<tr>
				<td data-label="Actions" class="col-auto">
					<ButtonGroup>
						<Button size="xs" variant="primary" isIconOnly titleText="View">👁️</Button>
						<Button size="xs" variant="secondary" isIconOnly titleText="Edit"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
					</ButtonGroup>
				</td>
				<td data-label="Product"><strong>iPad Air M2</strong></td>
				<td data-label="Category">Tablets</td>
				<td data-label="Price">$599.00</td>
				<td data-label="Stock"><Badge variant="danger">Out of Stock</Badge></td>
				<td data-label="Rating">⭐⭐⭐⭐ (4.7)</td>
			</tr>
		</tbody>
	</Table>
</TableCard>

<!-- Orders Table -->
<TableCard titleText="Recent Orders" descriptionText="Order management table with dates, customers, and amounts" class="mb-4">
	<Table isResponsive>
		<thead>
			<tr>
				<th class="col-auto">Actions</th>
				<th>Order #</th>
				<th>Date</th>
				<th>Customer</th>
				<th>Items</th>
				<th>Total</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td data-label="Actions" class="col-auto">
					<Button size="xs" variant="secondary">View</Button>
				</td>
				<td data-label="Order #">#ORD-2501</td>
				<td data-label="Date">Oct 23, 2025</td>
				<td data-label="Customer">Sarah Connor</td>
				<td data-label="Items">3 items</td>
				<td data-label="Total">$3,247.00</td>
				<td data-label="Status"><Badge variant="success">Delivered</Badge></td>
			</tr>
			<tr>
				<td data-label="Actions" class="col-auto">
					<Button size="xs" variant="secondary">View</Button>
				</td>
				<td data-label="Order #">#ORD-2502</td>
				<td data-label="Date">Oct 22, 2025</td>
				<td data-label="Customer">John Matrix</td>
				<td data-label="Items">1 item</td>
				<td data-label="Total">$999.00</td>
				<td data-label="Status"><Badge variant="primary">Shipped</Badge></td>
			</tr>
			<tr>
				<td data-label="Actions" class="col-auto">
					<Button size="xs" variant="secondary">View</Button>
				</td>
				<td data-label="Order #">#ORD-2503</td>
				<td data-label="Date">Oct 21, 2025</td>
				<td data-label="Customer">Ellen Ripley</td>
				<td data-label="Items">5 items</td>
				<td data-label="Total">$1,847.00</td>
				<td data-label="Status"><Badge variant="warning">Processing</Badge></td>
			</tr>
			<tr>
				<td data-label="Actions" class="col-auto">
					<Button size="xs" variant="secondary">View</Button>
				</td>
				<td data-label="Order #">#ORD-2504</td>
				<td data-label="Date">Oct 20, 2025</td>
				<td data-label="Customer">Martin Riggs</td>
				<td data-label="Items">2 items</td>
				<td data-label="Total">$548.00</td>
				<td data-label="Status"><Badge variant="danger">Cancelled</Badge></td>
			</tr>
		</tbody>
	</Table>
</TableCard>

<!-- Code Example -->
<Card titleText="HTML Implementation" subtitleText="How to make your tables responsive" class="mb-4">
	<h4 class="mb-2">1. Add the class modifier</h4>
	<Paragraph class="mb-3">Add <Code>.pa-table--responsive</Code> to your table element:</Paragraph>
	<CodeBlock class="mb-4">{`<table class="pa-table pa-table--responsive">
  <!-- table content -->
</table>`}</CodeBlock>

	<h4 class="mb-2">2. Add data-label attributes</h4>
	<Paragraph class="mb-3">Each <Code>&lt;td&gt;</Code> needs a <Code>data-label</Code> attribute matching its column header:</Paragraph>
	<CodeBlock class="mb-4">{`<table class="pa-table pa-table--responsive">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Name">John Doe</td>
      <td data-label="Email">john@example.com</td>
      <td data-label="Status">
        <span class="pa-badge pa-badge--success">Active</span>
      </td>
    </tr>
  </tbody>
</table>`}</CodeBlock>

	<h4 class="mb-2">3. That's it!</h4>
	<Paragraph>The table will automatically transform on screens smaller than 768px. No JavaScript required!</Paragraph>

	<Alert variant="success" class="mt-4">
		<strong>Pro tip:</strong> Combine with <Code>.pa-table--striped</Code> for better readability on desktop. The striping is automatically disabled on mobile.
	</Alert>
</Card>

<!-- SCSS Variables Reference -->
<Card titleText="Customization Variables" subtitleText="SCSS variables for responsive table styling" class="mb-4">
	<Table>
		<thead>
			<tr>
				<th>Variable</th>
				<th>Default Value</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Code>$table-responsive-breakpoint</Code></td>
				<td><Code>768px</Code></td>
				<td>Screen width where tables switch to stacked layout</td>
			</tr>
			<tr>
				<td><Code>$table-responsive-card-margin</Code></td>
				<td><Code>1rem</Code></td>
				<td>Space between stacked row cards</td>
			</tr>
			<tr>
				<td><Code>$table-responsive-card-padding</Code></td>
				<td><Code>0.75rem</Code></td>
				<td>Inner padding for each card cell</td>
			</tr>
			<tr>
				<td><Code>$table-responsive-label-width</Code></td>
				<td><Code>40%</Code></td>
				<td>Width allocated for labels in mobile view</td>
			</tr>
			<tr>
				<td><Code>$table-responsive-label-font-weight</Code></td>
				<td><Code>$font-weight-semibold</Code></td>
				<td>Font weight for labels (default: 600)</td>
			</tr>
		</tbody>
	</Table>

	<Alert variant="info" class="mt-4">
		<strong>Customize in your theme:</strong> Override these variables in your theme file to adjust the responsive behavior and styling.
	</Alert>
</Card>

<!-- Mobile Testing Tips -->
<Card titleText="Testing Tips">
	<Grid>
		<Column size="100" md="1-3">
			<h4>Desktop Browser</h4>
			<BasicList>
				<li>Resize browser window</li>
				<li>Use DevTools device toolbar</li>
				<li>Press F12 → Toggle device toolbar</li>
			</BasicList>
		</Column>
		<Column size="100" md="1-3">
			<h4>Real Device</h4>
			<BasicList>
				<li>Test on actual phones/tablets</li>
				<li>Check both orientations</li>
				<li>Verify touch interactions</li>
			</BasicList>
		</Column>
		<Column size="100" md="1-3">
			<h4>Common Breakpoints</h4>
			<BasicList>
				<li>Mobile: 320px - 767px</li>
				<li>Tablet: 768px - 1023px</li>
				<li>Desktop: 1024px+</li>
			</BasicList>
		</Column>
	</Grid>
</Card>

<!-- Svelte Component Usage -->
<Card titleText="Svelte Component Code Examples">
	<Grid>
		<Column size="100" md="50">
			<h4 class="mb-2">Using Table Component</h4>
			<CodeBlock>{`<!-- Add responsive class via class prop -->
<Table class="pa-table--responsive" isStriped>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Name">John Doe</td>
      <td data-label="Email">john@example.com</td>
      <td data-label="Status">
        <Badge variant="success">Active</Badge>
      </td>
    </tr>
  </tbody>
</Table>`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Using Raw HTML Table</h4>
			<CodeBlock>{`<!-- Wrap in Card with hasPadding={false} for flush edges -->
<Card titleText="Users" hasPadding={false}>
  <table class="pa-table pa-table--responsive">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Name">John Doe</td>
        <td data-label="Email">john@example.com</td>
        <td data-label="Status">
          <span class="pa-badge pa-badge--success">
            Active
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</Card>`}</CodeBlock>
		</Column>
	</Grid>

	<h4 class="mb-2 mt-4">Key Points</h4>
	<CodeBlock>{`// Essential: Every <td> needs a matching data-label
<td data-label="Column Name">Cell Value</td>

// Combine with table variants
<table class="pa-table pa-table--responsive pa-table--striped">
<table class="pa-table pa-table--responsive">
<table class="pa-table pa-table--responsive pa-table--compact">

// Actions column - use col-auto class
<th class="col-auto">Actions</th>
<td data-label="Actions" class="col-auto">
  <ButtonGroup>
    <Button size="xs">View</Button>
    <Button size="xs">Edit</Button>
  </ButtonGroup>
</td>`}</CodeBlock>
</Card>

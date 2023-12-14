<svelte:head>
	<title>Offices users</title>
</svelte:head>

<script>
	import { Card, AccordionItem, Accordion, Label, Input, Button, 
			 Table, TableBody, TableHead, TableHeadCell, TableBodyRow, 
			 TableBodyCell } from 'flowbite-svelte';
	import { users } from '../../../mocks/users.js';

	let username, firstName, lastName;

	function registerNewUser () {
		console.log("register")
	}

	function deleteUser () {
		console.log("delete")
	}
</script>

<Accordion>
	<AccordionItem>
		<span slot="header">Create user</span>
		<Card>
			<form on:submit|preventDefault={registerNewUser}>
				<div class="mb-6">
					<div>
						<Input type="text" id="username" placeholder="Username" bind:value={username} required />
					</div>
					<div>
						<Input type="text" id="firstName" placeholder="First name" bind:value={firstName} required />
					</div>
					<div>
						<Input type="text" id="lastName" placeholder="Last name" bind:value={lastName} required />
					</div>
				</div>
				<Button type="submit">Submit</Button>
			</form>
		</Card>
	</AccordionItem>
</Accordion>

<Table color="green" striped={true} hoverable={true} shadow style="margin-top:10px">
  <TableHead>
    <TableHeadCell>Username</TableHeadCell>
	<TableHeadCell>First name</TableHeadCell>
    <TableHeadCell>Last name</TableHeadCell>
    <TableHeadCell>Actions</TableHeadCell>
  </TableHead>
  <TableBody>
    {#each users as user}
      <TableBodyRow>
        <TableBodyCell>{user.username}</TableBodyCell>
        <TableBodyCell>{user.firstName}</TableBodyCell>
        <TableBodyCell>{user.lastName}</TableBodyCell>
		<TableBodyCell><Button on:click={deleteUser}>Delete</Button></TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>

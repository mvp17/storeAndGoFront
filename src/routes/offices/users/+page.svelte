<svelte:head>
	<title>Offices users</title>
</svelte:head>

<script>
	import { Card, AccordionItem, Accordion, Label, Input, Button, 
			 Table, TableBody, TableHead, TableHeadCell, TableBodyRow, 
			 TableBodyCell } from 'flowbite-svelte';
	import { users } from '../../../mocks/users.js';
	import { onMount } from 'svelte';
	import { http } from '../../../stores/http';

	let /** @type {string} */ username, 
		/** @type {string} */ firstName, 
		/** @type {string} */ lastName,
		/** @type {string} */ password;

	onMount (async () => {
        try {
          /*
		  const res = await $http.get('/get-users');
          users = res.data.users;
		  */
        } catch (err) {
            console.log(err);
        }
    });

	function registerNewUser () {
		/*
		await $http.post('/new-user', {username: username, firstName: firstName, lastName: lastName});
		await $http.get('/get-users');
		*/
	}

	function deleteUser (/** @type {number} */ userId) {
		/*
		await $http.delete('/delete-user', {id: userId})
		await $http.get('/get-users');
		*/
	}
</script>

<Accordion>
	<AccordionItem>
		<span slot="header">Create user</span>
		<Card>
			<form on:submit|preventDefault={registerNewUser}>
				<div class="mb-6">
					<Input type="text" id="username" placeholder="Username" bind:value={username} required />
					<br>
					<Input type="text" id="firstName" placeholder="First name" bind:value={firstName} required />
					<br>
					<Input type="text" id="lastName" placeholder="Last name" bind:value={lastName} required />
					<br>
					<Input type="text" id="password" placeholder="Password" bind:value={password} required />
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
		<TableBodyCell><Button on:click={() => {deleteUser(user.id)}}>Delete</Button></TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>

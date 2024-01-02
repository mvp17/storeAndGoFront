<svelte:head>
	<title>Offices users</title>
</svelte:head>

<script>
	import { Card, AccordionItem, Accordion, Label, Input, Button, 
			 Table, TableBody, TableHead, TableHeadCell, TableBodyRow, 
			 TableBodyCell } from 'flowbite-svelte';
	import { users } from '../../../mocks/users.js';
	import { onMount } from 'svelte';
  	import { baseURL } from '../../../environment';
	import axios from 'axios';

	let /** @type {string} */ username, /** @type {string} */ firstName, /** @type {string} */ lastName;

	onMount (async () => {
        try {
          //axios.defaults.withCredentials = true;
          const instance = axios.create({ baseURL: baseURL });
          /*
		  const res = await instance.get('/get-users');
          users = res.data.users;
		  */
        } catch (err) {
            console.log(err);
        }
    });

	function registerNewUser () {
		const instance = axios.create({ baseURL: baseURL });
          /*
		  await instance.post('/new-user', {username: username, firstName: firstName, lastName: lastName});
		  await instance.get('/get-users');
		  */
	}

	function deleteUser (/** @type {number} */ userId) {
		const instance = axios.create({ baseURL: baseURL });
		/*
		await instance.delete('/delete-user', {id: userId})
		await instance.get('/get-users');
		*/
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
		<TableBodyCell><Button on:click={() => {deleteUser(user.id)}}>Delete</Button></TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>

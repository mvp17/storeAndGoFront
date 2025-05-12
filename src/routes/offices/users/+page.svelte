<script>
	import {
		Card,
		AccordionItem,
		Accordion,
		Label,
		Input,
		Button,
		Table,
		TableBody,
		TableHead,
		TableHeadCell,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { http } from '../../../stores/http';

	let /** @type {string} */ username,
		/** @type {string} */ email,
		/** @type {string} */ firstName,
		/** @type {string} */ lastName,
		/** @type {string} */ password;

	let users = [];

	onMount(async () => {
		try {
			getUsers();
		} catch (err) {
			console.log(err);
		}
	});

	async function registerNewUser() {
		await $http.post('/users/sign_up', {
			username: username,
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		});
		getUsers();
		resetForm();
	}

	function resetForm() {
		username = '';
		firstName = '';
		lastName = '';
		password = '';
		email = '';
	}

	async function getUsers() {
		const res = await $http.get('/users');
		users = res.data;
	}

	async function deleteUser(/** @type {string} */ userId) {
		await $http.delete(`/users/${userId}`);
		getUsers();
	}
</script>

<svelte:head>
	<title>Offices users</title>
</svelte:head>

<Accordion>
	<AccordionItem>
		{#snippet header()}Create user{/snippet}
		<Card>
			<form on:submit|preventDefault={registerNewUser}>
				<div class="mb-6">
					<Label for="firstName" class="mb-1">First Name</Label>
					<Input
						type="text"
						id="firstName"
						placeholder="First name"
						bind:value={firstName}
						required
					/>
					<br />
					<Label for="lastName" class="mb-1">Last Name</Label>
					<Input type="text" id="lastName" placeholder="Last name" bind:value={lastName} required />
					<br />
					<Label for="email" class="mb-1">Email address</Label>
					<Input type="text" id="email" placeholder="Email" bind:value={email} required />
					<br />
					<Label for="username" class="mb-1">Username</Label>
					<Input type="text" id="username" placeholder="Username" bind:value={username} required />
					<br />
					<Label for="password" class="mb-1">Password</Label>
					<Input
						type="password"
						id="password"
						placeholder="Password"
						bind:value={password}
						required
					/>
				</div>
				<Button class="cursor-pointer" type="submit">Submit</Button>
			</form>
		</Card>
	</AccordionItem>
</Accordion>

<Table color="green" striped={true} hoverable={true} shadow style="margin-top:10px">
	<TableHead>
		<TableHeadCell>Username</TableHeadCell>
		<TableHeadCell>Email</TableHeadCell>
		<TableHeadCell>First name</TableHeadCell>
		<TableHeadCell>Last name</TableHeadCell>
		<TableHeadCell>Actions</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each users as user}
			<TableBodyRow>
				<TableBodyCell>{user.username}</TableBodyCell>
				<TableBodyCell>{user.email}</TableBodyCell>
				<TableBodyCell>{user.first_name}</TableBodyCell>
				<TableBodyCell>{user.last_name}</TableBodyCell>
				<TableBodyCell
					><Button
						class="cursor-pointer"
						onclick={() => {
							deleteUser(user.id);
						}}>Delete</Button
					></TableBodyCell
				>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

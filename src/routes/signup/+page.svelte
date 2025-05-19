<script>
	import { Button, Card, Label, Input } from 'flowbite-svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { baseURL } from '../../environment';
	import { toast } from 'svelte-sonner';

	let /** @type {string} */ username,
		/** @type {string} */ firstName,
		/** @type {string} */ lastName,
		/** @type {string} */ email,
		/** @type {string} */ password;

	async function signup() {
		try {
			const res = await axios.post(baseURL + '/users/sign_up', {
				username: username,
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password
			});
			toast.success('Sign up succeeded!', {
				style: 'background: LightGreen; border-color: LightGreen;'
			});
			goto('/signin');
		} catch (err) {
			console.log(err);
		}
	}

	function goBack() {
		window.history.back();
	}
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<Card class="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
	<h2 class="mb-6 text-center text-2xl font-bold">Sign Up</h2>
	<form on:submit|preventDefault={signup} class="space-y-6">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<div>
				<Label for="firstName" class="mb-1">First Name</Label>
				<Input
					type="text"
					id="firstName"
					placeholder="John"
					bind:value={firstName}
					class="w-full rounded border p-2"
					required
				/>
			</div>
			<div>
				<Label for="lastName" class="mb-1">Last Name</Label>
				<Input
					type="text"
					id="lastName"
					placeholder="Rambo"
					bind:value={lastName}
					class="w-full rounded border p-2"
					required
				/>
			</div>
		</div>
		<div>
			<Label for="username" class="mb-1">Username</Label>
			<Input
				type="text"
				id="username"
				placeholder="jr17"
				bind:value={username}
				class="w-full rounded border p-2"
				required
			/>
		</div>
		<div>
			<Label for="email" class="mb-1">Email address</Label>
			<Input
				type="email"
				id="email"
				placeholder="john.doe@company.com"
				bind:value={email}
				class="w-full rounded border p-2"
				required
			/>
		</div>
		<div>
			<Label for="password" class="mb-1">Password</Label>
			<Input
				type="password"
				id="password"
				placeholder="•••••••••"
				bind:value={password}
				class="w-full rounded border p-2"
				required
			/>
		</div>
		<div class="mt-6 flex justify-between">
			<Button type="submit" class="mr-2 w-full cursor-pointer">Sign Up</Button>
			<Button color="blue" onclick={goBack} class="ml-2 w-full cursor-pointer">Back</Button>
		</div>
	</form>
</Card>

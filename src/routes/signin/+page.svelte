<script>
	import { Button, Card, Label, Input } from 'flowbite-svelte';
	import axios from 'axios';
	import { baseURL } from '../../environment';
	import { jwt } from '../../stores/sessionStore';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let /** @type {string} */ username, /** @type {string} */ password;

	async function signIn() {
		try {
			const res = await axios.post(baseURL + '/users/sign_in', {
				username: username,
				password: password
			});
			jwt.set(res.data.token);
			toast.success('Sign in succeeded!', {
				style: 'background: LightGreen; border-color: LightGreen;'
			});
			goto('/');
		} catch (err) {
			console.log(err);
		}
	}

	function goBack() {
		window.history.back();
	}
</script>

<svelte:head>
	<title>Sign In</title>
</svelte:head>

<Card class="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
	<h2 class="text-2xl font-bold mb-6 text-center">Sign In</h2>
	<form on:submit|preventDefault={signIn} class="space-y-6">
		<div>
			<Label for="username" class="mb-1">Username</Label>
			<Input
				type="text"
				id="username"
				placeholder="jr17"
				bind:value={username}
				class="w-full p-2 border rounded"
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
				class="w-full p-2 border rounded"
				required
			/>
		</div>
		<div class="flex justify-between mt-6">
			<Button type="submit" class="w-full mr-2 cursor-pointer">Sign In</Button>
			<Button color="blue" onclick={goBack} class="w-full ml-2 cursor-pointer">Back</Button>
		</div>
	</form>
</Card>

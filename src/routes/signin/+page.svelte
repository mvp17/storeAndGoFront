<svelte:head>
	<title>Sign In</title>
</svelte:head>

<script>
  import { Button, Card, Label, Input } from 'flowbite-svelte';
  import axios from 'axios';
  import { baseURL } from '../../environment';
  import { jwt } from '../../stores/sessionStore';
  import { goto } from '$app/navigation';
  import { toast } from 'svelte-sonner';


	let /** @type {string} */ email, /** @type {string} */ password;
	
	async function signIn () {
		try {
			const res = await axios.post(baseURL + '/login', { email: email, password: password });
      jwt.set(res.data.jwt);
      document.cookie = `jwt=${$jwt}`;
      toast.success('Sign in succeeded!', { style: 'background: LightGreen; border-color: LightGreen;' });
      goto('/')
		} catch (err) {
			console.log(err);
		}
	}
</script>


<div class="text-column">
  <Card>
    <form on:submit|preventDefault={signIn}>
      <div class="mb-6">
        <Label for="email" class="mb-2">Email address</Label>
        <Input type="email" id="email" placeholder="john.doe@company.com" bind:value={email} required />
      </div>
      <div class="mb-6">
        <Label for="password" class="mb-2">Password</Label>
        <Input type="password" id="password" placeholder="•••••••••" bind:value={password} required />
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  </Card>
</div>

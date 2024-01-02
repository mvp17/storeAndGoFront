<svelte:head>
	<title>Offices manifests</title>
</svelte:head>

<script>
	import { Card, Button } from 'flowbite-svelte';
	import { entranceManifests } from '../../../mocks/entranceManifests.js';
	import { departureManifests } from '../../../mocks/departureManifests.js';
	import { onMount } from 'svelte';
  	import { baseURL } from '../../../environment';
	import axios from 'axios';

	onMount (async () => {
        try {
          //axios.defaults.withCredentials = true;
          const instance = axios.create({ baseURL: baseURL });
          /*
		  let res = await instance.get('/get-entrance-manifests');
          entranceManifests = res.data.entranceManifests;
		  res = await instance.get('/get-departure-manifests');
          departureManifests = res.data.departureManifests;
		  */
        } catch (err) {
            console.log(err);
        }
    });
</script>

{#if entranceManifests.length !== 0}
	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    	Entrance manifests
	</h1>
	<div class="grid gap-3 md:grid-cols-3">
		{#each entranceManifests as manifest}
			<Card>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Reference: {manifest.ref}
				</h5>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Origin: {manifest.origin}
				</h5>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Date: {manifest.date}
				</h5>
				<Button href="manifests/{manifest.id}">More details</Button>
			</Card>
		{/each}
	</div>
{:else}
	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    	There are no entrance manifests
	</h1>
{/if}

{#if departureManifests.length !== 0}
	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    	Departure manifests
	</h1>
	<div class="grid gap-3 md:grid-cols-3">
		{#each departureManifests as manifest}
			<Card>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Reference: {manifest.ref}
				</h5>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Destination: {manifest.destination}
				</h5>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Date: {manifest.date}
				</h5>
				<Button href="manifests/{manifest.id}">More details</Button>
			</Card>
		{/each}
	</div>
{:else}
	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    	There are no departure manifests
	</h1>
{/if}


<style>
	h1 {text-align: center; margin-top: 15px;}
</style>

<script>
	import { Card, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { http } from '../../../stores/http';

	let /** @type {
		{
			id: string,
			entrance_date: string,
			origin: string,
			reference: string
		} []
	} */ entranceManifests = [];

	let /** @type {
		{
			id: string,
			departure_date: string,
			destination: string,
			reference: string
		} []
	} */ departureManifests = [];

	onMount(async () => {
		try {
			let res = await $http.get('/entrance_manifests');
			entranceManifests = res.data;
			res = await $http.get('/departure_manifests');
			departureManifests = res.data;
		} catch (err) {
			console.log(err);
		}
	});
</script>

<svelte:head>
	<title>Offices manifests</title>
</svelte:head>

{#if entranceManifests.length !== 0}
	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		Entrance manifests
	</h1>
	<div class="grid gap-3 md:grid-cols-3">
		{#each entranceManifests as manifest}
			<Card>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Reference: {manifest.reference}
				</h5>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Origin: {manifest.origin}
				</h5>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Date: {manifest.entrance_date}
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
					Reference: {manifest.reference}
				</h5>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Destination: {manifest.destination}
				</h5>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Date: {manifest.departure_date}
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
	h1 {
		text-align: center;
		margin-top: 15px;
	}
</style>

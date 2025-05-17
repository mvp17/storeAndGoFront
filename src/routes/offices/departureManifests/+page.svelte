<script>
	import { Card, Button, Modal, Label, Input } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { http } from '../../../stores/http';
	import { goto } from '$app/navigation';

	let /** @type {
		{
			id: string,
			departure_date: string,
			destination: string,
			reference: string
		} []
	} */ departureManifests = [];

	let openEditDepartureManifest = false;
	let departureManifestToUpdate = {
		id: '',
		reference: '',
		departure_date: '',
		destination: ''
	};

	onMount(async () => {
		try {
			await getDepartureManifests();
		} catch (err) {
			console.log(err);
		}
	});

	function goToManifest(id) {
		goto(`departureManifests/${id}`);
	}

	async function getDepartureManifests() {
		let res = await $http.get('/departure_manifests');
		departureManifests = res.data;
	}

	async function editDepartureManifest() {
		await $http.patch(`/departure_manifests/${departureManifestToUpdate.id}`, {
			reference: departureManifestToUpdate.reference,
			destination: departureManifestToUpdate.destination,
			departure_date: new Date(departureManifestToUpdate.departure_date).toLocaleDateString('en-GB')
		});
		await getDepartureManifests();
	}

	async function deleteDepartureManifest(/** @type {string} */ id) {
		await $http.delete(`/departure_manifests/${id}`);
		await getDepartureManifests();
	}

	function toISODate(/** @type {string} */ dateStr) {
		const [day, month, year] = dateStr.split('/');
		return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
	}
</script>

<svelte:head>
	<title>Offices manifests</title>
</svelte:head>

{#if departureManifests.length !== 0}
	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		Departure manifests
	</h1>
	<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
		{#each departureManifests as manifest}
			<Card>
				<div class="space-y-2 text-gray-800 dark:text-gray-100">
					<div>
						<span class="block text-sm font-medium text-gray-500 dark:text-gray-400">Reference</span
						>
						<span class="text-base font-semibold">{manifest.reference}</span>
					</div>

					<div>
						<span class="block text-sm font-medium text-gray-500 dark:text-gray-400"
							>Destination</span
						>
						<span class="text-base font-semibold">{manifest.destination}</span>
					</div>

					<div>
						<span class="block text-sm font-medium text-gray-500 dark:text-gray-400"
							>Departure Date</span
						>
						<span class="text-base font-semibold">{manifest.departure_date}</span>
					</div>
				</div>
				<div class="flex gap-2">
					<Button class="cursor-pointer" onclick={() => goToManifest(manifest.id)}
						>📄 More Details</Button
					>
					<Button
						class="cursor-pointer"
						onclick={() => {
							departureManifestToUpdate.reference = manifest.reference;
							departureManifestToUpdate.departure_date = toISODate(manifest.departure_date);
							departureManifestToUpdate.destination = manifest.destination;
							departureManifestToUpdate.id = manifest.id;
							openEditDepartureManifest = true;
						}}
					>
						✏️ Edit
					</Button>
					<Button class="cursor-pointer" onclick={() => deleteDepartureManifest(manifest.id)}
						>🗑️ Delete</Button
					>
				</div>
			</Card>
		{/each}
	</div>
{:else}
	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		There are no departure manifests
	</h1>
{/if}

<Modal
	title="Edit Departure manifest"
	bind:open={openEditDepartureManifest}
	size="xs"
	autoclose
	class="w-full"
>
	<form>
		<div class="mb-6">
			<div>
				<Label for="departureRef" class="mb-2">Reference</Label>
				<Input
					type="text"
					id="departureRef"
					placeholder="Reference"
					bind:value={departureManifestToUpdate.reference}
					required
				/>
			</div>
			<div>
				<Label for="departureDate" class="mb-2">Date</Label>
				<Input
					type="date"
					id="departureDate"
					placeholder="Date"
					bind:value={departureManifestToUpdate.departure_date}
					required
				/>
			</div>
			<div>
				<Label for="destination" class="mb-2">Destination</Label>
				<Input
					type="text"
					id="destination"
					placeholder="Destination"
					bind:value={departureManifestToUpdate.destination}
					required
				/>
			</div>
		</div>
		<Button class="cursor-pointer" onclick={() => editDepartureManifest()}>Submit</Button>
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
		margin-top: 15px;
	}
</style>

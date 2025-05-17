<script>
	import { Card, Button, Modal, Label, Input } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { http } from '../../../stores/http';
	import { goto } from '$app/navigation';

	let /** @type {
		{
			id: string,
			entrance_date: string,
			origin: string,
			reference: string
		} []
	} */ entranceManifests = [];

	let openEditEntranceManifest = false;
	let entranceManifestToUpdate = {
		id: '',
		reference: '',
		entrance_date: '',
		origin: ''
	};

	onMount(async () => {
		try {
			await getEntranceManifests();
		} catch (err) {
			console.log(err);
		}
	});

	function goToManifest(id) {
		goto(`entranceManifests/${id}`);
	}

	async function getEntranceManifests() {
		let res = await $http.get('/entrance_manifests');
		entranceManifests = res.data;
	}

	async function editEntranceManifest() {
		await $http.patch(`/entrance_manifests/${entranceManifestToUpdate.id}`, {
			reference: entranceManifestToUpdate.reference,
			origin: entranceManifestToUpdate.origin,
			entrance_date: new Date(entranceManifestToUpdate.entrance_date).toLocaleDateString('en-GB')
		});
		await getEntranceManifests();
	}

	async function deleteEntranceManifest(/** @type {string} */ id) {
		await $http.delete(`/entrance_manifests/${id}`);
		await getEntranceManifests();
	}

	function toISODate(/** @type {string} */ dateStr) {
		const [day, month, year] = dateStr.split('/');
		return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
	}
</script>

<svelte:head>
	<title>Offices manifests</title>
</svelte:head>

{#if entranceManifests.length !== 0}
	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		Entrance manifests
	</h1>
	<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
		{#each entranceManifests as manifest}
			<Card>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Reference: {manifest.reference}
				</h5>
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Origin: {manifest.origin}
				</h5>
				<h5 class="mb-4 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Date: {manifest.entrance_date}
				</h5>
				<div class="flex gap-2">
					<Button class="cursor-pointer" onclick={() => goToManifest(manifest.id)}
						>📄 More Details</Button
					>
					<Button
						class="cursor-pointer"
						onclick={() => {
							entranceManifestToUpdate.reference = manifest.reference;
							entranceManifestToUpdate.entrance_date = toISODate(manifest.entrance_date);
							entranceManifestToUpdate.origin = manifest.origin;
							entranceManifestToUpdate.id = manifest.id;
							openEditEntranceManifest = true;
						}}
					>
						✏️ Edit
					</Button>
					<Button class="cursor-pointer" onclick={() => deleteEntranceManifest(manifest.id)}
						>🗑️ Delete</Button
					>
				</div>
			</Card>
		{/each}
	</div>
{:else}
	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		There are no entrance manifests
	</h1>
{/if}

<Modal
	title="Edit Entrance manifest"
	bind:open={openEditEntranceManifest}
	size="xs"
	autoclose
	class="w-full"
>
	<form>
		<div class="mb-6">
			<div>
				<Label for="entranceRef" class="mb-2">Reference</Label>
				<Input
					type="text"
					id="entranceRef"
					placeholder="Reference"
					bind:value={entranceManifestToUpdate.reference}
					required
				/>
			</div>
			<div>
				<Label for="entranceDate" class="mb-2">Date</Label>
				<Input
					type="date"
					id="entranceDate"
					placeholder="Date"
					bind:value={entranceManifestToUpdate.entrance_date}
					required
				/>
			</div>
			<div>
				<Label for="origin" class="mb-2">Origin</Label>
				<Input
					type="text"
					id="origin"
					placeholder="Origin"
					bind:value={entranceManifestToUpdate.origin}
					required
				/>
			</div>
		</div>
		<Button class="cursor-pointer" onclick={() => editEntranceManifest()}>Submit</Button>
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
		margin-top: 15px;
	}
</style>

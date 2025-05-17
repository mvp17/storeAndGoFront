<script>
	import { Card, Button, Modal, Input, Label, MultiSelect } from 'flowbite-svelte';
	import WarehouseMap from '../../../components/WarehouseMap.svelte';
	import { onMount } from 'svelte';
	import { http } from '../../../stores/http';

	let shipments = [];
	let sla_containers = [];
	let newEntranceManifestModalHandler = {
		openEntrance: false,
		reference: '',
		entrance_date: '',
		origin: '',
		containers: []
	};
	let newDepartureManifestModalHandler = {
		openDeparture: false,
		reference: '',
		departure_date: '',
		destination: '',
		containers: []
	};

	onMount(async () => {
		try {
			await getSLAcontainers();
			const res = await $http.get('/shipments');
			shipments = res.data;
		} catch (err) {
			console.log(err);
		}
	});

	async function registerEntranceManifest() {
		const entrance_date = new Date(
			newEntranceManifestModalHandler.entrance_date
		).toLocaleDateString('en-GB');

		await $http.post('/entrance_manifests', {
			reference: newEntranceManifestModalHandler.reference,
			entrance_date: entrance_date,
			origin: newEntranceManifestModalHandler.origin,
			containers: newEntranceManifestModalHandler.containers
		});

		newEntranceManifestModalHandler.entrance_date = '';
		newEntranceManifestModalHandler.reference = '';
		newEntranceManifestModalHandler.origin = '';
	}

	async function getSLAcontainers() {
		const res = await $http.get('/sla_containers');
		sla_containers = res.data;
	}

	async function registerDepartureManifest() {
		const departure_date = new Date(
			newDepartureManifestModalHandler.departure_date
		).toLocaleDateString('en-GB');

		await $http.post('/departure_manifests', {
			reference: newDepartureManifestModalHandler.reference,
			departure_date: departure_date,
			containers: newDepartureManifestModalHandler.containers,
			destination: newDepartureManifestModalHandler.destination
		});

		newDepartureManifestModalHandler.departure_date = '';
		newDepartureManifestModalHandler.reference = '';
		newDepartureManifestModalHandler.destination = '';
	}

	$: multiSelectItems = sla_containers.map((container) => ({
		value: container.id,
		name: `${container.product} (${container.producer})`
	}));
</script>

<svelte:head>
	<title>Manager Home</title>
</svelte:head>

<WarehouseMap />

{#if shipments.length !== 0}
	<h1 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">SHIPMENTS</h1>
	<div class="grid gap-3 md:grid-cols-4" style="margin-bottom:5px">
		{#each shipments as shipment}
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{shipment.description}
				</h5>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					PRODUCT: {shipment.containers.productId}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					QUANTITY: {shipment.containers.quantity}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					ORGN: {shipment.origin_room.name}
					DEST: {shipment.destination_room.name}
				</p>
			</Card>
		{/each}
	</div>
{:else}
	<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
		TODAY THERE ARE NOT REGISTERED SHIPMENTS YET.
	</h5>
{/if}

<div class="grid gap-3 md:grid-cols-2" style="margin-top:15px">
	<Button
		class="cursor-pointer"
		onclick={() => (newEntranceManifestModalHandler.openEntrance = true)}>New entrance</Button
	>
	<Button
		class="cursor-pointer"
		onclick={() => (newDepartureManifestModalHandler.openDeparture = true)}>New departure</Button
	>
</div>

<Modal
	title="Entrance manifest"
	bind:open={newEntranceManifestModalHandler.openEntrance}
	size="xs"
	autoclose
	class="w-full"
>
	<form>
		<div class="mb-6">
			<Label for="entranceRef" class="mb-2">Reference</Label>
			<Input
				type="text"
				id="entranceRef"
				placeholder="Reference"
				bind:value={newEntranceManifestModalHandler.reference}
				required
			/>
			<Label for="entranceDate" class="mb-2">Date</Label>
			<Input
				type="date"
				id="entranceDate"
				placeholder="Date"
				bind:value={newEntranceManifestModalHandler.entrance_date}
				required
			/>
			<Label for="origin" class="mb-2">Origin</Label>
			<Input
				type="text"
				id="origin"
				placeholder="Origin"
				bind:value={newEntranceManifestModalHandler.origin}
				required
			/>
			<Label for="containers" class="mb-1">Containers</Label>
			<MultiSelect
				items={multiSelectItems}
				bind:value={newEntranceManifestModalHandler.containers}
				placeholder={'Select containers'}
				required
			></MultiSelect>
		</div>
		<Button class="cursor-pointer" onclick={() => registerEntranceManifest()}>Submit</Button>
	</form>
</Modal>

<Modal
	title="Departure manifest"
	bind:open={newDepartureManifestModalHandler.openDeparture}
	size="xs"
	autoclose
	class="w-full"
>
	<form>
		<div class="mb-6">
			<Label for="departureRef" class="mb-2">Reference</Label>
			<Input
				type="text"
				id="departureRef"
				placeholder="Reference"
				bind:value={newDepartureManifestModalHandler.reference}
				required
			/>
			<Label for="departureDate" class="mb-2">Date</Label>
			<Input
				type="date"
				id="departureDate"
				placeholder="Date"
				bind:value={newDepartureManifestModalHandler.departure_date}
				required
			/>
			<Label for="destination" class="mb-2">Destination</Label>
			<Input
				type="text"
				id="destination"
				placeholder="Destination"
				bind:value={newDepartureManifestModalHandler.destination}
				required
			/>
			<Label for="containers" class="mb-1">Containers</Label>
			<MultiSelect
				items={multiSelectItems}
				bind:value={newDepartureManifestModalHandler.containers}
				placeholder={'Select containers'}
				required
			></MultiSelect>
			<Button class="cursor-pointer" onclick={() => registerDepartureManifest()}>Submit</Button>
		</div>
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
	}
</style>

<script>
	import { Card, Button, Modal, Input, Label } from 'flowbite-svelte';
	import WarehouseMap from '../../../components/WarehouseMap.svelte';
	import { onMount } from 'svelte';
	import { http } from '../../../stores/http';

	let /** @type {string} */ entranceRef,
		/** @type {string} */ entranceDate,
		/** @type {string} */ origin,
		/** @type {boolean} */ openEntrance = false;

	let /** @type {string} */ departureRef,
		/** @type {string} */ departureDate,
		/** @type {string} */ destination,
		/** @type {boolean} */ openDeparture = false;

	let /** @type {
		{
			description: string,
			containers: {
				productId: number,
				quantity: number
			},
			origin_room: {
				name: string
			},
			destination_room: {
				name: string
			}
		}[]} */ shipments = [];

	onMount(async () => {
		try {
			const res = await $http.get('/shipments');
			shipments = res.data;
		} catch (err) {
			console.log(err);
		}
	});

	async function registerEntranceManifest() {
		const entrance_date = new Date(entranceDate).toLocaleDateString('en-GB');
		await $http.post('/entrance_manifests', {
			reference: entranceRef,
			entrance_date: entrance_date,
			origin: origin
		});

		entranceDate = '';
		entranceRef = '';
		origin = '';
	}

	async function registerDepartureManifest() {
		const departure_date = new Date(departureDate).toLocaleDateString('en-GB');
		await $http.post('/departure_manifests', {
			reference: departureRef,
			departure_date: departure_date,
			destination: destination
		});

		departureDate = '';
		departureRef = '';
		destination = '';
	}
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
	<Button class="cursor-pointer" onclick={() => (openEntrance = true)}>New entrance</Button>
	<Button class="cursor-pointer" onclick={() => (openDeparture = true)}>New departure</Button>
</div>

<Modal title="Entrance manifest" bind:open={openEntrance} size="xs" autoclose class="w-full">
	<form>
		<div class="mb-6">
			<div>
				<Label for="entranceRef" class="mb-2">Reference</Label>
				<Input
					type="text"
					id="entranceRef"
					placeholder="Reference"
					bind:value={entranceRef}
					required
				/>
			</div>
			<div>
				<Label for="entranceDate" class="mb-2">Date</Label>
				<Input
					type="date"
					id="entranceDate"
					placeholder="Date"
					bind:value={entranceDate}
					required
				/>
			</div>
			<div>
				<Label for="origin" class="mb-2">Origin</Label>
				<Input type="text" id="origin" placeholder="Origin" bind:value={origin} required />
			</div>
		</div>
		<Button class="cursor-pointer" onclick={() => registerEntranceManifest()}>Submit</Button>
	</form>
</Modal>

<Modal title="Departure manifest" bind:open={openDeparture} size="xs" autoclose class="w-full">
	<form>
		<div class="mb-6">
			<div>
				<Label for="departureRef" class="mb-2">Reference</Label>
				<Input
					type="text"
					id="departureRef"
					placeholder="Reference"
					bind:value={departureRef}
					required
				/>
			</div>
			<div>
				<Label for="departureDate" class="mb-2">Date</Label>
				<Input
					type="date"
					id="departureDate"
					placeholder="Date"
					bind:value={departureDate}
					required
				/>
			</div>
			<div>
				<Label for="destination" class="mb-2">Destination</Label>
				<Input
					type="text"
					id="destination"
					placeholder="Destination"
					bind:value={destination}
					required
				/>
			</div>
		</div>
		<Button class="cursor-pointer" onclick={() => registerDepartureManifest()}>Submit</Button>
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
	}
</style>

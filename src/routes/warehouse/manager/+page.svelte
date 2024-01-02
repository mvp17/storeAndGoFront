<svelte:head>
	<title>Manager Home</title>
</svelte:head>

<script>
	import { Card, Button, Modal, Input, Label } from 'flowbite-svelte';
	import WarehouseMap from '../../../components/WarehouseMap.svelte';
	import { lastTasks } from '../../../mocks/lastTasks.js';
	import { baseURL } from '../../../environment';
	import { onMount } from 'svelte';
	import axios from 'axios';

	let /** @type {string} */ entranceRef, /** @type {string} */ entranceDate, 
	    /** @type {string} */ origin, /** @type {boolean} */ openEntrance;

	let /** @type {string} */ departureRef, /** @type {string} */ departureDate, 
		/** @type {string} */ destination, /** @type {boolean} */ openDeparture;

	onMount (async () => {
        try {
            //axios.defaults.withCredentials = true;
            const instance = axios.create({ baseURL: baseURL });
            //const res = await instance.get('/get-last-tasks');
            //lastTasks = res.data.lastTasks;
        } catch (err) {
            console.log(err);
        }
    });

	function registerEntranceManifest() {
		const instance = axios.create({ baseURL: baseURL });
		/*
		await instance.post('/new-entrance-manifest', 
							{ref: entranceRef, date: entranceDate, origin: origin});
		*/
	}
	function registerDepartureManifest() {
		const instance = axios.create({ baseURL: baseURL });
		/*
		await instance.post('/new-departure-manifest', 
							{ref: departureRef, date: departureDate, destination: destination});
		*/
	}
</script>

<WarehouseMap></WarehouseMap>

{#if lastTasks.length !== 0}
	<h1 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
		LAST TASKS
	</h1>
	<div class="grid gap-3 md:grid-cols-4" style="margin-bottom:5px">
		{#each lastTasks as lastTask}
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{lastTask.description}
				</h5>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					PRODUCT: {lastTask.containers.productId}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					QUANTITY: {lastTask.containers.quantity}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					ORGN: {lastTask.originRoom.name}
					DEST: {lastTask.destinationRoom.name}
				</p>
			</Card>
		{/each}
	</div>
	{:else}
		<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
			TODAY THERE ARE NOT REGISTERED TASKS YET.
		</h5>
{/if}

<div class="grid gap-3 md:grid-cols-2" style="margin-top:15px">
	<Button on:click={() => openEntrance = true}>New entrance</Button>
	<Button on:click={() => openDeparture = true}>New departure</Button>
</div>

<Modal title="Entrance manifest" bind:open={openEntrance} size="xs" autoclose class="w-full">
	<form on:submit|preventDefault={registerEntranceManifest}>
  		<div class="mb-6">
			<div>
				<Label for="entranceRef" class="mb-2">Reference</Label>
            	<Input type="text" id="entranceRef" placeholder="Reference" bind:value={entranceRef} required />
			</div>
			<div>
				<Label for="entranceDate" class="mb-2">Date</Label>
    			<Input type="date" id="entranceDate" placeholder="Date" bind:value={entranceDate} required />
			</div>
			<div>
        		<Label for="origin" class="mb-2">Origin</Label>
            	<Input type="text" id="origin" placeholder="Origin" bind:value={origin} required />
			</div>
		</div>
		<Button type="submit">Submit</Button>
	</form>
</Modal>

<Modal title="Departure manifest" bind:open={openDeparture} size="xs" autoclose class="w-full">
	<form on:submit|preventDefault={registerDepartureManifest}>
        <div class="mb-6">
            <div>
                <Label for="departureRef" class="mb-2">Reference</Label>
                <Input type="text" id="departureRef" placeholder="Reference" bind:value={departureRef} required />
            </div>
            <div>
                <Label for="departureDate" class="mb-2">Date</Label>
                <Input type="date" id="departureDate" placeholder="Date" bind:value={departureDate} required />
            </div>
			<div>
                <Label for="destination" class="mb-2">Destination</Label>
                <Input type="text" id="destination" placeholder="Destination" bind:value={destination} required />
            </div>
        </div>
        <Button type="submit">Submit</Button>
    </form>
</Modal>


<style>
	h1 {text-align: center}
</style>

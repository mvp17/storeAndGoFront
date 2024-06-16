<svelte:head>
	<title>Offices manifests</title>
</svelte:head>

<script>
	import { Card, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { http } from '../../../../stores/http';

	let /** @type {
		{
			room_status: number,
			pk: number,
			name: string,
			temp: number,
			hum: number,
			quantity: number,
			threshold: number
		}[]} */ rooms = [];

	onMount (async () => {
        try {           
            const res = await $http.get('/rooms');
            rooms = res.data;
        } catch (err) {
            console.log(err);
        }
    });

	function closeRoom(/** @type {number} */ roomId) {
		// Backend post request changing room status for room with roomId
		// Backend get request rooms
		//const instance = axios.create({ baseURL: baseURL });
		//const res = await instance.patch('/close-room', {id: roomId});
		console.log("close", roomId)
	}
	function openRoom(/** @type {number} */ roomId) {
		// Backend post request changing room status for room with roomId
		// Backend get request rooms
		//const instance = axios.create({ baseURL: baseURL });
		//const res = await instance.patch('/open-room', {id: roomId});
		console.log("open", roomId)
	}
</script>

<div class="grid gap-3 md:grid-cols-4" style="margin-bottom:5px">
	{#each rooms as room}
		<Card>
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{room.name}
			</h5>
			{#if room.room_status === 0}
				<h1>Closed</h1>
			{:else}
				<h1>Opened</h1>
			{/if}
			{#if room.temp}
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Temp: {room.temp}
				</h5>
			{/if}
			{#if room.hum}
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Hum: {room.hum}
				</h5>
			{/if}
			{#if room.quantity && room.threshold}
				<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					Capacity: {room.quantity} / {room.threshold}
				</h5>
			{/if}
			<div class="grid gap-3 md:grid-cols-3" style="margin-bottom:5px">
			{#if room.room_status === 1}
				<Button on:click={() => closeRoom(room.pk)}>Close room</Button>
				<Button href="/warehouse/manager/rooms/{room.pk}">Show room</Button>
			{/if}
			{#if room.room_status === 0}
				<Button on:click={() => openRoom(room.pk)}>Open room</Button>
			{/if}
			</div>
		</Card>
	{/each}
</div>

<script>
	import { Card, Button, AccordionItem, Select, Accordion, Label, Input } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { http } from '../../../../stores/http';
	import { goto } from '$app/navigation';

	let rooms = [];
	let room_status = '1';
	let name = '';
	let temp = '0';
	let hum = '0';
	let quantity = '0';
	let threshold = '0';

	onMount(async () => {
		try {
			await getRooms();
		} catch (err) {
			console.log(err);
		}
	});

	async function closeRoom(/** @type {string} */ roomId) {
		const res = await $http.get(`/rooms/${roomId}`);
		const currentRoom = res.data;
		await $http.patch(`/rooms/${roomId}`, {
			room_status: 0,
			name: currentRoom.name,
			temp: currentRoom.temp,
			hum: currentRoom.hum,
			quantity: currentRoom.quantity,
			threshold: currentRoom.threshold
		});
		await getRooms();
	}

	async function openRoom(/** @type {string} */ roomId) {
		const res = await $http.get(`/rooms/${roomId}`);
		const currentRoom = res.data;
		await $http.patch(`/rooms/${roomId}`, {
			room_status: 1,
			name: currentRoom.name,
			temp: currentRoom.temp,
			hum: currentRoom.hum,
			quantity: currentRoom.quantity,
			threshold: currentRoom.threshold
		});
		await getRooms();
	}

	async function getRooms() {
		const res = await $http.get('/rooms');
		rooms = res.data;
	}

	async function registerNewRoom() {
		const reqBody = {
			room_status: parseInt(room_status),
			name: name,
			temp: parseInt(temp),
			hum: parseInt(hum),
			quantity: parseInt(quantity),
			threshold: parseInt(threshold)
		};
		await $http.post('/rooms', reqBody);
		await getRooms();
		resetForm();
	}

	function resetForm() {
		room_status = '0';
		name = '';
		temp = '0';
		hum = '0';
		quantity = '0';
		threshold = '0';
	}
</script>

<svelte:head>
	<title>Warehouse manager rooms</title>
</svelte:head>

<Accordion>
	<AccordionItem>
		{#snippet header()}Create room{/snippet}
		<Card>
			<form on:submit|preventDefault={registerNewRoom}>
				<div class="mb-6">
					<Label for="roomStatus" class="mb-1">Room Status</Label>
					<Select id="roomStatus" bind:value={room_status} required>
						<option value="0">Closed</option>
						<option value="1">Opened</option>
					</Select>
					<br />
					<Label for="name" class="mb-1">Name</Label>
					<Input type="text" id="name" placeholder="Name" bind:value={name} required />
					<br />
					<Label for="temp" class="mb-1">Temperature</Label>
					<Input type="number" id="temp" placeholder="Temperature" bind:value={temp} required />
					<br />
					<Label for="hum" class="mb-1">Humidity</Label>
					<Input type="number" min="0" id="hum" placeholder="Humidity" bind:value={hum} required />
					<br />
					<Label for="quantity" class="mb-1">Quantity</Label>
					<Input
						type="number"
						min="0"
						id="quantity"
						placeholder="Quantity"
						bind:value={quantity}
						required
					/>
					<br />
					<Label for="threshold" class="mb-1">Threshold</Label>
					<Input
						type="number"
						min="0"
						id="threshold"
						placeholder="Threshold"
						bind:value={threshold}
						required
					/>
					<br />
				</div>
				<Button type="submit">Submit</Button>
			</form>
		</Card>
	</AccordionItem>
</Accordion>

<br />

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
					<Button class="cursor-pointer" onclick={() => closeRoom(room.id)}>Close room</Button>
					<Button class="cursor-pointer" onclick={() => goto(`/warehouse/manager/rooms/${room.id}`)}
						>Show room</Button
					>
				{/if}
				{#if room.room_status === 0}
					<Button class="cursor-pointer" onclick={() => openRoom(room.id)}>Open room</Button>
				{/if}
			</div>
		</Card>
	{/each}
</div>

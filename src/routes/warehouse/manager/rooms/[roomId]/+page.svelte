<script>
	import {
		Card,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Modal,
		Label,
		Input,
		Table,
		TableBody,
		TableHead,
		TableHeadCell,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { baseURL } from '../../../../../environment';
	import axios from 'axios';
	import { page } from '$app/stores';

	const room = {
		room_status: 1,
		pk: 14,
		name: 'Sala F5',
		temp: 18,
		hum: 15,
		quantity: 10,
		limit: 20
	};
	let open = false;
	let newTemp = 0;
	let roomId;
	onMount(async () => {
		try {
			roomId = $page.params.roomId;
			//axios.defaults.withCredentials = true;
			const instance = axios.create({ baseURL: baseURL });
			//const res = await instance.get('/get-room', {id: roomId});
			//room = res.data.room;
		} catch (err) {
			console.log(err);
		}
	});

	function transfer() {
		const instance = axios.create({ baseURL: baseURL });
		//const res = await instance.get('/transfer-room', {id: roomId});
	}

	function updateTemp() {
		console.log(newTemp);
		const instance = axios.create({ baseURL: baseURL });
		//const res = await instance.get('/update-temperature-room', {id: roomId, temperature: newTemp});
	}
</script>

<svelte:head>
	<title>Warehouse manager rooms detail</title>
</svelte:head>

<Breadcrumb solid>
	<BreadcrumbItem href="/warehouse/manager/rooms">Rooms</BreadcrumbItem>
	<BreadcrumbItem>{room.name}</BreadcrumbItem>
</Breadcrumb>

<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Containers</h1>

<Table color="green" striped={true} hoverable={true} shadow style="margin-top:10px">
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Producer</TableHeadCell>
		<TableHeadCell>Quantity</TableHeadCell>
		<TableHeadCell>Min temp</TableHeadCell>
		<TableHeadCell>Max temp</TableHeadCell>
		<TableHeadCell>Min hum</TableHeadCell>
		<TableHeadCell>Max hum</TableHeadCell>
		<TableHeadCell>Date limit</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each containers as container}
			<TableBodyRow>
				<!-- Main info -->
				<TableBodyCell>{container.product.productId}</TableBodyCell>
				<TableBodyCell>{container.product.producerId}</TableBodyCell>
				<TableBodyCell>{container.quantity}</TableBodyCell>
				<!-- Temperatures -->
				<TableBodyCell>{container.sla.minTemp}</TableBodyCell>
				<TableBodyCell>{container.sla.maxTemp}</TableBodyCell>
				<TableBodyCell>{container.sla.minHum}</TableBodyCell>
				<TableBodyCell>{container.sla.maxHum}</TableBodyCell>
				<TableBodyCell>{container.sla.limit}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<Card style="margin-top:15px;">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		Information {room.name}
	</h5>
	<div class="grid gap-3 md:grid-cols-2">
		<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Status</h5>
		{#if room.room_status === 0}
			<h2>Closed</h2>
		{:else}
			<h3>Open</h3>
		{/if}
	</div>
	<div class="grid gap-3 md:grid-cols-2">
		<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Temperature</h5>
		<h5>{room.temp}</h5>
	</div>
	<div class="grid gap-3 md:grid-cols-2">
		<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Humidity</h5>
		<h5>{room.hum}</h5>
	</div>
	<div class="grid gap-3 md:grid-cols-2">
		<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Capacity</h5>
		<h5>{room.quantity} / {room.limit}</h5>
	</div>
	{#if room.room_status === 1}
		<div class="grid gap-3 md:grid-cols-2">
			<Button onclick={transfer}>Transfer</Button>
			<!--Modal or new route with update form?-->
			<Button
				onclick={() => {
					open = true;
					newTemp = room.temp;
				}}>Update Temperature</Button
			>
		</div>
	{/if}
</Card>

<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tasks</h1>

<div class="grid gap-3 md:grid-cols-3">
	{#each tasks as task}
		<Card>
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{task.description}
			</h5>
			<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
				PRODUCT: {task.containers.product.productId}
			</p>
			<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
				QUANTITY: {task.containers.quantity}
			</p>
			<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
				ORGN: {task.originRoom.name}
				DEST: {task.destinationRoom.name}
			</p>
		</Card>
	{/each}
</div>

<Modal title="Update temperature" bind:open size="xs" autoclose class="w-full">
	<form class="flex flex-col space-y-6" on:submit|preventDefault={updateTemp}>
		<Label class="space-y-2">
			<span>Temperature</span>
			<Input type="number" name="temperature" bind:value={newTemp} required />
		</Label>
		<Button type="submit" class="w-full1">Edit</Button>
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
		margin-top: 15px;
	}

	h2 {
		color: red;
		font-weight: bold;
	}

	h3 {
		color: #17b169;
		font-weight: bold;
	}
</style>

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
	import { http } from '../../../../../stores/http';

	let open = false;
	let newTemp = 0;
	let loading = true;

	export let data;
	const roomId = data.roomId;
	let room;
	let containers = [];
	let tasks = [];

	onMount(async () => {
		try {
			await Promise.all([await getRoomById(), await getWorkerTasksForCurrentRoom()]);
			loading = false;
		} catch (err) {
			console.log(err);
		}
	});

	async function getWorkerTasksForCurrentRoom() {
		const res = await $http.get(`/worker_tasks/room/${roomId}`);
		tasks = res.data;
	}

	async function getRoomById() {
		const res = await $http.get(`/rooms/${roomId}`);
		room = res.data;
		containers = room.containers;
	}

	function transfer() {}

	function updateTemp() {}
</script>

<svelte:head>
	<title>Warehouse manager rooms detail</title>
</svelte:head>

{#if loading}
	<p>Loading ...</p>
{:else}
	<Breadcrumb solid>
		<BreadcrumbItem href="/warehouse/manager/rooms">Rooms</BreadcrumbItem>
		<BreadcrumbItem>{room.name}</BreadcrumbItem>
	</Breadcrumb>

	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Containers</h1>

	<Table color="green" striped={true} hoverable={true} shadow style="margin-top:10px">
		<TableHead>
			<TableHeadCell>Product</TableHeadCell>
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
					<TableBodyCell>{container.product}</TableBodyCell>
					<TableBodyCell>{container.producer}</TableBodyCell>
					<TableBodyCell>{container.quantity}</TableBodyCell>

					<TableBodyCell>{container.min_temp}</TableBodyCell>
					<TableBodyCell>{container.max_temp}</TableBodyCell>
					<TableBodyCell>{container.min_hum}</TableBodyCell>
					<TableBodyCell>{container.max_hum}</TableBodyCell>
					<TableBodyCell>{container.date_limit}</TableBodyCell>
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
			<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
				Temperature
			</h5>
			<h5>{room.temp} ºC</h5>
		</div>
		<div class="grid gap-3 md:grid-cols-2">
			<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Humidity</h5>
			<h5>{room.hum} %</h5>
		</div>
		<div class="grid gap-3 md:grid-cols-2">
			<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Capacity</h5>
			<h5>{room.quantity} / {room.threshold}</h5>
		</div>
		{#if room.room_status === 1}
			<div class="grid gap-3 md:grid-cols-2">
				<Button class="cursor-pointer" onclick={transfer}>Transfer</Button>
				<!--Modal or new route with update form?-->
				<Button
					class="cursor-pointer"
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
			<Card class="mb-6">
				<h2 class="mb-2 text-xl font-bold">Task: {task.description}</h2>

				<div class="mb-2 text-sm text-gray-600">
					<!-- <p><strong>Status:</strong> {task.status}</p> -->
					<p><strong>Origin Room:</strong> {task.origin_room?.name}</p>
					<p><strong>Destination Room:</strong> {task.destination_room?.name}</p>
				</div>

				<div class="mt-4">
					<h3 class="mb-2 text-lg font-semibold">Containers:</h3>
					{#each task.containers as container}
						<Card class="mb-4 border border-gray-200">
							<p><strong>Product:</strong> {container.product}</p>
							<p><strong>Producer:</strong> {container.producer}</p>
							<p><strong>Quantity:</strong> {container.quantity}</p>
							<p><strong>Temp Range:</strong> {container.min_temp}°C - {container.max_temp}°C</p>
							<p><strong>Humidity Range:</strong> {container.min_hum}% - {container.max_hum}%</p>
							<p><strong>Date Limit:</strong> {container.date_limit}</p>
						</Card>
					{/each}
				</div>
			</Card>
		{/each}
	</div>
{/if}

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

<script>
	import {
		Card,
		AccordionItem,
		Accordion,
		Button,
		Select,
		MultiSelect,
		Badge,
		Modal,
		Label,
		Input
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { http } from '../../../../stores/http';

	let taskDeletionModalHandler = {
		open: false,
		id: ''
	};
	let taskForEditModalHandler = {
		open: false,
		id: '',
		containers: [],
		description: '',
		origin_room: '',
		destination_room: '',
		status: '0'
	};

	let newWorkerTask = {
		description: '',
		containers: [],
		origin_room: '',
		destination_room: '',
		status: '0'
	};

	let todoTasks = [];
	let doingTasks = [];
	let doneTasks = [];

	let rooms = [];
	let sla_containers = [];

	onMount(async () => {
		try {
			await getWorkerTasks();
			await getRooms();
			await getSLAcontainers();
		} catch (err) {
			console.log(err);
		}
	});

	async function getSLAcontainers() {
		const res = await $http.get('/sla_containers');
		sla_containers = res.data;
	}

	$: multiSelectItems = sla_containers.map((container) => ({
		value: container.id,
		name: `${container.product} (${container.producer})`
	}));

	async function getWorkerTasks() {
		const res = await $http.get('/worker_tasks');
		let workerTasks = res.data;
		todoTasks = workerTasks.filter((task) => task.status === 0);
		doingTasks = workerTasks.filter((task) => task.status === 1);
		doneTasks = workerTasks.filter((task) => task.status === 2);
	}

	async function deleteTask() {
		await $http.delete(`/worker_tasks/${taskDeletionModalHandler.id}`);
		await getWorkerTasks();
	}

	async function editTask() {
		await $http.patch(`/worker_tasks/${taskForEditModalHandler.id}`, {
			description: taskForEditModalHandler.description,
			containers: taskForEditModalHandler.containers,
			origin_room: taskForEditModalHandler.origin_room,
			destination_room: taskForEditModalHandler.destination_room,
			status: parseInt(taskForEditModalHandler.status)
		});
		await getWorkerTasks();
	}

	async function getRooms() {
		const res = await $http.get('/rooms');
		rooms = res.data;
	}

	async function registerNewWorkerTask() {
		const reqBody = {
			description: newWorkerTask.description,
			containers: newWorkerTask.containers,
			origin_room: newWorkerTask.origin_room,
			destination_room: newWorkerTask.destination_room,
			status: parseInt(newWorkerTask.status)
		};
		await $http.post('/worker_tasks', reqBody);
		await getWorkerTasks();
		resetForm();
	}

	function resetForm() {
		newWorkerTask.description = '';
		newWorkerTask.containers = [];
		newWorkerTask.origin_room = '';
		newWorkerTask.destination_room = '';
		newWorkerTask.status = '0';
	}
</script>

<svelte:head>
	<title>Warehouse workers tasks</title>
</svelte:head>

<Accordion>
	<AccordionItem>
		{#snippet header()}Create worker task{/snippet}
		<Card>
			<form on:submit|preventDefault={registerNewWorkerTask}>
				<div class="mb-6">
					<Label for="description" class="mb-1">Description</Label>
					<Input
						type="text"
						id="description"
						placeholder="Description"
						bind:value={newWorkerTask.description}
						required
					/>
					<br />
					<Label for="containers" class="mb-1">Containers</Label>
					<MultiSelect
						id="containers"
						items={multiSelectItems}
						bind:value={newWorkerTask.containers}
						placeholder={'Select containers'}
						required
					></MultiSelect>
					<br />
					<Label for="origin" class="mb-1">Origin Room</Label>
					<Select id="origin" bind:value={newWorkerTask.origin_room} required>
						{#each rooms as room}
							<option value={room.id}>{room.name}</option>
						{/each}
					</Select>
					<br />
					<Label for="destination" class="mb-1">Destination Room</Label>
					<Select id="destination" bind:value={newWorkerTask.destination_room} required>
						{#each rooms as room}
							<option value={room.id}>{room.name}</option>
						{/each}
					</Select>
					<br />
					<Label for="status" class="mb-1">Status</Label>
					<Select id="status" bind:value={newWorkerTask.status} required>
						<option value="0">TODO</option>
						<option value="1">DOING</option>
						<option value="2">DONE</option>
					</Select>
				</div>
				<Button class="cursor-pointer" type="submit">Submit</Button>
			</form>
		</Card>
	</AccordionItem>
</Accordion>

<div class="grid gap-3 md:grid-cols-3" style="margin-bottom: 10px">
	<Badge large color="yellow">TODO</Badge>
	<Badge large color="pink">DOING</Badge>
	<Badge large color="green">DONE</Badge>
</div>
<div class="grid gap-3 md:grid-cols-3">
	<div class="grid md:grid-cols-1">
		{#each todoTasks as task}
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{task.description}
				</h5>
				<Button
					class="cursor-pointer"
					onclick={() => {
						taskDeletionModalHandler.id = task.id;
						taskDeletionModalHandler.open = true;
					}}>Delete</Button
				>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					ORIGIN ROOM: {task.origin_room.name}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					DEST ROOM: {task.destination_room.name}
				</p>
				<Button
					class="cursor-pointer"
					onclick={() => {
						taskForEditModalHandler.id = task.id;
						taskForEditModalHandler.description = task.description;
						taskForEditModalHandler.origin_room = task.origin_room.id;
						taskForEditModalHandler.destination_room = task.destination_room.id;
						taskForEditModalHandler.containers = task.containers;
						taskForEditModalHandler.status = String(task.status);
						taskForEditModalHandler.open = true;
					}}>Edit</Button
				>
			</Card>
		{/each}
	</div>
	<div class="grid md:grid-cols-1">
		{#each doingTasks as task}
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{task.description}
				</h5>
				<Button
					class="cursor-pointer"
					onclick={() => {
						taskDeletionModalHandler.id = task.id;
						taskDeletionModalHandler.open = true;
					}}>Delete</Button
				>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					ORIGIN ROOM: {task.origin_room.name}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					DEST ROOM: {task.destination_room.name}
				</p>
				<Button
					class="cursor-pointer"
					onclick={() => {
						taskForEditModalHandler.description = task.description;
						taskForEditModalHandler.origin_room = task.origin_room.id;
						taskForEditModalHandler.destination_room = task.destination_room.id;
						taskForEditModalHandler.containers = task.containers;
						taskForEditModalHandler.status = String(task.status);
						taskForEditModalHandler.id = task.id;
						taskForEditModalHandler.open = true;
					}}>Edit</Button
				>
			</Card>
		{/each}
	</div>
	<div class="grid md:grid-cols-1">
		{#each doneTasks as task}
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{task.description}
				</h5>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					ORIGIN ROOM: {task.origin_room.name}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					DEST ROOM: {task.destination_room.name}
				</p>
			</Card>
		{/each}
	</div>
</div>

<Modal
	title="Edit task"
	bind:open={taskForEditModalHandler.open}
	size="xs"
	autoclose
	class="w-full"
>
	<form class="flex flex-col space-y-6" action="#">
		<Label class="space-y-2">Description</Label>
		<Input type="text" name="description" bind:value={taskForEditModalHandler.description} required />
		<Label class="mb-1">Containers</Label>
		<MultiSelect
			items={multiSelectItems}
			bind:value={taskForEditModalHandler.containers}
			placeholder={'Select containers'}
			required
		></MultiSelect>
		<Label for="origin" class="mb-1">Origin Room</Label>
		<Select id="origin" bind:value={taskForEditModalHandler.origin_room} required>
			{#each rooms as room}
				<option value={room.id}>{room.name}</option>
			{/each}
		</Select>
		<br />
		<Label for="destination" class="mb-1">Destination Room</Label>
		<Select id="destination" bind:value={taskForEditModalHandler.destination_room} required>
			{#each rooms as room}
				<option value={room.id}>{room.name}</option>
			{/each}
		</Select>
		<br />
		<Label for="status" class="mb-1">Status</Label>
		<Select id="status" bind:value={taskForEditModalHandler.status} required>
			<option value="0">TODO</option>
			<option value="1">DOING</option>
			<option value="2">DONE</option>
		</Select>

		<Button
			type="submit"
			class="w-full1 cursor-pointer"
			onclick={() => {
				editTask();
			}}>Edit</Button
		>
	</form>
</Modal>

<Modal title="Delete task" bind:open={taskDeletionModalHandler.open} size="sm" autoclose>
	<div class="text-center">
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Are you sure you want to delete this task?
		</h3>
		<Button
			color="red"
			class="me-2 cursor-pointer"
			onclick={() => {
				deleteTask();
			}}>Yes, I'm sure</Button
		>
		<Button class="cursor-pointer" color="alternative">No, cancel</Button>
	</div>
</Modal>

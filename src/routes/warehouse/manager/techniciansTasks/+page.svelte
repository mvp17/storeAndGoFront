<script>
	import {
		Card,
		Button,
		Badge,
		Modal,
		Label,
		Select,
		Input,
		AccordionItem,
		Datepicker,
		P,
		Accordion,
		Textarea
	} from 'flowbite-svelte';
	import { http } from '../../../../stores/http';
	import { onMount } from 'svelte';

	let taskDeletionModalHandler = {
		open: false,
		id: ''
	};
	let taskForEditModalHandler = {
		open: false,
		description: '',
		roomId: ''
	};

	let priority = '0';
	let description = '';
	let roomId = '';
	let detail = '';
	let status = '0';
	let selectedDate = new Date();

	let todoTasks = [];
	let doingTasks = [];
	let doneTasks = [];

	let rooms = [];

	onMount(async () => {
		try {
			await getTechnicianTasks();
			await getRooms();
		} catch (err) {
			console.log(err);
		}
	});

	async function getRooms() {
		const res = await $http.get('/rooms');
		rooms = res.data;
	}

	async function getTechnicianTasks() {
		const res = await $http.get('/technician_tasks');
		let technicianTasks = res.data;
		todoTasks = technicianTasks.filter((task) => task.status === 0);
		doingTasks = technicianTasks.filter((task) => task.status === 1);
		doneTasks = technicianTasks.filter((task) => task.status === 2);
	}

	async function deleteTask(/** @type {string} */ taskId) {
		await $http.delete(`/technician_tasks/${taskId}`);
		await getTechnicianTasks();
	}

	async function editTask(taskForEdit) {
		console.log(taskForEdit);
		await $http.patch('/edit-task', { task: taskForEdit });
	}

	async function registerNewTechnicianTask() {
		const reqBody = {
			priority: parseInt(priority),
			description: description,
			room: roomId,
			detail: detail,
			status: parseInt(status),
			date: selectedDate.toLocaleDateString('en-GB')
		};
		await $http.post('/technician_tasks', reqBody);
		await getTechnicianTasks();
		resetForm();
	}

	function resetForm() {
		priority = '0';
		description = '';
		roomId = '';
		detail = '';
		status = '0';
		selectedDate = new Date();
	}
</script>

<svelte:head>
	<title>Warehouse technician tasks</title>
</svelte:head>

<Accordion>
	<AccordionItem>
		{#snippet header()}Create technician task{/snippet}
		<Card>
			<form on:submit|preventDefault={registerNewTechnicianTask}>
				<div class="mb-6">
					<Label for="type" class="mb-1">Priority</Label>
					<Select id="type" bind:value={priority} required>
						<option value="0">LOWEST</option>
						<option value="1">LOW</option>
						<option value="2">MEDIUM</option>
						<option value="2">HIGH</option>
						<option value="2">CRITICAL</option>
					</Select>
					<br />
					<Label for="description" class="mb-1">Description</Label>
					<Input
						type="text"
						id="description"
						placeholder="Description"
						bind:value={description}
						required
					/>
					<br />
					<Label for="room" class="mb-1">Room</Label>
					<Select id="room" bind:value={roomId} required>
						{#each rooms as room}
							<option value={room.id}>{room.name}</option>
						{/each}
					</Select>
					<br />
					<Label for="detail" class="mb-1">Details</Label>
					<Textarea id="detail" placeholder="Details" bind:value={detail} required />
					<br />
					<Label for="status" class="mb-1">Status</Label>
					<Select id="status" bind:value={status} required>
						<option value="0">TODO</option>
						<option value="1">DOING</option>
						<option value="2">DONE</option>
					</Select>
					<br />
					<div class="mb-64 md:w-1/2">
						<Datepicker bind:value={selectedDate} color="green" />
						<P class="mt-4"
							>Selected date: {selectedDate ? selectedDate.toLocaleDateString('en-GB') : 'None'}</P
						>
					</div>
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
					ROOM: {task.room.name}
				</p>
				<Button
					class="cursor-pointer"
					onclick={() => {
						taskForEditModalHandler.description = task.description;
						taskForEditModalHandler.room = task.room.name;
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
						taskDeletionModalHandler.id = task.id.toString();
						taskDeletionModalHandler.open = true;
					}}>Delete</Button
				>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					ROOM: {task.room.name}
				</p>
				<Button
					class="cursor-pointer"
					onclick={() => {
						taskForEditModalHandler.description = task.description;
						taskForEditModalHandler.room = task.room;
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
					ROOM: {task.room.name}
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
		<Label class="space-y-2">
			<span>Description</span>
			<Input type="text" name="description" value={taskForEditModalHandler.description} required />
		</Label>
		<Label class="space-y-2">
			<span>Room</span>
			<Input type="text" name="room" value={taskForEditModalHandler.room} required />
		</Label>
		<Label class="space-y-2">
			<span>Detail</span>
			<Textarea
				id="detail"
				placeholder="Details"
				bind:value={taskForEditModalHandler.detail}
				required
			/>
		</Label>
		<Button
			type="submit"
			class="w-full1 cursor-pointer"
			onclick={() => {
				editTask(taskForEditModalHandler);
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
				deleteTask(taskDeletionModalHandler.id);
			}}>Yes, I'm sure</Button
		>
		<Button class="cursor-pointer" color="alternative">No, cancel</Button>
	</div>
</Modal>

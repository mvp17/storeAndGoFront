<script>
	import { Card, Button, Badge, Modal, Label, Input } from 'flowbite-svelte';
	import { http } from '../../../../stores/http';
	import { onMount } from 'svelte';

	let taskDeletionModalHandler = {
		open: false,
		id: ''
	};
	let taskForEditModalHandler = {
		open: false,
		description: '',
		origin_room: '',
		destination_room: ''
	};

	let todoTasks = [];
	let doingTasks = [];
	let doneTasks = [];

	onMount(async () => {
		try {
			await getTechnicianTasks();
		} catch (err) {
			console.log(err);
		}
	});

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
</script>

<svelte:head>
	<title>Warehouse technician tasks</title>
</svelte:head>

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
					on:click={() => {
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
					on:click={() => {
						taskForEditModalHandler.description = task.description;
						taskForEditModalHandler.origin_room = task.origin_room;
						taskForEditModalHandler.destination_room = task.destination_room;
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
					on:click={() => {
						taskDeletionModalHandler.id = task.id.toString();
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
					on:click={() => {
						taskForEditModalHandler.description = task.description;
						taskForEditModalHandler.room = task.room;
						taskForEditModalHandler.detail = task.detail;
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
			<Input type="text" name="detail" value={taskForEditModalHandler.detail} required />
		</Label>
		<Button
			type="submit"
			class="w-full1"
			on:click={() => {
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
			class="me-2"
			on:click={() => {
				deleteTask(taskDeletionModalHandler.id);
			}}>Yes, I'm sure</Button
		>
		<Button color="alternative">No, cancel</Button>
	</div>
</Modal>

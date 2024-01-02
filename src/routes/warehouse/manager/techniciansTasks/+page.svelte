<svelte:head>
	<title>Warehouse technician tasks</title>
</svelte:head>

<script>
	import { Card, Button, Badge, Modal, Label, Input } from 'flowbite-svelte';
	import { todoTasks } from '../../../../mocks/technicianTasks.js';
	import { doingTasks } from '../../../../mocks/technicianTasks.js';
	import { doneTasks } from '../../../../mocks/technicianTasks.js';
	import { baseURL } from '../../../../environment';
	import { onMount } from 'svelte';
	import axios from 'axios';

	let  taskIdDelete = {
		open: false,
		id: ""
	};
	let taskForEdit = {
		open: false,
		description: "",
		room: "",
		detail: ""
	};

	onMount (async () => {
        try {
            //axios.defaults.withCredentials = true;
            const instance = axios.create({ baseURL: baseURL });
            /*
			let res = await instance.get('/get-todo-tasks');
            todoTasks = res.data.lastTasks;
			res = await instance.get('/get-doing-tasks');
			doingTasks = res.data.doingTasks;
			res = await instance.get('/get-done-tasks');
			doneTasks = res.data.doneTasks;
			*/
        } catch (err) {
            console.log(err);
        }
    });

	function deleteTask (/** @type {number} */ taskId) {
		const instance = axios.create({ baseURL: baseURL });
		//const res = await instance.delete('/delete-task', {id: taskId});
	}

	function editTask (/** @type {{description: string, room: string, detail: string}} */ taskForEdit) {
		console.log(taskForEdit)
		const instance = axios.create({ baseURL: baseURL });
		//const res = await instance.patch('/edit-task', {task: taskForEdit});
	}
</script>

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
				<Button on:click={() => {
					taskIdDelete.id = task.id.toString();
					taskIdDelete.open = true;
				}}>Delete</Button>
      			<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        			ROOM: {task.room}
      			</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        			DETAIL: {task.detail}
      			</p>
				<Button on:click={() => { 
					taskForEdit.description = task.description;
					taskForEdit.room = task.room;
					taskForEdit.detail = task.detail;
					taskForEdit.open = true;
				}}>Edit</Button>
			</Card>
		{/each}
	</div>
	<div class="grid md:grid-cols-1">
		{#each doingTasks as task}
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        			{task.description}
      			</h5>
				<Button on:click={() => {
					taskIdDelete.id = task.id.toString();
					taskIdDelete.open = true;
				}}>Delete</Button>
      			<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        			ROOM: {task.room}
      			</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        			DETAIL: {task.detail}
      			</p>
				<Button on:click={() => { 
					taskForEdit.description = task.description;
					taskForEdit.room = task.room;
					taskForEdit.detail = task.detail;
					taskForEdit.open = true;
				 }}>Edit</Button>
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
        			ROOM: {task.room}
      			</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        			DETAIL: {task.detail}
      			</p>
			</Card>
		{/each}
	</div>
</div>

<Modal title="Edit task" bind:open={taskForEdit.open} size="xs" autoclose class="w-full">
  <form class="flex flex-col space-y-6" action="#">
    <Label class="space-y-2">
      <span>Description</span>
      <Input type="text" name="description" value={taskForEdit.description} required />
    </Label>
    <Label class="space-y-2">
      <span>Room</span>
      <Input type="text" name="room" value={taskForEdit.room} required />
    </Label>
	<Label class="space-y-2">
      <span>Detail</span>
      <Input type="text" name="detail" value={taskForEdit.detail} required />
    </Label>
    <Button type="submit" class="w-full1" on:click={() => { editTask(taskForEdit)}}>Edit</Button>
  </form>
</Modal>

<Modal title="Delete task" bind:open={taskIdDelete.open} size="sm" autoclose>
  <div class="text-center">
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this task?</h3>
    <Button color="red" class="me-2" on:click={() => { deleteTask(Number(taskIdDelete.id)) }}>Yes, I'm sure</Button>
    <Button color="alternative">No, cancel</Button>
  </div>
</Modal>

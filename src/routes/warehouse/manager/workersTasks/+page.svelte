<svelte:head>
	<title>Warehouse workers tasks</title>
</svelte:head>

<script>
	import { Card, Button, Badge, Modal, Label, Input } from 'flowbite-svelte';
	import { todoTasks } from '../../../../mocks/workerTasks.js';
	import { doingTasks } from '../../../../mocks/workerTasks.js';
	import { doneTasks } from '../../../../mocks/workerTasks.js';

	let editModal = false;
	let deleteModal = false;
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
				<Button on:click={() => (deleteModal = true)}>Delete</Button>
      			<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        			ROOM: {task.room}
      			</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        			DETAIL: {task.detail}
      			</p>
				<Button on:click={() => (editModal = true)}>Edit</Button>
			</Card>
		{/each}
	</div>
	<div class="grid md:grid-cols-1">
		{#each doingTasks as task}
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        			{task.description}
      			</h5>
				<Button on:click={() => (deleteModal = true)}>Delete</Button>
      			<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        			ROOM: {task.room}
      			</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        			DETAIL: {task.detail}
      			</p>
				<Button on:click={() => (editModal = true)}>Edit</Button>
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

<Modal title="Edit task" bind:open={editModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" action="#">
    <Label class="space-y-2">
      <span>Description</span>
      <Input type="text" name="description" required />
    </Label>
    <Label class="space-y-2">
      <span>Room</span>
      <Input type="text" name="room" required />
    </Label>
	<Label class="space-y-2">
      <span>Detail</span>
      <Input type="text" name="detail" required />
    </Label>
    <Button type="submit" class="w-full1">Edit</Button>
  </form>
</Modal>

<Modal title="Delete task" bind:open={deleteModal} size="sm" autoclose>
  <div class="text-center">
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this task?</h3>
    <Button color="red" class="me-2">Yes, I'm sure</Button>
    <Button color="alternative">No, cancel</Button>
  </div>
</Modal>

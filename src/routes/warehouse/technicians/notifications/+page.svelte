<svelte:head>
	<title>Warehouse</title>
</svelte:head>

<script>
	import { Card, Button } from 'flowbite-svelte';

	let taskList = [
		{
			pk: 1,
			description: "Description 1",
			detail: "Detail 1",
			room: {
				name: "Room 1"
			},
			taskStatus: 1
		},
		{
			pk: 2,
			description: "Description 2",
			detail: "Detail 2",
			room: {
				name: "Room 2"
			},
			taskStatus: 1
		},
	];
</script>

{#each taskList as task, i}
	<div class="grid gap-3 md:grid-cols-4" style="margin-bottom:5px">
		{#if task.taskStatus < 3}
			<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
				You have a new task!
			</h5>
		{/if}
		{#if task.taskStatus < 4}
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Tasca {i}
				</h5>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					Description: {task.description}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					Room: {task.room.name}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					Details: {task.detail}
				</p>
				<Button href="/warehouse/technicians/notifications/confirm">Complete task</Button>
			</Card>
		{/if}
	</div>
{/each}

{#if taskList.length === 0}
	<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
		There are no new tasks.
	</h5>
{/if}

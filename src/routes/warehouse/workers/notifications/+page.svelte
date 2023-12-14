<svelte:head>
	<title>Warehouse</title>
</svelte:head>

<script>
	import { Card, Button } from 'flowbite-svelte';

	let taskList = [
		{
			pk: 1,
			description: "Description 1",
			containers: {
				productId: 0,
				quantity: 10
			},
			originRoom: {
				name: "Room 1"
			},
			destinationRoom: {
				name: "Room A"
			},
			taskStatus: 1
		},
		{
			pk: 2,
			description: "Description 1",
			containers: {
				productId: 0,
				quantity: 10
			},
			originRoom: {
				name: "Room 1"
			},
			destinationRoom: {
				name: "Room A"
			},
			taskStatus: 1
		},
	];
</script>

{#each taskList as task}
	<div class="grid gap-3 md:grid-cols-4" style="margin-bottom:5px">
		{#if task.taskStatus < 3}
			<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
				You have a new task!
			</h5>
		{/if}
		{#if task.taskStatus < 4}
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Tasca {task.pk}
				</h5>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					PRODUCT: {task.containers.productId}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					QUANTITY: {task.containers.quantity}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					ORGN: {task.originRoom.name}
					DEST: {task.destinationRoom.name}
				</p>
				<Button href="/warehouse/workers/notifications/confirm?{task.pk}">Confirm task</Button>
			</Card>
		{/if}
	</div>
{/each}

{#if taskList.length === 0}
	<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
		There are no new tasks.
	</h5>
{/if}

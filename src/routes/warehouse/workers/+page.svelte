<script>
	import { Card, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { http } from '../../../stores/http';

	let workerTasks = [];

	onMount(async () => {
		try {
			const res = await $http.get('/worker_tasks');
			workerTasks = res.data;
			console.log(workerTasks);
		} catch (err) {
			console.log(err);
		}
	});

	function complete(/** @type { string } */ taskId) {
		//const res = await $http.post('/complete-task', {id: taskId});
	}
</script>

<svelte:head>
	<title>Warehouse</title>
</svelte:head>

{#each workerTasks as task}
	<div class="grid gap-3 md:grid-cols-4" style="margin-bottom:5px">
		{#if task.status < 3}
			<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">You have a new task!</h5>
		{/if}
		{#if task.status < 4}
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Tasca {task.description}
				</h5>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					PRODUCT: {task.containers.product_id}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					QUANTITY: {task.containers.quantity}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					ORGN: {task.origin_room.name}
					DEST: {task.destination_room.name}
				</p>
				<Button
					onclick={() => {
						complete(task.id);
					}}>Complete</Button
				>
			</Card>
		{/if}
	</div>
{/each}

{#if workerTasks.length === 0}
	<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">There are no new tasks.</h5>
{/if}

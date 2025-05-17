<script>
	import { Card, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { http } from '../../../stores/http';

	let technicianTasks = [];

	onMount(async () => {
		try {
			const res = await $http.get('/technician_tasks');
			technicianTasks = res.data;
		} catch (err) {
			console.log(err);
		}
	});

	function complete() {}
</script>

<svelte:head>
	<title>Warehouse</title>
</svelte:head>

{#if technicianTasks.length === 0}
	<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">There are no new tasks.</h5>
{:else}
	{#each technicianTasks as task}
		<div class="grid gap-3 md:grid-cols-4" style="margin-bottom:5px">
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Tasca {task.id}
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
				<Button
					onclick={() => {
						complete();
					}}>Complete</Button
				>
			</Card>
		</div>
	{/each}
{/if}

<svelte:head>
	<title>Warehouse</title>
</svelte:head>

<script>
	import { Card, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { baseURL } from '../../../environment';
	import axios from 'axios';

	onMount (async () => {
        try {
            //axios.defaults.withCredentials = true;
            const instance = axios.create({ baseURL: baseURL });
            //const res = await instance.get('/get-workers-tasks');
            //tasks = res.data.tasks;
        } catch (err) {
            console.log(err);
        }
    });

	let tasks = [
		{
			id: 1,
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
			id: 2,
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

	function complete(/** @type {number} */ taskId) {
		const instance = axios.create({ baseURL: baseURL });
		//const res = await instance.post('/complete-task', {id: taskId});
	}
</script>

{#each tasks as task}
	<div class="grid gap-3 md:grid-cols-4" style="margin-bottom:5px">
		{#if task.taskStatus < 3}
			<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
				You have a new task!
			</h5>
		{/if}
		{#if task.taskStatus < 4}
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Tasca {task.id}
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
				<Button on:click={() => { complete(task.id) }}>Complete</Button>
			</Card>
		{/if}
	</div>
{/each}

{#if tasks.length === 0}
	<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
		There are no new tasks.
	</h5>
{/if}

<svelte:head>
	<title>Manager Home</title>
</svelte:head>

<script>
	import { Card, Button } from 'flowbite-svelte';
	import WarehouseMap from '../../../components/WarehouseMap.svelte';
	import { lastTasks } from '../../../mocks/lastTasks.js';
</script>

<WarehouseMap></WarehouseMap>

{#if lastTasks.length !== 0}
	<h1 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
		LAST TASKS
	</h1>
	<div class="grid gap-3 md:grid-cols-4" style="margin-bottom:5px">
		{#each lastTasks as lastTask}
			<Card>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{lastTask.description}
				</h5>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					PRODUCT: {lastTask.containers.productId}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					QUANTITY: {lastTask.containers.quantity}
				</p>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
					ORGN: {lastTask.originRoom.name}
					DEST: {lastTask.destinationRoom.name}
				</p>
			</Card>
		{/each}
	</div>
	{:else}
		<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
			TODAY THERE ARE NOT REGISTERED TASKS YET.
		</h5>
{/if}

<div class="grid gap-3 md:grid-cols-2" style="margin-top:15px">
	<Button href="/warehouse/manager/entranceManifest">New entrance</Button>
	<Button href="/warehouse/manager/departureManifest">New departure</Button>
</div>


<style>
	h1 {text-align: center}
</style>

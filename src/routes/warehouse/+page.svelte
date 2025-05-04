<script>
	import { Card } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>Warehouse</title>
</svelte:head>

<div class="grid md:grid-cols-3">
	<Card href="/warehouse/manager">
		<p class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Manager</p>
	</Card>
	<Card href="/warehouse/technicians">
		<p class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Technicians</p>
	</Card>
	<Card href="/warehouse/workers">
		<p class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Workers</p>
	</Card>
</div>

<Card href="/">
	<p class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Back</p>
</Card>

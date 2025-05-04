<script>
	import {
		Table,
		TableBody,
		TableHead,
		TableHeadCell,
		TableBodyRow,
		TableBodyCell,
		Card
	} from 'flowbite-svelte';
	import { expiringSLAContainers } from '../../../mocks/expiringSLAContainers.js';
	import { onMount } from 'svelte';
	import { http } from '../../../stores/http';

	let /** @type {
		{
			id: string,
			product: {
				productId: number,
				producerId: number
			},
			quantity: number,
			sla: {
				SLA: string,
				minTemp: number,
				maxTemp: number,
				minHum: number,
				maxHum: number,
				date_limit: string
			},
			status: number
		}[]} */ slaContainers = [];

	onMount(async () => {
		try {
			let res = await $http.get('/sla_containers');
			slaContainers = res.data;
			//res = await instance.get('/get-expiring-sla-containers');
			//expiringSLAContainers = res.data.expiringSLAContainers;
		} catch (err) {
			console.log(err);
		}
	});
</script>

<svelte:head>
	<title>Offices sla control</title>
</svelte:head>

<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">SLA list</h1>

<Table color="green" striped={true} hoverable={true} shadow style="margin-top:10px">
	<TableHead>
		<TableHeadCell>SLA</TableHeadCell>
		<TableHeadCell>Date limit</TableHeadCell>
		<TableHeadCell>Min temp</TableHeadCell>
		<TableHeadCell>Max temp</TableHeadCell>
		<TableHeadCell>Min hum</TableHeadCell>
		<TableHeadCell>Max hum</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each slaContainers as container}
			<TableBodyRow>
				<TableBodyCell>{container.sla.SLA}</TableBodyCell>
				<TableBodyCell>{container.sla.date_limit}</TableBodyCell>
				<TableBodyCell>{container.sla.minTemp}</TableBodyCell>
				<TableBodyCell>{container.sla.maxTemp}</TableBodyCell>
				<TableBodyCell>{container.sla.minHum}</TableBodyCell>
				<TableBodyCell>{container.sla.maxHum}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Expiring TODAY</h1>
{#if expiringSLAContainers.length !== 0}
	<div class="grid gap-3 md:grid-cols-3">
		{#each expiringSLAContainers as container}
			<Card>
				<div class="grid gap-3 md:grid-cols-2">
					<h2 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
						Product:
					</h2>
					<h2 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
						{container.product.productId}
					</h2>
				</div>
				<div class="grid gap-3 md:grid-cols-2">
					<h2 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
						Producer:
					</h2>
					<h2 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
						{container.product.producerId}
					</h2>
				</div>
			</Card>
		{/each}
	</div>
{:else}
	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		There are no products expiring today.
	</h1>
{/if}

<style>
	h1 {
		text-align: center;
		margin-top: 15px;
	}
</style>

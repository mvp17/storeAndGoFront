<script>
	import {
		Breadcrumb,
		BreadcrumbItem,
		Table,
		TableBody,
		TableHead,
		TableHeadCell,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';
	import { manifestContainers } from '../../../../mocks/manifestContainers.js';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { http } from '../../../../stores/http.js';

	let manifestId = '';
	onMount(async () => {
		try {
			manifestId = $page.params.manifestId;
			//const res = await $http.get('/get-manifest-containers', {id: manifestId});
			//manifestContainers = res.data.manifestContainers;
		} catch (err) {
			console.log(err);
		}
	});
</script>

<svelte:head>
	<title>Offices manifests detail</title>
</svelte:head>

<Breadcrumb solid>
	<BreadcrumbItem href="/offices/manifests">Manifests</BreadcrumbItem>
	<BreadcrumbItem>{manifestId}</BreadcrumbItem>
</Breadcrumb>

<Table color="green" striped={true} hoverable={true} shadow style="margin-top:10px">
	<TableHead>
		<TableHeadCell>Product ID</TableHeadCell>
		<TableHeadCell>Date limit</TableHeadCell>
		<TableHeadCell>Min temp</TableHeadCell>
		<TableHeadCell>Max temp</TableHeadCell>
		<TableHeadCell>Min hum</TableHeadCell>
		<TableHeadCell>Max hum</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each manifestContainers as container}
			<TableBodyRow>
				<TableBodyCell>{container.product.productId}</TableBodyCell>
				<TableBodyCell>{container.sla.dateLimit}</TableBodyCell>
				<TableBodyCell>{container.sla.minTemp}</TableBodyCell>
				<TableBodyCell>{container.sla.maxTemp}</TableBodyCell>
				<TableBodyCell>{container.sla.minHum}</TableBodyCell>
				<TableBodyCell>{container.sla.maxHum}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

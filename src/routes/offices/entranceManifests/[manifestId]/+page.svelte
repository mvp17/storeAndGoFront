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
	import { onMount } from 'svelte';
	import { http } from '../../../../stores/http.js';

	export let data;
	const manifestId = data.manifestId;
	let manifestContainers = [];
	let loading = true;

	onMount(async () => {
		try {
			const res = await $http.get(`/entrance_manifests/${manifestId}`);
			const manifest = res.data;

			manifestContainers = await Promise.all(
				manifest.containers.map(async (containerId) => {
					const res = await $http.get(`/sla_containers/${containerId}`);
					return res.data;
				})
			);
			loading = false;
		} catch (err) {
			console.log(err);
		}
	});
</script>

<svelte:head>
	<title>Offices entrance manifests detail</title>
</svelte:head>

<Breadcrumb solid>
	<BreadcrumbItem href="/offices/entranceManifests">Entrance manifests</BreadcrumbItem>
	<BreadcrumbItem>{manifestId}</BreadcrumbItem>
</Breadcrumb>

{#if loading}
	<p>Loading containers...</p>
{:else}
	<Table color="green" striped={true} hoverable={true} shadow style="margin-top:10px">
		<TableHead>
			<TableHeadCell>Product</TableHeadCell>
			<TableHeadCell>Producer</TableHeadCell>
			<TableHeadCell>Date limit</TableHeadCell>
			<TableHeadCell>Min temp</TableHeadCell>
			<TableHeadCell>Max temp</TableHeadCell>
			<TableHeadCell>Min hum</TableHeadCell>
			<TableHeadCell>Max hum</TableHeadCell>
			<TableHeadCell>Quantity</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each manifestContainers as container}
				<TableBodyRow>
					<TableBodyCell>{container.product}</TableBodyCell>
					<TableBodyCell>{container.producer}</TableBodyCell>
					<TableBodyCell>{container.date_limit}</TableBodyCell>
					<TableBodyCell>{container.min_temp}</TableBodyCell>
					<TableBodyCell>{container.max_temp}</TableBodyCell>
					<TableBodyCell>{container.min_hum}</TableBodyCell>
					<TableBodyCell>{container.max_hum}</TableBodyCell>
					<TableBodyCell>{container.quantity}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
{/if}

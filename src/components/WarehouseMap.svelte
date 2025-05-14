<script>
	import warehouse from '$lib/images/warehouse.png';
	import { onMount } from 'svelte';
	import { http } from '../stores/http.js';
	import { goto } from '$app/navigation';

	let loading = true;
	let Sala1,
		Sala2,
		SalaA,
		SalaB,
		SalaC,
		SalaM1,
		SalaM2,
		SalaM3,
		SalaF7,
		SalaF1,
		SalaF2,
		SalaF3,
		SalaF4,
		SalaF5,
		SalaF6,
		MollCarrega;

	onMount(async () => {
		try {
			await getRooms();
		} catch (err) {
			console.log(err);
		}
	});

	async function getRooms() {
		let rooms = [];
		const res = await $http.get('/rooms');
		rooms = res.data;
		Sala1 = rooms.filter((room) => room.name === 'Sala 1');
		Sala2 = rooms.find((room) => room.name === 'Sala 2');
		SalaA = rooms.find((room) => room.name === 'Sala A');
		SalaB = rooms.find((room) => room.name === 'Sala B');
		SalaC = rooms.find((room) => room.name === 'Sala C');
		SalaM1 = rooms.find((room) => room.name === 'Sala M1');
		SalaM2 = rooms.find((room) => room.name === 'Sala M2');
		SalaM3 = rooms.find((room) => room.name === 'Sala M3');
		SalaF7 = rooms.find((room) => room.name === 'Sala F7');
		SalaF1 = rooms.find((room) => room.name === 'Sala F1');
		SalaF2 = rooms.find((room) => room.name === 'Sala F2');
		SalaF3 = rooms.find((room) => room.name === 'Sala F3');
		SalaF4 = rooms.find((room) => room.name === 'Sala F4');
		SalaF5 = rooms.find((room) => room.name === 'Sala F5');
		SalaF6 = rooms.find((room) => room.name === 'Sala F6');
		MollCarrega = rooms.find((room) => room.name === 'Moll carrega');
		loading = false;
	}

	function goToRoom(id) {
		goto(`/warehouse/manager/rooms/${id}`);
	}
</script>

{#if loading}
	<p>Loading rooms...</p>
{:else}
	<div class="col-sm-7 bg-light">
		<img
			id="map"
			src={warehouse}
			class="img-fluid img-thumbnail d-block mx-auto"
			alt=""
			style="max-width: 90%; height: auto;"
			usemap="#map-warehouse"
		/>
		<map name="map-warehouse">
			<!-- Sala 1 -->
			{#if Sala1.room_status === 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					class="cursor-pointer"
					coords="3, 0, 280, 125"
					on:click={() => goToRoom(Sala1.id)}
					title="{Sala1.name}
							--------------------------------
							Temperatura:  {Sala1.temp}º
							Humitat:      {Sala1.hum}%
							Capacitat:    {(Sala1.quantity / Sala1.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					class="cursor-pointer"
					coords="3, 0, 280, 125"
					on:click={() => goToRoom(Sala1.id)}
					title="{Sala1.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala 2 -->
			{#if Sala2.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					class="cursor-pointer"
					coords="280, 0, 560, 125"
					on:click={() => goToRoom(Sala2.id)}
					title="{Sala2.name}
							--------------------------------
							Temperatura:  {Sala2.temp}º
							Humitat:      {Sala2.hum}%
							Capacitat:    {(Sala2.quantity / Sala2.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					class="cursor-pointer"
					coords="280, 0, 560, 125"
					on:click={() => goToRoom(Sala2.id)}
					title="{Sala2.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala A -->
			{#if SalaA.room_status}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					class="cursor-pointer"
					on:click={() => goToRoom(SalaA.id)}
					coords="3, 127, 105, 248"
					title="{SalaA.name}
							--------------------------------
							Temperatura:  {SalaA.temp}º
							Humitat:      {SalaA.hum}%
							Capacitat:    {(SalaA.quantity / SalaA.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="3, 127, 105, 248"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaA.id)}
					title="{SalaA.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala B -->
			{#if SalaB.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="3, 250, 105, 360"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaB.id)}
					title="{SalaB.name}
							--------------------------------
							Temperatura:  {SalaB.temp}º
							Humitat:      {SalaB.hum}%
							Capacitat:    {(SalaB.quantity / SalaB.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="3, 250, 105, 360"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaB.id)}
					title="{SalaB.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala C -->
			{#if SalaC.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="3, 362, 105, 495"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaC.id)}
					title="{SalaC.name}
							--------------------------------
							Temperatura:  {SalaC.temp}º
							Humitat:      {SalaC.hum}%
							Capacitat:    {(SalaC.quantity / SalaC.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="3, 362, 105, 495"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaC.id)}
					title="{SalaC.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala M1-->
			{#if SalaM1.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="478, 127, 560, 190"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaM1.id)}
					title="{SalaM1.name}
							--------------------------------
							Temperatura:  {SalaM1.temp}º
							Humitat:      {SalaM1.hum}%
							Capacitat:    {(SalaM1.quantity / SalaM1.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="478, 127, 560, 190"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaM1.id)}
					title="{SalaM1.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala M2-->
			{#if SalaM2.room_status}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="479, 192, 560, 256"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaM2.id)}
					title="{SalaM2.name}
							--------------------------------
							Temperatura:  {SalaM2.temp}º
							Humitat:      {SalaM2.hum}%
							Capacitat:    {(SalaM2.quantity / SalaM2.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="479, 192, 560, 256"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaM2.id)}
					title="{SalaM2.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala M3-->
			{#if SalaM3.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="479, 258, 560, 321"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaM3.id)}
					title="{SalaM3.name}
							--------------------------------
							Temperatura:  {SalaM3.temp}º
							Humitat:      {SalaM3.hum}%
							Capacitat:    {(SalaM3.quantity / SalaM3.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="479, 258, 560, 321"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaM3.id)}
					title="{SalaM3.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala F7-->
			{#if SalaF7.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="479, 323, 560, 387"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF7.id)}
					title="{SalaF7.name}
							--------------------------------
							Temperatura:  {SalaF7.temp}º
							Humitat:      {SalaF7.hum}%
							Capacitat:    {(SalaF7.quantity / SalaF7.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="479, 323, 560, 387"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF7.id)}
					title="{SalaF7.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala F7-->
			{#if SalaF7.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="479, 323, 560, 387"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF7.id)}
					title="{SalaF7.name}
							--------------------------------
							Temperatura:  {SalaF7.temp}º
							Humitat:      {SalaF7.hum}%
							Capacitat:    {(SalaF7.quantity / SalaF7.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="479, 323, 560, 387"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF7.id)}
					title="{SalaF7.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala F1-->
			{#if SalaF1.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="348, 182, 410, 235"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF1.id)}
					title="{SalaF1.name}
							--------------------------------
							Temperatura:  {SalaF1.temp}º
							Humitat:      {SalaF1.hum}%
							Capacitat:    {(SalaF1.quantity / SalaF1.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="348, 182, 410, 235"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF1.id)}
					title="{SalaF1.name}
							--------------------------------
							TANCADA"
				/>
			{/if}

			<!-- Sala F2-->
			{#if SalaF2.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="348, 237, 410, 289"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF2.id)}
					title="{SalaF2.name}
							--------------------------------
							Temperatura:  {SalaF2.temp}º
							Humitat:      {SalaF2.hum}%
							Capacitat:    {(SalaF2.quantity / SalaF2.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="348, 237, 410, 289"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF2.id)}
					title="{SalaF2.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala F3-->
			{#if SalaF3.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="348, 291, 410, 345"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF3.id)}
					title="{SalaF3.name}
							--------------------------------
							Temperatura:  {SalaF3.temp}º
							Humitat:      {SalaF3.hum}%
							Capacitat:    {(SalaF3.quantity / SalaF3.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="348, 291, 410, 345"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF3.id)}
					title="{SalaF3.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala F4-->
			{#if SalaF4.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="348, 347, 410, 399"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF4.id)}
					title="{SalaF4.name}
							--------------------------------
							Temperatura:  {SalaF4.temp}º
							Humitat:      {SalaF4.hum}%
							Capacitat:    {(SalaF4.quantity / SalaF4.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="348, 347, 410, 399"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF4.id)}
					title="{SalaF4.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala F5-->
			{#if SalaF5.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="348, 401, 410, 454"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF5.id)}
					title="{SalaF5.name}
							--------------------------------
							Temperatura:  {SalaF5.temp}º
							Humitat:      {SalaF5.hum}%
							Capacitat:    {(SalaF5.quantity / SalaF5.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="348, 401, 410, 454"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF5.id)}
					title="{SalaF5.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Sala F6-->
			{#if SalaF6.room_status == 1}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="348, 456, 410, 509"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF6.id)}
					title="{SalaF6.name}
							--------------------------------
							Temperatura:  {SalaF6.temp}º
							Humitat:      {SalaF6.hum}%
							Capacitat:    {(SalaF6.quantity / SalaF6.threshold) * 100}%"
					data-toggle="tooltip"
				/>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<area
					shape="rect"
					alt=""
					coords="348, 456, 410, 509"
					class="cursor-pointer"
					on:click={() => goToRoom(SalaF6.id)}
					title="{SalaF6.name}
							--------------------------------
							TANCADA"
					data-toggle="tooltip"
				/>
			{/if}

			<!-- Moll càrrega -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<area
				shape="rect"
				alt=""
				coords="39, 558, 292, 664"
				class="cursor-pointer"
				on:click={() => goToRoom(MollCarrega.id)}
				title="{MollCarrega.name}
						--------------------------------
						Capacitat: {(MollCarrega.quantity / MollCarrega.threshold) * 100}%"
				data-toggle="tooltip"
			/>
		</map>
	</div>
{/if}

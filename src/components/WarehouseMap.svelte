<script>
	import warehouse from '$lib/images/warehouse.png';
	import { rooms } from '../mocks/rooms.js';
	import { capacities } from '../mocks/capacities.js';
</script>

<div class="col-sm-7 bg-light">
	<img
		id="map"
		src={warehouse}
		class="img-fluid img-thumbnail mx-auto d-block"
		alt=""
		style="max-width: 90%; height: auto;"
		usemap="#map-warehouse"
	/>
	<map name="map-warehouse">
		<!-- Sala 1 -->
		{#if rooms[0].room_status === 1}
			<area
				shape="rect"
				alt=""
				coords="3, 0, 280, 125"
				href="warehouse/manager/rooms/roomId?{rooms[0].pk}"
				title="SALA {rooms[0].name}
          --------------------------------
          Temperatura:  {rooms[0].temp}º
          Humitat:      {rooms[0].hum}%
          Capacitat:    {capacities[1]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="3, 0, 280, 125"
				href="warehouse/manager/rooms/roomId?{rooms[0].pk}"
				title="SALA {rooms[0].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala 2 -->
		{#if rooms[1].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="280, 0, 560, 125"
				href="warehouse/manager/rooms/roomId?{rooms[1].pk}"
				title="SALA {rooms[1].name}
          --------------------------------
          Temperatura:  {rooms[1].temp}º
          Humitat:      {rooms[1].hum}%
          Capacitat:    {capacities[2]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="280, 0, 560, 125"
				href="warehouse/manager/rooms/roomId?{rooms[1].pk}"
				title="SALA {rooms[1].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala A -->
		{#if rooms[2].room_status}
			<area
				shape="rect"
				alt=""
				coords="3, 127, 105, 248"
				href="warehouse/manager/rooms/roomId?{rooms[2].pk}"
				title="SALA {rooms[2].name}
          --------------------------------
          Temperatura:  {rooms[2].temp}º
          Humitat:      {rooms[2].hum}%
          Capacitat:    {capacities[2]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="3, 127, 105, 248"
				href="warehouse/manager/rooms/roomId?{rooms[2].pk}"
				title="SALA {rooms[2].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala B -->
		{#if rooms[3].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="3, 250, 105, 360"
				href="warehouse/manager/rooms/roomId?{rooms[3].pk}"
				title="SALA {rooms[3].name}
          --------------------------------
          Temperatura:  {rooms[3].temp}º
          Humitat:      {rooms[3].hum}%
          Capacitat:    {capacities[3]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="3, 250, 105, 360"
				href="warehouse/manager/rooms/roomId?{rooms[3].pk}"
				title="SALA {rooms[3].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala C -->
		{#if rooms[4].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="3, 362, 105, 495"
				href="warehouse/manager/rooms/roomId?{rooms[4].pk}"
				title="SALA {rooms[4].name}
          --------------------------------
          Temperatura:  {rooms[4].temp}º
          Humitat:      {rooms[4].hum}%
          Capacitat:    {capacities[4]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="3, 362, 105, 495"
				href="warehouse/manager/rooms/roomId?{rooms[4].pk}"
				title="SALA {rooms[4].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala M1-->
		{#if rooms[5].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="478, 127, 560, 190"
				href="warehouse/manager/rooms/roomId?{rooms[5].pk}"
				title="{rooms[5].name}
          --------------------------------
          Temperatura:  {rooms[5].temp}º
          Humitat:      {rooms[5].hum}%
          Capacitat:    {capacities[5]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="478, 127, 560, 190"
				href="warehouse/manager/rooms/roomId?{rooms[5].pk}"
				title="{rooms[5].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala M2-->
		{#if rooms[6].room_status}
			<area
				shape="rect"
				alt=""
				coords="479, 192, 560, 256"
				href="warehouse/manager/rooms/roomId?{rooms[6].pk}"
				title="{rooms[6].name}
          --------------------------------
          Temperatura:  {rooms[6].temp}º
          Humitat:      {rooms[6].hum}%
          Capacitat:    {capacities[6]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="479, 192, 560, 256"
				href="warehouse/manager/rooms/roomId?{rooms[6].pk}"
				title="{rooms[6].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala M3-->
		{#if rooms[7].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="479, 258, 560, 321"
				href="warehouse/manager/rooms/roomId?{rooms[7].pk}"
				title="{rooms[7].name}
          --------------------------------
          Temperatura:  {rooms[7].temp}º
          Humitat:      {rooms[7].hum}%
          Capacitat:    {capacities[7]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="479, 258, 560, 321"
				href="warehouse/manager/rooms/roomId?{rooms[7].pk}"
				title="{rooms[7].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala F7-->
		{#if rooms[8].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="479, 323, 560, 387"
				href="warehouse/manager/rooms/roomId?{rooms[8].pk}"
				title="{rooms[8].name}
          --------------------------------
          Temperatura:  {rooms[8].temp}º
          Humitat:      {rooms[8].hum}%
          Capacitat:    {capacities[8]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="479, 323, 560, 387"
				href="warehouse/manager/rooms/roomId?{rooms[8].pk}"
				title="{rooms[8].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala F7-->
		{#if rooms[9].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="479, 389, 560, 512"
				href="warehouse/manager/rooms/roomId?{rooms[9].pk}"
				title="{rooms[9].name}
          --------------------------------
          Temperatura:  {rooms[9].temp}º
          Humitat:      {rooms[9].hum}%
          Capacitat:    {capacities[9]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="479, 389, 560, 512"
				href="warehouse/manager/rooms/roomId?{rooms[9].pk}"
				title="{rooms[9].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala F1-->
		{#if rooms[10].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="348, 182, 410, 235"
				href="warehouse/manager/rooms/roomId?{rooms[10].pk}"
				title="{rooms[10].name}
          --------------------------------
          Temperatura:  {rooms[10].temp}º
          Humitat:      {rooms[10].hum}%
          Capacitat:    {capacities[10]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="348, 182, 410, 235"
				href="warehouse/manager/rooms/roomId?{rooms[10].pk}"
				title="{rooms[10].name}
          --------------------------------
          TANCADA"
			/>
		{/if}

		<!-- Sala F2-->
		{#if rooms[11].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="348, 237, 410, 289"
				href="warehouse/manager/rooms/roomId?{rooms[11].pk}"
				title="{rooms[11].name}
          --------------------------------
          Temperatura:  {rooms[11].temp}º
          Humitat:      {rooms[11].hum}%
          Capacitat:    {capacities[11]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="348, 237, 410, 289"
				href="warehouse/manager/rooms/roomId?{rooms[11].pk}"
				title="{rooms[11].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala F3-->
		{#if rooms[12].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="348, 291, 410, 345"
				href="warehouse/manager/rooms/roomId?{rooms[12].pk}"
				title="{rooms[12].name}
          --------------------------------
          Temperatura:  {rooms[12].temp}º
          Humitat:      {rooms[12].hum}%
          Capacitat:    {capacities[12]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="348, 291, 410, 345"
				href="warehouse/manager/rooms/roomId?{rooms[12].pk}"
				title="{rooms[12].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala F4-->
		{#if rooms[13].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="348, 347, 410, 399"
				href="warehouse/manager/rooms/roomId?{rooms[13].pk}"
				title="{rooms[13].name}
          --------------------------------
          Temperatura:  {rooms[13].temp}º
          Humitat:      {rooms[13].hum}%
          Capacitat:    {capacities[13]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="348, 347, 410, 399"
				href="warehouse/manager/rooms/roomId?{rooms[13].pk}"
				title="{rooms[13].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala F5-->
		{#if rooms[14].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="348, 401, 410, 454"
				href="warehouse/manager/rooms/roomId?{rooms[14].pk}"
				title="{rooms[14].name}
          --------------------------------
          Temperatura:  {rooms[14].temp}º
          Humitat:      {rooms[14].hum}%
          Capacitat:    {capacities[14]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="348, 401, 410, 454"
				href="warehouse/manager/rooms/roomId?{rooms[14].pk}"
				title="{rooms[14].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Sala F6-->
		{#if rooms[15].room_status == 1}
			<area
				shape="rect"
				alt=""
				coords="348, 456, 410, 509"
				href="warehouse/manager/rooms/roomId?{rooms[15].pk}"
				title="{rooms[15].name}
          --------------------------------
          Temperatura:  {rooms[15].temp}º
          Humitat:      {rooms[15].hum}%
          Capacitat:    {capacities[15]}%"
				data-toggle="tooltip"
			/>
		{:else}
			<area
				shape="rect"
				alt=""
				coords="348, 456, 410, 509"
				href="warehouse/manager/rooms/roomId?{rooms[15].pk}"
				title="{rooms[15].name}
          --------------------------------
          TANCADA"
				data-toggle="tooltip"
			/>
		{/if}

		<!-- Moll càrrega -->
		<area
			shape="rect"
			alt=""
			coords="39, 558, 292, 664"
			href="warehouse/manager/rooms/roomId?{rooms[16].pk}"
			title="{rooms[16].name}
        --------------------------------
        Capacitat: {capacities[16]}%"
			data-toggle="tooltip"
		/>
	</map>
</div>

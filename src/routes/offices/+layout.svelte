<script>
	import CEOHeader from '../../components/headers/CEOHeader.svelte';
	export let data;
</script>

<div class="app">
	<CEOHeader currentPath={data.currentPath} />
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

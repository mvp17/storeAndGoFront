<svelte:head>
	<title>Manager input manifests</title>
</svelte:head>

<script>
	import { Card, Label, Input, Button } from 'flowbite-svelte';
	let /** @type {string} */ ref, /** @type {string} */ date, /** @type {string} */ origin;

	function registerEntranceManifest() {
		
	}
</script>

<Card>
	 <form on:submit|preventDefault={registerEntranceManifest}>
        <div class="mb-6">
            <div>
                <Label for="ref" class="mb-2">Reference</Label>
                <Input type="text" id="ref" placeholder="Reference" bind:value={ref} required />
            </div>
            <div>
                <Label for="date" class="mb-2">Date</Label>
                <Input type="date" id="date" placeholder="Date" bind:value={date} required />
            </div>
			<div>
                <Label for="origin" class="mb-2">Origin</Label>
                <Input type="text" id="origin" placeholder="Origin" bind:value={origin} required />
            </div>
        </div>
        <Button type="submit">Submit</Button>
    </form>
</Card>

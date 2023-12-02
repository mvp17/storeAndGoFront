<svelte:head>
	<title>Departure Manifests</title>
</svelte:head>

<script>
	import { Card, Label, Input, Button } from 'flowbite-svelte';
	let /** @type {string} */ ref, /** @type {string} */ date, /** @type {string} */ destination;

	function registerEntranceManifest() {
		
	}
</script>

<Card>
	 <form on:submit|preventDefault={registerEntranceManifest}>
        <div class="mb-6">
            <div>
                <Input type="text" id="ref" placeholder="Reference" bind:value={ref} required />
            </div>
            <div>
                <Label for="date" class="mb-2">Date</Label>
                <Input type="date" id="date" placeholder="Date" bind:value={date} required />
            </div>
			<div> 
                <Input type="text" id="destination" placeholder="Destination" bind:value={destination} required />
            </div>
        </div>
        <Button type="submit">Submit</Button>
    </form>
</Card>

<script>
	import { jwt } from '../../stores/sessionStore';
</script>

{#if $jwt}
	<slot name="authed" />
{:else}
	<slot name="not_authed" />
{/if}

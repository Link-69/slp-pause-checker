<script>
    import { createEventDispatcher } from 'svelte';

    let files;
    const dispatch = createEventDispatcher();

    const analyzeFile = () => {
        dispatch('analyze', files[0]);
    }
</script>

<div>
	<div>
		<input type="file" bind:files />
        {#if files && files[0]}
		    <button on:click={analyzeFile}>Analyze</button>
        {/if}
	</div>
</div>
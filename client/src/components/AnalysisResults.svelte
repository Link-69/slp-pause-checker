<script>
    export let results;
    export let error;
</script>

{#if results?.gameDuration}
    <div class="block">
        <div>Game duration : {results.gameDuration.minutes}:{results.gameDuration.seconds} ({results.gameDuration.frames} frames)</div>
        <div>-</div>
        {#if results.pauses?.length}
            {#each results.pauses as pause}
                <div><b>{pause.player}</b> pauses at {pause.minute}:{pause.second} (frame {pause.frame})</div>
            {/each}
        {:else}
            <div>No pause detected</div>
        {/if}
    </div>
{/if}
{#if error}
    <div class="block analyze-error has-text-danger">{error}</div>
{/if}
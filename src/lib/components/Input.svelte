<script lang="ts">
  export let error: string
</script>

<input class="rounded {error ? 'error' : ''}"  required {...$$restProps}/>
{#if error}
 <span class="error">{error}</span> 
{/if}

<style>
  span {
    text-align: left;
    position: relative;
    top: -9px;
  }
</style>

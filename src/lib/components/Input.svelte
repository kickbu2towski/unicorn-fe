<script lang="ts">
	export let error: string;
</script>

<input
	required
	{...$$restProps}
	class="border border-slate-300 p-4 py-2 w-full rounded-lg block {error ? 'border border-slate-300-red-300' : ''}"
/>
{#if error}
	<span class="text-red-500 relative top-1">{error}</span>
{/if}

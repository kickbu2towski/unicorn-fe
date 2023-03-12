<script lang="ts">
	export let error = '';
	export let twClass = '';
</script>

<input
	required
	{...$$restProps}
	class="block w-full rounded-lg border border-slate-300 p-4 py-2 {error
		? 'border-slate-300-red-300 border'
		: ''} {twClass}"
/>
{#if error}
	<span class="relative top-1 text-red-500">{error}</span>
{/if}

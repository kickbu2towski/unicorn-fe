<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import TodoKeywords from '$lib/components/TodoKeywords.svelte';
	import SpinIcon from '$lib/icons/SpinIcon.svelte';
	import { onMount } from 'svelte';
	export let data;
	$: console.log('server state: ', data.todoKeywords);

	// this feels that I am doing something which I shouldn't :)
	let todoKeywords = JSON.parse(JSON.stringify(data.todoKeywords));
	$: showBtn = JSON.stringify(todoKeywords) !== JSON.stringify(data.todoKeywords);

	let showLoader = false;
	let deletedIds: number[] = [];

	async function saveChanges() {
		try {
			showLoader = true;
			const res = await fetch('/app/settings', {
				method: 'post',
				body: JSON.stringify({
					todoKeywords,
					deletedIds
				})
			});
			if (res.ok) {
				await invalidateAll();
        console.log(data)
			}
		} finally {
			showLoader = false;
		}
	}
</script>

<div class="flex items-baseline justify-between">
	<h1 class="mb-8 text-xl font-semibold">Settings</h1>
	{#if showBtn}
		<button
			on:click={saveChanges}
			class="flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-1 {showLoader
				? 'cursor-not-allowed'
				: ''}"
		>
			{#if showLoader}
				<span class="relative top-[1px]"><SpinIcon /></span>
			{/if}
			<span>{showLoader ? 'Saving...' : 'Save Changes'}</span>
		</button>
	{/if}
</div>

<TodoKeywords bind:todoKeywords bind:deletedIds />

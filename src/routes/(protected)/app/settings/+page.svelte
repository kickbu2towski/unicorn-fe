<script lang="ts">
	import TodoKeywords from '$lib/components/TodoKeywords.svelte';
	import LogoutIcon from '$lib/icons/LogoutIcon.svelte';
	import SpinIcon from '$lib/icons/SpinIcon.svelte';
	import { getUser } from '@lucia-auth/sveltekit/client';
	export let data;

	// this feels that I am doing something which I shouldn't :)
	let todoKeywords = JSON.parse(JSON.stringify(data.todoKeywords));
	$: showBtn = JSON.stringify(todoKeywords) !== JSON.stringify(data.todoKeywords);

	let showLoader = false;
	let deletedIds: number[] = [];

	const user = getUser()


	async function saveChanges() {
		// TODO: after updating the server state, need to sync
		// that state with local state, figure it out
		try {
			showLoader = true;
			await fetch('/app/settings', {
				method: 'post',
				body: JSON.stringify({
					todoKeywords,
					deletedIds
				})
			});
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

<form method="POST" action="?/logout">
	<button class="mt-8 flex gap-3 items-baseline">
		<span class="text-lg relative top-[5px]"><LogoutIcon /></span>	
		<span class="flex flex-col items-start gap-1">
			<span>Logout</span>
			<span class="text-slate-500">{$user?.email}</span>	
		</span>
	</button>
</form>

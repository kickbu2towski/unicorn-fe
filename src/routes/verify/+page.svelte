<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import SpinIcon from '$lib/icons/SpinIcon.svelte';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	export let form: ActionData;
	
	let showLoader = false;
	const submitForm: SubmitFunction = () => {
		showLoader = true;
		return async ({ update }) => {
			showLoader = false;
			await update();
		};
	};
</script>

<div class="p-4 flex flex-col justify-center items-center h-full">
	{#if data.token}
  <form method="POST" use:enhance={submitForm}>
		<button
			class="mb-2 p-4 py-2 bg-black text-white rounded-lg w-full flex items-center justify-center gap-2 {showLoader
				? 'cursor-not-allowed opacity-50'
				: ''}"
		>
			{#if showLoader}
				<span class="relative top-[1px]"><SpinIcon /></span>
			{/if}
			<span>{showLoader ? 'Verifying...' : 'Verify Email'}</span>
		</button>
    {#if form?.invalidToken}
      <span class="text-red-500">{form?.invalidToken}</span>
    {/if}
  </form>
	{:else}
		<h1 class="text-2xl pb-1 font-bold">Verify your email address</h1>
		<p class="text-slate-500">We have sent you an email. Check your inbox.</p>
	{/if}
</div>
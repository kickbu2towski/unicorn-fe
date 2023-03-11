<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte';
	import SpinIcon from '$lib/icons/SpinIcon.svelte';
	import type { ActionData } from './$types';
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

<div class="flex flex-col h-full justify-center p-4">
	<div class="text-center">
		<h1 class="text-4xl font-bold pb-2">Create an account</h1>
		<p class="text-slate-500 mb-8">Tame those open loops</p>
	</div>

	{#if form?.emailUnavailable}
		<span class="text-red-500 relative -top-4 text-center">{form.emailUnavailable}</span>
	{/if}

	<form method="POST" use:enhance={submitForm} class="space-y-4">
		<Input
			type="email"
			name="email"
			placeholder="johndoe@gmail.com"
			required
			error={form?.email ? form.email[0] : ''}
		/>

		<Input
			type="password"
			name="password"
			placeholder="password"
			required
			error={form?.password ? form.password[0] : ''}
		/>

		<button
			class="p-4 py-2 bg-black text-white rounded-lg w-full flex items-center justify-center gap-2 {showLoader
				? 'cursor-not-allowed opacity-50'
				: ''}"
		>
			{#if showLoader}
				<span class="relative top-[1px]"><SpinIcon /></span>
			{/if}
			<span>{showLoader ? 'Creating account...' : 'Sign Up'}</span>
		</button>

		<p class="text-center">or continue with</p>

		<a class="flex justify-center items-center gap-2 rounded-lg p-4 py-2 border border-slate-300" href="/api/oauth?provider=google">
			<span><GoogleIcon /></span>
			<span>Google</span>
		</a>
	</form>

	<a class="rounded-lg p-4 py-2 border border-slate-300 fixed top-4 right-4 text-center" href="/login">Login</a>
</div>
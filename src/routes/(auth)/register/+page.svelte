<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div class="register text-center flex-center-y">
	<h1>Create an account</h1>
	<p class="dim">Tame those open loops</p>

	{#if form?.emailUnavailable}
		<span class="error">{form.emailUnavailable}</span>
	{/if}

	<form method="POST" class="flex-space-x" use:enhance>
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
		<button class="btn rounded">Sign Up</button>

		<p>or continue with</p>

		<a class="btn-outline rounded flex-center-x" href="/api/oauth?provider=google">
			<span><GoogleIcon /></span>
			<span>Google</span>
		</a>
	</form>

	<a class="btn-outline rounded login" href="/login">Login</a>
</div>

<style>
	.register {
		padding: 1rem;
		height: 100%;
	}

	h1 {
		padding-bottom: 0.2rem;
	}

	form {
		margin: 1.5rem 0;
	}

	button + p {
		margin: 0.4rem 0;
	}

	.login {
		position: fixed;
		right: 1.2rem;
		top: 1.2rem;
	}

	p + span {
		position: relative;
		top: 0.5rem;
	}
</style>

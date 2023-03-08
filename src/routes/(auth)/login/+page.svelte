<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div class="login text-center flex-center-y">
	<h1>Welcme Back</h1>
	<p class="dim">Enter your credentials to sign in to your account</p>

	{#if form?.incorrectAuth}
		<span class="error">{form.incorrectAuth}</span>
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

		<button class="btn rounded">Sign In</button>

		<p>or continue with</p>

		<a class="btn-outline rounded flex-center-x" href="/api/oauth?provider=google">
			<span><GoogleIcon /></span>
			<span>Google</span>
		</a>
		<a class="link dim" href="/register">Don't have an account? Sign Up</a>
	</form>
</div>

<style>
	.login {
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
		margin: 0.4rem;
	}

	a:last-child {
		margin-top: 1.5rem;
	}

	p + span {
		position: relative;
		top: 0.5rem;
	}
</style>

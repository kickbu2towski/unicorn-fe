<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	export let form: ActionData;
</script>

<div class="verify flex-center-y">
	{#if data.token}
  <form method="POST" use:enhance>
		<button class="btn rounded">Verify Email</button>
    {#if form?.invalidToken}
      <span class="error">{form?.invalidToken}</span>
    {/if}
  </form>
	{:else}
		<h2>Verify your email address</h2>
		<p class="dim">We have sent you an email. Check your inbox.</p>
	{/if}
</div>

<style>
	.verify {
		height: 100%;
		text-align: center;
		padding: 1rem;
	}

	h2 {
		padding-bottom: 0.2rem;
	}

  button {
    width: 100%;
    margin-bottom: 0.5rem;
  }

</style>

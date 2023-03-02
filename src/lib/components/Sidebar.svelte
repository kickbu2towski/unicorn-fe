<script lang="ts">
	import Flash from '$lib/icons/Flash.svelte';
	import AddTodo from './AddTodo.svelte';
	import Projects from './Projects.svelte';

	const routes = [
		{ id: 1, name: 'Inbox', slug: '/projects/1' },
		{ id: 2, name: 'Today', slug: '/today' },
		{ id: 3, name: 'Upcoming', slug: '/upcoming' },
		{ id: 4, name: 'Filters and Labels', slug: '/filters-and-labels' }
	];

	export let projects: any[];
 
  let isOpen = false;
</script>

<div class="sidebar">
	<div class="routes">
		{#each routes as route}
			<a href={route.slug} class="link">
				<span><Flash /></span>
				<span>{route.name}</span>
			</a>
		{/each}
	</div>

	<Projects {projects} />

  <button class="btn btn-primary new-todo" on:click={() => isOpen = true}>New Todo</button> 
</div>

<AddTodo bind:isOpen/>

<style>
	.sidebar {
		border-right: 1px solid var(--border);
		padding: 16px;
    display: flex;
    flex-direction: column;
	}

	.routes {
		margin-top: 24px;
		display: flex;
		flex-direction: column;
	}

	.routes a {
		padding: 7px 10px;
		border-radius: var(--radius);
		display: flex;
		align-items: center;
		gap: 8px;
	}
 
  .new-todo {
    margin-top: auto;
    align-self: center;
  }
</style>

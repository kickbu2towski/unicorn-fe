<script lang="ts">
	import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
	import ChevronDown from '../icons/ChevronDown.svelte';
	import Inbox from '../icons/Inbox.svelte';
	import Calendar from '../icons/Calendar.svelte';
	import Filters from '../icons/Filters.svelte';
	import Plus from '../icons/Plus.svelte';

	const routes = [
		{ slug: 'project/1', name: 'Inbox' },
		{ slug: 'today', name: 'Today' },
		{ slug: 'upcoming', name: 'Upcoming' },
		{ slug: 'filters-labels', name: 'Filters & Labels' }
	];

	const projects = [
		{ slug: 'project/2', name: 'Self Care', color: 'hotpink' },
		{ slug: 'project/3', name: 'Letterboxd', color: 'tomato' }
	];

	function openModal() {}
</script>

<div class="sidebar">
	<div class="routes">
		{#each routes as route}
			<a class="route" href="/{route.slug}">
				<span>
					{#if route.name === 'Inbox'}
						<Inbox />
					{:else if route.name === 'Today'}
						<Inbox />
					{:else if route.name === 'Upcoming'}
						<Calendar />
					{:else}
						<Filters />
					{/if}
				</span>
				<span>{route.name}</span>
			</a>
		{/each}
	</div>
	<Disclosure let:open>
		<DisclosureButton class="projects-btn">
			<span>Projects</span>
			<div class="projects-btn-actions">
				<button on:click|stopPropagation={openModal}>
					<span><Plus /></span>
				</button>
				<span style={open ? 'transform: rotate(90deg);' : ''}><ChevronDown /></span>
			</div>
		</DisclosureButton>
		<DisclosurePanel>
			{#each projects as project}
				<a class="project-link" href="/{project.slug}">
					<span style="background-color: {project.color};" />
					<span>{project.name}</span>
				</a>
			{/each}
		</DisclosurePanel>
	</Disclosure>
</div>

<style>
	.sidebar {
		border-right: 1px solid rgb(226 232 240 / 1);
		background-color: #fbfbfa;
		padding: 16px;
	}

	.routes {
		margin-top: 28px;
	}

	a {
		display: block;
		text-decoration: none;
		color: inherit;
		margin-bottom: 2px;
		padding: 6px 8px;
		border-radius: 6px;
	}

	a:hover {
		background-color: #f1f5f9;
		background-color: rgba(2, 2, 255, 0.059);
	}

	:global(.projects-btn) {
		margin-top: 24px;
		background-color: inherit;
		border: none;
    border-radius: 6px;
		width: 100%;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
		cursor: pointer;
	}

	:global(.projects-btn-actions) {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	:global(.projects-btn:hover .projects-btn-actions button) {
		display: flex;
	}

	:global(.projects-btn-actions button) {
		cursor: pointer;
		appearance: none;
		border: none;
		background-color: inherit;
		display: none;
    border-radius: 6px;;
	}

	:global(a.project-link),
	.route {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	:global(.project-link span:first-child) {
		display: block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
</style>

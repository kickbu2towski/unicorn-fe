<script lang="ts">
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import EditIcon from '$lib/icons/EditIcon.svelte';
	import { Popover, PopoverButton, PopoverPanel, Dialog, DialogOverlay } from '@rgossiaux/svelte-headlessui';
	import DotsVertical from '$lib/icons/DotsVertical.svelte';
	import { createPopperActions } from 'svelte-popperjs';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import AddProject from '$lib/components/AddProject.svelte';
	import { goto, invalidateAll } from '$app/navigation';

	export let data: PageData;

	const [popperRef, popperContent] = createPopperActions();
	const popperOptions = {
		placement: 'bottom-end',
		modifiers: [{ name: 'offset', options: { offset: [0, 10] } }]
	};

	const deleteProject = async () => {
		await fetch(`/app/projects/${data?.project?.id}`, {
			method: 'delete'
		});
		await invalidateAll()
		goto('/app/projects')
	};

	$: edit = $page.url.searchParams.get('edit');
	let deleteModalOpen = false;
</script>

{#if data.project && !edit}
	<div>
		<header class="flex items-center justify-between">
			<h3 class="font-semibold text-xl">{data.project.name}</h3>

			<Popover>
				<PopoverButton use={[popperRef]}>
					<span class="text-xl"><DotsVertical /></span>
				</PopoverButton>

				<PopoverPanel
					class="rounded-lg shadow-lg flex flex-col gap-4 p-4"
					let:close
					use={[[popperContent, popperOptions]]}
				>
					<button
						class="flex items-center gap-3"
						on:click={() => {
							const redirectTo = `?edit=true`;
							goto(redirectTo);
						}}
					>
						<span><EditIcon /></span>
						<span>Edit Project</span>
					</button>
					<button
						class="flex items-center gap-3"
						on:click={() => {
							close(null);
							deleteModalOpen = true;
						}}
					>
						<span><TrashIcon /></span>
						<span>Delete</span>
					</button>
				</PopoverPanel>
			</Popover>
		</header>
	</div>

	<Dialog
		open={deleteModalOpen}
		on:close={() => (deleteModalOpen = false)}
		class="fixed top-0 left-0 w-full h-full"
	>
		<div class="border p-4 space-y-4 mx-4 rounded-lg shadow-lg mt-24">
			<p>Are you sure you want to delete this project? This action cannot be undone.</p>
			<div class="space-x-2 flex">
				<button class="border border-slate-300 p-4 py-1 rounded-lg ml-auto" on:click={() => {
					deleteModalOpen = false	
				}}
					>Cancel</button
				>
				<button
					class="p-4 py-2 rounded-lg bg-black text-white"
					on:click={async () => {
						await deleteProject();
						deleteModalOpen = false;
					}}>Delete</button
				>
			</div>
		</div>
	</Dialog>
{/if}

{#if data.project && edit === 'true'}
	<AddProject edit project={data.project} />
{/if}

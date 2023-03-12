<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { colors } from '$lib/constans';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';
	import UpDownIcon from '$lib/icons/UpDownIcon.svelte';
	import SpinIcon from '$lib/icons/SpinIcon.svelte';
	import { createPopperActions } from 'svelte-popperjs';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { sameWidthPopperOptions } from '$lib/utils';

	export let edit = false;
	export let project: { name: string; color: string, id: number } | undefined = undefined;

	let selectedColor = project?.color ?? colors[0].value;
	$: label = colors.find((color) => color.value === selectedColor)?.label;

	let showLoader = false;

	const [popperRef, popperContent] = createPopperActions();

	const submitForm: SubmitFunction = () => {
		showLoader = true;
		return async ({ result }) => {
			showLoader = false;
			if (result.type === 'success') {
				const redirectTo = `/app/projects/${result.data?.projectId}`;
				await invalidateAll();
				goto(redirectTo);
			}
		};
	};
</script>

<div>
	<form method="POST" use:enhance={submitForm}>
		<header class="flex items-center justify-between mb-6 text-xl">
			<h1 class="font-bold">{edit ? 'Edit' : 'Add'} Project</h1>
			{#if showLoader}
				<span><SpinIcon /></span>
			{:else}
				<button formaction="/app/projects?/addProject&color={selectedColor}&edit={edit}&id={project?.id}"
					><CheckIcon /></button
				>
			{/if}
		</header>

		<div class="mb-4">
			<label class="block pb-2" for="name">Name</label>
			<Input
				value={project?.name ?? ''}
				type="text"
				name="name"
				placeholder="Learn Vim"
				required
				error={''}
			/>
		</div>

		<div>
			<label class="block pb-2" for="color">Color</label>
			<Listbox value={selectedColor} on:change={(e) => (selectedColor = e.detail)}>
				<ListboxButton
					use={[popperRef]}
					class="border border-slate-300 rounded-lg p-4 py-2 w-full text-left flex items-center justify-between"
				>
					<span class="flex items-center gap-4">
						<span class="block w-3 h-3 rounded-full" style="background-color: #{selectedColor};" />
						<span>{label}</span>
					</span>
					<span><UpDownIcon /></span>
				</ListboxButton>
				<ListboxOptions
					class="py-4 shadow-lg rounded-lg outline-none"
					use={[[popperContent, sameWidthPopperOptions]]}
				>
					{#each colors as color}
						<ListboxOption
							class={({ active }) =>
								`px-4 py-2 flex items-center justify-between ${active ? 'bg-slate-100' : ''}`}
							let:selected
							value={color.value}
						>
							<span class="flex items-center gap-4">
								<span
									class="block w-3 h-3 rounded-full"
									style="background-color: #{color.value};"
								/>
								<span>{color.label}</span>
							</span>
							{#if selected}
								<span><CheckIcon /></span>
							{/if}
						</ListboxOption>
					{/each}
				</ListboxOptions>
			</Listbox>
		</div>
	</form>
</div>

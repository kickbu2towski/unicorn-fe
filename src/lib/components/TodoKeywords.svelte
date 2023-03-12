<script lang="ts">
	import Switch from './Switch.svelte';
	import { colors } from '$lib/constans';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';
	import { createPopperActions } from 'svelte-popperjs';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		Popover,
		PopoverButton,
		PopoverPanel
	} from '@rgossiaux/svelte-headlessui';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import DotsVertical from '$lib/icons/DotsVertical.svelte';
	
	export let todoKeywords: {
		id: number;
		name: string;
		color: string;
		isActionable: boolean
	}[] = [];
  export let deletedIds: number[] = []	

	let popperActions =
		todoKeywords?.map(() => ({
			edit: createPopperActions(),
			delete: createPopperActions()
		})) ?? [];

	function deleteKeyword(idx: number) {
		const keyword = todoKeywords[idx]
    if(keyword.id > 0) {
			deletedIds = [...deletedIds, keyword.id]
		}
		todoKeywords = [...todoKeywords.slice(0, idx), ...todoKeywords.slice(idx + 1)];
		popperActions = [...popperActions.slice(0, idx), ...popperActions.slice(idx + 1)];
	}

	function addKeyword() {
		popperActions = [
			...popperActions,
			{ edit: createPopperActions(), delete: createPopperActions() }
		];
		todoKeywords = [
			...todoKeywords,
			{
				id: -Date.now(),
				color: colors[0].value,
				name: '',
				isActionable: true
			}
		];
	}
</script>

<div class="rounded-lg border border-slate-300">
	<p class="mb-2 border-b border-slate-300 px-4 py-3 font-semibold">Todo Keywords</p>

	<div class="space-y-4 p-4">
		{#each todoKeywords as keyword, i (keyword.id)}
			<div class="flex items-center gap-4">
				<input
					bind:value={keyword.name}
					class="block w-full rounded-lg border border-slate-300 p-4 py-2"
				/>

				<Listbox value={keyword.color} on:change={(e) => (todoKeywords[i].color = e.detail)}>
					<ListboxButton
						use={[popperActions[i].edit[0]]}
						class="rounded-lg border border-slate-300 p-4 py-3"
					>
						<span class="block h-3 w-3 rounded-full" style="background: #{keyword.color};" />
					</ListboxButton>
					<ListboxOptions
						class="z-10 min-w-[200px] rounded-lg bg-white py-4 shadow-lg outline-none"
						use={[[popperActions[i].edit[1], {}]]}
					>
						{#each colors as color}
							<ListboxOption
								class={({ active }) =>
									`flex items-center justify-between px-4 py-2 ${active ? 'bg-slate-100' : ''}`}
								let:selected
								value={color.value}
							>
								<span class="flex items-center gap-4">
									<span
										class="block h-3 w-3 rounded-full"
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

				<Switch bind:enabled={keyword.isActionable} />

				<Popover>
					<PopoverButton use={[popperActions[i].delete[0]]}>
						<span class="text-xl"><DotsVertical /></span>
					</PopoverButton>

					<PopoverPanel
						class="z-50 flex flex-col gap-4 rounded-lg bg-white p-4 shadow-lg"
						let:close
						use={[[popperActions[i].delete[1], {}]]}
					>
						<button
							class="flex items-center gap-3"
							on:click={() => {
								deleteKeyword(i);
								close(null);
							}}
						>
							<span><TrashIcon /></span>
							<span>Delete</span>
						</button>
					</PopoverPanel>
				</Popover>
			</div>
		{/each}
		<button class="rounded-lg bg-black px-4 py-2 text-white" on:click={addKeyword}
			>New Keyword</button
		>
	</div>
</div>

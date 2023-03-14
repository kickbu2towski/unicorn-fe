<script lang="ts">
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte';
	import FlagIcon from '$lib/icons/FlagIcon.svelte';
	import SendIcon from '$lib/icons/SendIcon.svelte';
	import TaskIcon from '$lib/icons/TaskIcon.svelte';
	import TimerIcon from '$lib/icons/TimerIcon.svelte';
	import { createPopperActions } from 'svelte-popperjs';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';
	import { priorityColors } from '$lib/constans';
	import type { Prisma } from '@prisma/client';
	import UpDownIcon from '$lib/icons/UpDownIcon.svelte';
 
  // props
	export let projects: Omit<Prisma.ProjectCreateInput, 'user'>[];
  export let openDatePickerPane = () => {}
  
  // project 
	let projectVal = projects[0].name;
	$: project = projects.find((project) => project.name === projectVal);

  // priority
	const priorities = [
		{ label: 'Priority 1', value: 1, color: priorityColors[0] },
		{ label: 'Priority 2', value: 2, color: priorityColors[1] },
		{ label: 'Priority 3', value: 3, color: priorityColors[2] }
	];
	let priorityVal = priorities[1].value;
	$: priority = priorities.find((priority) => priority.value === priorityVal);

  // poppers
	const [priorityPopperRef, prioritPopperContent] = createPopperActions();
	const [projectPopperRef, projectPopperContent] = createPopperActions();
</script>

<div class="space-y-4 divide-y">
	<div class="space-y-5 p-4">
		<div class="relative flex gap-2">
			<span class="absolute top-[13px] left-4 text-slate-500"><TaskIcon /></span>
			<input
				type="text"
				class="flex-1 rounded-lg border border-slate-300 p-4 py-2 pl-10"
				placeholder="Todo item name"
			/>
		</div>

		<div class="flex flex-wrap gap-3">
			<button on:click={() => {
        openDatePickerPane()
      }} class="flex items-center gap-2 rounded-lg border border-slate-300 p-4 py-1">
				<span><TimerIcon /></span>
				<span>Due Date</span>
			</button>

			<button class="flex items-center gap-2 rounded-lg border border-slate-300 p-4 py-1">
				<span><CalendarIcon /></span>
				<span>Schedule</span>
			</button>

			<Listbox value={priorityVal} on:change={(e) => (priorityVal = e.detail)}>
				<ListboxButton
					use={[priorityPopperRef]}
					class="flex items-baseline gap-2 rounded-lg border border-slate-300 p-4 py-1"
				>
					<span style="color: #{priority?.color};" class="relative top-[3px]"><FlagIcon /></span>
					<span>{priority?.label}</span>
				</ListboxButton>
				<ListboxOptions
					class="z-50 rounded-lg bg-white py-2 shadow-lg outline-none"
					use={[[prioritPopperContent, {}]]}
				>
					{#each priorities as priority}
						<ListboxOption
							class={({ active }) =>
								`flex items-center justify-between gap-3 py-2 px-4 ${active ? 'bg-slate-100' : ''}`}
							let:selected
							value={priority.value}
						>
							<span class="flex items-center gap-4">
								<span style="color: #{priority.color};"><FlagIcon /></span>
								<span>{priority.label}</span>
							</span>
							{#if selected}
								<span><CheckIcon /></span>
							{/if}
						</ListboxOption>
					{/each}
				</ListboxOptions>
			</Listbox>
		</div>
	</div>

	<div class="flex items-center justify-between p-4">
		<Listbox value={projectVal} on:change={(e) => (projectVal = e.detail)}>
			<ListboxButton
				use={[projectPopperRef]}
				class="flex items-center gap-3 rounded-lg border border-slate-300 p-4 py-1"
			>
				<span class="flex items-center gap-3">
					<span class="block h-3 w-3 rounded-full" style="background-color: #{project?.color};" />
					<span>{project?.name}</span>
				</span>
				<span><UpDownIcon /></span>
			</ListboxButton>
			<ListboxOptions
				class="z-50 rounded-lg bg-white py-4 shadow-lg outline-none"
				use={[[projectPopperContent, {}]]}
			>
				{#each projects as project}
					<ListboxOption
						class={({ active }) =>
							`flex items-center justify-between gap-3 px-4 py-2 ${active ? 'bg-slate-100' : ''}`}
						let:selected
						value={project.name}
					>
						<span class="flex items-center gap-3">
							<span
								class="block h-3 w-3 rounded-full"
								style="background-color: #{project.color};"
							/>
							<span>{project.name}</span>
						</span>
						{#if selected}
							<span><CheckIcon /></span>
						{/if}
					</ListboxOption>
				{/each}
			</ListboxOptions>
		</Listbox>

		<button class="ml-auto text-xl">
			<span><SendIcon /></span>
		</button>
	</div>
</div>

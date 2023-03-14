<script lang="ts">
	import { CupertinoPane } from 'cupertino-pane';
	import BellIcon from '$lib/icons/BellIcon.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { PageData } from './$types';
	import PlusIcon from '$lib/icons/PlusIcon.svelte';
	import AddTodoItem from '$lib/components/AddTodoItem.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';

	export let data: PageData;

	let sideBarPane: CupertinoPane;
	let newTodoItemPane: CupertinoPane;
	let datePickerPane: CupertinoPane;

	onMount(async () => {
		sideBarPane = new CupertinoPane('.cpp-sidebar', {
			initialBreak: 'top',
			breaks: {
				top: { enabled: true, height: screen.height * 0.75 }
			},
			buttonDestroy: false,
			bottomClose: true
		});

		newTodoItemPane = new CupertinoPane('.cpp-new-todo-item', {
			initialBreak: 'middle',
			breaks: {
				middle: { enabled: true, height: screen.height * 0.35 }
			},
			buttonDestroy: false,
			bottomClose: true
		});

		datePickerPane = new CupertinoPane('.cpp-datepicker', {
			initialBreak: 'top',
			breaks: {
				top: { enabled: true, height: screen.height * 0.75 }
			},
			buttonDestroy: false,
			bottomClose: true
		});
	});

	function openPane() {
		sideBarPane.present({ animate: true });
	}

	function closePane() {
		sideBarPane.destroy({ animate: true });
	}
</script>

<div
	class="fixed bottom-0 flex w-full items-baseline justify-between border-t border-slate-300 p-4 text-xl"
>
	<button on:click={openPane}>
		<MenuIcon />
	</button>

	<button
		class="ml-6 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
		on:click={() => {
			newTodoItemPane.present({ animate: true });
		}}
	>
		<span><PlusIcon /></span>
	</button>

	<div class="space-x-4">
		<button>
			<SearchIcon />
		</button>

		<button>
			<BellIcon />
		</button>
	</div>
</div>

<div class="cpp-sidebar hidden pt-4 text-black">
	<Sidebar projects={data.projects} {closePane} />
</div>

<div class="cpp-new-todo-item hidden pt-4 text-black">
	<AddTodoItem
		projects={data.projects}
		openDatePickerPane={() => datePickerPane.present({ animate: true })}
	/>
</div>

<div class="cpp-datepicker pt-4 text-black hidden">
  <DatePicker />
</div>

<div class="p-4">
	<slot />
</div>

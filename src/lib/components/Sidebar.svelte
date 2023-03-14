<script lang="ts">
	import PlusIcon from "$lib/icons/PlusIcon.svelte";
	import DownIcon from "$lib/icons/DownIcon.svelte";
	import PlaceholderIcon from "$lib/icons/PlaceholderIcon.svelte";
  
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from "@rgossiaux/svelte-headlessui"; 
	import { goto } from '$app/navigation';
	import SettingsIcon from "$lib/icons/SettingsIcon.svelte";

  export let projects: any[]
  export let closePane: () => void

  const views = [
    { slug: 'inbox', name: 'Inbox', count: 10 },
    { slug: 'today', name: 'Today', count: 8 },
    { slug: 'upcoming', name: 'Upcoming' },
    { slug: 'filters-and-labels', name: 'Filters & Labels' },
  ]
</script>

<div class="px-4 py-2 mb-2 flex">
  <a href="/app/settings" class="ml-auto">
    <span class="text-lg"><SettingsIcon /></span>
  </a>
</div>

<div>
  {#each views as view}
    <a class="flex items-center justify-between px-4 py-2" href="/app/{view.slug}">
      <span class="flex items-center gap-2">
       <span><PlaceholderIcon /></span> 
        <span>{view.name}</span>
      </span> 
      {#if view.count}
        <span class="text-slate-500 text-sm">{view.count}</span>
      {/if}
    </a>
  {/each}
</div>

<Disclosure let:open class="mt-8">
  <DisclosureButton class="flex items-center justify-between w-full px-4">
    <span class="font-semibold">Projects</span>
    <span class="flex items-center gap-4">
    <button on:click|stopPropagation={() => {
      closePane()
      goto('/app/projects/new')
    }}><PlusIcon /></button>
      <span class="text-2xl {open ? "rotate-180" : ""}"><DownIcon /></span>
    </span>
  </DisclosureButton>
  <DisclosurePanel class="pt-3">
    {#each projects as project}
      <a class="px-4 py-2 flex items-center gap-2" href="/app/projects/{project.id}">
        <span class="block w-2 h-2 rounded-full" style="background-color: #{project.color};"></span>
        <span>{project.name}</span>
      </a>
    {/each}
  </DisclosurePanel>
</Disclosure>
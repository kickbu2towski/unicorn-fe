<script lang="ts">
  import { CupertinoPane } from 'cupertino-pane'
	import BellIcon from "$lib/icons/BellIcon.svelte";
  import MenuIcon from "$lib/icons/MenuIcon.svelte";
	import SearchIcon from "$lib/icons/SearchIcon.svelte";
	import { onMount } from "svelte";
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { PageData } from './$types';

  export let data: PageData

  let sideBarPane: CupertinoPane;
  onMount(async () => {
    sideBarPane = new CupertinoPane('.cpp-sidebar', {
      initialBreak: "top",
      breaks: {
        top: { enabled: true, height: screen.height * 0.75 },
      },
      buttonDestroy: false,
      fastSwipeClose: true,
    })
  })
 
  function openPane() {
    sideBarPane.present({ animate: true })
  }

  function closePane() {
    sideBarPane.destroy({ animate: true })
  }
</script>

<div class="fixed bottom-0 w-full border-t border-slate-300 flex justify-between items-start p-4 text-xl">
  <button on:click={openPane}>
    <MenuIcon /> 
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

<div class="cpp-sidebar pt-8 text-black hidden">
  <Sidebar projects={data.projects} {closePane}/>
</div>

<div class="p-4">
  <slot></slot>
</div>

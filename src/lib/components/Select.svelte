<script lang="ts">
	import Check from "$lib/icons/Check.svelte";
	import Selector from "$lib/icons/Selector.svelte";
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from "@rgossiaux/svelte-headlessui";

  import { createPopperActions } from "svelte-popperjs";  

  const [popperRef, popperContent] = createPopperActions();
  
  const popperOptions = {
    placement: "bottom-end",
    strategy: "fixed",
    modifiers: [{ name: "offset", options: { offset: [0, 10] } }],
  };

  export let options: { id: number, name: string }[] = []
  export let selectedOption: string = ""
</script>

<Listbox value={selectedOption} on:change={(e) => (selectedOption = e.detail)} class="listbox">
  <ListboxButton use={[popperRef]} class="listbox-btn">
    <span>{selectedOption}</span>
    <span><Selector /></span>
  </ListboxButton>
  <ListboxOptions class="listbox-options" use={[[popperContent, popperOptions]]}>
    {#each options as option (option.id)}
      <ListboxOption 
        value={option.name} 
        let:selected  
        class={({ active }) => (active ? "active" : "")}
      >
        <span>{option.name}</span>
        {#if selected} 
          <span><Check /></span> 
        {/if}
      </ListboxOption>
    {/each}
  </ListboxOptions>
</Listbox>

<style>
  :global(.listbox-btn) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px; 
  }
  
  :global(.listbox-options) {
    background: var(--bg);
    box-shadow: var(--shadow);
    border-radius: var(--radius);
    padding: 16px 0 16px 0;
  }

  :global(.listbox-options:focus) {
    outline: none;
  }

  :global(.listbox-options li) {
		padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :global(.listbox-options li.active) {
    background-color: var(--hover);
  }
</style>
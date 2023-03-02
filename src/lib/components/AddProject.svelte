<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';
	import Select from './Select.svelte';

  export let isOpen = false;
  
  const colors = [
    { id: 1, name: "Charcoal" },
    { id: 2, name: "Hotpink" },
    { id: 3, name: "Dark Gray" },
    { id: 4, name: "Green" },
    { id: 5, name: "Red" },
  ];

  let selectedColor = colors[0].name;
</script>

<Dialog open={isOpen} on:close={() => (isOpen = false)} class="dialog">
	<DialogOverlay />
  
 <div class="dialog-content">
	<DialogTitle class="dialog-title">Add Project</DialogTitle>

  <div class="dialog-form">
    <div>
      <label for="name">
        Name
      </label>
      <input type="text" name="name" id="name" placeholder="Learn Vim">
    </div>
    <div>
      <label for="color">Color</label>
      <Select options={colors} bind:selectedOption={selectedColor}/>
    </div>
  </div>
 
  <div class="dialog-footer">
    <button class="btn btn-outline take-up-space" on:click={() => isOpen = false}>Cancel</button>
    <button class="btn btn-primary">Add</button>
  </div>
 </div> 
</Dialog>

<style>
  :global(.dialog) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  :global(.dialog-content) {
    max-width: 600px;
    margin: auto;
    box-shadow: var(--shadow); 
    background: var(--bg);
    border-radius: var(--radius-2);
    margin-top: 90px;
  } 

  :global(.dialog-title), :global(.dialog-form) {
    border-bottom: 1px solid var(--border);
  }

  :global(.dialog-title) {
    font-size: 1.3rem;
    padding: 8px 16px; 
  }

  :global(.dialog-form) {
    display: flex;
    flex-direction: column;
    gap: 16px; 
    padding: 24px 16px;
  }

  :global(.dialog-form label) {
    display: block;
    padding-bottom: 6px;
  }

  :global(.dialog-form input) {
    width: 100%;
  }

  :global(.dialog-footer) {
    padding: 16px; 
    display: flex;
    gap: 16px;
    align-items: center;
  }

  :global(.dialog-footer .take-up-space) {
    margin-left: auto;
  } 
</style>

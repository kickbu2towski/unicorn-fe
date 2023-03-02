<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
	} from '@rgossiaux/svelte-headlessui';
	import DatePicker from './DatePicker.svelte';
	import Select from './Select.svelte';

  export let isOpen = false

  const options = [
    { id: 1, name: "TODO" },
    { id: 2, name: "NEXT" },
    { id: 3, name: "WAITING" },
    { id: 4, name: "DONE" },
    { id: 5, name: "CANCELLED" },
  ]

  const projects = [
    { id: 1, name: "Inbox" },
    { id: 2, name: "Marvel Cinematic Universe" },
    { id: 3, name: "Letterboxd" },
  ]

  let selectedProject = projects[0].name
  let selectedOption = options[0].name
</script>

<Dialog open={isOpen} on:close={() => (isOpen = false)} class="dialog">
	<DialogOverlay />
  
 <div class="dialog-content">
	<DialogTitle style="display: none;">Add Todo</DialogTitle>
  <div class="dialog-form">
    <div>
      <label for="name">Name</label>
      <input type="text" name="name" id="name" placeholder="Buy Milk">
    </div>

    <Select {options} bind:selectedOption />

    <div class="todo-timestamps">
      <DatePicker />
      <button class="btn btn-outline">Due Date</button>
    </div>
  </div>

  <div class="dialog-footer">
    <Select options={projects} bind:selectedOption={selectedProject} />
    <button class="btn btn-outline take-up-space" on:click={() => isOpen = false}>Cancel</button>
    <button class="btn btn-primary">Add</button>
  </div>
 </div> 
</Dialog>

<style>
  .todo-timestamps {
   display: flex; 
   gap: 8px;
  }
</style>
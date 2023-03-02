<script lang="ts">
	import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
	import ChevronRight from '../icons/ChevronRight.svelte';
	import Plus from '../icons/Plus.svelte';
	import AddProject from './AddProject.svelte';

	export let projects: {
		id: number;
		name: string;
    color: string; 
	}[];

	let isOpen = false
</script>

<Disclosure let:open class="projects">
	<DisclosureButton class="disclosure-btn">
		<span>Projects</span>
    <div class="disclosure-btn-icons">
      <button on:click|stopPropagation={() => isOpen = true}><Plus /></button>
      <span style={open ? 'transform: rotate(90deg);' : ''}><ChevronRight /></span>
    </div> 
	</DisclosureButton>
	<DisclosurePanel class="panel">
		{#each projects as project}
			<a href="/projects/{project.id}" class="link">
				<span class="circle" style="background-color: {project.color}" />
        <span>{project.name}</span>
			</a>
		{/each}
	</DisclosurePanel>
</Disclosure>

<AddProject bind:isOpen/>

<style>
	:global(.projects) {
		margin-top: 32px;
	}

	:global(.disclosure-btn) {
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	
	:global(.disclosure-btn-icons) {
    display: flex;
	  align-items: center;	
		gap: 8px;
  } 

	:global(.projects .panel) {
		margin-top: 8px;
		display: flex;
		flex-direction: column;
	}

	:global(.projects .panel a) {
		padding: 8px 10px;
		border-radius: var(--radius);
		display: flex;
		align-items: baseline;
		gap: 10px;
	}
</style>

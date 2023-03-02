<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '../styles/reset.css';
	import '../styles/global.css';
	const projects = [
		{ id: 1, name: 'Letterboxd', color: '#64748b' },
		{ id: 2, name: 'The Family Man', color: '#475569' },
		{ id: 3, name: 'Designing Data Intensive Applications', color: '#334155' }
	];
</script>

<div class="root">
	<Sidebar {projects} />
	<div class="main-content">
		<slot />
	</div>
</div>

<style>
	.root {
		display: grid;
		grid-template-columns: minmax(280px, 25%) 1fr;
		height: 100%;
	}
	.main-content {
		display: grid;
		place-content: center;
	}
</style>

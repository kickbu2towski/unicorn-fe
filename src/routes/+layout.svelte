<script lang="ts">
	import Sidebar from "../lib/components/Sidebar.svelte";
</script>

<div class="root">
  <Sidebar />
  <div class="main">
    <slot></slot>
  </div>
</div>

<style>
  .root {
    display: grid;
    grid-template-columns: minmax(200px, 25%) 1fr;
    height: 100vh;
  }

  .main {
    display: grid;
    place-content: center;
  }
</style>
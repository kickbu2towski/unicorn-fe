<script>
	import Flash from '$lib/icons/Flash.svelte';
	export let title = '';
	export let subTitle = '';
</script>

<button class="calc-date">
	<span>
		<span><Flash /></span>
		<span>{title}</span>
	</span>
	<span class="dim">{subTitle}</span>
</button>

<style>
	.calc-date {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 8px 16px;
    border-radius: 0;
	}

	.calc-date:hover {
   background-color: var(--hover); 
	}

	.calc-date span:first-child {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.calc-date span:first-child span {
    font-weight: 500;
  }
</style>

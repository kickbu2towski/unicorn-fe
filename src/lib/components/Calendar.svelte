<script lang="ts">
  import dayjs from 'dayjs'
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	import Flash from '$lib/icons/Flash.svelte';
	import { getDaysForTheMonth } from '$lib/utils';
	import { DATE_FORMAT, DAYS_OF_WEEK } from '$lib/constants';

  let monthOffset = 0;
  $: monthYear = dayjs().add(monthOffset, 'M').format('MMM YYYY')
  let days: any = []

  $: {
    days = getDaysForTheMonth(monthOffset)
    // offset the array by adding empty values 
    // this is needed to align the days with the weekday
    // the UI
    if(days[0].weekday !== 'Mon') {
      const idx =  DAYS_OF_WEEK.findIndex(day => day === days[0].weekday)
      const offsets = [...Array(idx).keys()].map(item => ({ weekday: "", day: - 1}))
      days = [...offsets, ...days]
    }
  }

  const today = dayjs().format(DATE_FORMAT)
</script>

<div class="calendar">
	<div class="calendar-content">
		<div class="header">
			<p>{monthYear}</p>
			<div class="dim icons">
        <button style="transform: rotate(-180deg)"on:click={() => monthOffset = monthOffset - 1}>
          <ChevronRight />
        </button>
        <button on:click={() => monthOffset = 0}>
				<Flash />
        </button>
        <button on:click={() => monthOffset = monthOffset + 1}>
          <ChevronRight />
        </button> 
			</div>
		</div>
    <div class="numbers">
      {#each DAYS_OF_WEEK as day}
        <span class="dim">{day.slice(0, 2)}</span> 
      {/each}
      {#each days as { day, weekday, date }, i}
        {#if day > 0}
          <button class="{today === date ? 'today' : ''}">
            {day}
          </button>
        {:else}
          <span></span>
        {/if}
      {/each}
    </div>
	</div>
</div>

<style>
	.calendar {
		border-bottom: 1px solid var(--border);
	}

	.calendar-content {
		padding: 16px;
	}

  .header {
   display: flex; 
   align-items: center;
   justify-content: space-between; 
   margin-bottom: 16px;
  }

  .header p {
   font-weight: 500; 
  } 

  .icons {
   display: flex; 
   align-items: center;
  }

  .numbers {
    display: grid;
    grid-template-columns: repeat(7, 1fr); 
    gap: 12px;
    place-items: center;
    border-radius: 50%; 
  }

  .numbers button:hover {
    background-color: var(--hover);
  }

  .numbers button.today {
    width: 30px; 
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-2); 
    display: flex;
    justify-content: center;
    align-items: center; 
  }
</style>

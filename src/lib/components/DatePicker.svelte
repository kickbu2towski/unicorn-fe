<script lang="ts">
  import dayjs from 'dayjs'
	import Plus from '$lib/icons/Plus.svelte';
	import { Popover, PopoverButton, PopoverPanel } from '@rgossiaux/svelte-headlessui';
	import { createPopperActions } from 'svelte-popperjs';
	import Calendar from './Calendar.svelte';
	import Date from './Date.svelte';
	import { getNextMonday } from '$lib/utils';
	const [popperRef, popperContent] = createPopperActions();
	const popperOptions = {
		placement: 'bottom-end',
		strategy: 'fixed',
	};
  const date = dayjs()

  console.log(getNextMonday())

  const formats = {
    weekday: date.format('ddd'),
    tomorrow: date.add(1, 'd').format('ddd'),
    nextWeek: getNextMonday().format('ddd D MMM'),
  }

</script>

<Popover>
	<PopoverButton use={[popperRef]} class="btn btn-outline">Schedule</PopoverButton>
	<PopoverPanel use={[[popperContent, popperOptions]]} class="popover-panel">
		<div class="calc-dates">
			<Date title="Today" subTitle={formats.weekday} />
			<Date title="Tomorrow" subTitle={formats.tomorrow} />
			<Date title="This Weekend" subTitle="Sat" />
			<Date title="Next Week" subTitle={formats.nextWeek} />
			<Date title="No Date" subTitle="" />
		</div>

    <Calendar />

		<div class="set-time">
			<label for="time">
				<span><Plus /></span>
				<span>Set Time</span>
			</label>
      <input type="text" placeholder="eg: 14:00 -- 16:00" />
		</div>
	</PopoverPanel>
</Popover>

<style>
	:global(.popover-panel) {
		background: var(--bg);
		box-shadow: var(--shadow);
		border-radius: var(--radius);
    width: 360px;
	}

	.calc-dates {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid var(--border);
		padding: 16px 0 16px 0;
	}

	.set-time {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px;
	}

	.set-time label {
		flex-basis: 180px;
		display: flex;
		align-items: center;
		gap: 4px;
	}
</style>

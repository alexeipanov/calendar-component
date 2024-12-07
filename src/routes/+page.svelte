<script>
  import dayjs from 'dayjs';
  import '/src/styles/app.css';
  import Calendar from '/src/components/Calendar.svelte';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';

  let date = dayjs();


  const onSelect = (newDate) => {
    date = newDate;
  }
</script>

<h1 class="text-center">Calendar demo component</h1>
<div class="flex justify-center">
	<div class="w-72">
		<Calendar
		  {date}
		  {onSelect}
		  --bg-color=var(--tg-theme-bg-color)
		  --accent-text-color=var(--tg-theme-accent-text-color)
		  --secondary-bg-color=var(--tg-theme-secondary-bg-color)
		/>
	</div>
</div>
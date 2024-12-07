<script>
  import Calendar from '$lib/calendar';
  import { Week, Years } from '$lib/defaults';
  import Dropdown from '/src/components/Dropdown.svelte';
  import dateFormat from '$lib/date-format';
  import ChevronLeft from '/src/components/icons/ChevronLeft.svelte';
  import ChevronRight from '/src/components/icons/ChevronRight.svelte';

  const DATE_FORMAT = 'DD-MM-YYYY';

  export let date;
  export let events = [];
  export let onSelect = () => {};

  let years = new Years(date, 12);

  let week = new Week();
  let calendar = new Calendar(date, events);
  let currentEvents = calendar.eventsMap.get(date.format(DATE_FORMAT))?.events;

  const nextMonth = () => {
    calendar.nextMonth();
    calendar = calendar;
  }

  const previousMonth = () => {
    calendar.previousMonth();
    calendar = calendar;
  }

  const setYear = (year) => {
    calendar.setYear(year);
    calendar = calendar;
  }

  const selectDate = (date, events) => {
    onSelect(date, events);
    currentEvents = events;
    calendar = calendar;
  }
</script>

<div class="flex justify-between items-center my-4">
  <div class="years-control">
    <Dropdown label={dateFormat(calendar.month, "MMMM YYYY")}
      --accent-text-color=var(--tg-theme-accent-text-color)
      --subtitle-text-color=var(--tg-theme-subtitle-text-color)
    >
      <div class="year-options">
        {#each years.years as year}
          <button
            class="year-option"
            class:active={date.year() === year.year()}
            on:click={() => setYear(year)}
          >
            {dateFormat(year, "YYYY")}sdf
          </button>
        {/each}
      </div>
    </Dropdown>
  </div>
  <div class="month-control flex gap-1">
    <button on:click={previousMonth}><ChevronLeft /></button>
    <button on:click={nextMonth}><ChevronRight /></button>
  </div>
</div>
<div class="calendar-month">
  {#each week.days as day}
    <div class="month-day header">
      {dateFormat(day.date, "dd")}
    </div>
  {/each}
  {#each calendar.eventsMap as [, day]}
    <div class="month-day">
      <button
        class="day-date"
        class:text-slate-500={!day.isCurrentMonth}
        class:active={date.isSame(day.date, "day")}
        on:click={selectDate(day.date, day.events)}
      >
        {dateFormat(day.date, "D")}
        {#if day.hasEvents}
          <div class="dot"></div>
        {/if}
      </button>
    </div>
  {/each}
</div>
<slot {currentEvents} />

<style>
  .calendar-month {
    @apply grid grid-cols-7 items-center justify-items-center;
  }

  .month-day {
    @apply h-10 font-light flex items-center;
  }

  .month-day.header {
    @apply font-normal select-none;
  }

  .month-day .day-date {
    @apply w-8 h-8 p-2 flex items-center justify-center relative rounded-full cursor-pointer select-none;
  }

  .month-day .day-date:hover {
    @apply bg-[var(--tg-theme-secondary-bg-color)];
  }

  .month-day .day-date.active {
    color: var(--bg-color);
    background-color: var(--accent-text-color);
    @apply cursor-auto;
  }

  .month-day .dot {
    @apply absolute bottom-0 right-0 rounded-full w-1 h-1;
    background-color: var(--accent-text-color);
  }

  .year-options {
    @apply grid grid-cols-3 gap-2 items-center justify-items-center;
  }

  .year-option {
    @apply h-8 px-3 py-1 flex items-center rounded-full cursor-pointer select-none;

  }

  .year-option:hover {
    @apply bg-[var(--secondary-bg-color)];
  }

  .year-option.active {
    color: var(--bg-color);
    background-color: var(--accent-text-color);
    @apply cursor-auto;
  }

  .month-control button {
    @apply w-8 h-8 m-0 p-1 flex justify-center items-center rounded-full;
    color: var(--accent-text-color);
  }

  .month-control button:hover {
    @apply bg-[var(--secondary-bg-color)];
  }
</style>

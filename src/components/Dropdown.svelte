<script>
  import { onMount } from 'svelte';
  import ChevronUp from '/src/components/icons/ChevronUp.svelte';
  import ChevronDown from '/src/components/icons/ChevronDown.svelte';

  let bottom, left;
  let isOpen = false;
  let button, popover;

  export let label;

  const toggle = () => {
    if (isOpen) {
      popover.hidePopover();
    } else {
      popover.showPopover();
    }

    isOpen = isOpen ^ true;
  }

  const onToggle = (event) => {
    if (event.newState === 'closed') {
      isOpen = false;
    }
  }

  onMount(() => {
    const rect = button.getBoundingClientRect();
    bottom = rect.bottom + 1;
    left = rect.left;
  });
</script>

<button disabled class="cursor-hand pl-2 hover:bg-[var(--tg-theme-secondary-bg-color)] rounded-full" on:click={toggle} bind:this={button}>
  <div class="flex items-center"><span>{label}</span><div class="icon">{#if isOpen}<ChevronUp />{:else}<ChevronDown />{/if}</div></div>
</button>

<div popover on:toggle={onToggle} bind:this={popover} style:top={bottom + 'px'} style:left={left + 'px'}>
  <slot />
</div>

<style>
  .icon {
    @apply w-8 h-8 m-0 p-1 flex justify-center items-center;
    color: var(--accent-text-color);
  }

  [popover] {
    @apply absolute opacity-0 m-0 rounded border border-solid border-[var(--subtitle-text-color)];
  }

  [popover]:popover-open {
    @apply opacity-100;
  }
</style>

<script lang="ts">
  import Backdrop from './Backdrop.svelte'

  import type { Snippet } from 'svelte'

  let {
    backgroundColor = 'transparent',
    children,
  }: { backgroundColor?: string; children: Snippet } = $props()
</script>

<section class="wrapper">
  <Backdrop {backgroundColor} />
  <div class="backdrop" style="background-color: {backgroundColor};" />
  {@render children()}
</section>

<style>
  .wrapper {
    position: relative;
    display: block;
    padding: var(--content-vertical-padding) var(--calculated-content-padding);
  }

  .backdrop {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    transform: skew(0deg, var(--backdrop-skew-rotation));
    z-index: -1;
  }
</style>

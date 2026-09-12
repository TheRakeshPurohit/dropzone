<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    title,
    children,
    icon,
    actions,
  }: {
    title: string
    children: Snippet
    icon?: Snippet
    actions?: Snippet
  } = $props()
</script>

<section class="main-feature">
  <div class="main-feature__icon-header">
    {@render icon?.()}
  </div>
  <h3>{title}</h3>
  {@render children()}
  <div class="main-feature__actions">
    {@render actions?.()}
  </div>
</section>

<style>
  .main-feature {
    flex: 1;
    min-width: 12em;
    max-width: 26em;
    margin-bottom: 1.5rem;
  }
  .main-feature__actions {
    text-align: right;
  }
  .main-feature__icon-header {
    margin-bottom: 1rem;
  }
</style>

<script lang="ts">
  import type { Snippet } from 'svelte'

  let { title, children }: { title: string; children: Snippet } = $props()
</script>

<div class="feature">
  <h3>{title}</h3>

  {@render children()}
</div>

<style>
  h3 {
    margin-bottom: 0.5rem;
  }
</style>

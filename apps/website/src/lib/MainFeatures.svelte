<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<div class="main-features">{@render children()}</div>

<style>
  .main-features {
    display: flex;
    column-gap: 3rem;
    flex-wrap: wrap;
  }
</style>

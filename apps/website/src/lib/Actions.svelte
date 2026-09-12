<script lang="ts">
  import type { Snippet } from 'svelte'

  let { children }: { children: Snippet } = $props()
</script>

<div class="actions">{@render children()}</div>

<style>
  .actions {
    margin: 1.5rem -0.2rem 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .actions :global(a) {
    margin: 0 0.2rem 0.5rem;
    font-weight: bold;
  }

  @media (min-width: 600px) {
    .actions {
      justify-content: flex-start;
    }
  }
</style>

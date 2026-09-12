<script lang="ts">
  import ChevronRight from "~icons/ion/chevron-forward";
  import type { Snippet } from "svelte";

  let {
    href,
    variant = "outlined",
    color = "primary",
    children,
  }: {
    href: string;
    variant?: "outlined" | "contained" | "text";
    color?: "primary" | "secondary" | "white";
    children: Snippet;
  } = $props();
</script>

<a
  {href}
  target={href.startsWith("http") ? "_blank" : null}
  rel={href.startsWith("http") ? "nofollow" : null}
  style="--color: var(--{color}-color); --bg-color: var(--{color}-bg-color);"
  class:outlined={variant === "outlined"}
  class:contained={variant === "contained"}
  class:text={variant === "text"}>{@render children()} <span class="icon"><ChevronRight /></span></a
>

<style>
  a {
    display: inline-flex;
    align-items: center;
    width: auto;
    height: 2.25rem;
    line-height: calc(2.25rem - 6px);
    border-radius: 3rem;
    padding: 0 1.1em 0 1.5em;
    font-weight: 700;
    font-family: var(--font-header);
    font-size: var(--button-font-size);
    white-space: nowrap;
  }

  .icon {
    margin-left: 0.2em;
    margin-right: -0.2em;
  }
  .icon :global(svg) {
    display: block;
  }
  .icon :global(svg path) {
    stroke-width: 5em;
  }

  .outlined {
    color: var(--color);
    border: 3px solid var(--color);
  }
  .text {
    color: var(--color);
  }

  .outlined:hover,
  .text:hover {
    background: var(--bg-color);
  }

  .contained {
    color: white;
    background: var(--button-contained-background);
    backdrop-filter: blur(10px);
  }
  .contained:hover {
    background: var(--button-contained-background-hover);
    text-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  }
</style>

<script lang="ts">
  import WhiteLogoSvg from "#lib/WhiteLogoSvg.svelte";

  import LogoGithub from "~icons/ion/logo-github";
  import GlobeIcon from "~icons/ion/globe-outline";

  let { mobile = false }: { mobile?: boolean } = $props();
</script>

<nav class:mobile class:desktop={!mobile}>
  <a class="link" href="/"><WhiteLogoSvg /></a>

  <div class="menu__actions">
    <a
      class="link link--pill link--icon"
      href="https://github.com/dropzone/dropzone"
      target="_blank"
      rel="nofollow"
    >
      <span class="link__icon"><LogoGithub /></span>
    </a>
    <a
      class="link link--pill link--icon"
      href="https://www.matsimon.dev"
      target="_blank"
      rel="nofollow"
    >
      <span class="link__icon"><GlobeIcon /></span>
    </a>
  </div>
</nav>

<style>
  :global(:root) {
    --menu-color: white;
    --menu-hover-bg-color: rgba(255, 255, 255, 0.1);
  }
  nav {
    color: var(--menu-color);
    --border-width: 3px;
    --icon-size: 1.5rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav.desktop {
    margin: 0 -1rem;
    height: var(--menu-item-height);
  }
  nav.desktop > * {
    margin: 0 1rem;
  }
  nav.mobile {
    flex-direction: column;
  }
  nav.mobile > * {
    margin: 2rem 0;
  }

  a {
    color: inherit;
  }

  /* All links in the menu */
  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--menu-item-height);
    line-height: calc(var(--menu-item-height) - var(--border-width) * 2);
    white-space: nowrap;
  }
  .link--pill {
    border: var(--border-width) solid transparent;
    border-radius: 3rem;
    padding: 0rem 1rem;
  }
  .link--pill:hover {
    background: var(--menu-hover-bg-color);
  }

  .link--icon {
    padding: 0 calc((var(--menu-item-height) - var(--icon-size)) / 2 - var(--border-width));
  }
  .link--icon:not(:last-child) {
    margin-right: 0.5rem;
  }
  .link__icon {
    display: block;
    font-size: 1.375em;
    width: var(--icon-size);
    height: var(--icon-size);
  }

  .menu__actions {
    display: flex;
    margin: 0 -0.5rem;
  }
  .menu__actions > * {
    margin: 0 0.5rem;
  }
</style>

<script lang="ts">
  let {
    backgroundImage = null,
    backgroundImageMobile = null,
    backgroundColor = null,
    additionalHeight = null,
  }: {
    backgroundImage?: string | null
    backgroundImageMobile?: string | null
    backgroundColor?: string | null
    additionalHeight?: string | null
  } = $props()

  const asUrl = (value: string | null) => (value ? `url('${value}')` : 'none')

  const image = $derived(asUrl(backgroundImage))
  const imageMobile = $derived(asUrl(backgroundImageMobile))
</script>

<div
  class="backdrop"
  class:additional-height={additionalHeight != null}
  style="--additional-height:{additionalHeight}; --bg-image:{image}; --bg-image-mobile:{imageMobile}; --bg-color:{backgroundColor};"
></div>

<style>
  :global(:root) {
    --additional-height: 0px;
  }

  .backdrop {
    --bg-image: none;
    --bg-image-mobile: none;
    --bg-color: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    transform: skew(0deg, var(--backdrop-skew-rotation));
    z-index: -1;
    background-size: cover;
    background-position: var(--backdrop-position);
    background-color: var(--bg-color);
    background-image: var(--bg-image);
  }
  @media (max-width: 900px) {
    .backdrop {
      background-image: var(--bg-image-mobile);
    }
  }
  .backdrop.additional-height {
    --height: calc(100% + var(--additional-height));
    height: calc(var(--height) + 50vw * var(--backdrop-skew-tan));
  }
</style>

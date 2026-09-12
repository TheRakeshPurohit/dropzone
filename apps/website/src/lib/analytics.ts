declare global {
  interface Window {
    goatcounter?: {
      count: (vars: { path?: string; title?: string; event?: boolean }) => void;
    };
  }
}

/**
 * Records a one-off event. GoatCounter's script is loaded asynchronously and
 * queues nothing, so an event fired before it arrives is simply dropped --
 * acceptable for the occasional click this tracks.
 *
 * You shouldn't call this directly; use the `trackClick` and `trackViewed`
 * actions in ./actions/track.
 */
export const trackEvent = (eventName: string): void => {
  window.goatcounter?.count({ path: eventName, event: true });
};

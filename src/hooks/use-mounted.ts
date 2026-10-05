import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false during SSR and hydration, true once running in the browser. Use it
// to guard browser-only APIs such as WebGL.
export function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

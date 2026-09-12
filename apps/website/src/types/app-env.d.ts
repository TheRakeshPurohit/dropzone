// SvelteKit 3.0.0-next.27 aliases $app to its runtime in Vite but ships no
// declarations for $app/env, so TypeScript sees an untyped .js file. Delete
// this once the prerelease provides its own types.
export const browser: boolean;
export const building: boolean;
export const dev: boolean;
export const version: string;

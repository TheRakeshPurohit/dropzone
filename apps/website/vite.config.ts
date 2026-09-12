import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import postcssFunctions from "postcss-functions";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import linearClamp from "./postcss-linear-clamp.ts";

export default defineConfig({
  plugins: [
    // SvelteKit 3 takes what used to live in svelte.config.js, flattened: the
    // `kit` namespace is gone and the options sit alongside the Svelte ones.
    sveltekit({
      // Styles go through Vite's own PostCSS pipeline, configured below.
      preprocess: vitePreprocess(),
      prerender: {
        handleHttpError: ({ path, referrer, message }) => {
          // /docs is the Docusaurus build, copied in beside this one by
          // scripts/build-site.sh, so SvelteKit cannot resolve it here. Every
          // other broken link still fails the build.
          if (path === "/docs" || path.startsWith("/docs/")) return;

          throw new Error(`${message} (${path} linked from ${referrer})`);
        },
      },
      adapter: adapter({
        pages: "build",
        assets: "build",
        // No SPA fallback: every route is prerendered, and a fallback would
        // shadow /docs, which is copied in beside this build.
        fallback: undefined,
        strict: true,
      }),
    }),
    Icons({ compiler: "svelte" }),
  ],

  css: {
    postcss: {
      plugins: [postcssFunctions({ functions: { linearClamp } })],
    },
  },

  build: { target: "es2020" },
});

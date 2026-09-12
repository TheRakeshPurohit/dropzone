# The Dropzone website

Accessible here: https://www.dropzone.dev

This website is built with [Svelte](https://svelte.dev) 5 and
[SvelteKit](https://kit.svelte.dev) 3.

## On the SvelteKit version

SvelteKit 3 has not been released yet. `@sveltejs/kit` and
`@sveltejs/adapter-static` are pinned to **exact** prerelease versions rather
than caret ranges, deliberately: `^3.0.0-next.27` would also match every later
prerelease and 3.0.0 itself, so bumps would happen silently. Moving forward
should be an edit to `package.json`.

This is not pedantry. The previous version of this site asked for
`"@sveltejs/kit": "next"`, and by the time anyone looked at it again that tag
meant something four majors newer, leaving the site stuck on a 2021 prerelease
that no longer built on any supported version of Node.

Two things here work around gaps in the prerelease and should be deleted when it
catches up: `src/types/app-env.d.ts`, because `$app/env` ships no declarations,
and the `paths` entries in `tsconfig.json`, because TypeScript does not resolve
`#lib` from the package.json `imports` field the way Vite does.

## Developing

```bash
pnpm dev:website          # from the repository root
pnpm --filter @dropzone/website run dev -- --open
```

## Building

To build this project, the [static adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-static)
is used.

Run this command to build:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether
> you installed an adapter. This should _not_ be used to serve your app in
> production.

## Testing

Tests are written with [Playwright](https://playwright.dev).

```bash
pnpm --filter @dropzone/website run test
```

## Deployment

Whenever something is merged into `main` and the tests pass, the site will be
deployed.

// postcss-functions ships no types, and is only used from vite.config.ts.
declare module 'postcss-functions' {
  import type { PluginCreator } from 'postcss'

  const plugin: PluginCreator<{
    functions: Record<string, (...args: string[]) => string>
  }>
  export default plugin
}

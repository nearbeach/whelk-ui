import {defineConfig} from 'vite'
import {resolve} from 'path'

// Serves the built docs site. Kept separate from the library's vite.config.ts,
// which is configured for library builds.
export default defineConfig({
	build: {outDir: resolve(import.meta.dirname, '../docs/.vuepress/dist')},
	preview: {host: '127.0.0.1'},
})

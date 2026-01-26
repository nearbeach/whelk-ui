import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import dts from 'vite-plugin-dts'
import type { OutputOptions } from 'rollup'

export default defineConfig({
	plugins: [
		vue(),
		dts({
			insertTypesEntry: true,
			include: ['src/**/*.ts', 'src/**/*.vue'],
			outDir: 'dist',
			staticImport: true,
			rollupTypes: true
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'WhelkUI',
			fileName: (format) => `whelk-ui.${format === 'es' ? 'js' : 'umd.cjs'}`,
			formats: ['es', 'umd']
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				exports: 'named',
				globals: {
					vue: 'Vue'
				},
				assetFileNames: (assetInfo) => {
					if (assetInfo.names.includes('style.css')) return 'style.css'
					return assetInfo.names[0];
				}
			} as OutputOptions
		}
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		}
	}
})
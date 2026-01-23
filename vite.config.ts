import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssNesting from 'postcss-nesting'
import {resolve} from 'path'


// https://vite.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: {
				'Button': resolve(__dirname, 'src/components/button/ButtonComponent.vue'),
			},
			name: 'whelk-ui',
			formats: ['es', 'cjs']
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
				preserveModules: true,
				preserveModulesRoot: 'src'
			},
		},
	},
	css: {
		postcss: {
			plugins: [
				postcssNesting,
			]
		}
	},
	plugins: [
		vue(),
	],
})

import {defineConfig} from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

export default defineConfig({
	plugins: [vue()],
	test: {
		globals: true,
		exclude: ['node_modules/', 'dist/', 'e2e/**'],
		environment: 'jsdom',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			// Count every source file, not just the ones a test happens to import
			include: ['src/**/*.{ts,vue}'],
			thresholds: {
				statements: 90,
				branches: 85,
				functions: 90,
				lines: 90,
			},
			exclude: [
				'src/**/*.test.ts',
				'src/**/*.spec.ts',
				'src/local/**',
				'node_modules/',
				'dev/',
				'docs/',
				'tests/**/*',
				'e2e/',
				'**/*.config.ts',
				'**/*.d.ts'
			]
		}
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		}
	}
})
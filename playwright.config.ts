import {defineConfig, devices} from '@playwright/test'

const PORT = 8089

// Tests run against the built docs site, so they cover what users actually get
// (SSR output and hydration), not just the dev server.
export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [['list'], ['html', {open: 'never'}]] : 'list',
	use: {
		baseURL: `http://localhost:${PORT}`,
		trace: 'on-first-retry',
	},
	projects: [{name: 'chromium', use: {...devices['Desktop Chrome']}}],
	webServer: {
		command: `npm run docs:build && npx vite preview --config e2e/preview.config.ts --port ${PORT} --strictPort`,
		url: `http://localhost:${PORT}`,
		reuseExistingServer: !process.env.CI,
		timeout: 180_000,
	},
})

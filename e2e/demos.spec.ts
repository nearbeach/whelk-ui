import {expect, test} from '@playwright/test'
import {readdirSync} from 'fs'
import {resolve} from 'path'

// Every markdown file in child_pages is a component page, so new pages are covered automatically.
const pagesDir = resolve(import.meta.dirname, '../docs/components/child_pages')
const pages = readdirSync(pagesDir)
	.filter((file) => file.endsWith('.md'))
	.map((file) => file.replace(/\.md$/, ''))

for (const page of pages) {
	test(`${page}: demos render without errors`, async ({page: browserPage}) => {
		const errors: string[] = []
		browserPage.on('pageerror', (error) => errors.push(error.message))
		browserPage.on('console', (message) => {
			if (message.type() === 'error') errors.push(message.text())
		})

		await browserPage.goto(`/components/child_pages/${page}.html`)

		const demos = browserPage.locator('.demo')
		await expect(demos.first()).toBeVisible()

		// Every demo must have mounted its example (the examples load client-side)
		for (const demo of await demos.all()) {
			await expect(demo.locator('.demo-preview > *').first()).toBeAttached()
		}
		await expect(browserPage.locator('.demo-error')).toHaveCount(0)

		expect(errors).toEqual([])
	})
}

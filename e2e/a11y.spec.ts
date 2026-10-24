import AxeBuilder from '@axe-core/playwright'
import {expect, test} from '@playwright/test'
import {mkdirSync, readdirSync, readFileSync, writeFileSync} from 'fs'
import {resolve} from 'path'

// Automated WCAG 2.2 AA scan of every component demo. Only the rendered examples
// (.demo-preview) are scanned, so the VuePress theme around them is not our concern.
//
// Known problems live in a11y-baseline.json as { "<page>": ["<axe rule id>", ...] } (error-state scans use "<page> (validation errors)").
// A violation outside the baseline fails the test, and so does a baseline entry that no
// longer occurs, so the baseline can only shrink. Run with A11Y_REPORT=1 to write the
// full details of every violation to test-results/a11y-report/<page>.json.

const pagesDir = resolve(import.meta.dirname, '../docs/components/child_pages')
const pages = readdirSync(pagesDir)
	.filter((file) => file.endsWith('.md'))
	.map((file) => file.replace(/\.md$/, ''))

const baseline: Record<string, string[]> = JSON.parse(
	readFileSync(resolve(import.meta.dirname, 'a11y-baseline.json'), 'utf-8'),
)

// Tests run in parallel workers, so each page writes its own report file
function writeReport(page: string, violations: unknown) {
	if (!process.env.A11Y_REPORT) return
	const dir = resolve(import.meta.dirname, '../test-results/a11y-report')
	mkdirSync(dir, {recursive: true})
	writeFileSync(resolve(dir, `${page}.json`), JSON.stringify(violations, null, 2))
}

type Scan = 'default' | 'validation errors'

for (const page of pages) {
	for (const scan of ['default', 'validation errors'] as Scan[]) {
		const key = scan === 'default' ? page : `${page} (validation errors)`

		test(`${page}: no accessibility violations (${scan})`, async ({page: browserPage}) => {
			await browserPage.goto(`/components/child_pages/${page}.html`)
			await expect(browserPage.locator('.demo').first()).toBeVisible()
			// Examples load client-side, so wait for each to mount before scanning
			for (const demo of await browserPage.locator('.demo').all()) {
				await expect(demo.locator('.demo-preview > *').first()).toBeAttached()
			}

			if (scan === 'validation errors') {
				// Fire the events every input validates on, so error messages are on screen when scanned.
				// Dispatched directly because focusing a date input opens its picker.
				await browserPage.evaluate(() => {
					for (const el of document.querySelectorAll('.demo-preview input, .demo-preview textarea, .demo-preview select')) {
						for (const type of ['keyup', 'change', 'blur', 'focusout']) el.dispatchEvent(new Event(type, {bubbles: true}))
					}
				})
			}

			const results = await new AxeBuilder({page: browserPage})
				.include('.demo-preview')
				.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
				.analyze()

			writeReport(key, results.violations.map((v) => ({
				rule: v.id,
				impact: v.impact,
				help: v.help,
				nodes: v.nodes.map((n) => ({target: n.target, html: n.html, summary: n.failureSummary})),
			})))

			const found = [...new Set(results.violations.map((v) => v.id))].sort()
			const known = [...(baseline[key] ?? [])].sort()
			const unexpected = found.filter((id) => !known.includes(id))
			const fixed = known.filter((id) => !found.includes(id))

			expect(unexpected, 'new violations - fix them or (temporarily) add them to a11y-baseline.json').toEqual([])
			expect(fixed, 'fixed violations - remove them from a11y-baseline.json').toEqual([])
		})
	}
}

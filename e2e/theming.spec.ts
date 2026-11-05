import {expect, test, type Page} from '@playwright/test'

// jsdom cannot resolve CSS variable fallbacks, so the theming contract is checked in a real browser.
// Overrides are injected as a stylesheet, the same way a consuming app would write them.

const demo = (page: Page, name: string) => page.locator(`[data-demo="${name}"]`)
const css = (page: Page, content: string) => page.addStyleTag({content})

const computed = (page: Page, selector: string, props: string[]) =>
	page.locator(selector).first().evaluate((el, names) => {
		const style = getComputedStyle(el)
		return Object.fromEntries(names.map((n) => [n, (style as any)[n]]))
	}, props)

const corners = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius']

test.describe('theming variables', () => {
	test.beforeEach(async ({page}) => {
		await page.goto('/components/child_pages/wlk-button.html')
		await expect(page.locator('.wlk-button').first()).toBeVisible()
	})

	test('defaults: every corner uses the base radius', async ({page}) => {
		const r = await computed(page, '.wlk-button', corners)
		expect(new Set(Object.values(r)).size).toBe(1)
	})

	test(':root override gives round corners with a square bottom-left', async ({page}) => {
		await css(page, ':root { --wlk-r: 25%; --wlk-r-bl: 0; }')
		expect(await computed(page, '.wlk-button', corners)).toEqual({
			borderTopLeftRadius: '25%',
			borderTopRightRadius: '25%',
			borderBottomRightRadius: '25%',
			borderBottomLeftRadius: '0px',
		})
	})

	test('a wrapper override only affects its children', async ({page}) => {
		const scoped = demo(page, 'button/Variants')
		await scoped.evaluate((el) => el.style.setProperty('--wlk-r', '9px'))
		const inside = await scoped.locator('.wlk-button').first().evaluate((el) => getComputedStyle(el).borderTopLeftRadius)
		const outside = await demo(page, 'button/States').locator('.wlk-button').first().evaluate((el) => getComputedStyle(el).borderTopLeftRadius)
		expect(inside).toBe('9px')
		expect(outside).not.toBe('9px')
	})

	test('a component token beats the global tokens', async ({page}) => {
		await css(page, ':root { --wlk-r: 20px; --wlk-btn-r-tl: 0; }')
		const r = await computed(page, '.wlk-button', corners)
		expect(r.borderTopLeftRadius).toBe('0px')
		expect(r.borderTopRightRadius).toBe('20px')
	})

	test('a side padding token beats the all-sides token', async ({page}) => {
		await css(page, ':root { --wlk-btn-p: 2px; --wlk-btn-p-l: 30px; }')
		expect(await computed(page, '.wlk-button', ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'])).toEqual({
			paddingTop: '2px',
			paddingRight: '2px',
			paddingBottom: '2px',
			paddingLeft: '30px',
		})
	})

	test('variant background tokens recolour the variant', async ({page}) => {
		await css(page, ':root { --wlk-primary-bg: rgb(255, 105, 180); }')
		const bg = await demo(page, 'button/Variants').locator('.wlk-button.primary').first().evaluate((el) => getComputedStyle(el).backgroundColor)
		expect(bg).toBe('rgb(255, 105, 180)')
	})
})

test.describe('theming variables on a card', () => {
	test.beforeEach(async ({page}) => {
		await page.goto('/components/child_pages/wlk-card.html')
		await expect(page.locator('.wlk-card').first()).toBeVisible()
	})

	test('surface and shadow tokens apply', async ({page}) => {
		await css(page, ':root { --wlk-bg-surface: rgb(255, 0, 0); --wlk-shadow-card: 0 2px 8px rgb(0, 0, 255); }')
		const r = await computed(page, '.wlk-card', ['backgroundColor', 'boxShadow'])
		expect(r.backgroundColor).toBe('rgb(255, 0, 0)')
		expect(r.boxShadow).toContain('rgb(0, 0, 255)')
	})

	test('a component background beats the shared surface', async ({page}) => {
		await css(page, ':root { --wlk-bg-surface: rgb(255, 0, 0); --wlk-card-bg: rgb(0, 128, 0); }')
		expect((await computed(page, '.wlk-card', ['backgroundColor'])).backgroundColor).toBe('rgb(0, 128, 0)')
	})

	test('the dark theme gives the surface a dark colour', async ({page}) => {
		const luminance = async () => {
			const {backgroundColor} = await computed(page, '.wlk-card', ['backgroundColor'])
			const [r, g, b] = backgroundColor.match(/\d+/g)!.map(Number)
			return (r + g + b) / 3
		}
		const light = await luminance()
		await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'))
		const dark = await luminance()
		expect(light).toBeGreaterThan(200)
		expect(dark).toBeLessThan(80)
	})

	test('overriding the surface keeps working in the dark theme', async ({page}) => {
		await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'))
		await css(page, ':root { --wlk-bg-surface: rgb(10, 20, 30); }')
		expect((await computed(page, '.wlk-card', ['backgroundColor'])).backgroundColor).toBe('rgb(10, 20, 30)')
	})
})

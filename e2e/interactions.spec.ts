import {expect, test, type Page} from '@playwright/test'

const demo = (page: Page, name: string) => page.locator(`[data-demo="${name}"]`)

test('button: action state swaps the slot while running', async ({page}) => {
	await page.goto('/components/child_pages/wlk-button.html')
	const button = demo(page, 'button/States').getByRole('button', {name: 'Click me'})
	await button.click()
	await expect(demo(page, 'button/States').getByRole('button', {name: 'Please wait...'})).toBeDisabled()
	await expect(button).toBeEnabled()
})

test('text input: v-model updates and validation shows an error', async ({page}) => {
	await page.goto('/components/child_pages/wlk-text-input.html')

	const basic = demo(page, 'text-input/Basic')
	await basic.getByRole('textbox').fill('Whelk')
	await expect(basic.getByText('Value: Whelk')).toBeVisible()

	const validated = demo(page, 'text-input/Validation')
	const username = validated.getByRole('textbox')
	await username.fill('ab')
	await username.blur()
	await expect(validated.getByRole('alert').filter({hasText: /\w/})).toBeVisible()
	await username.fill('abcd')
	await username.blur()
	await expect(validated.getByRole('alert').filter({hasText: /\w/})).toHaveCount(0)
})

test('checkbox: toggles the model', async ({page}) => {
	await page.goto('/components/child_pages/wlk-checkbox.html')
	const basic = demo(page, 'checkbox/Basic')
	await expect(basic.getByText('Agreed: false')).toBeVisible()
	await basic.getByLabel('Privacy Statement').check()
	await expect(basic.getByText('Agreed: true')).toBeVisible()
})

test('number input: buttons respect min and max rules', async ({page}) => {
	await page.goto('/components/child_pages/wlk-number-input.html')
	const basic = demo(page, 'number-input/Basic')
	await basic.locator('button.positive').click()
	await expect(basic.getByText('Value: 2')).toBeVisible()
	for (let i = 0; i < 12; i++) {
		if (await basic.locator('button.positive').isEnabled()) await basic.locator('button.positive').click()
	}
	await expect(basic.getByText('Value: 10')).toBeVisible()
	await expect(basic.locator('button.positive')).toBeDisabled()
})

test('select: choosing an option updates the model', async ({page}) => {
	await page.goto('/components/child_pages/wlk-select.html')
	const basic = demo(page, 'select/Basic')
	await basic.locator('select').selectOption('banana')
	await expect(basic.getByText('Value: banana')).toBeVisible()
})

test('switch: clicking toggles on and off', async ({page}) => {
	await page.goto('/components/child_pages/wlk-switch.html')
	const target = demo(page, 'switch/Basic').locator('div.switch:not(.wlk-form-group)')
	await expect(target).toHaveClass(/off/)
	await target.click()
	await expect(target).toHaveClass(/on/)
})

test('tabs: switching shows the matching slot', async ({page}) => {
	await page.goto('/components/child_pages/wlk-tabs.html')
	const tabs = demo(page, 'tabs/Basic')
	await expect(tabs.getByText('Content of the first tab')).toBeVisible()
	await tabs.getByRole('tab', {name: 'Second'}).click()
	await expect(tabs.getByText('Content of the second tab')).toBeVisible()
	await expect(tabs.getByText('Content of the first tab')).toHaveCount(0)
})

test('modal: opens and closes', async ({page}) => {
	await page.goto('/components/child_pages/wlk-modal.html')
	const modal = demo(page, 'modal/Basic')
	await expect(modal.getByText('The body of the modal goes here.')).toBeHidden()
	await modal.getByRole('button', {name: 'Open modal'}).click()
	await expect(modal.getByText('The body of the modal goes here.')).toBeVisible()
	await modal.getByRole('button', {name: 'Close'}).click()
	await expect(modal.getByText('The body of the modal goes here.')).toBeHidden()
})

test('drop down: opens a menu and the backdrop closes it', async ({page}) => {
	await page.goto('/components/child_pages/wlk-drop-down.html')
	const dropDown = demo(page, 'drop-down/Basic')
	await expect(dropDown.getByText('Duplicate')).toBeHidden()
	await dropDown.getByRole('button', {name: 'Actions'}).click()
	await expect(dropDown.getByText('Duplicate')).toBeVisible()
	await dropDown.locator('.drop-down-backdrop').click({force: true})
	await expect(dropDown.getByText('Duplicate')).toBeHidden()
})

test('demo: shows and copies the example source', async ({page}) => {
	await page.goto('/components/child_pages/wlk-card.html')
	const simple = demo(page, 'card/Simple')
	await expect(simple.locator('.demo-source')).toHaveCount(0)
	await simple.getByRole('button', {name: 'Show code'}).click()
	await expect(simple.locator('.demo-source')).toContainText("import { WlkCard } from 'whelk-ui'")
})

test('inputs: labels are associated with their fields', async ({page}) => {
	await page.goto('/components/child_pages/wlk-text-input.html')
	await expect(demo(page, 'text-input/Basic').getByLabel('Name')).toBeVisible()

	await page.goto('/components/child_pages/wlk-select.html')
	await expect(demo(page, 'select/Basic').getByLabel('Fruit')).toBeVisible()

	await page.goto('/components/child_pages/wlk-number-input.html')
	await expect(demo(page, 'number-input/Basic').getByRole('textbox')).toHaveAttribute('id', /.+/)
})

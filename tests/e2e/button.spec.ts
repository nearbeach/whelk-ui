import { test, expect } from '@playwright/test'

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display buttons', async ({ page }) => {
    const buttons = page.locator('button')
    await expect(buttons).toHaveCount(4)
  })

  test('should increment counter on click', async ({ page }) => {
    const primaryButton = page.locator('button').first()
    await primaryButton.click()

    const clickInfo = page.locator('.click-info')
    await expect(clickInfo).toContainText('Button clicked 1 times')
  })

  test('should not increment counter when disabled button is clicked', async ({ page }) => {
    const disabledButton = page.locator('button').last()
    await disabledButton.click()

    const clickInfo = page.locator('.click-info')
    await expect(clickInfo).not.toBeVisible()
  })
})
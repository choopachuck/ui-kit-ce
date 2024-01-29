import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { NotificationE2eTest } from '../examples/NotificationE2eTest'

test.describe('status', () => {
  const statuses = ['default', 'success', 'info', 'warning', 'error']

  statuses.forEach((status) => {
    test(status, async ({ mount, page }) => {
      await mount(<NotificationE2eTest />)

      await page.locator('label', { hasText: status }).click()
      await page.locator('button', { hasText: 'Показать сообщение' }).click()

      const comp = await page.waitForSelector('role=alert', {
        state: 'visible',
      })

      expect(await comp.screenshot()).toMatchSnapshot()
    })
  })
})

test.describe('position', () => {
  const positions = [
    'top-right',
    'top-center',
    'top-left',
    'bottom-right',
    'bottom-center',
    'bottom-left',
  ]

  positions.forEach((position) => {
    test(position, async ({ mount, page }) => {
      await mount(<NotificationE2eTest />)

      await page.locator('label', { hasText: position }).click()
      await page.locator('button', { hasText: 'Показать сообщение' }).click()
      await page.waitForSelector('role=alert', { state: 'attached' })

      await page.waitForTimeout(1000) //wait till animation ends, animation disabled works inconsistently

      expect(await page.screenshot({ fullPage: true })).toMatchSnapshot()
    })
  })
})

test('no icon', async ({ mount, page }) => {
  await mount(<NotificationE2eTest />)

  await page.locator('label', { hasText: 'Показывать иконку' }).click()
  await page.locator('button', { hasText: 'Показать сообщение' }).click()
  const comp = await page.waitForSelector('role=alert', { state: 'visible' })

  expect(await comp.screenshot()).toMatchSnapshot()
})

test('no indicator', async ({ mount, page }) => {
  await mount(<NotificationE2eTest />)

  await page.locator('label', { hasText: 'Показывать индикатор' }).click()
  await page.locator('button', { hasText: 'Показать сообщение' }).click()
  const comp = await page.waitForSelector('role=alert', { state: 'visible' })

  expect(await comp.screenshot()).toMatchSnapshot()
})

test('no close button', async ({ mount, page }) => {
  await mount(<NotificationE2eTest />)

  await page.locator('label', { hasText: 'Показывать кнопку закрытия' }).click()
  await page.locator('button', { hasText: 'Показать сообщение' }).click()
  const comp = await page.waitForSelector('role=alert', { state: 'visible' })

  expect(await comp.screenshot()).toMatchSnapshot()
})

test('with description', async ({ mount, page }) => {
  await mount(<NotificationE2eTest />)

  await page.locator('label', { hasText: 'Показывать описание' }).click()
  await page.locator('button', { hasText: 'Показать сообщение' }).click()
  const comp = await page.waitForSelector('role=alert', { state: 'visible' })

  expect(await comp.screenshot()).toMatchSnapshot()
})

test('stacked', async ({ mount, page }) => {
  await mount(<NotificationE2eTest />)

  await page.locator('button', { hasText: 'Показать сообщение' }).click()
  await page.locator('button', { hasText: 'Показать сообщение' }).click()
  await page.locator('button', { hasText: 'Показать сообщение' }).click()

  await page.waitForTimeout(1000) //wait till animation ends

  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot()
})

const { test, chromium } = require('@playwright/test')

const exclude = ['Warning: [@v-uik', 'Warning: React does not recognize']

test('', async ({}) => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('http://127.0.0.1:3000/')

  const errors = []

  page.on('console', (msg) => {
    if (
      msg.type() === 'error' &&
      !exclude.some((str) => msg.text().includes(str))
    ) {
      errors.push(msg.text())
    }
  })

  await page.screenshot()

  if (errors.length) {
    console.log(errors)
    throw new Error('SSR ERROR')
  }

  browser.close()
})

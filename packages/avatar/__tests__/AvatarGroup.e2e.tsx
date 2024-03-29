import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { AvatarGroup } from '../src'
import { E2eAvatarGroupCustomExtra } from '../examples/E2eAvatarGroupCustomExtra'

const avatarColorAlt = '#FFF'

const items = [
  {
    children: 'UN',
  },
  {
    children: 'UN',
  },
  {
    children: 'UN',
  },
]

const itemsWithColorAlt = items.map((item) => ({
  ...item,
  color: avatarColorAlt,
}))

test.describe('AvatarGroup', () => {
  test('size', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'grid', gridRowGap: 16 }}>
        <AvatarGroup size="xs" items={items} />
        <AvatarGroup size="sm" items={items} />
        <AvatarGroup size="md" items={items} />
        <AvatarGroup items={items} />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })
  test('kind', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'grid', gridRowGap: 16 }}>
        <AvatarGroup kind="rounded" items={items} />
        <AvatarGroup kind="square" items={items} />
        <AvatarGroup kind="circle" items={items} />
        <AvatarGroup items={items} />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('with shadow', async ({ mount }) => {
    const component = await mount(
      <AvatarGroup withShadow items={itemsWithColorAlt} />
    )

    await expect(component).toHaveScreenshot()
  })

  test('with border', async ({ mount }) => {
    const component = await mount(
      <AvatarGroup withBorder items={itemsWithColorAlt} />
    )

    await expect(component).toHaveScreenshot()
  })

  test('max', async ({ mount }) => {
    const component = await mount(
      <AvatarGroup max={3} items={[...items, { children: 'UN' }]} />
    )

    await expect(component).toHaveScreenshot()
  })

  test('show extra', async ({ mount }) => {
    const component = await mount(<AvatarGroup showExtra items={items} />)

    await expect(component).toHaveScreenshot()
  })

  test('custom extra', async ({ mount }) => {
    const component = await mount(<E2eAvatarGroupCustomExtra />)

    await expect(component).toHaveScreenshot()
  })

  test('coloring', async ({ mount }) => {
    const component = await mount(
      <AvatarGroup coloring="static" items={items} />
    )

    await expect(component).toHaveScreenshot()
  })
})

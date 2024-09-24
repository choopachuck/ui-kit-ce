import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Tree } from '../src'
import { DATA_ITEM_ID } from '../src/common'
import {
  allExpandedKeys,
  dataSource,
  dataSourcePartialCheckDisabled,
  dataSourcePartialDisabled,
  defaultCheckedKeys,
  defaultExpandedKeys,
} from './data'

test.describe('Tree', () => {
  test('size', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gridRowGap: 16 }}>
        <Tree dataSource={dataSource} size="xs" />
        <Tree dataSource={dataSource} size="sm" />
        <Tree dataSource={dataSource} />
        <Tree dataSource={dataSource} size="md" />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })
  test('hover', async ({ mount, page }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          dataSource={dataSource}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )
    const item = page.locator(`[${DATA_ITEM_ID}="item-1-0-0"]`)

    await item.hover()

    await expect(component).toHaveScreenshot()
  })
  test('hover selected', async ({ mount, page }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          selectable
          dataSource={dataSource}
          defaultSelectedKeys={['item-1-0']}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )
    const item = page.locator(`[${DATA_ITEM_ID}="item-1-0"]`)

    await item.hover()

    await expect(component).toHaveScreenshot()
  })
  test('active', async ({ mount, page }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          disableExpandOnClick
          disableSelectOnClick
          dataSource={dataSource}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )
    const item = page.locator(`[${DATA_ITEM_ID}="item-1-0-0"]`)
    const itemBox = await item.boundingBox()

    await page.mouse.move(
      (itemBox?.x as number) + (itemBox?.width as number) / 2,
      (itemBox?.y as number) + (itemBox?.height as number) / 2
    )
    await page.mouse.down()

    await expect(component).toHaveScreenshot()
  })
  test('active selected', async ({ mount, page }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          disableExpandOnClick
          disableSelectOnClick
          defaultSelectedKeys={['item-1-0-0']}
          dataSource={dataSource}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )
    const item = page.locator(`[${DATA_ITEM_ID}="item-1-0-0"]`)
    const itemBox = await item.boundingBox()

    await page.mouse.move(
      (itemBox?.x as number) + (itemBox?.width as number) / 2,
      (itemBox?.y as number) + (itemBox?.height as number) / 2
    )
    await page.mouse.down()

    await expect(component).toHaveScreenshot()
  })
  test('disabled', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          disabled
          dataSource={dataSource}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('focus', async ({ page, mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          dataSource={dataSource}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )
    const tree = page.locator('[role="tree"]')

    await tree.focus()

    await expect(component).toHaveScreenshot()
  })

  test('checkable', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          checkable
          defaultCheckedKeys={defaultCheckedKeys}
          dataSource={dataSource}
          defaultExpandedKeys={allExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('trail', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          checkable
          showTrails
          dataSource={dataSource}
          defaultExpandedKeys={allExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('icons', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          showIcons
          dataSource={dataSource}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('checkable icons', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          checkable
          showIcons
          dataSource={dataSource}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('selectable multiple select', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          selectable
          multipleSelect
          dataSource={dataSource}
          defaultSelectedKeys={['item-1-0-0', 'item-0']}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('selectable single select', async ({ page, mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          selectable
          dataSource={dataSource}
          defaultSelectedKeys={['item-1-0-0']}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )
    const tree = page.locator('[role="tree"]')

    await tree.focus()

    await expect(component).toHaveScreenshot()
  })

  test('withHalfLevelSpacer', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          withHalfLevelSpacer
          dataSource={dataSource}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('withHalfLevelSpacer and showTrails', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          showTrails
          withHalfLevelSpacer
          dataSource={dataSource}
          defaultExpandedKeys={allExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('levelSpacer', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          levelSpacer={50}
          dataSource={dataSource}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('withHalfLevelSpacer and levelSpacer', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          withHalfLevelSpacer
          levelSpacer={50}
          dataSource={dataSource}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('withHalfLevelSpacer and levelSpacer and showTrails', async ({
    mount,
  }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          showTrails
          withHalfLevelSpacer
          dataSource={dataSource}
          levelSpacer={50}
          defaultExpandedKeys={allExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('maxContentLines', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          maxContentLines={2}
          dataSource={dataSource}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('maxContentLines and showTrails', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          showTrails
          maxContentLines={3}
          dataSource={dataSource}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('disabled partial', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          dataSource={dataSourcePartialDisabled}
          defaultExpandedKeys={allExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('disabled checked', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          checkable
          dataSource={dataSourcePartialCheckDisabled}
          defaultExpandedKeys={allExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('disableExpand', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20, width: 600 }}>
        <Tree
          disableExpand
          dataSource={dataSourcePartialCheckDisabled}
          defaultExpandedKeys={allExpandedKeys}
        />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })
})

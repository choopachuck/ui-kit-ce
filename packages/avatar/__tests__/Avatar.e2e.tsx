import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Avatar } from '../src'
import { E2eAvatarCustomCallback } from '../examples/E2eAvatarCustomCallback'
import { E2eAvatarSizeWithImage } from '../examples/E2eAvatarSizeWithImage'
import { E2eAvatarSizeWithIcon } from '../examples/E2eAvatarSizeWithIcon'

const avatarColor = '#027CAC'
const avatarColorAlt = '#FFF'

test.describe('Avatar', () => {
  test('size with text', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', gap: 10 }}>
        <Avatar size="xs" color={avatarColor}>
          ИП
        </Avatar>
        <Avatar size="sm" color={avatarColor}>
          ИП
        </Avatar>
        <Avatar size="md" color={avatarColor}>
          ИП
        </Avatar>
        <Avatar size="lg" color={avatarColor}>
          ИП
        </Avatar>
        <Avatar size="xl" color={avatarColor}>
          ИП
        </Avatar>
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('size with icon', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', gap: 10 }}>
        <E2eAvatarSizeWithIcon />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('size with image', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', gap: 10 }}>
        <E2eAvatarSizeWithImage />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('kind', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', gap: 10 }}>
        <Avatar color={avatarColor}>ИП</Avatar>
        <Avatar kind="circle" color={avatarColor}>
          ИП
        </Avatar>
        <Avatar kind="rounded" color={avatarColor}>
          ИП
        </Avatar>
        <Avatar kind="square" color={avatarColor}>
          ИП
        </Avatar>
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('with border', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', gap: 10 }}>
        <Avatar withBorder color={avatarColorAlt}>
          ИП
        </Avatar>
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('with shadow', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', gap: 10 }}>
        <Avatar withShadow color={avatarColorAlt}>
          ИП
        </Avatar>
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('fallback', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', gap: 10 }}>
        <Avatar />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('custom fallback', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', gap: 10 }}>
        <E2eAvatarCustomCallback />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })
})

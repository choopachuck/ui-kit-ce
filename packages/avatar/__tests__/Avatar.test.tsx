import * as React from 'react'
import { render } from '@testing-library/react'
import { Avatar } from '../src'
import {
  avatarTestData,
  generateTestDataWithKinds,
  generateTestDataWithSizes,
} from './testData'
import { UserIcon } from '../examples/assets'

const withTimeout = (f: () => void) => setTimeout(f, 100)

it.each(generateTestDataWithSizes())(
  'avatar size changes via size property (%p)',
  ({ icon, size, text }) => {
    const { getByText, getByTitle, rerender, container } = render(
      <Avatar size={size}>{text}</Avatar>
    )

    expect(getByText(text)).toHaveStyle({
      ...avatarTestData.size[size].avatar,
      ...avatarTestData.size[size].font,
    })

    expect(getByText(text).getAttribute('class')).toContain(
      avatarTestData.size[size].className
    )

    rerender(<Avatar title={text} icon={icon} size={size} />)

    expect(container.querySelector('svg')).toHaveStyle({
      ...avatarTestData.size[size].icon,
    })

    expect(getByTitle(text).getAttribute('class')).toContain(
      avatarTestData.size[size].className
    )
  }
)

it.each(generateTestDataWithKinds())(
  'avatar kind changes via kind property (%s)',
  (kind) => {
    const { getByText } = render(
      <Avatar kind={kind}>{avatarTestData.text}</Avatar>
    )

    expect(getByText(avatarTestData.text)).toHaveStyle({
      ...avatarTestData.kind[kind].style,
    })
  }
)

it('avatar with border', () => {
  const { getByText } = render(
    <Avatar withBorder>{avatarTestData.text}</Avatar>
  )

  expect(getByText(avatarTestData.text).getAttribute('class')).toContain(
    avatarTestData.withBorder.className
  )
})

it('avatar with shadow', () => {
  const { getByText } = render(
    <Avatar withShadow>{avatarTestData.text}</Avatar>
  )

  expect(getByText(avatarTestData.text).getAttribute('class')).toContain(
    avatarTestData.withShadow.className
  )
})

it('avatar fallback elements priority', () => {
  const alt = 'Иван Петров'
  const icon = <UserIcon />
  const src = './broken-image.png'
  const { getByText, rerender, getByTitle, container } = render(
    <Avatar icon={icon} src={src} alt={alt}>
      {avatarTestData.text}
    </Avatar>
  )

  // Ждем прогрузки fallback-изображения после ререндера
  withTimeout(() => {
    expect(container.querySelector('svg')).toBeDefined()

    rerender(
      <Avatar src={src} alt={alt}>
        {avatarTestData.text}
      </Avatar>
    )

    withTimeout(() => {
      expect(getByText(avatarTestData.text)).toBeDefined()

      rerender(<Avatar src={src} alt={alt} />)

      withTimeout(() => {
        expect(getByText(avatarTestData.text)).toBeDefined()

        rerender(<Avatar title={src} src={src} />)

        withTimeout(() => {
          expect(getByTitle(src).children[0]?.getAttribute('class')).toContain(
            avatarTestData.fallback.className
          )
        })
      })
    })
  })
})

it('avatars property imgProps.onError not triggers the generic fallback', () => {
  const src = './custom_image.png'
  const { getByRole, getByTitle } = render(
    <Avatar
      title={src}
      src="./broken-image.png"
      imgProps={{
        onError: ({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src = src
        },
      }}
    />
  )
  withTimeout(() => {
    expect(getByTitle(src).children[0]?.getAttribute('class')).not.toContain(
      avatarTestData.fallback.className
    )

    expect(getByRole('img').getAttribute('src')).toEqual(src)
  })
})

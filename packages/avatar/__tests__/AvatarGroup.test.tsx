import * as React from 'react'
import { render } from '@testing-library/react'
import { light } from '@v-uik/theme'
import { shuffle } from '@v-uik/utils'
import {
  AvatarGroup,
  AvatarGroupProps,
  AvatarProps,
  AvatarSize,
  AvatarKind,
  AvatarGroupSize,
} from '../src'
import {
  avatarTestData,
  avatarGroupSizesAsArray,
  avatarKindsAsArray,
} from './testData'
import Extra from './testComponents/Extra'
import Avatar from './testComponents/Avatar'

jest.mock('./testComponents/Extra', () => {
  return jest.fn(() => null)
})

jest.mock('./testComponents/Avatar', () => {
  return jest.fn(() => null)
})

it.each(avatarGroupSizesAsArray)(
  'avatar group pass size property correctly (%p)',
  (size) => {
    const items = [0, 1, 2]
    const { getByTitle } = render(
      <AvatarGroup
        size={size}
        items={items.map((id) => ({ title: `${size}${id}` }))}
      />
    )

    items.forEach((id) => {
      expect(getByTitle(`${size}${id}`).getAttribute('class')).toContain(
        avatarTestData.size[size].className
      )
    })
  }
)

it.each(avatarKindsAsArray)(
  'avatar group pass kind property correctly (%p)',
  (kind) => {
    const items = [0, 1, 2]
    const { getByTitle } = render(
      <AvatarGroup
        kind={kind}
        items={items.map((id) => ({ title: `${kind}${id}` }))}
      />
    )

    items.forEach((id) => {
      expect(getByTitle(`${kind}${id}`).getAttribute('class')).toContain(
        avatarTestData.kind[kind].className
      )
    })
  }
)

it('avatar group pass withBorder property correctly', () => {
  const items = [0, 1, 2]
  const { getByTitle } = render(
    <AvatarGroup withBorder items={items.map((id) => ({ title: `${id}` }))} />
  )

  items.forEach((id) => {
    expect(getByTitle(`${id}`).getAttribute('class')).toContain(
      avatarTestData.withBorder.className
    )
  })
})

it('avatar group pass withShadow property correctly', () => {
  const items = [0, 1, 2]
  const { getByTitle } = render(
    <AvatarGroup withShadow items={items.map((id) => ({ title: `${id}` }))} />
  )

  items.forEach((id) => {
    expect(getByTitle(`${id}`).getAttribute('class')).toContain(
      avatarTestData.withShadow.className
    )
  })
})

it.each(avatarGroupSizesAsArray)(
  'avatar group gap changes via size property (%p)',
  (size) => {
    const items = [0, 1, 2]
    const { getByTitle } = render(
      <AvatarGroup
        size={size}
        items={items.map((id) => ({ title: `${size}${id}` }))}
      />
    )

    items.forEach((id) => {
      expect(getByTitle(`${size}${id}`)).toHaveStyle({
        ...avatarTestData.avatarGroup.size[size].style,
      })
    })
  }
)

it('avatar group gap changes via gap property', () => {
  const items = [0, 1, 2]
  const gap = 15
  const { getByTitle } = render(
    <AvatarGroup gap={gap} items={items.map((id) => ({ title: `${id}` }))} />
  )

  items.forEach((id) => {
    expect(getByTitle(`${id}`)).toHaveStyle({ marginLeft: gap * -1 })
  })
})

it('avatar group hides overflow avatars and shows count of hidden avatars', () => {
  const max = 5
  const total = 10
  const { container } = render(
    <AvatarGroup
      max={max}
      items={Array.from({ length: total }).map((_, index) => ({
        title: `${index}`,
      }))}
    />
  )

  const avatars = container.querySelectorAll(
    `[class^="${avatarTestData.avatarClassName}"]`
  )

  expect(avatars.length).toEqual(max + 1)
  expect(avatars[max].innerHTML).toContain(`+${total - max}`)
})

it('avatar group not shows count of hidden avatars if its not overflow', () => {
  const max = 11
  const total = 10
  const { container } = render(
    <AvatarGroup
      max={max}
      items={Array.from({ length: total }).map((_, index) => ({
        title: `${index}`,
      }))}
    />
  )

  const avatars = container.querySelectorAll(
    `[class^="${avatarTestData.avatarClassName}"]`
  )

  expect(avatars.length).toEqual(total)
  expect(avatars[avatars.length - 1].innerHTML).not.toContain(`+${total - max}`)
})

it('avatar group shows extra with showExtra=true', () => {
  const total = 5

  const { container } = render(
    <AvatarGroup
      showExtra
      items={Array.from({ length: total }).map((_, index) => ({
        title: `${index}`,
      }))}
    />
  )

  const avatars = container.querySelectorAll(
    `[class^="${avatarTestData.avatarClassName}"]`
  )

  expect(avatars.length).toEqual(total + 1)
})

it('avatar group renders custom extra correctly', () => {
  const max = 5
  const total = 6

  const avatarProps: AvatarProps = {
    kind: AvatarKind.rounded,
    size: AvatarSize.sm,
    color: 'red',
    children: 'UN',
    alt: 'User Name',
    src: './broken-image',
  }

  const avatarGroupProps: AvatarGroupProps = {
    kind: AvatarKind.circle,
    size: AvatarGroupSize.md,
    max,
    gap: 6,
    showExtra: false,
    items: Array.from({ length: total }).map(() => ({ ...avatarProps })),
  }

  render(<AvatarGroup {...avatarGroupProps} components={{ Extra }} />)

  expect(Extra).toBeCalledTimes(1)
  expect(Extra).toMatchSnapshot()
})

it('avatar group renders custom avatar correctly', () => {
  render(
    <AvatarGroup
      items={[{ src: './broken_image.png', alt: 'UN' }]}
      components={{ Avatar }}
    />
  )

  expect(Avatar).toBeCalledTimes(1)
  expect(Avatar).toMatchSnapshot()
})

it('avatar group changes background color of avatars via property coloring="static" correclty', () => {
  const backgroundColors = [
    light.ref.palette.amber50,
    light.ref.palette.arctic50,
    light.ref.palette.blue50,
  ]
  const items = [0, 1, 2]
  const { getByTitle } = render(
    <AvatarGroup
      coloring="static"
      items={items.map((id) => ({ title: `${id}` }))}
    />
  )

  items.forEach((id) => {
    expect(getByTitle(`${id}`)).toHaveStyle({
      backgroundColor: backgroundColors[id],
    })
  })
})

it('avatar group changes background color of avatars via property coloring="static" correclty with custom palette', () => {
  const backgroundColors = ['red', 'green', 'blue']
  const textColorsByBackgroundColors = {
    [backgroundColors[0]]: 'rgb(255, 255, 255)',
    [backgroundColors[1]]: 'rgb(255, 255, 255)',
    [backgroundColors[2]]: 'rgb(0, 0, 0)',
  }
  const palette = [
    {
      textColor: textColorsByBackgroundColors[backgroundColors[0]],
      backgroundColor: backgroundColors[0],
    },
    {
      textColor: textColorsByBackgroundColors[backgroundColors[1]],
      backgroundColor: backgroundColors[1],
    },
    {
      textColor: textColorsByBackgroundColors[backgroundColors[2]],
      backgroundColor: backgroundColors[2],
    },
  ]
  const items = [0, 1, 2]
  const { getByTitle } = render(
    <AvatarGroup
      coloring="static"
      getPalette={() => palette}
      items={items.map((id) => ({ title: `${id}` }))}
    />
  )

  items.forEach((id) => {
    expect(getByTitle(`${id}`)).toHaveStyle({
      backgroundColor: backgroundColors[id],
      color: textColorsByBackgroundColors[backgroundColors[id]],
    })
  })
})

it('avatar group changes background color of avatars via property coloring="random" correctly', () => {
  const backgroundColors = ['red', 'green', 'blue']
  const textColorsByBackgroundColors = {
    [backgroundColors[0]]: 'rgb(255, 255, 255)',
    [backgroundColors[1]]: 'rgb(255, 255, 255)',
    [backgroundColors[2]]: 'rgb(0, 0, 0)',
  }
  const palette = [
    {
      textColor: textColorsByBackgroundColors[backgroundColors[0]],
      backgroundColor: backgroundColors[0],
    },
    {
      textColor: textColorsByBackgroundColors[backgroundColors[1]],
      backgroundColor: backgroundColors[1],
    },
    {
      textColor: textColorsByBackgroundColors[backgroundColors[2]],
      backgroundColor: backgroundColors[2],
    },
  ]
  const items = [0, 1, 2]
  const { getByTitle } = render(
    <AvatarGroup
      coloring="random"
      getPalette={() => shuffle(palette)}
      items={items.map((id) => ({ title: `${id}` }))}
    />
  )

  items.forEach((id) => {
    expect(backgroundColors).toContain(
      getByTitle(`${id}`).style.backgroundColor
    )
    expect(getByTitle(`${id}`).style.color).toEqual(
      textColorsByBackgroundColors[getByTitle(`${id}`).style.backgroundColor]
    )
  })
})

it('avatar group with coloring and small palette changes background color of avatars correctly', () => {
  const backgroundColors = ['red', 'green', 'blue']
  const textColorsByBackgroundColors = {
    [backgroundColors[0]]: 'rgb(255, 255, 255)',
    [backgroundColors[1]]: 'rgb(255, 255, 255)',
    [backgroundColors[2]]: 'rgb(0, 0, 0)',
  }
  const palette = [
    {
      textColor: textColorsByBackgroundColors[backgroundColors[0]],
      backgroundColor: backgroundColors[0],
    },
    {
      textColor: textColorsByBackgroundColors[backgroundColors[1]],
      backgroundColor: backgroundColors[1],
    },
    {
      textColor: textColorsByBackgroundColors[backgroundColors[2]],
      backgroundColor: backgroundColors[2],
    },
  ]
  const items = [0, 1, 2, 3, 4, 5]
  const { getByTitle } = render(
    <AvatarGroup
      coloring="static"
      getPalette={() => palette}
      items={items.map((id) => ({ title: `${id}` }))}
    />
  )

  let paletteId = 0
  items.forEach((id) => {
    if (paletteId === backgroundColors.length) {
      paletteId = 0
    }
    expect(getByTitle(`${id}`)).toHaveStyle({
      backgroundColor: backgroundColors[paletteId],
      color: textColorsByBackgroundColors[backgroundColors[paletteId]],
    })
    paletteId++
  })
})

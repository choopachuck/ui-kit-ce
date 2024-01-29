import * as React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { getDimensions } from './getDimensions'

describe('getDimensions', () => {
  const Component = <div />

  let wrapper: RenderResult
  let getBoundingClientRect: () => DOMRect

  beforeEach(() => {
    getBoundingClientRect = Element.prototype.getBoundingClientRect
    Element.prototype.getBoundingClientRect = function () {
      return {
        width: 500,
        height: 400,
      } as DOMRect
    }

    wrapper = render(Component)
  })

  afterEach(() => {
    wrapper.unmount()
    Element.prototype.getBoundingClientRect = getBoundingClientRect
  })

  it('Вызывает getBoundingClientRect с ожидаемым значением', () => {
    getDimensions(Component, (rect) => {
      expect(rect).toStrictEqual({ width: 500, height: 400 })
    })
  })
})

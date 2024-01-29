import * as React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { mergeRefs } from './mergeRefs'

describe('mergeRefs', () => {
  let wrapper: RenderResult
  let localRef: React.RefObject<HTMLSpanElement>
  let userRef: React.RefObject<HTMLSpanElement>

  const TestComponent = React.forwardRef(
    (props, ref: React.Ref<HTMLSpanElement>) => {
      localRef = React.useRef(null)

      return <span {...props} ref={mergeRefs([ref, localRef])} />
    }
  )
  TestComponent.displayName = 'TestComponent'

  beforeEach(() => {
    userRef = React.createRef<HTMLSpanElement>()
    wrapper = render(<TestComponent ref={userRef} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Объединяет внутренний и пользовательский ref', () => {
    const wrapperElement = wrapper.container.firstChild

    expect(localRef.current).toBe(wrapperElement)
    expect(userRef.current).toBe(wrapperElement)
  })
})

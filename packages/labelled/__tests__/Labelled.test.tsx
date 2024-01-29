import * as React from 'react'
import { render } from '@testing-library/react'
import { InputBase } from '@v-uik/base'
import { Labelled } from '../src'

describe('base', () => {
  it('render label, helper and description text correctly', () => {
    const label = 'test label'
    const helperText = 'helper text'
    const description = 'some description'
    const { rerender, queryByText } = render(
      <Labelled>
        <InputBase />
      </Labelled>
    )
    expect(queryByText(label)).not.toBeInTheDocument()
    expect(queryByText(helperText)).not.toBeInTheDocument()
    expect(queryByText(description)).not.toBeInTheDocument()
    rerender(
      <Labelled label={label} helperText={helperText} description={description}>
        <InputBase />
      </Labelled>
    )
    expect(queryByText(label)).toBeInTheDocument()
    expect(queryByText(helperText)).toBeInTheDocument()
    expect(queryByText(description)).toBeInTheDocument()
  })

  it('description shows only when label is set', () => {
    const label = 'test label'
    const description = 'some description'
    const { rerender, queryByText } = render(
      <Labelled description={description}>
        <InputBase />
      </Labelled>
    )
    expect(queryByText(label)).not.toBeInTheDocument()
    expect(queryByText(description)).not.toBeInTheDocument()
    rerender(
      <Labelled label={label} description={description}>
        <InputBase />
      </Labelled>
    )
    expect(queryByText(label)).toBeInTheDocument()
    expect(queryByText(description)).toBeInTheDocument()
  })
})

describe('required sign', () => {
  it('render required input correctly', () => {
    const label = 'test label'
    const requiredSign = '*'
    const { rerender, queryByText } = render(
      <Labelled>
        <InputBase />
      </Labelled>
    )
    expect(queryByText(label)).not.toBeInTheDocument()
    expect(queryByText(requiredSign)).not.toBeInTheDocument()
    rerender(
      <Labelled required label={label}>
        <InputBase />
      </Labelled>
    )
    expect(queryByText(label)).toBeInTheDocument()
    expect(queryByText(requiredSign)).toBeInTheDocument()
  })

  it('required sign shows only when label is set', () => {
    const label = 'test label'
    const requiredSign = '*'
    const { rerender, queryByText } = render(
      <Labelled required>
        <InputBase />
      </Labelled>
    )
    expect(queryByText(label)).not.toBeInTheDocument()
    expect(queryByText(requiredSign)).not.toBeInTheDocument()
    rerender(
      <Labelled required label={label}>
        <InputBase />
      </Labelled>
    )
    expect(queryByText(label)).toBeInTheDocument()
    expect(queryByText(requiredSign)).toBeInTheDocument()
  })
})

describe('helper text', () => {
  it('helper text container not in the document when helper text is null', () => {
    const { container } = render(
      <Labelled helperTextProps={{ id: 'input-helper' }}>
        <InputBase />
      </Labelled>
    )

    expect(container.querySelector('#input-helper')).toBeNull()
  })
  it('helper text container in the document when helper text is not null', () => {
    const { container } = render(
      <Labelled
        helperText="Helper text"
        helperTextProps={{ id: 'input-helper' }}
      >
        <InputBase />
      </Labelled>
    )

    expect(container.querySelector('#input-helper')).not.toBeNull()
  })
  it('helper text container in the document when helper text is null and keepHelperTextMinHeight = true', () => {
    const { container } = render(
      <Labelled
        keepHelperTextMinHeight
        helperTextProps={{ id: 'input-helper' }}
      >
        <InputBase />
      </Labelled>
    )

    expect(container.querySelector('#input-helper')).not.toBeNull()
  })
})

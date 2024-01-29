import * as React from 'react'

import { hasElementType } from './hasElementType'

const Button = (props: React.ComponentProps<'button'>) => <button {...props} />
const Switch = (props: React.ComponentProps<'div'>) => <div {...props} />
const buttonNode = <Button />

describe('hasElementType', () => {
  it('<Button /> относится к типу Button', () => {
    expect(hasElementType(buttonNode, Button)).toBeTruthy()
  })

  it('<Button /> не относится к типу Switch', () => {
    expect(hasElementType(buttonNode, Switch)).toBeFalsy()
  })
})

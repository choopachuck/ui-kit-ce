import React from 'react'
import { Input } from '@v-uik/base'

export const Inputs: React.FC = () => {
  return (
    <div
      style={{
        marginTop: '12px',
        lineHeight: 'initial',
      }}
    >
      <Input label="Введите логин" />
      <Input error showErrorIcon label="Введите логин" />
    </div>
  )
}

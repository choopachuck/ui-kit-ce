'use client'

import * as React from 'react'
import { ModalProps } from './Modal'

export type ModalContextValue = Pick<ModalProps, 'onClose'> & {
  titleId?: string
}

export const ModalContext = React.createContext<ModalContextValue>({})

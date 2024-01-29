'use client'

import * as React from 'react'

export type DropdownMenuContextValue = {
  /**
   * Обработчик закрытия меню и фокус на основной children
   */
  closeRoot?: () => void
  /**
   * Обработчик закрытия меню и фокус на кастомный элемент
   */
  close?: () => void
  /**
   * Порядковый номер следования dropdown (нужен для того чтобы определять глубину dropdowns)
   */
  orderNumber?: number
}

export const DropdownMenuContext: React.Context<DropdownMenuContextValue> =
  React.createContext({})

'use client'

import * as React from 'react'
import { TabsProps } from './Tabs'

export type TabsContextValue = Partial<Pick<TabsProps, 'value' | 'onChange'>>
export const TabsContext = React.createContext<TabsContextValue>({})

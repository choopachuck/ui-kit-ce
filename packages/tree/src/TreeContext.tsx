'use client'

import * as React from 'react'
import { TreeItem, TreeGetters } from './hooks'
import { TreeClasses } from './classes'
import { TreeComponents } from './userComponents'

export type TreeContextProps<TItem = TreeItem> = {
  getters: TreeGetters<TItem>
  classesMap: Required<TreeClasses>
  components: TreeComponents<TItem>
  treeRef: React.RefObject<HTMLUListElement>
}

export type TreeContextProviderProps<TItem = TreeItem> = TreeContextProps<TItem>

const TreeContext = React.createContext<TreeContextProps>(
  {} as TreeContextProps
)

export const TreeContextProvider = <TItem extends unknown = TreeItem>({
  children,
  ...restProps
}: React.PropsWithChildren<
  TreeContextProviderProps<TItem>
>): React.ReactElement | null => {
  const Context = TreeContext as unknown as React.Context<
    TreeContextProps<TItem>
  >

  return <Context.Provider value={restProps}>{children}</Context.Provider>
}

export const useTreeContext = <
  TItem extends unknown = TreeItem
>(): TreeContextProps<TItem> => {
  const treeContext = React.useContext<TreeContextProps<TItem>>(
    TreeContext as unknown as React.Context<TreeContextProps<TItem>>
  )

  if (!treeContext) {
    throw new Error('Tree context must be in Tree context provider!')
  }

  return treeContext
}

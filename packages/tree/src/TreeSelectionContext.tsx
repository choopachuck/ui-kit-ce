'use client'

import * as React from 'react'

export type TreeSelectionContextProps = {
  currentSelectedItemKey: React.Key | undefined
  setCurrentSelectedItemKey: (key: React.Key | undefined) => void
  focusedItemKey: React.Key | undefined
  setFocusedItemKey: (item: React.Key | undefined) => void
  skipFocusOnTree: React.MutableRefObject<boolean | null>
}

const TreeSelectionContext = React.createContext<TreeSelectionContextProps>(
  {} as TreeSelectionContextProps
)

export const TreeSelectionProvider: React.FC = ({ children }) => {
  const [currentSelectedItemKey, setCurrentSelectedItemKey] = React.useState<
    React.Key | undefined
  >()
  const [focusedItemKey, setFocusedItemKey] = React.useState<
    React.Key | undefined
  >()
  const skipFocusOnTree = React.useRef<boolean | null>(false)

  const value = React.useMemo(
    () => ({
      currentSelectedItemKey,
      setCurrentSelectedItemKey,
      focusedItemKey,
      setFocusedItemKey,
      skipFocusOnTree,
    }),
    [currentSelectedItemKey, focusedItemKey]
  )

  return (
    <TreeSelectionContext.Provider value={value}>
      {children}
    </TreeSelectionContext.Provider>
  )
}

export const useTreeSelectionContext = () => {
  const context = React.useContext(TreeSelectionContext)

  if (!context) {
    throw new Error(
      'TreeSelection context must be in TreeSelection context provider!'
    )
  }

  return context
}

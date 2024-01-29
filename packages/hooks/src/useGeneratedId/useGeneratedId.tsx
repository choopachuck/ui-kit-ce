'use client'

import * as React from 'react'

const maxRules = 1e10

const createGenerateId = (): (() => number) => {
  let id = 0

  return () => {
    id++

    if (id > maxRules) {
      console.warn('[@v-uik/hooks] Сгенерированный id превышает лимит')
    }

    return id
  }
}

const GeneratedIdContext = React.createContext<() => number>(createGenerateId())

export const GeneratedIdProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const generateId = React.useMemo(() => createGenerateId(), [])

  return (
    <GeneratedIdContext.Provider value={generateId}>
      {children}
    </GeneratedIdContext.Provider>
  )
}

export const useGeneratedId = (overrideId?: string): string | undefined => {
  const idRef = React.useRef(overrideId)
  const generateId = React.useContext(GeneratedIdContext)

  if (idRef.current == null) {
    idRef.current = `v-uik-${generateId()}`
  }

  return idRef.current
}

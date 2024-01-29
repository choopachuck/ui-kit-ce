'use client'

import * as React from 'react'
import { GeneratedIdProvider } from '@v-uik/hooks'

import { SheetsRegistry, JssProvider } from 'react-jss'

import { Rule, StyleSheet } from 'jss'
import { useServerInsertedHTML } from 'next/navigation'

const MODULE_ID = 0
const MAX_RULES = 1e10
const STYLE_ID = 'server-side-styles'

const makeGenerateId = () => {
  let ruleCounter = 0

  return (rule: Rule, sheet?: StyleSheet<string>) => {
    ruleCounter += 1

    if (ruleCounter > MAX_RULES && process.env.NODE_ENV !== 'production') {
      console.warn(
        false,
        `[JSS] You might have a memory leak. Rule counter is at ${ruleCounter}`
      )
    }

    let jssId = ''
    let prefix = ''

    if (sheet) {
      if (sheet.options.classNamePrefix) {
        prefix = sheet.options.classNamePrefix
      }

      if (sheet.options.jss.id) {
        jssId = String(sheet.options.jss.id)
      }
    }

    return `${prefix}${rule.key}-${MODULE_ID}${
      jssId ? `-${jssId}` : ''
    }-${ruleCounter}`
  }
}

export const NextJsProvider = ({
  children,
}: {
  children?: React.ReactNode
}): React.ReactElement => {
  const serverInjected = React.useRef(false)
  const [registry] = React.useState(() => new SheetsRegistry())
  const [generateId] = React.useState(() => makeGenerateId())

  useServerInsertedHTML(() => {
    if (serverInjected.current) {
      return
    }

    const styles = registry.toString()

    serverInjected.current = true

    return <style dangerouslySetInnerHTML={{ __html: styles }} id={STYLE_ID} />
  })

  React.useEffect(() => {
    const style = document.getElementById(STYLE_ID)
    if (style && style.parentNode) {
      style.parentNode.removeChild(style)
    }
  }, [])

  return (
    <JssProvider registry={registry} generateId={generateId}>
      <GeneratedIdProvider>{children}</GeneratedIdProvider>
    </JssProvider>
  )
}

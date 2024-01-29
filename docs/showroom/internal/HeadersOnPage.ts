import * as React from 'react'
import { HeadersTypes } from './interfaces'
import { addons } from '@storybook/addons'
import { DOCS_RENDERED } from '@storybook/core-events'

export interface HeaderItem {
  id: string
  level: keyof typeof HeadersTypes
  children: React.ReactNode
}

// Собирает все заголовки, в рамках одной страницы
export class HeadersOnPage {
  private static instance: HeadersOnPage
  value: HeaderItem[] = []
  pageWasRendered: boolean

  private constructor() {
    this.pageWasRendered = false

    addons.getChannel().on(DOCS_RENDERED, () => {
      this.pageWasRendered = true
    })
  }

  static getInstance(): HeadersOnPage {
    if (!HeadersOnPage.instance) {
      HeadersOnPage.instance = new HeadersOnPage()
    }

    return HeadersOnPage.instance
  }

  add(item: HeaderItem): void {
    if (this.pageWasRendered) {
      this.reset()
    }

    this.value.push(item)
  }

  reset(): void {
    this.value = []
    this.pageWasRendered = false
  }

  onDocsRendered(cb: (value: this['value']) => void): () => void {
    const handler = () => {
      cb(this.value)
    }

    addons.getChannel().on(DOCS_RENDERED, handler)

    return () => addons.getChannel().off(DOCS_RENDERED, handler)
  }
}

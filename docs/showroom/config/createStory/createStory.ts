import { EnvService } from 'services'
import { createLiveEditStory } from './createLiveEditStory'
import React from 'react'
import { createDefaultStory } from './createDefaultStory'

export const createStory = (
  Component: React.FunctionComponent,
  defaultCode: string,
  additionalModules: Record<string, unknown> = {},
  localStorageKey?: string
) => {
  return EnvService.isDist
    ? createDefaultStory(Component)
    : createLiveEditStory(defaultCode, additionalModules, localStorageKey)
}

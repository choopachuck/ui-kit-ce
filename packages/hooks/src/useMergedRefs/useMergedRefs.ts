import * as React from 'react'
import { mergeRefs } from '@v-uik/utils'

export const useMergedRefs = <T>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useCallback(mergeRefs<T>(refs), refs)

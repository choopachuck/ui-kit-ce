import { ReactNode } from 'react'
import { BaseAutocompleteProps } from '../../src/hooks'

export function DocsAutocomplete<Option>({
  // eslint-disable-next-line
  backfill = true,
  // eslint-disable-next-line
  selectionFormat = 'typed',
}: BaseAutocompleteProps<Option>): ReactNode {
  return null
}

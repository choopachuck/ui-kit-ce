import {
  PaginationPageButton,
  PaginationPageButtonProps,
} from './PaginationPageButton'
import {
  PaginationOverflowButton,
  PaginationOverflowButtonProps,
} from './PaginationOverflowButton'
import {
  PaginationNavigationButton,
  PaginationNavigationButtonProps,
} from './PaginationNavigationButton'
import {
  PaginationSelectedIndicator,
  PaginationSelectedIndicatorProps,
} from './PaginationSelectedIndicator'

export type PaginationComponents = {
  PageButton: React.ComponentType<PaginationPageButtonProps>
  OverflowButton: React.ComponentType<PaginationOverflowButtonProps>
  PreviousPageButton: React.ComponentType<PaginationNavigationButtonProps>
  NextPageButton: React.ComponentType<PaginationNavigationButtonProps>
  SelectedIndicator: React.ComponentType<PaginationSelectedIndicatorProps>
  FirstPageButton: React.ComponentType<PaginationNavigationButtonProps>
  LastPageButton: React.ComponentType<PaginationNavigationButtonProps>
}

const unionComponents = (
  generic: PaginationComponents,
  custom?: PaginationComponentsConfig
) => {
  return (Object.keys(generic) as (keyof PaginationComponents)[]).reduce(
    (accum, componentName) => {
      if (custom?.[componentName]) {
        accum[componentName] = custom[
          componentName
        ] as PaginationComponents[keyof PaginationComponents]
      } else {
        accum[componentName] = generic[componentName]
      }

      return accum
    },
    {} as PaginationComponents
  )
}
export type PaginationComponentsConfig = Partial<PaginationComponents>

export const defaultPaginationComponents = {
  PageButton: PaginationPageButton,
  OverflowButton: PaginationOverflowButton,
  PreviousPageButton: PaginationNavigationButton,
  NextPageButton: PaginationNavigationButton,
  SelectedIndicator: PaginationSelectedIndicator,
  FirstPageButton: PaginationNavigationButton,
  LastPageButton: PaginationNavigationButton,
}

export type PaginationComponentsGeneric = typeof defaultPaginationComponents

export const getComponents = (
  componentProp?: PaginationComponentsConfig | undefined
): PaginationComponentsGeneric =>
  unionComponents(
    defaultPaginationComponents,
    componentProp
  ) as PaginationComponentsGeneric

export type {
  PaginationPageButtonProps,
  PaginationOverflowButtonProps,
  PaginationNavigationButtonProps,
  PaginationSelectedIndicatorProps,
}

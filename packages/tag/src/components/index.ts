import { DeleteIcon, Props as DeleteIconProps } from '../assets/DeleteIcon'

export type { DeleteIconProps }

export type TagComponentsConfig = Partial<typeof defaultTagComponents>

export type TagComponentsGeneric = typeof defaultTagComponents

export const defaultTagComponents = {
  DeleteIcon: DeleteIcon,
}

export function getComponents(
  components?: TagComponentsConfig
): TagComponentsGeneric {
  return {
    ...defaultTagComponents,
    ...components,
  }
}

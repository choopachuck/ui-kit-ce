export const DrawerPlacement = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
} as const

export type DrawerPlacementType = keyof typeof DrawerPlacement

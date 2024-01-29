/**
 * Направление (раскладка) элемента.
 *
 * @value horizontal - горизонтальная раскладка элемента, слева направо.
 * @value vertical - вертикальная раскладка элемента, сверху вниз.
 */
export const Direction = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const

export type DirectionType = keyof typeof Direction

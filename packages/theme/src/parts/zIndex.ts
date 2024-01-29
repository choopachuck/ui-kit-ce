export const zIndex = {
  zero: 7000,
  default: 7001,
  bar: 7100,
  drawer: 7200,
  modal: 7300,
  popup: 7400,
  notification: 7500,
  invisible: -1,
}

export type ZIndex = typeof zIndex | Record<string, number>

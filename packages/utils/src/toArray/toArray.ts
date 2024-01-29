export function toArray(arr: string | string[]): string[] {
  if (arr === undefined || arr === null) {
    return []
  }

  return Array.isArray(arr) ? arr : [arr]
}

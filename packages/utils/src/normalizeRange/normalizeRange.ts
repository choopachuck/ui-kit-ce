export interface Range {
  min?: number
  max?: number
}

/**
 * Объединяет переданные границы с границами по умолчанию.
 * В случае нарушения значений min и max - переворачивает их.
 */
export const normalizeRange = ({
  min = 0,
  max = 100,
}: Range): Required<Range> => {
  return {
    min: Math.min(min, max),
    max: Math.max(min, max),
  }
}

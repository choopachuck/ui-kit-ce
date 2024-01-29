export const getButtonCountInRow = (
  container: HTMLDivElement | null,
  element: Element | null
): number => {
  if (!container || !element) {
    return 0
  }
  const width = container.getBoundingClientRect().width
  const buttonWidth = element.getBoundingClientRect().width

  return Math.floor(width / buttonWidth)
}

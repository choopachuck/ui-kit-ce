export const getClassnameByStatus = <StatusT extends string>(
  status: StatusT,
  statusMap: Partial<Record<StatusT, string>>,
  rootClassName?: string
): string => {
  const classNames = [rootClassName, statusMap[status]].filter(
    Boolean
  ) as string[]

  return classNames.join(' ') || ''
}

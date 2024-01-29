import {
  ExternalCalendarViewComponentsProps,
  ExternalCalendarViewComponentsPropsPartial,
} from '../interfaces'

/**
 * Функция возврщаюащая доп пропсы
 * @param props
 */
export const getExternalComponentsProps = <TDate extends unknown>(
  props?: ExternalCalendarViewComponentsPropsPartial<TDate>
): ExternalCalendarViewComponentsProps<TDate> => {
  const defaultProps: ExternalCalendarViewComponentsProps<TDate> = {
    yearBarButtonProps: {},
    dayViewProps: {},
    monthBarButtonProps: {},
    monthViewProps: {},
    yearViewProps: {},
    nextNavigationBarButtonProps: {},
    prevNavigationBarButtonProps: {},
  }

  if (!props) {
    return defaultProps
  }

  return {
    ...defaultProps,
    ...props,
  }
}

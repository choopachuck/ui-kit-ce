import { IUtils } from '@date-io/core/IUtils'
import { NullableDate, PartsOfRangeDate, RangeDate } from '../interfaces'

export interface CustomUtils<TDate> extends IUtils<TDate> {
  /**
   *  Массив из указанного количества недель для текущего месяца.
   */
  getWeekNumberArray(date: TDate, number: number): TDate[][]
  /**
   * Переопределяет стандартное поведение метода getWeekdays().
   *
   * BUGS
   * - @date-io/moment не применяет настройку { locale: 'ru' } и всегда выдает результат
   * на английском языке.
   */
  getWeekdaysStartOfMon(): string[]

  /**
   * Параметр dateToBeChanged только предполагает, какая часть диапазона дат
   * будет изменяться. В функции учитываются случаи, при которых изменяемая часть
   * будет отличаться.
   *
   * Например, если выбраны обе даты, и нужно заменить endDate, но новое значение
   * находится до startEnd, то нужно заменить startDate, а endDate сбросить до
   * состояния null.
   */
  setRangeDate(
    dateToBeChanged: keyof typeof PartsOfRangeDate,
    rangeDate: RangeDate<TDate>,
    newDate: NullableDate<TDate>
  ): RangeDate<TDate>

  isNotNull(value: NullableDate<TDate>): value is TDate

  /**
   * Предполагает, какая часть диапазона дат будет изменяться.
   *
   * Например, если текущий диапазон дат [date, date], то следующая,
   * предполагаемая часть для изменения — 'start'. Но если пользователь только
   * что менял 'start', то следующая релевантная часть 'end'.
   */
  getNextDateToBeChanged(
    dateToBeChanged: keyof typeof PartsOfRangeDate,
    rangeDate: RangeDate<TDate>
  ): keyof typeof PartsOfRangeDate

  /**
   * Вовзращает миллисекунды
   * @param date
   */
  getMilliseconds(date: TDate): number

  /**
   * Устанавливает время на дату
   */
  setTime(currentDate: TDate, time: TDate): TDate

  /**
   * Устанавливает миллисекунды
   * @param date - текущая дата
   * @param count - кол-во миллисекунд
   */
  setMilliseconds(date: TDate, count: number): TDate | null

  /**
   * Вывод периода дня ( "am" | "pm"), исходя из локали
   * @param ampm - период дня
   */
  getDayPeriodByLocale(ampm: 'am' | 'pm'): string
}

export type CustomDateLibAdapter<TDate> = new (
  ...args: any[]
) => CustomUtils<TDate>

/**
 * Кастомный адаптер для работы с датами, который позволяет использоваться
 * ту же библиотеку дат, которая уже установлена в приложении.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function customDateLibAdapter<
  TDate,
  Ctor extends new (...args: any[]) => IUtils<TDate>
>(ctor: Ctor) {
  return class CustomAdapter extends ctor implements CustomUtils<TDate> {
    getWeekNumberArray(date: TDate, number: number): TDate[][] {
      const daysArray: TDate[][] = []
      const start = this.startOfWeek(this.startOfMonth(date))
      const end = this.endOfWeek(this.addWeeks(start, number))

      let count = 0
      let current = start

      while (this.isBefore(current, end)) {
        const weekNumber = Math.floor(count / 7)
        daysArray[weekNumber] = daysArray[weekNumber] || []
        daysArray[weekNumber].push(current)

        current = this.addDays(current, 1)
        count += 1
      }

      return daysArray
    }

    getWeekdaysStartOfMon(): string[] {
      const [weekdays] = this.getWeekNumberArray(
        // Произвольная дата, только что бы получить имена дней
        this.date('1970-01-01') as TDate,
        0
      )

      return weekdays.map((day) => this.format(day, 'weekdayShort'))
    }

    getMilliseconds(date: TDate): number {
      return this.toJsDate(date).getMilliseconds()
    }

    setRangeDate(
      dateToBeChanged: keyof typeof PartsOfRangeDate,
      rangeDate: RangeDate<TDate>,
      newDate: TDate
    ): RangeDate<TDate> {
      const [startDate, endDate] = rangeDate

      let result: RangeDate<TDate>

      // prettier-ignore
      const pattern = dateToBeChanged
        + `, [${startDate === null ? 'null' : 'date'}, ${endDate === null ? 'null' : 'date'}]`
        + `${dateToBeChanged === 'start' && endDate !== null && this.isAfter(newDate, endDate) ? ', more than end' : '' }`
        + `${dateToBeChanged === 'end' && startDate !== null && this.isBefore(newDate, startDate) ? ', less than start' : '' }`

      switch (pattern) {
        case 'start, [null, null]':
        case 'start, [null, date]':
        case 'start, [date, null]':
        case 'start, [date, date]': {
          result = [newDate, endDate]
          break
        }

        case 'end, [null, null]':
        case 'end, [null, date]':
        case 'end, [date, null]':
        case 'end, [date, date]': {
          result = [startDate, newDate]
          break
        }

        case 'start, [null, date], more than end':
        case 'start, [date, date], more than end':
        case 'end, [date, null], less than start':
        case 'end, [date, date], less than start': {
          result = [newDate, null]
          break
        }

        default:
          result = rangeDate
      }

      return result
    }

    isNotNull(value: NullableDate<TDate>): value is TDate {
      return !this.isNull(value)
    }

    getNextDateToBeChanged(
      dateToBeChanged: keyof typeof PartsOfRangeDate,
      [start, end]: RangeDate<TDate>
    ): keyof typeof PartsOfRangeDate {
      // case '[date, null]'
      if (this.isNotNull(start) && this.isNull(end)) {
        return 'end'
      }

      // case '[date, date]':
      if (this.isNotNull(start) && this.isNotNull(end)) {
        return dateToBeChanged === 'start' ? 'end' : 'start'
      }

      // case '[null, null]':
      // case '[null, date]':
      return 'start'
    }

    setTime(currentDate: TDate, time: TDate): TDate {
      currentDate = this.setHours(currentDate, this.getHours(time))
      currentDate = this.setMinutes(currentDate, this.getMinutes(time))
      currentDate = this.setSeconds(currentDate, this.getSeconds(time))

      return currentDate
    }

    setMilliseconds(date: TDate, count: number): TDate | null {
      const jsDate = this.toJsDate(date).setMilliseconds(count)

      return this.date(jsDate)
    }

    getDayPeriodByLocale = (ampm: 'am' | 'pm'): string => {
      const startOfDate = this.startOfDay(this.date() as TDate)

      const dateByDayPeriod =
        ampm === 'am'
          ? this.setHours(startOfDate, 1)
          : this.setHours(startOfDate, 13)

      return this.formatByString(dateByDayPeriod, 'a').toUpperCase()
    }
  }
}

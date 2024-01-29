'use client'

import { createUseStyles } from './ThemeContext'

/**
 * Сброс и нормализация базовых стилей браузера.
 */
export const useResetCss = createUseStyles((theme) => ({
  /**
   * @see https://github.com/shannonmoeller/reset-css/blob/master/sass/_reset.scss
   * @see https://github.com/necolas/normalize.css/blob/master/normalize.css
   */
  '@global': {
    html: {
      /**
       * Корректный межстрочный интервал для всего документа.
       */
      lineHeight: theme.sys.typography.bodySm.lineHeight,
      /**
       * Сброс всех регулировок у межстрочного интервала при смене ориентации экрана для IOS.
       */
      '-webkit-text-size-adjust': '100%',
    },
    'body, button, input, optgroup, select, textarea': {
      /**
       * Сброс отступов по-умолчанию.
       */
      margin: 0,
    },
    hr: {
      /**
       * Корректировка алгоритма расчета ширины и высоты.
       */
      boxSizing: 'content-box',
      height: 0,
      /**
       * Указание видимости контента для браузера Edge.
       */
      overflow: 'visible',
    },
    'pre, code, kbd, samp': {
      /**
       * Корректное наследование шрифта и его ширины.
       */
      fontFamily: 'monospace, monospace',
      /**
       * Единый размер шрифта во всех браузерах.
       */
      fontSize: '1em',
    },
    'abbr[title]': {
      /**
       * Удаление нижней рамки в браузере Chrome v57 и ниже.
       */
      borderBottom: 'none',
      /**
       * Корректный стиль нижнего подчеркивания.
       */
      textDecoration: 'underline dotted',
    },
    'button, input': {
      /**
       * Корректировка видимости в браузере Edge.
       */
      overflow: 'visible',
    },
    'button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner':
      {
        /**
         * Удаление лишних внутренних отступов для кнопок в браузере Firefox.
         */
        padding: 0,
      },
    legend: {
      /**
       * Корректное отображение текста в браузере Edge.
       */
      boxSizing: 'border-box',
      display: 'table',
      maxWidth: '100%',
      whiteSpace: 'normal',
      /**
       * Удаление лишних внутренних отступов.
       */
      padding: 0,
    },
    '[type="search"]::-webkit-search-decoration': {
      /**
       * Удаление внутренних отступов в Chrome и Safari в masOS.
       */
      '-webkit-appearance': 'none',
    },
    details: {
      /**
       * Корректное отображение в Edge и Firefox.
       */
      display: 'block',
    },
    summary: {
      /**
       * Корректное отображение заголовка тэга details.
       */
      display: 'list-item',
    },
  },
}))

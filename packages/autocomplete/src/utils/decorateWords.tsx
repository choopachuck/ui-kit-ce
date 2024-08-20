import React, { ReactNode } from 'react'

// красит у label жирным то, что ввели
export const typed = (label: string, inputValue: string): ReactNode => {
  return decorateWords(label, inputValue, (word) => {
    const formattedValue = inputValue.toLocaleLowerCase()
    const formattedWord = word.toLocaleLowerCase()

    return formattedWord === formattedValue ? getBold(word, label) : word
  })
}

// красит у label жирным все, кроме того, что ввели
export const suggested = (label: string, inputValue: string): ReactNode => {
  return decorateWords(label, inputValue, (word) => {
    const formattedValue = inputValue.toLocaleLowerCase()
    const formattedWord = word.toLocaleLowerCase()

    return formattedWord === formattedValue ? word : getBold(word, label)
  })
}

/**
 * Декорирует label combobox'a исходя из inputValue
 *
 * @param label - рассматриваемый заголовок
 * @param inputValue - текущее введенное значение
 * @param decorator - функция декоратор, применяется для каждых отделенных split'ом промежутков слов
 * @returns
 */
function decorateWords<T>(
  label: string,
  inputValue: string,
  decorator: (word: string) => T
) {
  // получаем массив слов, разделенных с помощью inputValue
  const words = getWords(label, inputValue)
  // для каждого применяем декоратор
  const decoratedWords = words.map((x) => decorator(x))

  // возвращаем новый label внутри span'a
  return <span>{decoratedWords}</span>
}

/**
 * Подготавливает строку к использованию внутри регулярного выражения. Экранирует все спецсимволы
 * @param str - строка для преобразования
 * @see {@link https://stackoverflow.com/a/6969486/10039155|скопировано из stackoverflow}
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getWords(label: string, inputValue: string): string[] {
  const result = label.match(new RegExp(`(${escapeRegExp(inputValue)})`, 'i'))

  if (result === null) {
    return [label]
  }

  const index = result.index as number
  const matched = result[0]

  // собираем слова
  return [
    label.substring(0, index),
    matched,
    label.substring(index + matched.length),
  ].filter(Boolean)
}

// переводит слово в жирный
function getBold(str: string, key: string) {
  return <b key={key}>{str}</b>
}

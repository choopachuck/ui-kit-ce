import { FormatCharacters } from './typings'

export const ESCAPE_CHAR = '\\'

export const DIGIT_REGEXP = /^\d$/
export const LETTER_REGEXP = /^[A-Za-zА-Яа-яёЁ]$/
export const CYRILLIC_REGEXP = /^[А-Яа-яёЁ]$/
export const LATIN_REGEXP = /^[A-Za-z]$/
export const ALPHANUMERIC_REGEXP = /^[\dA-Za-zА-Яа-яёЁ]$/

export const DEFAULT_PLACEHOLDER_CHAR = '_'

export const DEFAULT_FORMAT_CHARACTERS: FormatCharacters = {
  '*': {
    validate(char) {
      return ALPHANUMERIC_REGEXP.test(char)
    },
  },
  '1': {
    validate(char) {
      return DIGIT_REGEXP.test(char)
    },
  },
  a: {
    validate(char) {
      return LETTER_REGEXP.test(char)
    },
  },
  A: {
    validate(char) {
      return LETTER_REGEXP.test(char)
    },
    transform(char) {
      return char.toUpperCase()
    },
  },
  я: {
    validate(char) {
      return CYRILLIC_REGEXP.test(char)
    },
  },
  Я: {
    validate(char) {
      return CYRILLIC_REGEXP.test(char)
    },
    transform(char) {
      return char.toUpperCase()
    },
  },
  l: {
    validate(char) {
      return LATIN_REGEXP.test(char)
    },
  },
  L: {
    validate(char) {
      return LATIN_REGEXP.test(char)
    },
    transform(char) {
      return char.toUpperCase()
    },
  },
  '#': {
    validate(char) {
      return ALPHANUMERIC_REGEXP.test(char)
    },
    transform(char) {
      return char.toUpperCase()
    },
  },
}

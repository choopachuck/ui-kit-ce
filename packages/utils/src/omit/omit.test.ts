import { omit } from './omit'

describe('omit', () => {
  const cases = [
    {
      description: 'Передано поле',
      target: { a: 1 },
      paths: 'a',
      expected: {},
    },
    {
      description: 'Передан массив полей',
      target: { a: 1 },
      paths: ['a'],
      expected: {},
    },
    {
      description: 'Передан массив полей #2',
      target: { a: 1, b: 2, c: 3 },
      paths: ['a'],
      expected: { b: 2, c: 3 },
    },
    {
      description: 'Передан несущетсвующее поле',
      target: { a: 1 },
      paths: 'b',
      expected: { a: 1 },
    },
    {
      description: 'Переданы все поля, присутствующие в объекте',
      target: { a: 1, b: 2, c: 3 },
      paths: ['a', 'b', 'c'],
      expected: {},
    },
  ]

  cases.forEach((item) => {
    it(item.description, () => {
      expect(omit(item.target, item.paths)).toEqual(item.expected)
    })
  })
})

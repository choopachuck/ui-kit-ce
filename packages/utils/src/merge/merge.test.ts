import { merge } from './merge'

const mixedTypeArray = [1]
// @ts-ignore
mixedTypeArray.b = 2 // => Array<'0': 1, b: 2>

describe('merge', () => {
  it.each([
    [[1], 1],
    [[null], null],
    [['string'], 'string'],
    [[undefined], undefined],
    [[jest.fn, { a: 1 }], jest.fn],
    [[{ a: 1 }, jest.fn], { a: 1 }],
    [[{ a: 1 }, { a: undefined }], { a: undefined }],
    /**
     * TODO Возможно перепутано поведение следующих двух кейсов.
     */
    [[{ a: [1] }, { a: { b: 2 } }], { a: { '0': 1, b: 2 } }], // 1 кейс
    [[{ a: { b: 2 } }, { a: [1] }], { a: mixedTypeArray }], // 2 кейс
    [[{ a: 1 }, { b: 2 }], { a: 1, b: 2 }],
    [[{ a: 1 }, { a: {} }], { a: {} }],
    [[{ a: {} }, { a: 'string' }], { a: 'string' }],
    [
      [
        [0, 0, 0],
        [1, 2, 3, 4, 5, 6],
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        {
          projects: ['project1'],
          dateOfBirth: '29.04.1926',
          name: { firstName: 'Paul Baran' },
        },
        {
          gender: 'male',
          projects: ['project1', 'project2'],
          name: {
            firstName: 'Paul',
            surname: 'Baran',
          },
        },
      ],
      {
        gender: 'male',
        dateOfBirth: '29.04.1926',
        projects: ['project1', 'project2'],
        name: {
          firstName: 'Paul',
          surname: 'Baran',
        },
      },
    ],
  ])('run with args %j', ([target, source], expected) => {
    expect(merge(target, source)).toStrictEqual(expected)
  })
})

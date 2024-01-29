import { flatMap, flatMapDepth, flatMapDeep } from './flatMap'

const duplicate = (n: number) => [[[n, n]]]

const cases = [
  {
    input: [1, 2],
    flatMapExpected: [[[1, 1]], [[2, 2]]],
    flatMapDepthExpected: [
      [1, 1],
      [2, 2],
    ],
    flatMapDeepExpected: [1, 1, 2, 2],
  },
  {
    input: [[]],
    flatMapExpected: [[[[], []]]],
    flatMapDepthExpected: [[[], []]],
    flatMapDeepExpected: [],
  },
  {
    input: null,
    flatMapExpected: [],
    flatMapDepthExpected: [],
    flatMapDeepExpected: [],
  },
]

cases.forEach(({ input, flatMapExpected }) => {
  it('flatten array correctly', () => {
    expect(flatMap(input as number[], duplicate)).toEqual(flatMapExpected)
  })
})

cases.forEach(({ input, flatMapDepthExpected }) => {
  it('flattenDepth array correctly', () => {
    expect(flatMapDepth(input as number[], duplicate, 2)).toEqual(
      flatMapDepthExpected
    )
  })
})

cases.forEach(({ input, flatMapDeepExpected }) => {
  it('flattenDeep array correctly', () => {
    expect(flatMapDeep(input as number[], duplicate)).toEqual(
      flatMapDeepExpected
    )
  })
})

import { flatten, flattenDepth, flattenDeep } from './flatten'

const cases = [
  {
    input: [1, [2, 3], 4],
    flattenExpected: [1, 2, 3, 4],
    flattenDepthExpected: [1, 2, 3, 4],
    flattenDeepExpected: [1, 2, 3, 4],
  },
  {
    input: [1, [2, [3]], 4],
    flattenExpected: [1, 2, [3], 4],
    flattenDepthExpected: [1, 2, 3, 4],
    flattenDeepExpected: [1, 2, 3, 4],
  },
  {
    input: [[], [[]], [[], [[[]]]]],
    flattenExpected: [[], [], [[[]]]],
    flattenDepthExpected: [[[]]],
    flattenDeepExpected: [],
  },
  {
    input: null,
    flattenExpected: [],
    flattenDepthExpected: [],
    flattenDeepExpected: [],
  },
]

cases.forEach(({ input, flattenExpected }) => {
  it('flatten array correctly', () => {
    expect(flatten(input)).toEqual(flattenExpected)
  })
})

cases.forEach(({ input, flattenDepthExpected }) => {
  it('flattenDepth array correctly', () => {
    expect(flattenDepth(input, 2)).toEqual(flattenDepthExpected)
  })
})

cases.forEach(({ input, flattenDeepExpected }) => {
  it('flattenDeep array correctly', () => {
    expect(flattenDeep(input)).toEqual(flattenDeepExpected)
  })
})

import { createList } from './createList'

describe('createList', () => {
  const list = createList(['1', '2', '3'], 0)

  it('Каретка стоит у первого элемента', () => {
    expect(list[0].hasCaret).toBeTruthy()
  })

  it('У первого элемента нет соседа слева', () => {
    expect(list[0].neighborLeft).toBe(null)
  })

  it('У последнего элемента нет соседа справа', () => {
    expect(list[list.length - 1].neighborRight).toBe(null)
  })

  it('У первого элемента соседом справа является второй элемент', () => {
    expect(list[0].neighborRight).toBe(list[1])
  })

  it('У второго элемента соседом слева является первый элемент', () => {
    expect(list[1].neighborLeft).toBe(list[0])
  })
})

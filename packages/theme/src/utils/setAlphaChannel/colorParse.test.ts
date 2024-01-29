import { parse } from './color-parse'

describe('color-parse', () => {
  it('#ffa500', () => {
    expect(parse('#ffa500')).toMatchObject({
      space: 'rgb',
      values: [255, 165, 0],
      alpha: 1,
    })
  })

  it('#333', () => {
    expect(parse('#333')).toMatchObject({
      space: 'rgb',
      values: [51, 51, 51],
      alpha: 1,
    })
  })

  it('#f98', () => {
    expect(parse('#f98')).toMatchObject({
      space: 'rgb',
      values: [255, 153, 136],
      alpha: 1,
    })
  })

  it('lime', () => {
    expect(parse('lime')).toMatchObject({
      space: 'rgb',
      values: [0, 255, 0],
      alpha: 1,
    })
  })

  it('hsl(210,50,50)', () => {
    expect(parse('hsl(210,50,50)')).toMatchObject({
      space: 'hsl',
      values: [210, 50, 50],
      alpha: 1,
    })
  })

  it('rgba(153,50,204,60%)', () => {
    expect(parse('rgba(153,50,204,60%)')).toMatchObject({
      space: 'rgb',
      values: [153, 50, 204],
      alpha: 0.6,
    })
  })

  it('#fef', () => {
    expect(parse('#fef')).toMatchObject({
      space: 'rgb',
      values: [255, 238, 255],
      alpha: 1,
    })
  })

  it('#fffFEF', () => {
    expect(parse('#fffFEF')).toMatchObject({
      space: 'rgb',
      values: [255, 255, 239],
      alpha: 1,
    })
  })

  it('rgb(244, 233, 100)', () => {
    expect(parse('rgb(244, 233, 100)')).toMatchObject({
      space: 'rgb',
      values: [244, 233, 100],
      alpha: 1,
    })
  })

  it('rgb(100%, 30%, 90%)', () => {
    expect(parse('rgb(100%, 30%, 90%)')).toMatchObject({
      space: 'rgb',
      values: [255, 76.5, 229.5],
      alpha: 1,
    })
  })

  it('transparent', () => {
    expect(parse('transparent')).toMatchObject({
      space: 'rgb',
      values: [0, 0, 0],
      alpha: 0,
    })
  })

  it('hsl(240, 100%, 50.5%)', () => {
    expect(parse('hsl(240, 100%, 50.5%)')).toMatchObject({
      space: 'hsl',
      values: [240, 100, 50.5],
      alpha: 1,
    })
  })

  it('hsl(240deg, 100%, 50.5%)', () => {
    expect(parse('hsl(240deg, 100%, 50.5%)')).toMatchObject({
      space: 'hsl',
      values: [240, 100, 50.5],
      alpha: 1,
    })
  })

  it('hwb(240, 100%, 50.5%)', () => {
    expect(parse('hwb(240, 100%, 50.5%)')).toMatchObject({
      space: 'hwb',
      values: [240, 100, 50.5],
      alpha: 1,
    })
  })

  it('hwb(240deg, 100%, 50.5%)', () => {
    expect(parse('hwb(240deg, 100%, 50.5%)')).toMatchObject({
      space: 'hwb',
      values: [240, 100, 50.5],
      alpha: 1,
    })
  })

  it('blue', () => {
    expect(parse('blue')).toMatchObject({
      space: 'rgb',
      values: [0, 0, 255],
      alpha: 1,
    })
  })

  it('rgb(244, 233, 100)', () => {
    expect(parse('rgb(244, 233, 100)')).toMatchObject({
      space: 'rgb',
      values: [244, 233, 100],
      alpha: 1,
    })
  })

  it('rgba(244, 233, 100, 0.5)', () => {
    expect(parse('rgba(244, 233, 100, 0.5)')).toMatchObject({
      space: 'rgb',
      values: [244, 233, 100],
      alpha: 0.5,
    })
  })

  it('hsla(244, 100%, 100%, 0.6)', () => {
    expect(parse('hsla(244, 100%, 100%, 0.6)')).toMatchObject({
      space: 'hsl',
      values: [244, 100, 100],
      alpha: 0.6,
    })
  })

  it('hwb(244, 100%, 100%, 0.6)', () => {
    expect(parse('hwb(244, 100%, 100%, 0.6)')).toMatchObject({
      space: 'hwb',
      values: [244, 100, 100],
      alpha: 0.6,
    })
  })

  it('hwb(244, 100%, 100%)', () => {
    expect(parse('hwb(244, 100%, 100%)')).toMatchObject({
      space: 'hwb',
      values: [244, 100, 100],
      alpha: 1,
    })
  })

  it('rgba(200, 20, 233, 0.2)', () => {
    expect(parse('rgba(200, 20, 233, 0.2)')).toMatchObject({
      space: 'rgb',
      values: [200, 20, 233],
      alpha: 0.2,
    })
  })

  it('rgba(200, 20, 233, 0)', () => {
    expect(parse('rgba(200, 20, 233, 0)')).toMatchObject({
      space: 'rgb',
      values: [200, 20, 233],
      alpha: 0,
    })
  })

  it('rgba(100%, 30%, 90%, 0.2)', () => {
    expect(parse('rgba(100%, 30%, 90%, 0.2)')).toMatchObject({
      space: 'rgb',
      values: [255, 76.5, 229.5],
      alpha: 0.2,
    })
  })

  it('rgba(200 20 233 / 0.2)', () => {
    expect(parse('rgba(200 20 233 / 0.2)')).toMatchObject({
      space: 'rgb',
      values: [200, 20, 233],
      alpha: 0.2,
    })
  })

  it('rgba(200 20 233 / 20%)', () => {
    expect(parse('rgba(200 20 233 / 20%)')).toMatchObject({
      space: 'rgb',
      values: [200, 20, 233],
      alpha: 0.2,
    })
  })

  it('hsla(200, 20%, 33%, 0.2)', () => {
    expect(parse('hsla(200, 20%, 33%, 0.2)')).toMatchObject({
      space: 'hsl',
      values: [200, 20, 33],
      alpha: 0.2,
    })
  })

  it('hwb(200, 20%, 33%, 0.2)', () => {
    expect(parse('hwb(200, 20%, 33%, 0.2)')).toMatchObject({
      space: 'hwb',
      values: [200, 20, 33],
      alpha: 0.2,
    })
  })

  it('rgba(200, 20, 233, 0.2)', () => {
    expect(parse('rgba(200, 20, 233, 0.2)')).toMatchObject({
      space: 'rgb',
      values: [200, 20, 233],
      alpha: 0.2,
    })
  })

  it('rgba(300, 600, 100, 3)', () => {
    expect(parse('rgba(300, 600, 100, 3)')).toMatchObject({
      space: 'rgb',
      values: [300, 600, 100],
      alpha: 3,
    })
  })

  it('rgba(8000%, 100%, 333%, 88)', () => {
    expect(parse('rgba(8000%, 100%, 333%, 88)')).toMatchObject({
      space: 'rgb',
      values: [20400, 255, 849.15],
      alpha: 88,
    })
  })

  it('hsla(400, 10%, 200%, 10)', () => {
    expect(parse('hsla(400, 10%, 200%, 10)')).toMatchObject({
      space: 'hsl',
      values: [400, 10, 200],
      alpha: 10,
    })
  })

  it('hwb(400, 10%, 200%, 10)', () => {
    expect(parse('hwb(400, 10%, 200%, 10)')).toMatchObject({
      space: 'hwb',
      values: [400, 10, 200],
      alpha: 10,
    })
  })

  it('hsla(101.12, 45.2%, 21.0%, 1.0)', () => {
    expect(parse('hsla(101.12, 45.2%, 21.0%, 1.0)')).toMatchObject({
      space: 'hsl',
      values: [101.12, 45.2, 21.0],
      alpha: 1,
    })
  })

  it('hsla(101.12 45.2% 21.0% / 50%)', () => {
    expect(parse('hsla(101.12 45.2% 21.0% / 50%)')).toMatchObject({
      space: 'hsl',
      values: [101.12, 45.2, 21.0],
      alpha: 0.5,
    })
  })

  it('hsl(red, 10%, 10%)', () => {
    expect(parse('hsl(red, 10%, 10%)')).toMatchObject({
      space: 'hsl',
      values: [0, 10, 10],
      alpha: 1,
    })
  })

  it('hsl(red, 10%, 10%);', () => {
    expect(parse('hsl(red, 10%, 10%);')).toMatchObject({
      space: 'hsl',
      values: [0, 10, 10],
      alpha: 1,
    })
  })

  it('hsl(10deg, 10%, 10%)', () => {
    expect(parse('hsl(10deg, 10%, 10%)')).toMatchObject({
      space: 'hsl',
      values: [10, 10, 10],
      alpha: 1,
    })
  })

  it('lch(5, 5, orange)', () => {
    expect(parse('lch(5, 5, orange)')).toMatchObject({
      space: 'lch',
      values: [5, 5, 60],
      alpha: 1,
    })
  })

  it('#afd6', () => {
    expect(parse('#afd6')).toMatchObject({
      space: 'rgb',
      values: [170, 255, 221],
      alpha: 0.4,
    })
  })

  it('#AFD6', () => {
    expect(parse('#AFD6')).toMatchObject({
      space: 'rgb',
      values: [170, 255, 221],
      alpha: 0.4,
    })
  })

  it('#aaffdd66', () => {
    expect(parse('#aaffdd66')).toMatchObject({
      space: 'rgb',
      values: [170, 255, 221],
      alpha: 0.4,
    })
  })

  it('#AAFFDD66', () => {
    expect(parse('#AAFFDD66')).toMatchObject({
      space: 'rgb',
      values: [170, 255, 221],
      alpha: 0.4,
    })
  })

  it('(R12 / G45 / B234)', () => {
    expect(parse('(R12 / G45 / B234)')).toMatchObject({
      space: 'rgb',
      values: [12, 45, 234],
      alpha: 1,
    })
  })

  it('R:12 G:45 B:234', () => {
    expect(parse('R:12 G:45 B:234')).toMatchObject({
      space: 'rgb',
      values: [12, 45, 234],
      alpha: 1,
    })
  })

  it('C100/M80/Y0/K35', () => {
    expect(parse('C100/M80/Y0/K35')).toMatchObject({
      space: 'cmyk',
      values: [100, 80, 0, 35],
      alpha: 1,
    })
  })

  it('Array [1,2,3]', () => {
    expect(parse([1, 2, 3])).toMatchObject({
      space: 'rgb',
      values: [1, 2, 3],
      alpha: 1,
    })
  })

  it('Object {r:1,g:2,b:3}', () => {
    expect(parse({ r: 1, g: 2, b: 3 })).toMatchObject({
      space: 'rgb',
      values: [1, 2, 3],
      alpha: 1,
    })
  })

  it('Object {red:1,green:2,blue:3}', () => {
    expect(parse({ red: 1, green: 2, blue: 3 })).toMatchObject({
      space: 'rgb',
      values: [1, 2, 3],
      alpha: 1,
    })
  })

  it('Object {h:1,s:2,l:3}', () => {
    expect(parse({ h: 1, s: 2, l: 3 })).toMatchObject({
      space: 'hsl',
      values: [1, 2, 3],
      alpha: 1,
    })
  })

  it('Number 0xA141E', () => {
    expect(parse(0xa141e)).toMatchObject({
      space: 'rgb',
      values: [10, 20, 30],
      alpha: 1,
    })
  })

  it('Number 0xff', () => {
    expect(parse(0xff)).toMatchObject({
      space: 'rgb',
      values: [0x00, 0x00, 0xff],
      alpha: 1,
    })
  })

  it('Number 0xff0000', () => {
    expect(parse(0xff0000)).toMatchObject({
      space: 'rgb',
      values: [0xff, 0x00, 0x00],
      alpha: 1,
    })
  })

  it('Number 0x0000ff', () => {
    expect(parse(0x0000ff)).toMatchObject({
      space: 'rgb',
      values: [0x00, 0x00, 0xff],
      alpha: 1,
    })
  })

  it('Number Number(0x0000ff)', () => {
    expect(parse(Number(0x0000ff))).toMatchObject({
      space: 'rgb',
      values: [0x00, 0x00, 0xff],
      alpha: 1,
    })
  })

  it('yellowblue', () => {
    expect(parse('yellowblue')).toMatchObject({
      space: undefined,
      values: [0, 0, 0],
      alpha: 1,
    })
  })

  it('shit value', () => {
    expect(parse('shit value')).toMatchObject({
      space: undefined,
      values: [0, 0, 0],
      alpha: 1,
    })
  })
})

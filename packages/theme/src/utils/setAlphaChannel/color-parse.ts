import { COLOR_NAMES } from './color-names'

const baseHues = {
  red: 0,
  orange: 60,
  yellow: 120,
  green: 180,
  blue: 240,
  purple: 300,
}

export type Cstr =
  | string
  | number
  | number[]
  | {
      [key: string]: number
    }

export interface Color {
  space: string | undefined
  values: number[]
  alpha: number
}

/**
 * Форк библиотеки для парсинга цветов.
 *
 * https://github.com/colorjs/color-parse
 *
 * ## Parsed strings
 * - Color keywords: `red`, `green` etc., see color-names
 * - `#RGB[A]`
 * - `#RRGGBB[AA]`
 * - `rgb[a](R, G, B[, A])`
 * - `rgb[a](R G B[ / A])`
 * - `hsl[a](H, S, L[, A])`, inc. [named hues](http://dev.w3.org/csswg/css-color/#simple-hues)
 * - `hsl[a](H S L [ / A])`
 * - `hwb(H, W, B)`
 * - `cmyk(C, M, Y, K)`
 * - `xyz(X, Y, Z)`
 * - `lab(L, A, B)`
 * - `lch(L, C, H)`
 * - `luv(L, U, V)`
 * - `R:10 G:20 B:30`
 * - `(R10 / G20 / B30)`
 * - `C100/M80/Y0/K35`
 *
 * ## Parsed not strings
 *
 * - `[10, 20, 20]` as RGB color space
 * - `{r: 10, g: 20, b: 30}`
 * - `{red: 10, green: 20, blue: 30}`
 * - `{h: 10, s: 20, l: 30}`
 * - `0x00ff00`, `0x0000ff` numbers
 *
 * ## Not parsed strings
 *
 * - `'yellowblue'` returns `null`
 *
 * ```ts
 * parse('hsla(12 10% 50% / .3)')
 * // { space: 'hsl', values: [12, 10, 50], alpha: 0.3 }
 * ```
 *
 * @param cstr - значение цвета в разном формате
 */
export function parse(cstr: Cstr): Color {
  let m
  //   parts: Color['values'] = [],
  //   alpha: Color['alpha'] = 1,
  //   space: Color['space']

  // alpha
  const isNotTransparent = 1
  const isTransparent = 0

  // spaces
  const rgbSpace = 'rgb'

  if (typeof cstr === 'string') {
    //keyword
    if (COLOR_NAMES[cstr as keyof typeof COLOR_NAMES]) {
      return {
        space: rgbSpace,
        values: COLOR_NAMES[cstr as keyof typeof COLOR_NAMES].slice(),
        alpha: isNotTransparent,
      }
    }

    //reserved words
    else if (cstr === 'transparent') {
      return {
        space: rgbSpace,
        values: COLOR_NAMES.black,
        alpha: isTransparent,
      }
    }

    //hex
    else if (/^#[A-Fa-f0-9]+$/.test(cstr)) {
      const base = cstr.slice(1)
      const size = base.length
      const isShort = size <= 4
      let values
      let alpha = isNotTransparent

      if (isShort) {
        values = [
          parseInt(base[0] + base[0], 16),
          parseInt(base[1] + base[1], 16),
          parseInt(base[2] + base[2], 16),
        ]
        if (size === 4) {
          alpha = parseInt(base[3] + base[3], 16) / 255
        }
      } else {
        values = [
          parseInt(base[0] + base[1], 16),
          parseInt(base[2] + base[3], 16),
          parseInt(base[4] + base[5], 16),
        ]
        if (size === 8) {
          alpha = parseInt(base[6] + base[7], 16) / 255
        }
      }

      if (!values[0]) {
        values[0] = 0
      }
      if (!values[1]) {
        values[1] = 0
      }
      if (!values[2]) {
        values[2] = 0
      }

      return {
        space: rgbSpace,
        values,
        alpha,
      }
    }

    //color space
    else if (
      (m =
        /^((?:rgb|hs[lvb]|hwb|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms)a?)\s*\(([^)]*)\)/.exec(
          cstr
        ))
    ) {
      const name = m[1]
      const isRGB = name === 'rgb'
      const base = name.replace(/a$/, '')
      const space = base
      let size = base === 'gray' ? 1 : 3

      if (base === 'cmyk') {
        size = 4
      }
      let values = m[2]
        .trim()
        .split(/\s*[,/]\s*|\s+/)
        .map((x, i) => {
          //<percentage>
          if (/%$/.test(x)) {
            //alpha
            if (i === size) {
              return parseFloat(x) / 100
            }
            //rgb
            if (base === 'rgb') {
              return (parseFloat(x) * 255) / 100
            }

            return parseFloat(x)
          }
          //hue
          else if (base[i] === 'h') {
            //<deg>
            if (/deg$/.test(x)) {
              return parseFloat(x)
            }
            //<base-hue>
            else if (baseHues[x as keyof typeof baseHues] !== undefined) {
              return baseHues[x as keyof typeof baseHues]
            }
          }

          return parseFloat(x)
        })

      if (name === base) {
        values.push()
      }
      let alpha = values[size] === undefined ? 1 : values[size]

      if (isRGB) {
        alpha = 1
      }
      values = values.slice(0, size)

      return {
        space,
        values,
        alpha,
      }
    }

    // named channels case
    /*
     * (R12 / G45 / B234)
     * R:12 G:45 B:234
     * C100/M80/Y0/K35
     */
    else if (cstr.length > 10 && /[0-9](?:\s|\/)/.test(cstr)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe
      const values = cstr.match(/([0-9]+)/g)!.map(function (value) {
        return parseFloat(value)
      })

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe
      const space = cstr
        .match(/([a-z])/gi)!
        .join('')
        .toLowerCase()

      return {
        space,
        values,
        alpha: isNotTransparent,
      }
    }
  }

  //numeric case
  else if (!isNaN(cstr as number)) {
    const values = [
      (cstr as number) >>> 16,
      ((cstr as number) & 0x00ff00) >>> 8,
      (cstr as number) & 0x0000ff,
    ]

    return {
      space: rgbSpace,
      values,
      alpha: isNotTransparent,
    }
  }

  //array-like
  else if (Array.isArray(cstr)) {
    return {
      space: rgbSpace,
      values: [cstr[0], cstr[1], cstr[2]],
      alpha: cstr.length === 4 ? cstr[3] : isNotTransparent,
    }
  }

  //object case - detects css cases of rgb and hsl
  else if (cstr instanceof Object) {
    let space, values

    if (cstr.r != null || cstr.red != null || cstr.R != null) {
      space = 'rgb'
      values = [
        cstr.r || cstr.red || cstr.R || 0,
        cstr.g || cstr.green || cstr.G || 0,
        cstr.b || cstr.blue || cstr.B || 0,
      ]
    } else {
      space = 'hsl'
      values = [
        cstr.h || cstr.hue || cstr.H || 0,
        cstr.s || cstr.saturation || cstr.S || 0,
        cstr.l || cstr.lightness || cstr.L || cstr.b || cstr.brightness,
      ]
    }

    let alpha = cstr.a || cstr.alpha || cstr.opacity || isNotTransparent

    if (cstr.opacity != null) {
      alpha /= 100
    }

    return {
      space,
      values,
      alpha,
    }
  }

  // invalid color
  return {
    space: undefined,
    values: COLOR_NAMES.black,
    alpha: isNotTransparent,
  }
}

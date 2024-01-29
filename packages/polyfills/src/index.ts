import 'core-js/modules/es.array.fill.js'
import 'core-js/modules/es.array.find.js'
import 'core-js/modules/es.array.includes.js'
import 'core-js/modules/es.array.iterator.js'
import 'core-js/modules/es.object.assign.js'
import 'core-js/modules/es.promise.js'
import 'core-js/modules/es.regexp.constructor.js'
import 'core-js/modules/es.regexp.exec.js'
import 'core-js/modules/es.string.includes.js'
import 'core-js/modules/es.string.iterator.js'
import 'core-js/modules/es.string.starts-with.js'
import 'core-js/modules/es.symbol.description.js'
import 'core-js/modules/es.symbol.iterator.js'
import 'core-js/modules/es.symbol.js'
import { ResizeObserver } from '@juggle/resize-observer'

if (typeof window !== 'undefined') {
  if (!('ResizeObserver' in window)) {
    window.ResizeObserver = ResizeObserver
  }
}

/**
 * Element.closest()
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#polyfill
 *  */
if (!Element.prototype.closest) {
  // @ts-ignore
  Element.prototype.closest = function (s) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let el = this

    do {
      if (Element.prototype.matches.call(el, s)) {
        return el
      }
      // @ts-ignore
      el = el.parentElement || el.parentNode
    } while (el !== null && el.nodeType === 1)

    return null
  }
}

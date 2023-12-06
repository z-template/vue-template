/* eslint-disable */
/* prettier-ignore */

import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    type Element = VNode
    // @ts-ignore
    type ElementClass = Vue
    // @ts-ignore
    interface IntrinsicElements {
      [elem: number]: any
    }
  }
}

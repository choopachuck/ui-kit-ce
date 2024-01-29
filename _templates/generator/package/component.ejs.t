---
to: packages/<%= h.changeCase.paramCase(name) %>/src/<%= h.changeCase.pascal(name) %>.tsx
---

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'

const useStyles = createUseStyles((theme) => ({
  root: {},
}))

type Classes = Partial<Record<'root', string>>

export interface <%= h.changeCase.pascal(name)%>Props {
  /**
  * CSS классы компонента
  */
  classes?: Classes
}

export const <%= h.changeCase.pascal(name)%> = React.forwardRef(
  ({ classes, ...rest }: <%= h.changeCase.pascal(name)%>Props, ref: React.Ref<HTMLDivElement>) => {
    const classList = useStyles()

    const classesMap: Required<Classes> = {
      root: clsx(classList.root, classes?.root),
    }

    return (
      <div className={classesMap.root} {...rest} ref={ref}>
        New component
      </div>
    )
  }
)

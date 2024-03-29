import * as React from 'react'
import { AvatarGroup } from '@v-uik/base'

export const AvatarGroupColoring = () => {
  return (
    <div style={{ display: 'grid', gridRowGap: 16 }}>
      <AvatarGroup
        coloring="static"
        items={[
          { children: 'UN' },
          { children: 'UN' },
          { children: 'UN' },
          { children: 'UN' },
          { children: 'UN' },
        ]}
      />
      <AvatarGroup
        coloring="random"
        items={[
          { children: 'UN' },
          { children: 'UN' },
          { children: 'UN' },
          { children: 'UN' },
          { children: 'UN' },
        ]}
      />
    </div>
  )
}

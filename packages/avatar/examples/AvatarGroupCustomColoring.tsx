import * as React from 'react'
import {
  AvatarGroup,
  shuffle,
  AvatarGroupColoringType,
  UsePaletteColors,
} from '@v-uik/base'

const customPalette: UsePaletteColors[] = [
  {
    backgroundColor: 'red',
    textColor: '#FFF',
  },
  {
    backgroundColor: 'blue',
    textColor: '#FFF',
  },
  {
    backgroundColor: 'pink',
    textColor: '#000',
  },
  {
    backgroundColor: 'black',
    textColor: '#FFF',
  },
]

const getPalette = (coloring: AvatarGroupColoringType) => {
  return coloring === 'random' ? shuffle(customPalette) : customPalette
}

export const AvatarGroupCustomColoring = () => {
  return (
    <div style={{ display: 'grid', gridRowGap: 16 }}>
      <AvatarGroup
        items={[
          { children: 'UN' },
          { children: 'UN' },
          { children: 'UN' },
          { children: 'UN' },
          { children: 'UN' },
        ]}
        coloring="static"
        getPalette={getPalette}
      />
      <AvatarGroup
        items={[
          { children: 'UN' },
          { children: 'UN' },
          { children: 'UN' },
          { children: 'UN' },
          { children: 'UN' },
        ]}
        coloring="random"
        getPalette={getPalette}
      />
    </div>
  )
}

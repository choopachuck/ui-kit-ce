import * as React from 'react'
import {
  Code as ShowRoomCode,
  CodeProps,
} from '../../../docs/showroom/components'

export const Code: React.FC<CodeProps> = (props) => (
  <div style={{ marginTop: 48 }}>
    <ShowRoomCode
      {...props}
      gutters
      noElevation
      withClear
      noRound
      kind="dark"
    />
  </div>
)

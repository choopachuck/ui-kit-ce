import * as React from 'react'
import { FileItem, FileItemIconButton, getIconSize } from '@v-uik/base'

import { SquareIcon } from '../icons/SquareIcon'
import { EyeIcon } from '../icons/EyeIcon'
import { DownloadIcon } from '../icons/DownloadIcon'

export const ExtendedButtonIcons = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <FileItem
        status="success"
        renderIconButtons={({ size = 'md' }) => (
          <>
            <FileItemIconButton size={size} onClick={(e) => console.log(e)}>
              <EyeIcon {...getIconSize(size)} />
            </FileItemIconButton>
            <FileItemIconButton size={size} onClick={(e) => console.log(e)}>
              <DownloadIcon {...getIconSize(size)} />
            </FileItemIconButton>
          </>
        )}
        onCancel={(e) => console.log(e)}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SquareIcon style={{ marginRight: 8 }} />
          <span>FileName.png</span>
        </div>
      </FileItem>
    </div>
  )
}

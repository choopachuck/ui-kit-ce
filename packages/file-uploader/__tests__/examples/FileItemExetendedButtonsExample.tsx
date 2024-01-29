import * as React from 'react'
import { FileItem, FileItemIconButton, FileItemOwnProps } from '@v-uik/base'
import AddIcon from '../../examples/icons/AddIcon'

export const FileItemExtendedButtonsExample: React.FC<
  Omit<FileItemOwnProps, 'onCancel' | 'children'>
> = (props) => {
  return (
    <div style={{ padding: 4 }}>
      <FileItem
        onCancel={() => null}
        {...props}
        renderIconButtons={({ size }) => (
          <>
            <FileItemIconButton size={size}>
              <AddIcon />
            </FileItemIconButton>
            <FileItemIconButton size={size}>
              <AddIcon />
            </FileItemIconButton>
          </>
        )}
      >
        FileName.png
      </FileItem>
    </div>
  )
}

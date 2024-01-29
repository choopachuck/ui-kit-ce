// https://github.com/react-dropzone/attr-accept/blob/master/src/index.js
import { UploaderFile } from '../types'

export const accept = (
  file: File,
  acceptedFiles?: string | string[]
): boolean => {
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles)
      ? acceptedFiles
      : acceptedFiles.split(',')
    const fileName = file.name || ''
    const mimeType = (file.type || '').toLowerCase()
    const baseMimeType = mimeType.replace(/\/.*$/, '')

    return acceptedFilesArray.some((type) => {
      const validType = type.trim().toLowerCase()
      if (validType.charAt(0) === '.') {
        return fileName.toLowerCase().endsWith(validType)
      } else if (validType.endsWith('/*')) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '')
      }

      return mimeType === validType
    })
  }

  return true
}

export const filterFilesByAccept = (
  files: File[],
  acceptFiles?: string | string[]
): UploaderFile[] => {
  return files.map((file) => {
    return {
      file,
      error: accept(file, acceptFiles) ? undefined : 'FILE_INVALID_TYPE',
    }
  })
}

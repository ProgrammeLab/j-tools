import * as React from 'react'
import InnerUpload from './uploader'

export type UploadProps = {
  url?: string
  children?: React.ReactNode
}

export const Upload: React.FC<UploadProps> = ({ children }) => {
  return <InnerUpload>
    {children}
  </InnerUpload>
}
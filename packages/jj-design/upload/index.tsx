import * as React from 'react'

export type UploadProps = {
  url: string
}


export const Upload: React.FC<UploadProps> = () => {
  return <div>
    点击上传<input type="file" />
  </div>
}
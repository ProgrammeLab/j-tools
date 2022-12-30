import * as React from 'react'
import InnerUpload from './uploader'

export type UploadProps = {
  url?: string
  children?: React.ReactNode
}

export const Upload: React.FC<UploadProps> = ({ children }) => {
  const [loadedFiles, setLoadedFiles] = React.useState<File[]>()
  const say = () => {
    console.log('hello')
  }

  const renderLoadedFile = React.useMemo(() => {
    return loadedFiles?.map(file => {
      return <div key={file.name}>{file.name}</div>
    })
  }, [loadedFiles])


  const onBatchStart = (param) => {
    setLoadedFiles(param)
  }

  return <InnerUpload onBatchStart={onBatchStart} action='http://127.0.0.1:3000/upload'>
    {children}
    {renderLoadedFile}
  </InnerUpload>
}
import * as React from 'react'
import InnerUpload from './uploader'
import { FileWithUid } from './interface'
import { getNextFileList } from './utils'

export type UploadProps = {
  url?: string
  children?: React.ReactNode
}

export const Upload: React.FC<UploadProps> = ({ children }) => {
  const [loadedFiles, setLoadedFiles] = React.useState<FileWithUid[]>()
  const say = () => {
    console.log('hello')
  }

  const renderLoadedFile = React.useMemo(() => {
    return loadedFiles?.map(file => {
      return <div key={file.uid}>{file.name}</div>
    })
  }, [loadedFiles])


  const onBatchStart = (param: FileWithUid[]) => {
    let nextFileList = [...param]
    param.forEach((file) => {
      nextFileList = getNextFileList(file, loadedFiles || [])
    })
    setLoadedFiles(nextFileList)
  }

  return <InnerUpload onBatchStart={onBatchStart} action='http://127.0.0.1:3000/upload'>
    {children}
    {renderLoadedFile}
  </InnerUpload>
}
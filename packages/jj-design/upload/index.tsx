import * as React from 'react'
import InnerUpload from './uploader'
import { FileWithUid } from './interface'
import { getNextFileList } from './utils'
import './index.less'

export type UploadProps = {
  url?: string
  children?: React.ReactNode
  /**
   * 上传组件类型
   * 支持: button / drag
   */
  type?: string
}

export const Upload: React.FC<UploadProps> = (props) => {

  const { children, type } = props
  const [loadedFiles, setLoadedFiles] = React.useState<FileWithUid[]>()

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

  if (type === 'drag') {
    return <>
      <div className='upload-drag'>
        <InnerUpload onBatchStart={onBatchStart} action='http://127.0.0.1:3000/upload'>
          {children}
        </InnerUpload>
      </div>
      {renderLoadedFile}
    </>
  }

  return <InnerUpload onBatchStart={onBatchStart} action='http://127.0.0.1:3000/upload'>
    {children}
    {renderLoadedFile}
  </InnerUpload>
}
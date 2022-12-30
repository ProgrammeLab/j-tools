import * as React from 'react'
import { FileWithUid, InnerUploadProps } from './interface'
import { uploadFile as post } from './request'
import { getUid, isFileAccept } from './utils'


const Uploader: React.FC<React.PropsWithChildren<InnerUploadProps>> = (props) => {

  const { children, accept = '*', directory, action = '', onBatchStart } = props
  const inputRef = React.useRef<HTMLInputElement>(null)

  const [uid, setUid] = React.useState(getUid())


  const onClick = () => {
    if (!inputRef.current) {
      return
    }
    inputRef.current.click()
  }

  const events = {
    onClick
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const acceptedFiles = [...(files ?? [])].filter(
      (file: File) => !directory || isFileAccept(file, accept),
    );

    uploadFile(acceptedFiles)
    setUid(getUid())
  };

  const uploadFile = (files: File[]) => {

    const filesWithUid = [...(files ?? [])].map((item: File & { uid?: string }) => {
      item.uid = getUid()
      return item
    })

    onBatchStart?.(filesWithUid as any)

    filesWithUid.forEach(file => {
      post({ data: file, action })
    })
  }

  return <div {...events}>
    <input type="file" ref={inputRef} onChange={onChange} style={{ display: 'none' }} />
    {children}
  </div>
}

export default Uploader
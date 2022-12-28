import * as React from 'react'
import { InnerUploadProps } from './interface'


const Uploader: React.FC<React.PropsWithChildren<InnerUploadProps>> = ({ children, accept, directory }) => {

  const inputRef = React.useRef<HTMLInputElement>(null)


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
    // const acceptedFiles = [...(files ?? [])].filter(
    //   (file: File) => !directory || attrAccept(file, accept),
    // );
    console.log(files)
    // this.uploadFiles(acceptedFiles);
    // this.reset();
  };

  return <div {...events}>
    <input type="file" ref={inputRef} onChange={onChange} style={{ display: 'none' }} />
    {children}
  </div>
}

export default Uploader
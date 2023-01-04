export type InnerUploadProps = Partial<{
  accept: string,
  directory: boolean
  action: string
  onChange?: () => void
  onBatchStart?: (param: FileWithUid[]) => void
}> & React.HTMLProps<HTMLInputElement>

export interface UploadProgressEvent extends ProgressEvent {
  percent?: number;
}

export type FileWithUid = File & {
  uid: string
}

export interface uploadFileParams {
  /**
   * 文件数据
   */
  data?: File & { uid?: string }
  /**
   * 上传地址
   */
  action: string
}
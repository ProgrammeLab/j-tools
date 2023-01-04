import { FileWithUid } from './interface';

const now = +new Date();
let index = 0;

export const getUid = () => {
  return `upload-file-${now}-${index++}`;
};

export const isFileAccept = (file: File, acceptedFiles: string | string[]) => {
  const fileName = file.name;
  const mimeType = file.type;
  const acceptFileTypeArray = Array.isArray(acceptedFiles)
    ? acceptedFiles
    : acceptedFiles.split(',');

  return acceptFileTypeArray.some((type) => {
    const typeString = type.trim();
    return type === '*' || fileName.endsWith(typeString) || mimeType === typeString;
  });
};

/**
 * 获取文件列表
 */
export const getNextFileList = (file: FileWithUid, fileList: FileWithUid[]) => {
  const nextFileList = [...fileList];
  const fileIndex = nextFileList.findIndex(({ uid }: FileWithUid) => uid === file.uid);
  fileIndex === -1 ? nextFileList.push(file) : (nextFileList[fileIndex] = file);
  return nextFileList;
};

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
    return (
      type === '*' || fileName.endsWith(typeString) || mimeType === typeString
    );
  });
};

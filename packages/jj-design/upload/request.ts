import { UploadProgressEvent, uploadFileParams } from './interface';

export const uploadFile = (params: uploadFileParams) => {
  const formData = new FormData();
  formData.append('file', params.data ?? '');
  const xhr = new XMLHttpRequest();
  xhr.open('post', params.action, true);

  xhr.onload = () => {
    console.log('loaded');
  };

  xhr.upload.onprogress = (e: UploadProgressEvent) => {
    if (e.total > 0) {
      e.percent = (e.loaded / e.total) * 100;
      console.log('upload progress:', e.percent);
    }
  };

  xhr.send(formData);

  return {
    abort: () => {
      xhr.abort();
    },
  };
};

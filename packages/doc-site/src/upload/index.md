# Upload 上传

## 普通上传

```tsx
import { Upload } from 'jj-design';

export default () => <Upload>选择文件</Upload>;
```

## 选择多文件

```tsx
import { Upload } from 'jj-design';

export default () => <Upload multiple>选择多文件</Upload>;
```

## drag 模式

```tsx
import { Upload } from 'jj-design';

export default () => (
  <Upload type="drag">Click or Drag file to this area to upload</Upload>
);
```

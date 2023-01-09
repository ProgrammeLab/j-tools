# VirtualList 虚拟列表

## 常规

```tsx
import { VirtualList } from 'jj-design';

const data = [];

for (let i = 0; i < 1000; i++) {
  data.push(i);
}

export default () => <VirtualList data={data} height={300}></VirtualList>;
```

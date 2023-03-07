# Tabs 标签页

## 基本使用

```tsx
import { Tabs } from 'jj-design';
import { useState } from 'react';

const items = [
  {
    key: 1,
    label: 'tab 1',
    children: '1',
  },
  {
    key: 2,
    label: 'tab 2',
    children: '2',
  },
  {
    key: 3,
    label: 'tab 3',
    children: '3',
  },
  {
    key: 4,
    label: 'tab 4',
    children: '4',
  },
];

const pos = ['top', 'bottom', 'left', 'right'];

export default () => {
  const [p, setP] = useState('top');
  return (
    <>
      <div style={{ margin: '10px' }}>
        <span>{p}</span>
        {pos.map((i) => (
          <button key={i} style={{ margin: '0 8px' }} onClick={() => setP(i)}>
            {i}
          </button>
        ))}
      </div>
      <Tabs items={items} tabPosition={p} />
    </>
  );
};
```

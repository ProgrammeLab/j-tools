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
const style = {};

export default () => {
  const [p, setP] = useState('top');
  return (
    <>
      <div>
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

## 受控模式

```tsx
import * as React from 'react';
import { Tabs } from 'jj-design';

const items = [
  {
    key: 1,
    label: '111',
    children: 1111,
  },
  {
    key: 2,
    label: '222',
    children: 2222,
  },
  {
    key: 3,
    label: '333',
    children: 3333,
  },
];

export default () => {
  const [ack, setAck] = React.useState(1);

  const onClick = () => {
    setAck((pre) => {
      if (pre + 1 > 3) {
        return 1;
      }
      return pre + 1;
    });
  };

  const onChange = (key) => {
    setAck(key);
  };

  return (
    <>
      <div>
        <button onClick={onClick}>change</button>
      </div>
      <Tabs items={items} onChange={onChange} activeKey={ack} />
    </>
  );
};
```

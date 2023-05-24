import { Button, Tabs } from 'jj-design';
import * as React from 'react';
import { useState } from 'react';

const items = [
  {
    key: "1",
    label: 'tab 1',
    children: '1',
  },
  {
    key: "2",
    label: 'tab 2',
    children: '2',
  },
  {
    key: "3",
    label: 'tab 3',
    children: '3',
  },
  {
    key: "4",
    label: 'tab 4',
    children: '4',
  },
];

const pos: Array<'top' | 'bottom' | 'left' | 'right'> = ['top', 'bottom', 'left', 'right'];

// eslint-disable-next-line react/display-name
export default () => {
  const [p, setP] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  return (
    <>
      <div>
        <span>{p}</span>
        {pos.map((i) => (
          <Button key={i}
            style={{ margin: '0 8px' }}
            onClick={() => setP(i)}>
            {i}
          </Button>
        ))}
      </div>
      <Tabs items={items}
        tabPosition={p} />
    </>
  );
};

import { Button, Tabs } from 'jj-design';
import * as React from 'react';

const items = [
  {
    key: "1",
    label: '111',
    children: 1111,
  },
  {
    key: "2",
    label: '222',
    children: 2222,
  },
  {
    key: "3",
    label: '333',
    children: 3333,
  },
];

// eslint-disable-next-line react/display-name
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
        <Button onClick={onClick}>change</Button>
      </div>
      <Tabs items={items}
        onChange={onChange}
        activeKey={String(ack)} />
    </>
  );
};

import { Button } from 'jj-design';
import * as React from 'react';

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <>
      <Button>Default</Button>
      &nbsp;
      <Button btnType="primary">Primary</Button>
      &nbsp;
      <Button btnType="text">text btn</Button>
      &nbsp;
      <Button btnType="danger">danger btn</Button>
    </>
  );
};

import React from 'react';
import { Animated, Button } from 'jj-design';
import './index.css';

// eslint-disable-next-line react/display-name
export default () => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <div>
        <Button onClick={() => setShow((pre) => !pre)}>setShow</Button>
      </div>
      {show && <Animated enterFrom='fade-enter-from'
        enterActive='fade-enter-active'
        enterTo='fade-enter-to'
        leaveTo='fade-exit-active'
        leaveActive='fade-exit-active'>
        <div>this is animated children</div>
      </Animated>}

    </>
  );
};

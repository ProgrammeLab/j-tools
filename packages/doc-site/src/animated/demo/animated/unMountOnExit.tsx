import React from 'react';
import { Transition, Button } from 'jj-design';
import './index.css';

// eslint-disable-next-line react/display-name
export default () => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <div>
        <Button onClick={() => setShow((pre) => !pre)}>setShow</Button>
      </div>
      {<Transition
        in={show}
        enterFrom='fade-enter-from'
        enterActive='fade-enter-active'
        enterTo='fade-enter-to'
        leaveActive='fade-leave-active'
        leaveFrom='fade-leave-from'
        leaveTo='fade-leave-to'
        unMountOnExit
      >
        <div>this is animated children</div>
      </Transition>}

    </>
  );
};

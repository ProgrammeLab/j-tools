import * as React from 'react';
import { ScrollItem } from './item';
import './index.css';

// eslint-disable-next-line react/display-name
export default () => {
  const [nums] = React.useState(new Array(10).fill(0));
  return <div className='comp-root'>
    {nums.map((_, index) => {
      return <ScrollItem id={index}
        key={index} />;
    })}
  </div>;
};

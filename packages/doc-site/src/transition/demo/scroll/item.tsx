import * as React from 'react';
import { Transition } from 'jj-design';

export const ScrollItem = () => {
  const [active, setActive] = React.useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);
  const intersectionObserver = React.useMemo(() => {
    return new IntersectionObserver((entries) => {
      console.log(entries, entries[0].intersectionRatio);
      entries.forEach(item => {
        if (item.intersectionRatio > 0) {
          setActive(true);
        }
      });
    });
  }, []);

  React.useEffect(() => {
    if (!domRef.current)
      return;

    intersectionObserver.observe(domRef.current!);
    const node = domRef.current;

    return () => {
      intersectionObserver.unobserve(node);
    };
  }, [intersectionObserver]);

  return <Transition
    in={active}
    ref={domRef}
    enterTo='fade-to'
    enterFrom='fade-from'>
    <div
      style={{
        height: "60px",
        width: "100%",
        background: '#000ff',
        position: 'relative'
      }}>
      <p>this is a paragraph</p>
    </div>
  </Transition>;
  // return <div ref={domRef}
  //   style={{
  //     height: "60px",
  //     width: "100%",
  //     background: '#000ff',
  //     position: 'relative'
  //   }}>
  //   <p>this is a paragraph</p>
  // </div>;
};

import * as React from 'react';
import { Transition } from 'jj-design';

export const ScrollItem: React.FC<{ id: number }> = (props) => {
  const [active, setActive] = React.useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);
  const intersectionObserver = React.useMemo(() => {
    return new IntersectionObserver((entries) => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          setActive(true);
        }
      });
    });
  }, []);

  React.useEffect(() => {
    if (!domRef.current)
      return;

    intersectionObserver.observe(domRef.current!);

    return () => {
      intersectionObserver.disconnect();
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
      <p>this is a paragraph:<b>{props.id}</b></p>
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

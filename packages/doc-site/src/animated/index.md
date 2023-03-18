# Animated 按钮

> 类似 vue 的 Transition

## 基本使用

<code src="./demo/animated/index.tsx" description="默认">默认使用</code>

## 使用 unMountOnExit = true, 在 leave-to 阶段结束后不保留 dom

<code src="./demo/animated/unMountOnExit.tsx" description="默认">默认使用</code>

<!-- ```tsx
import { Animated } from 'jj-design';

export default () => {
  return (
    <>
      <Animated>
        <div>this is animated children</div>
      </Animated>
    </>
  );
};
``` -->

# Transition 过度动画

> 类似 vue 的 Transition
> 使用 in props 控制过度状态，这里有两个状态变化
> in: false -> true 触发 enterFrom-> enterActive->enterTo 过度
> in: true -> false 触发 leaveFrom -> leaveActive -> leaveTo 过度

## 基本使用

<code src="./demo/animated/index.tsx" description="使用 in 控制过度的开始与结束">默认使用</code>

## 使用 unMountOnExit = true, 在 leave-to 阶段结束后不保留 dom

<code src="./demo/animated/unMountOnExit.tsx" description="使用 unMountOnExit = true, 在 leave-to 阶段结束后不保留 dom">默认使用</code>

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

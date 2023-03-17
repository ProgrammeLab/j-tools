export type AnimatedProps = {
  children: React.ReactNode | Function;
  enter?: boolean;
  appear?: boolean;
  /**
   * 控制显隐
   */
  in: boolean;
  /**
   * 进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。
   */
  enterFrom?: string;
  /**
   * 进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完* 成之后移除。这个 class 可以被用来定义进入动画的持续时间、延迟与速度曲线类型。
   */
  enterActive?: string;
  /**
   * 进入动画的结束状态。在元素插入完成后的下一帧被添加 (也就是 enter-from 被移除的* 同时)，在过渡或动画完成之后移除。
   */
  enterTo?: string;
  /**
   * 离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。
   */
  leaveFrom?: string;
  /**
   * 离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过* 渡或动画完成之后移除。这个 class 可以被用来定义离开动画的持续时间、延迟与速度曲* 线类型。
   */
  leaveActive?: string;
  /**
   * 离开动画的结束状态。在一个离开动画被触发后的下一帧被添加 leave-from
   */
  leaveTo?: string;
  /**
   * 在 leave to 后是否保留 dom
   */
  unMountOnExit?: boolean;
  /**
   * 动画持续时间
   */
  duration?: number;
};

export type TransitionContextType = {
  isMounting: boolean;
};

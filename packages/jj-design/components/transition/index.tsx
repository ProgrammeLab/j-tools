import * as React from 'react'
import type { AnimatedProps } from './interface'

enum TransitionStatus {
  UNMOUNTED = 'unmounted',
  ENTER_FROM = 'enterFrom',
  ENTER_ACTIVE = 'enterActive',
  ENTER_TO = 'enterTo',
  LEAVE_FROM = 'leaveFrom',
  LEAVE_ACTIVE = 'leaveActive',
  LEAVE_TO = 'leaveTo'
}

/**
 * 类似 vue 的 Transition 组件
 */
const Transition: React.FC<React.PropsWithRef<AnimatedProps>> = React.forwardRef((props, ref) => {

  const { children, enterFrom = 't-enter-from', enterTo = 't-enter-to', enterActive = 't-enter-active', leaveTo = 't-leave-to', in: inProps, duration = 1000, leaveFrom = '', leaveActive = 't-leave-active', unMountOnExit = false, unMountOnEnter = false } = props

  const [status, setStatus] = React.useState<TransitionStatus>(unMountOnEnter ? TransitionStatus.UNMOUNTED : TransitionStatus.ENTER_FROM)
  const mountRef = React.useRef<any>(null);
  const nodeRef = React.useRef<HTMLElement | null>(null)
  /**
   * any time, there only one timer running
   */
  const timerRef = React.useRef<NodeJS.Timeout | null>()

  // function onTransitionEnd() {
  //   nodeRef?.current?.classList.remove(enterActive, enterTo)
  // }

  /**
   * 渲染的真实children
   */
  const Component = React.useMemo(() => {
    const ele = React.cloneElement(children as React.ReactElement, {
      ref: (instance) => {
        nodeRef.current = instance;
        if (ref) {
          if (typeof ref === 'function') {
            ref(nodeRef.current);
          } else if (ref && typeof ref === 'object') {
            ref.current = nodeRef.current;
          }
        }
      },
      className: enterFrom,
    })
    return ele;
  }, [])

  /**
   * timerOut 模拟 transitionEnd 事件
   * @param status 
   */
  const timeoutTransition = (status: TransitionStatus) => {
    timerRef.current = setTimeout(() => {
      setStatus(status);
      timerRef.current = null;
      (unMountOnExit && status === TransitionStatus.LEAVE_TO) && setStatus(TransitionStatus.UNMOUNTED)
    }, duration)
  }

  /**
   * 下一帧回调
   * @param cb
   */
  const nextFrame = (cb) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb)
    })
  }

  const startTransition = (nextStatus) => {
    switch (nextStatus) {
      case TransitionStatus.ENTER_TO:
        // current status is [ enter_from -> enter_active -> enter_to ]
        nodeRef.current?.setAttribute('class', `${enterActive} ${enterFrom}`)
        nextFrame(() => {
          nodeRef.current?.setAttribute('class', `${enterActive} ${enterTo}`)
        })
        timeoutTransition(TransitionStatus.ENTER_TO)
        break;
      case TransitionStatus.LEAVE_TO:
        // current status is [ leave_from -> leave_active -> leave_to ]
        nodeRef.current?.setAttribute('class', `${leaveActive} ${leaveFrom}`)
        nextFrame(() => {
          nodeRef.current?.setAttribute('class', `${leaveActive} ${leaveTo}`)
        })
        timeoutTransition(TransitionStatus.LEAVE_TO)
        break;
    }
  }


  React.useLayoutEffect(() => {
    if (!mountRef.current) {
      // 第一次渲染，不做任何状态改变，因为第一次仅仅是渲染
      mountRef.current = children
      return
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (inProps) {
      // enter-active
      setStatus(TransitionStatus.ENTER_ACTIVE)
      startTransition(TransitionStatus.ENTER_TO)
    } else {
      // leave-active
      setStatus(TransitionStatus.LEAVE_ACTIVE)
      startTransition(TransitionStatus.LEAVE_TO)
    }
  }, [inProps])

  return <>
    {status === TransitionStatus.UNMOUNTED ? null : Component}
  </>
})

export default Transition;

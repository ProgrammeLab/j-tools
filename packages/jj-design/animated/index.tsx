import * as React from 'react'
import { findDOMNode } from 'react-dom'
import TransitionContext from './TransitionContext'
import type { AnimatedProps, TransitionContextType } from './interface'

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
export const Animated: React.FC<AnimatedProps> = (props) => {
  // 如果有 TransitionGroup
  // const parentGroup = React.useContext<TransitionContextType | null>(TransitionContext)

  const { children, enterFrom = '', enterTo = '', enterActive = '', leaveTo = '', in: inProps, duration = 1000, leaveFrom = '', leaveActive = '' } = props

  // const appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear

  const [status, setStatus] = React.useState(() => {
    // 初始状态为 true
    if (inProps) {
      return TransitionStatus.ENTER_FROM
    }
    return TransitionStatus.UNMOUNTED
  })
  const mountRef = React.useRef(false);
  const nodeRef = React.useRef<HTMLElement>(null)

  function onTransitionEnd() {
    nodeRef.current?.classList.remove(enterActive, enterTo)
  }

  /**
   * 渲染的真实children
   */
  const Component = React.useMemo(() => {
    const ele = React.cloneElement(children as React.ReactElement, {
      ref: nodeRef,
      className: enterFrom
    })
    return ele;
  }, [children])

  // React.useLayoutEffect(() => {
  //   const dom = React.isValidElement(nodeRef.current) ? findDOMNode(nodeRef.current) : nodeRef.current;

  //   dom?.classList.add(enterActive)
  //   dom?.addEventListener('transitionend', onTransitionEnd)
  //   // 不得不说 requestAnimationFrame 实现异步，太赞了👍
  //   requestAnimationFrame(() => {
  //     requestAnimationFrame(() => {
  //       dom?.classList.remove(enterFrom);
  //       dom?.classList.add(enterTo);
  //     })
  //   })

  //   return () => {
  //     dom?.classList.remove(enterActive)
  //     // dom?.classList.add(leaveTo)
  //   }
  // }, [])

  const setNextTransitionStatus = () => {

  }

  const startTransition = (nextStatus) => {
    const dom = React.isValidElement(nodeRef.current) ? findDOMNode(nodeRef.current) : nodeRef.current;

    switch (nextStatus) {
      case TransitionStatus.ENTER_TO:
        // current status is enter_active
        dom?.classList.add(enterActive)
        // dom?.addEventListener('transitionend', onTransitionEnd)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // dom?.classList.remove(enterFrom);
            // dom?.classList.add(enterTo);
            dom?.setAttribute('class', `${enterActive} ${enterTo}`)
          })
        })
        setTimeout(() => {
          setStatus(TransitionStatus.ENTER_TO);
        }, duration)
        break;
      case TransitionStatus.LEAVE_TO:
        dom?.classList.add(leaveActive)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            dom?.setAttribute('class', `${leaveActive} ${leaveTo}`)
            // dom?.classList.remove(leaveFrom);
            // dom?.classList.add(leaveTo);
          })
        })
        setTimeout(() => {
          setStatus(TransitionStatus.ENTER_TO);
        }, duration)
        break;
    }
  }


  React.useEffect(() => {
    // if ()
    // if (status === TransitionStatus.ENTER_ACTIVE || status === TransitionStatus.LEAVE_ACTIVE)
    //   return;
    // else 
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
}

// Animated.defaultProps = {
//   enter:
// }
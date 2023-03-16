import * as React from 'react'
import TransitionContext from './TransitionContext'
import type { AnimatedProps, TransitionContextType } from './interface'

enum ComponentStatus {
  UNMOUNTED = 'unmounted'
}

/**
 * 类似 vue 的 Transition 组件
 */
export const Animated: React.FC<AnimatedProps> = (props) => {
  // 如果有 TransitionGroup
  // const parentGroup = React.useContext<TransitionContextType | null>(TransitionContext)

  const { children, enterFrom = '', enterTo = '', enterActive = '', leaveTo = '' } = props

  // const appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear

  const [status, setStatus] = React.useState()
  const mountRef = React.useRef(false);
  const nodeRef = React.useRef<HTMLDivElement>(null)

  // const childProps = {
  //   className: ""
  // }

  React.useEffect(() => {
    // update
    if (mountRef.current) {
      nodeRef.current?.classList.add(enterTo)
    } else {
      // mount
      mountRef.current = true;
      nodeRef.current?.classList.remove(enterFrom)
      nodeRef.current?.classList.add(enterActive, enterTo)
    }
    return () => {
      nodeRef.current?.classList.remove(enterActive)
      nodeRef.current?.classList.add(leaveTo)
    }
  }, [])

  function onTransitionEnd() {
    nodeRef.current?.classList.replace(enterActive, enterTo)
  }

  return <>
    <div onTransitionEnd={onTransitionEnd} className={enterFrom} ref={nodeRef}>
      {typeof children === 'function' ? children(status, {}) : React.cloneElement(<>{children}</>)}
    </div>
  </>
}

// Animated.defaultProps = {
//   enter:
// }
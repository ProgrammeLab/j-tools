import * as React from 'react';
import { ButtonProps } from './interface'
import { classNames } from '../util/class-names';
import './index.less'

type BaseButtonProps = React.PropsWithChildren<ButtonProps>

export const Button: React.FC<BaseButtonProps> = React.forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
  const { onClick, children, loading, className } = props;

  const internalClick = (e: React.MouseEvent) => {
    if (loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e)
  }

  const classes = React.useMemo(() => {
    return classNames(className, "jj-btn", {
      "btn-loading": loading
    })
  }, [className])

  return <>
    <button onClick={internalClick} ref={ref} className={classes}>
      {children}
    </button>
  </>
})
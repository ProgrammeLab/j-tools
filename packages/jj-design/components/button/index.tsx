import * as React from 'react';
import { ButtonProps } from './interface'
import { classNames } from '../util/class-names';

type BaseButtonProps = React.PropsWithChildren<ButtonProps>

const Button: React.FC<BaseButtonProps> = React.forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
  const { onClick, children, loading, className, style, size = 'middle', btnType = 'default', block, round } = props;

  const internalClick = (e: React.MouseEvent) => {
    if (loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e)
  }

  const classes = React.useMemo(() => {
    return classNames(className, `btn-type-${btnType}`, `btn-size-${size}`, "jj-btn", {
      "btn-loading": loading,
      "btn-block": block,
      "btn-round": round
    })
  }, [className])

  return <>
    <button onClick={internalClick} ref={ref} className={classes} style={style}>
      {children}
    </button>
  </>
})

export default Button;
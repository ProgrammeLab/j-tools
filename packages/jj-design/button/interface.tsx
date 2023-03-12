import * as React from 'react'

export type ButtonProps = {
  btnType?: 'primary' | 'ghost' | 'link' | 'text' | 'default',
  onClick: (e: React.MouseEvent) => void,
  loading?: boolean,
  size?: 'middle' | 'small' | 'large'
  block?: boolean
} & React.ButtonHTMLAttributes<any>
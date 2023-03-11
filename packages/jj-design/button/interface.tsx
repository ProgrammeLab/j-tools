import * as React from 'react'

export type ButtonProps = {
  type?: 'primary' | 'ghost' | 'link' | 'text' | 'default',
  onClick: (e: React.MouseEvent) => void,
  loading?: boolean
} & React.ButtonHTMLAttributes<any>
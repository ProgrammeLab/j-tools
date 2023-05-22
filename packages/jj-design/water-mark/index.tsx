import * as React from 'react'
import { rotateCvs, calculateWidth, getCenterPoint } from './util'

export interface WaterMarkProps {
  text: string
  font?: Partial<{
    fontSize: number
    color: string
    fontWeight: 'normal' | 'light' | 'weight' | number
    fontFamily: string
  }>
  width?: number
  height?: number
}

const WaterMark: React.FC<React.PropsWithChildren<WaterMarkProps>> = (props) => {
  const { children, text, font = {}, width = 90 } = props

  const { fontSize = 14, color = 'rgba(0,0,0,.6)' } = font
  const containerRef = React.useRef<HTMLDivElement>(null)

  const renderWaterMask = React.useCallback(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.setAttribute('width', `${calculateWidth(text, fontSize)}px`);
    canvas.setAttribute('height', `${calculateWidth(text, fontSize)}px`);
    if (ctx) {
      const [X, Y] = getCenterPoint(text, fontSize);
      rotateCvs(ctx, -45, calculateWidth(text, fontSize))
      ctx.font = `${fontSize}px sans-serif`
      ctx.textAlign = 'center'
      ctx.fillStyle = color
      ctx.textBaseline = 'middle'
      ctx.fillText(text, X, Y, width);
      const url = canvas.toDataURL()
      renderCanvasBg(url)
    }
  }, [])

  const renderCanvasBg = (url) => {
    if (containerRef.current) {
      const container = containerRef.current
      container.setAttribute('style', `background-image:url(${url})`)
    }
  }

  React.useEffect(() => {
    renderWaterMask()
  }, [text])

  return <div ref={containerRef}>
    {children}
  </div>
}

export default WaterMark;
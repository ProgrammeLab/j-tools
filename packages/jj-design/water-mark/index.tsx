import * as React from 'react'

export interface WaterMarkProps {
  text: string
  fontSize?: number
  width?: number
  height?: number
}

export const WaterMark: React.FC<React.PropsWithChildren<WaterMarkProps>> = (props) => {
  const { children, text, fontSize = 14, width = 90, height = 90 } = props
  const containerRef = React.useRef<HTMLDivElement>(null)

  const renderWaterMask = React.useCallback(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.setAttribute('width', `${width}px`);
    canvas.setAttribute('height', `${height}px`);
    if (ctx) {
      ctx.rotate(45 * Math.PI / 180)
      ctx.font = `${fontSize}px`
      ctx.fillText(text, 15, 5, width);
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
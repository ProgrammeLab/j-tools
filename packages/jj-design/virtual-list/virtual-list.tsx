import * as React from 'react'
import './index.less'

export type VirtualListProps = {
  data: any[]
  /**
   * 可视区高度
   */
  height: number
  itemHeight: number
  render?: Function
}

export const VirtualList: React.FC<VirtualListProps> = (props) => {

  const { data, height, itemHeight = 40 } = props
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [renderCount, setRenderCount] = React.useState(() => {
    return parseInt(String(height / itemHeight)) + 2
  })
  const [positionTop, setPositionTop] = React.useState(0)

  const { start, end } = React.useMemo(() => {
    return {
      start: Math.floor(positionTop / itemHeight),
      end: Math.floor(positionTop / itemHeight) + renderCount
    }
  }, [positionTop, renderCount])

  const handleScroll = (e) => {
    const scrollTop = scrollContainerRef.current?.scrollTop || 0
    setPositionTop(parseInt((scrollTop / itemHeight) + '') * itemHeight)
  }

  const renderData = React.useMemo(() => {
    return data.slice(start, end).map(item => {
      return <div style={{ height: itemHeight }} key={item}>item:{item}</div>
    })
  }, [start, end])

  return <div ref={scrollContainerRef} onScroll={handleScroll} className='virtual-list-container'>
    <div className='virtual-list-view-window' style={{
      height
    }}>
      <div className='virtual-list-holder' style={{ height: itemHeight * data.length }}>
        <div className='virtual-list-content' style={{ top: positionTop }}>
          {renderData}
        </div>
      </div>
    </div>
  </div>
}
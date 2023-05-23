import * as React from 'react';
import TabContext from './context'
import { TabInsCache, TabNavProps } from './interface';
import './styles/tabnav.less'


const TabNav: React.FC<TabNavProps> = (props) => {

  const { tabs = [] } = React.useContext(TabContext);
  const { tabPosition = 'top', onTabClick, activeKey } = props
  const navRef = React.useRef<HTMLDivElement>(null);
  const [tabNavInstanceMap, setTabNavIns] = React.useState<Map<string | number, TabInsCache>>();

  const isTopOrBottom = tabPosition === 'top' || tabPosition === 'bottom';
  const translateKey = React.useMemo(() => isTopOrBottom ? 'left' : 'top', [isTopOrBottom]);
  const [inkStyle, setInkStyle] = React.useState<React.CSSProperties>();

  React.useEffect(() => {
    // HTMLCollection
    const children = Array.from(navRef.current.children);
    let insMap = new Map();
    let first;
    children.forEach((child, index) => {
      console.log("bound:", child.getBoundingClientRect(), child)
      const boundClient = child.getBoundingClientRect();
      const width = boundClient.width;
      const height = boundClient.height;
      if (index === 0) {
        first = {
          left: boundClient.left || 0,
          top: boundClient.top || 0
        }
      }
      insMap.set(tabs[index].key, {
        width,
        height,
        offset: boundClient[translateKey] - first[translateKey],
        left: boundClient.left,
        top: boundClient.top
      })
    })
    setTabNavIns(insMap)
  }, [isTopOrBottom, tabs])

  React.useEffect(() => {
    console.log(tabPosition, translateKey)
    setInkStyle({
      [translateKey]: tabNavInstanceMap?.get(activeKey)?.offset,
      width: isTopOrBottom ? tabNavInstanceMap?.get(activeKey)?.width : '2px',
      height: isTopOrBottom ? '2px' : tabNavInstanceMap?.get(activeKey)?.height
    })
  }, [activeKey, tabNavInstanceMap, isTopOrBottom])

  // ============= Events ==============
  function onClick(key: string) {
    return (e: React.MouseEvent) => onTabClick(key, e);
  }

  // ============= TabNodes ============
  const TabNode = React.useMemo(() => {
    return <>
      {tabs.map(item => <div onClick={onClick(item.key)} data-node-key={item.key} className={`tab-nav-item${item.key === activeKey ? " tab-nav-item-active" : ""}`} key={item.key}>{item.label}</div>)}
    </>
  }, [activeKey])

  return <div className='tab-nav-wrapper'>
    <div className='tab-nav-list' ref={navRef}>
      {TabNode}
    </div>
    <div className='tab-ink-bar' style={inkStyle}></div>
  </div>

}

export { TabNavProps }
export default TabNav
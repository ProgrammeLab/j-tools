import * as React from 'react'
import TabNav from './TabNav'
import TabContext from './context'
import useMergeState from '../util/hooks/useMergeState'
import './styles/index.less'
import { TabsProps } from './interface'
import TabPanel from './TabPanel'

const clsPrefix = 'tab'

const Tabs: React.FC<TabsProps> = (props) => {
  const { items = [], tabPosition = 'top', activeKey, onChange } = props;

  // ================== mergedActiveKey ============
  const [mergedActiveKey, setMergedActiveKey] = useMergeState(items?.[0]?.key, {
    value: activeKey
  })

  // ================== Events =====================
  function onInternalTabClick(key: string, e: React.MouseEvent | React.KeyboardEvent) {
    setMergedActiveKey(key)
    const isChange = key !== mergedActiveKey;
    if (isChange)
      onChange?.(key, e)
  }

  const tabNavProps = {
    activeKey: mergedActiveKey,
    tabPosition: tabPosition,
    onTabClick: onInternalTabClick
  }

  const tabPanelProps = {
    activeKey: mergedActiveKey
  }

  return <TabContext.Provider value={{ tabs: items }}>
    <div className={`${clsPrefix}-wrapper ${clsPrefix}-direction-${tabPosition}`}>
      <TabNav {...tabNavProps}></TabNav>
      <TabPanel {...tabPanelProps}></TabPanel>
    </div>
  </TabContext.Provider >
}

export { TabsProps }
export default Tabs;
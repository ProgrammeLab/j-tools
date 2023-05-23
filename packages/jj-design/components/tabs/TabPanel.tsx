import * as React from 'react';
import TabContext from './context'
import { TabPanelProps } from './interface';
import './styles/tabpanel.less'

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { activeKey } = props
  const { tabs = [] } = React.useContext(TabContext)

  // ================= Panels ==============
  const Panels = React.useMemo(() => {
    return <>
      {tabs.map(tab => <div key={tab.key} className={`tab-panel${tab.key === activeKey ? " tab-panel-active" : " tab-panel-hidden"}`}>
        {tab?.children || "123"}
      </div>)}
    </>
  }, [activeKey])
  return <div className='tab-panel-wrapper'>
    {Panels}
  </div>
}

export { TabPanelProps }
export default TabPanel
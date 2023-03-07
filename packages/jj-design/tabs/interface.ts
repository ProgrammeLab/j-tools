export type TabItemType = {
  /**
   * 对应activeKey
   */
  key: string;
  /**
   * 选项卡头显示文字
   */
  label: React.ReactNode;
  /**
   * 选项卡内容
   */
  children: React.ReactNode;
};

export type TabsProps = {
  items: Array<TabItemType>;
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
  activeKey?: string;
};

export type TabNavProps = {
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
  activeKey: string;
  onTabClick: (key: string, e: React.MouseEvent | React.KeyboardEvent) => void;
};

export type TabPanelProps = {
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
  activeKey: string;
};

export type TabInsCache = {
  width: number;
  offset: number;
  height: number;
};

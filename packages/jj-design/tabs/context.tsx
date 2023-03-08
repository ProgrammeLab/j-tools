import { createContext } from 'react';
import { TabItemType } from './interface';

export interface TabContextProps {
  tabs: TabItemType[];
}

export default createContext<TabContextProps>(null)
import React, { FC, ReactNode } from 'react';

import classNames from './index.module.css';

const Tabs: FC<TabsPropsType> = ({ children }) => (
  <div className={classNames.wrapper}>{children}</div>
);

export default Tabs;

type TabsPropsType = {
  children: ReactNode;
};

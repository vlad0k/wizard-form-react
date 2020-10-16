import React, { FC } from 'react';
import classNames from './index.module.css';
import classNamesCombine from 'classnames';

const TabPanel: FC<TopTabProps> = ({ active, name, disabled = false, selectStep = () => {} }) => {
  const tabClassName = classNamesCombine(classNames.tab, {
    [classNames.active]: active,
    [classNames.visited]: disabled,
  });

  return (
    <div className={tabClassName} onClick={selectStep}>
      {name}
    </div>
  );
};

export default TabPanel;

type TopTabProps = {
  name: string;
  active?: boolean;
  selectStep: () => void;
  disabled: boolean;
};

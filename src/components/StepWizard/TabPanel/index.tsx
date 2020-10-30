import cn from 'classnames';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

import { getHashParam } from '../../../utils/hashRouteUtils';
import classNames from './index.module.css';

const TabPanel: FC<TopTabProps> = ({ name, disabled = false, url, onSelect = () => {} }) => {
  const { hash, pathname } = useLocation();
  const currentUrl = getHashParam(hash);

  const tabClassName = cn(classNames.tab, {
    [classNames.active]: url === currentUrl,
    [classNames.disabled]: disabled,
  });

  return (
    <Link to={!disabled ? `${pathname}#${url}` : '#'} onClick={onSelect} className={tabClassName}>
      {name}
    </Link>
  );
};

export default TabPanel;

type TopTabProps = {
  name: string;
  disabled: boolean;
  url: string;
  onSelect?: () => void;
};

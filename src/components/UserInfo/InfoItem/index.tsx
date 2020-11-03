import React, { FC } from 'react';

import classNames from '../index.module.css';
import ValuesList from '../ValuesList';

const InfoItem: FC<InfoItemPropsType> = ({ name, value }) => {
  return (
    <div className={classNames.groupElements}>
      <span>{name}</span>
      <span>{Array.isArray(value) ? <ValuesList list={value} /> : value}</span>
    </div>
  );
};

type InfoItemPropsType = {
  name: string;
  value?: string | string[];
};

export default InfoItem;

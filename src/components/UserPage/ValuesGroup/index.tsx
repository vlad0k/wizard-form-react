import React, { FC } from 'react';
import classNames from './index.module.css';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import editIcon from '../../../assets/icons/Edit.svg';
import ValuesList from '../ValuesList';
import { ButtonAppearance } from '../../../types';

const ValuesGroup: FC<ValuesGroupPropsType> = ({ groupName, values, id }) => {
  return (
    <div key={groupName} className={classNames.group}>
      <span className={classNames.groupKey}>
        {groupName}
        <Link to={`/edit/${id}`}>
          <Button appearance={ButtonAppearance.Text}>
            <img src={editIcon} alt="edit" />
          </Button>
        </Link>
      </span>
      <div>
        {values.map(({ name, value }) => (
          <div key={name} className={classNames.groupElements}>
            <span>{name}</span>
            <span>{Array.isArray(value) ? <ValuesList list={value} /> : value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuesGroup;

type ValuesGroupPropsType = {
  groupName: string;
  values: {
    name: string;
    value: string | string[] | null | undefined;
  }[];
  id: string | number;
};

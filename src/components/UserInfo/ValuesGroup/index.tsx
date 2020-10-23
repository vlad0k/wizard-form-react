import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import editIcon from '../../../assets/icons/Edit.svg';
import { selectStep } from '../../../redux/stepWizardReducer';
import { ButtonAppearance } from '../../../types';
import Button from '../../ui/Button';
import ValuesList from '../ValuesList';
import classNames from './index.module.css';

const ValuesGroup: FC<ValuesGroupPropsType> = ({ groupName, values, id, index }) => {
  const dispatch = useDispatch();
  return (
    <div key={groupName} className={classNames.group}>
      <span className={classNames.groupKey}>
        {groupName}
        <Link to={`/edit/${id}`}>
          <Button onClick={() => dispatch(selectStep(index))} appearance={ButtonAppearance.text}>
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
    value: string | string[] | null;
  }[];
  id: string | number;
  index: number;
};

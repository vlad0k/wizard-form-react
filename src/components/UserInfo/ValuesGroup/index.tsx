import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import editIcon from '../../../assets/icons/Edit.svg';
import { ButtonAppearance } from '../../../types';
import Button from '../../ui/Button';
import classNames from './index.module.css';

//TODO переделать на section InfoSection
// ValuesLit тоже переименовать

const ValuesGroup: FC<ValuesGroupPropsType> = ({ id, name, linkHash, children }) => {
  return (
    <div className={classNames.group}>
      <span className={classNames.groupKey}>
        {name}
        <Link to={`/edit/${id}#${linkHash}`}>
          {/*TODO Hover Animation*/}
          <Button appearance={ButtonAppearance.text}>
            <img src={editIcon} alt="edit" />
          </Button>
        </Link>
      </span>
      <div>{children}</div>
    </div>
  );
};

export default ValuesGroup;

type ValuesGroupPropsType = {
  id: number;
  name: string;
  linkHash: string;
  children: ReactNode;
};

import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import editIcon from '../../../assets/icons/Edit.svg';
import { ButtonAppearance } from '../../../types';
import Button from '../../ui/Button';
import classNames from './index.module.css';

const InfoSection: FC<ValuesGroupPropsType> = ({ id, name, linkHash, children }) => {
  return (
    <div className={classNames.group}>
      <span className={classNames.groupKey}>
        {name}
        <Link to={`/edit/${id}#${linkHash}`}>
          {/*TODO Hover Animation*/}
          <Button appearance={ButtonAppearance.text}>
            <img className={classNames.buttonImage} src={editIcon} alt="edit" />
          </Button>
        </Link>
      </span>
      <div>{children}</div>
    </div>
  );
};

export default InfoSection;

type ValuesGroupPropsType = {
  id: number;
  name: string;
  linkHash: string;
  children: ReactNode;
};

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StateType } from '../../redux/store';
import { generateUsers } from '../../redux/usersListReducer';
import { UsersFetchStatus } from '../../types';
import Button from '../ui/Button';
import classNames from '../UsersList/index.module.css';

const GenerateUsers = () => {
  const usersFetchStatus = useSelector(
    ({ users: { usersFetchStatus } }: StateType) => usersFetchStatus,
  );
  const dispatch = useDispatch();

  const disabled = usersFetchStatus === UsersFetchStatus.isFetching;

  const generateButtonHandler = () => dispatch(generateUsers());

  return (
    <div className={classNames.generateButtonWrapper}>
      <Button onClick={generateButtonHandler} disabled={disabled}>
        Generate Users
      </Button>
    </div>
  );
};

export default GenerateUsers;

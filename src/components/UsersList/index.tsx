import React, { useEffect } from 'react';
import classNames from './index.module.css';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import Table from './Table';
import Preloader from '../ui/Preloader';
import { importUsers } from '../../redux/usersListReducer';
import { UsersFetchStatus } from '../../types';

const UsersList = () => {
  const { usersFetchStatus, users } = useSelector((state: StateType) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(importUsers());
  }, [dispatch]);

  return (
    <div>
      <Table users={users} stripped />
      {usersFetchStatus === UsersFetchStatus.isFetching && (
        <div className={classNames.preloader}>
          <Preloader />
        </div>
      )}

      {users.length === 0 && usersFetchStatus === UsersFetchStatus.fetched && (
        <div className={classNames.empty}>
          <span>No users here :(</span>
          <Link to="/new">
            <Button>Create new user</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UsersList;

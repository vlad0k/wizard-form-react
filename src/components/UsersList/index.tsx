import React from 'react';
import classNames from './index.module.css';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import Table from './Table';
import Preloader from '../ui/Preloader';

const UsersList = () => {
  const { isFetching, users } = useSelector((state: StateType) => state.users);

  return (
    <div>
      <Table users={users} stripped />
      {isFetching && (
        <div className={classNames.preloader}>
          <Preloader />
        </div>
      )}

      {users.length === 0 && !isFetching && (
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

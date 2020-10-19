import React, { useEffect, useState } from 'react';
import classNames from './index.module.css';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import Table from './Table';
import Preloader from '../ui/Preloader';
import { importUsers } from '../../redux/usersListReducer';
import { UsersFetchStatus, UserType } from '../../types';
import Paginator from './Paginator';

const PORTION_SIZE = 10;

const createPortion = (users: UserType[], page: number) => {
  const portionValue = users.filter(
    (user: UserType, index: number) =>
      index > PORTION_SIZE * (page - 1) - 1 && index <= PORTION_SIZE * page - 1,
  );
  return portionValue;
};

const UsersList = () => {
  const [portion, setPortion] = useState<UserType[]>([]);
  const [page, setPage] = useState<number>(1);
  const { usersFetchStatus, users } = useSelector((state: StateType) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(importUsers());
  }, [dispatch]);

  useEffect(() => {
    const portionValue = createPortion(users, page);
    setPortion(portionValue);
  }, [page, users]);

  return (
    <div>
      <Table users={portion} stripped />
      {usersFetchStatus === UsersFetchStatus.isFetching && (
        <div className={classNames.preloader}>
          <Preloader />
        </div>
      )}
      {users.length / PORTION_SIZE > 0 && (
        <Paginator
          value={page}
          numberOfPages={Math.ceil(users.length / PORTION_SIZE)}
          selectPage={(page: number) => {
            setPage(page);
          }}
        />
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

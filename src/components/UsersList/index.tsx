import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { StateType } from '../../redux/store';
import { importUsers, selectPage } from '../../redux/usersListReducer';
import { UsersFetchStatus, UserType } from '../../types';
import Button from '../ui/Button';
import Paginator from '../ui/Pagination';
import Preloader from '../ui/Preloader';
import classNames from './index.module.css';
import Table from './Table';

const PORTION_SIZE = 10;

const createPortion = (users: UserType[], page: number) => {
  return users.slice(PORTION_SIZE * (page - 1), PORTION_SIZE * page);
};

const UsersList = () => {
  const [portion, setPortion] = useState<UserType[]>([]);
  //TODO store selected page in local state
  const { usersFetchStatus, users, page } = useSelector((state: StateType) => state.users);
  const dispatch = useDispatch();

  const numberOFPages = Math.ceil(users.length / PORTION_SIZE);

  useEffect(() => {
    dispatch(importUsers());
  }, [dispatch]);

  useEffect(() => {
    const portionValue = createPortion(users, page);
    setPortion(portionValue);
  }, [page, users]);

  const selectPageHandler = (page: number) => dispatch(selectPage(page));

  return (
    <div>
      {usersFetchStatus === UsersFetchStatus.isFetching && (
        <div className={classNames.preloader}>
          <Preloader />
        </div>
      )}
      {usersFetchStatus !== UsersFetchStatus.isFetching && <Table users={portion} stripped />}

      {numberOFPages > 1 && (
        <Paginator
          currentPage={page}
          numberOfPages={numberOFPages}
          selectPage={selectPageHandler}
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

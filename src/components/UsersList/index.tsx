import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { StateType } from '../../redux/store';
import { importUsers } from '../../redux/usersListReducer';
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

const UsersList: FC<UsersListPropsType> = ({ users }) => {
  const [portion, setPortion] = useState<UserType[]>([]);
  const [page, setPage] = useState(1);
  const { usersFetchStatus } = useSelector((state: StateType) => state.users);

  const numberOFPages = Math.ceil(users.length / PORTION_SIZE);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(importUsers());
  }, [dispatch]);

  useEffect(() => {
    const portionValue = createPortion(users, page);
    setPortion(portionValue);
  }, [page, users]);

  const selectPageHandler = (page: number) => setPage(page);
  console.log(users);
  return (
    <div>
      {usersFetchStatus !== UsersFetchStatus.isFetching && <Table users={portion} stripped />}

      {numberOFPages > 1 && (
        <Paginator
          currentPage={page}
          numberOfPages={numberOFPages}
          selectPage={selectPageHandler}
        />
      )}
    </div>
  );
};

type UsersListPropsType = {
  users: UserType[];
};

export default UsersList;

import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

import { StateType } from '../../redux/store';
import { importUsers } from '../../redux/usersListReducer';
import { UsersFetchStatus, UserType } from '../../types';
import Paginator from '../ui/Pagination';
import Table from './Table';

const PORTION_SIZE = 10;

const createPortion = (users: UserType[], page: number) => {
  return users.slice(PORTION_SIZE * (page - 1), PORTION_SIZE * page);
};

const getDataFromSearch = (search: string) => +search.split('=')[1];

const UsersList: FC<UsersListPropsType> = ({ users }) => {
  const [portion, setPortion] = useState<UserType[]>([]);
  const { usersFetchStatus } = useSelector((state: StateType) => state.users);
  const history = useHistory();
  const { search } = useLocation();
  const numberOFPages = Math.ceil(users.length / PORTION_SIZE);
  const dispatch = useDispatch();

  const page = search ? getDataFromSearch(search) : 1;

  useEffect(() => {
    dispatch(importUsers());
  }, [dispatch]);

  useEffect(() => {
    const portionValue = createPortion(users, page);
    setPortion(portionValue);
  }, [page, users]);

  const selectPageHandler = (page: number) => history.push(`/users?page=${page}`);

  return (
    <div>
      {numberOFPages > 1 && (page < 1 || page > numberOFPages) && <Redirect to="/users?page=1" />}

      {usersFetchStatus !== UsersFetchStatus.isFetching && <Table users={portion} stripped />}

      {numberOFPages > 1 && usersFetchStatus !== UsersFetchStatus.isFetching && (
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

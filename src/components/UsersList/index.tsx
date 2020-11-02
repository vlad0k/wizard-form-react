import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import { StateType } from '../../redux/store';
import { generateUsers, importUsers } from '../../redux/usersListReducer';
import { UsersFetchStatus, UserType } from '../../types';
import Button from '../ui/Button';
import Paginator from '../ui/Pagination';
import classNames from './index.module.css';
import Table from './Table';

const PORTION_SIZE = 10;

const createPortion = (users: UserType[], page: number) => {
  console.log(users, page);
  return users.slice(PORTION_SIZE * (page - 1), PORTION_SIZE * page);
};

const UsersList: FC<UsersListPropsType> = ({ users }) => {
  const [portion, setPortion] = useState<UserType[]>([]);
  const { usersFetchStatus } = useSelector((state: StateType) => state.users);
  const history = useHistory();
  const { page: pageUrlParam } = useParams();
  const page = +pageUrlParam;
  const numberOFPages = Math.ceil(users.length / PORTION_SIZE);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(importUsers());
  }, [dispatch]);

  useEffect(() => {
    const portionValue = createPortion(users, page);
    setPortion(portionValue);
  }, [page, users]);

  const selectPageHandler = (page: number) => history.push(`/users/${page}`);

  return (
    <div>
      {(page > numberOFPages || page < 1) && <Redirect to={`/users/${1}`} />}

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

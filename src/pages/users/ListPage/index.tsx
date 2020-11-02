import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PageLayout from '../../../components/PageLayout';
import Search from '../../../components/Search';
import Button from '../../../components/ui/Button';
import Preloader from '../../../components/ui/Preloader';
import UsersList from '../../../components/UsersList';
import classNames from '../../../components/UsersList/index.module.css';
import { StateType } from '../../../redux/store';
import { importUsers } from '../../../redux/usersListReducer';
import { UsersFetchStatus, UserType } from '../../../types';

const ListOfUsersPage = () => {
  const { users, usersFetchStatus } = useSelector((state: StateType) => state.users);
  const [searchValue, setSearchValue] = useState('');
  const [listOfUsers, setListOfUsers] = useState(users);

  useEffect(() => {
    setListOfUsers(
      !searchValue
        ? users
        : users.filter(
            ({ firstname, lastname }: UserType) =>
              firstname.includes(searchValue) || firstname.includes(searchValue),
          ),
    );
  }, [users, searchValue]);

  return (
    <PageLayout
      name={'List of users'}
      rightComponent={
        <Search
          searchValue={searchValue}
          onChange={(newValue: string) => setSearchValue(newValue)}
        />
      }
    >
      {usersFetchStatus === UsersFetchStatus.isFetching && (
        <div className={classNames.preloader}>
          <Preloader />
        </div>
      )}
      <UsersList users={listOfUsers} />
      {users.length === 0 && usersFetchStatus === UsersFetchStatus.fetched && (
        <div className={classNames.empty}>
          <span>No users here :(</span>
          <Link to="/new">
            <Button>Create new user</Button>
          </Link>
        </div>
      )}
      {listOfUsers.length === 0 && searchValue && users.length !== 0 && (
        <div className={classNames.empty}>
          <span>No users found :(</span>
        </div>
      )}
    </PageLayout>
  );
};

export default ListOfUsersPage;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import GenerateUsers from '../../../components/GenerateUsers';
import PageLayout from '../../../components/PageLayout';
import Search from '../../../components/Search';
import Button from '../../../components/ui/Button';
import Preloader from '../../../components/ui/Preloader';
import UsersList from '../../../components/UsersList';
import classNames from '../../../components/UsersList/index.module.css';
import { StateType } from '../../../redux/store';
import { UsersFetchStatus, UserType } from '../../../types';

const ListOfUsersPage = () => {
  const { users, usersFetchStatus } = useSelector((state: StateType) => state.users);
  const [searchValue, setSearchValue] = useState('');
  const [listOfUsers, setListOfUsers] = useState(users);

  useEffect(() => {
    if (!searchValue) {
      setListOfUsers(users);
    } else {
      const searchResult = users.filter(({ firstname, lastname }: UserType) =>
        `${firstname.toLowerCase()} ${lastname.toLowerCase()}`.includes(searchValue.toLowerCase()),
      );
      setListOfUsers(searchResult);
    }
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

      <GenerateUsers />
    </PageLayout>
  );
};

export default ListOfUsersPage;

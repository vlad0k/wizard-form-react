import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageLayout from '../../../components/PageLayout';
import UserInfo from '../../../components/UserInfo';
import { getUser } from '../../../db';
import { UrlParamTypes, UserType } from '../../../types';

//TODO Fix empty no user by id case
const UserInfoPage = () => {
  const [user, setUser] = useState<UserType>();
  const { id } = useParams<UrlParamTypes>();
  useEffect(() => {
    getUser(id).then((user) => setUser(user));
  }, [id]);

  return (
    <PageLayout name={user ? user.username : ''} backLink="/users" backLabel="Users List">
      {user ? <UserInfo user={user} /> : <div>No such user</div>}
    </PageLayout>
  );
};

export default UserInfoPage;

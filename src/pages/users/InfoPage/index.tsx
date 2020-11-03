import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageLayout from '../../../components/PageLayout';
import UserInfo from '../../../components/UserInfo';
import { getUser } from '../../../db';
import { UrlParamTypes, UserType } from '../../../types';

const UserInfoPage = () => {
  const [user, setUser] = useState<UserType>();
  const { id } = useParams<UrlParamTypes>();
  useEffect(() => {
    getUser(id).then((user) => setUser(user));
  }, [id]);
  return (
    <PageLayout name={user ? user.username : id} backLink="/users" backLabel="Users List">
      {user ? <UserInfo user={user} /> : `No user with id ${id}`}
    </PageLayout>
  );
};

export default UserInfoPage;

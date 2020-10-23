import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageLayout from '../../../components/PageLayout';
import UserInfo from '../../../components/UserInfo';
import { getUser } from '../../../db';
import { UrlParamTypes, UserType } from '../../../types';

const UserInfoPage = () => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const { id } = useParams<UrlParamTypes>();
  useEffect(() => {
    getUser(id).then((user) => setUser(user));
  }, [id]);

  //TODO empty user page
  if (!user) return <div>{/*  empty user page*/}</div>;

  return (
    <PageLayout name={user.username} backLink="/users" backLabel="Users List">
      <UserInfo user={user} />
    </PageLayout>
  );
};

export default UserInfoPage;

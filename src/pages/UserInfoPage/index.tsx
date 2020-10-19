import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { useParams } from 'react-router-dom';
import { UrlParamTypes, UserType } from '../../types';
import UserInfo from '../../components/UserInfo';
import { getUser } from '../../db';

const UserInfoPage = () => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const { id } = useParams<UrlParamTypes>();

  useEffect(() => {
    getUser(id).then((user) => setUser(user));
  }, [id]);

  if (!user) return <div />;

  return (
    <PageLayout name={user.username} backLink={'/users'} backLabel={'Users List'}>
      <UserInfo user={user} />
    </PageLayout>
  );
};

export default UserInfoPage;

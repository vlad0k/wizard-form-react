import React from 'react';
import PageLayout from '../../components/PageLayout';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import { UserType } from '../../types';
import UserInfo from '../../components/UserInfo';

const UserInfoPage = () => {
  const { id } = useParams<UrlParamTypes>();
  const users = useSelector(({ users }: StateType) => users.users);
  const selectedUser = users.find((u: UserType) => u.id === +id);

  if (!selectedUser) return <div />;

  return (
    <PageLayout name={selectedUser.username} backLink={'/users'} backLabel={'Users List'}>
      <UserInfo user={selectedUser} />
    </PageLayout>
  );
};

export default UserInfoPage;

export type UrlParamTypes = {
  id: string;
};

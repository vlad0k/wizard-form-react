import React from 'react';
import PageLayout from '../../components/PageLayout';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import { UserType } from '../../redux/usersListReducer';
import UserPage from '../../components/UserPage';

const MyComponent = () => {
  const { id } = useParams<UrlParamTypes>();
  const users = useSelector(({ users }: StateType) => users.users);
  const selectedUser = users.filter((u: UserType) => u.id === +id)[0];

  if (!selectedUser) return <div />;

  return (
    <PageLayout name={selectedUser.username} backLink={'/users'} backLabel={'Users List'}>
      <UserPage user={selectedUser} />
    </PageLayout>
  );
};

export default MyComponent;

export type UrlParamTypes = {
  id: string;
};

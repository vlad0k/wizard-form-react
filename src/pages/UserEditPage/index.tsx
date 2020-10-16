import React from 'react';
import PageLayout from '../../components/PageLayout';
import { useParams } from 'react-router-dom';
import StepWizard from '../../components/StepWizard';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import { UrlParamTypes, UserType } from '../../types';

const UserEditPage = () => {
  const { id: userId } = useParams<UrlParamTypes>();
  const users = useSelector(({ users }: StateType) => users.users);
  const { id, ...userData } = users.find((user: UserType) => user.id === +userId);
  if (!userData) {
    return <div>No such user</div>;
  }

  return (
    <PageLayout name="Edit User" backLink={`/users/${id}`} backLabel="User Profile">
      <StepWizard edit />
    </PageLayout>
  );
};

export default UserEditPage;

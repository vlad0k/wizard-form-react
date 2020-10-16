import React, { useEffect } from 'react';
import PageLayout from '../../components/PageLayout';
import { useParams } from 'react-router-dom';
import { submitForm } from '../../redux/formReducer';
import StepWizard from '../../components/StepWizard';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import { UrlParamTypes, UserType } from '../../types';

const UserEditPage = () => {
  const { id } = useParams<UrlParamTypes>();
  const users: UserType[] = useSelector(({ users }: StateType) => users.users);
  const dispatch = useDispatch();
  const user = users.find((user) => user.id === +id);
  useEffect(() => {
    user && dispatch(submitForm(user));
  }, [dispatch]);
  if (!user) {
    return <div>No such user</div>;
  }

  return (
    <PageLayout name="Edit User" backLink={`/users/${id}`} backLabel="User Profile">
      <StepWizard edit />
    </PageLayout>
  );
};

export default UserEditPage;

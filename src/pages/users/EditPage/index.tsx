import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageLayout from '../../../components/PageLayout';
import StepWizard from '../../../components/StepWizard/';
import { getUser } from '../../../db';
import { UrlParamTypes, UserType } from '../../../types';

const UserEditPage = () => {
  const { id } = useParams<UrlParamTypes>();
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    getUser(id).then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <PageLayout name="Edit User" backLink={`/users/${id}`} backLabel="User Profile">
      {user ? <StepWizard editMode initialValues={user} /> : 'No user with such id'}
    </PageLayout>
  );
};

export default UserEditPage;

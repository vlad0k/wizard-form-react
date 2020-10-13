import React from 'react';
import PageLayout from '../../components/PageLayout';
import { useParams } from 'react-router-dom';
import StepWizard from '../../components/StepWizard_old';

const UserEditPage = () => {
  const { id } = useParams<UrlParamTypes>();

  return (
    <PageLayout name="Edit User" backLink={`/users/${id}`} backLabel="User Profile">
      <StepWizard mode={'edit'} />
    </PageLayout>
  );
};

export default UserEditPage;

export type UrlParamTypes = {
  id: string;
};

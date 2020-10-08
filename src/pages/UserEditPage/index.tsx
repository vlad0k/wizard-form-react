import React from 'react';
import PageLayout from '../../components/PageLayout';
import { useParams } from 'react-router-dom';
import StepWizard from '../../components/StepWizard';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';

const UserEditPage = () => {
  const { id } = useParams<UrlParamTypes>();
  // const username = useSelector((state: StateType) => state.users.users[+id].username);

  return (
    <PageLayout name={`Edit User`}>
      <StepWizard mode={'edit'} />
    </PageLayout>
  );
};

export default UserEditPage;

export type UrlParamTypes = {
  id: string;
};

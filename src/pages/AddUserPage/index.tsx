import React from 'react';

import StepWizard from '../../components/StepWizard';
import PageLayout from '../../components/PageLayout';
import { useDispatch } from 'react-redux';

const AddUserPage = () => {
  return (
    <PageLayout name={'Add User'}>
      <StepWizard />
    </PageLayout>
  );
};

export default AddUserPage;

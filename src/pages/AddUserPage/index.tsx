import React from 'react';

import StepWizard from '../../components/StepWizard';
import PageLayout from '../../components/PageLayout';

const AddUserPage = () => (
  <PageLayout name={'Add User'}>
    <StepWizard mode="add" />
  </PageLayout>
);

export default AddUserPage;

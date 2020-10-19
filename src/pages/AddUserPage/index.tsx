import React, { useEffect } from 'react';

import StepWizard from '../../components/StepWizard';
import PageLayout from '../../components/PageLayout';
import { useDispatch } from 'react-redux';
import { resetForm } from '../../redux/stepWizardReducer';

const AddUserPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetForm());
  }, [dispatch]);
  return (
    <PageLayout name={'Add User'}>
      <StepWizard />
    </PageLayout>
  );
};

export default AddUserPage;

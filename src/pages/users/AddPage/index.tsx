import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PageLayout from '../../../components/PageLayout';
import StepWizard from '../../../components/StepWizard/index_old';
import { resetForm } from '../../../redux/stepWizardReducer';

const AddUserPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetForm());
  }, [dispatch]);

  return (
    <PageLayout name="Add User">
      <StepWizard />
    </PageLayout>
  );
};

export default AddUserPage;

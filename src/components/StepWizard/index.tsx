import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import Tabs from './Tabs';
import TabPanel from './TabPanel';
import AccountForm from './AccountForm';
import ProfileForm from './ProfileForm';
import ContactsForm from './ContactsForm';
import CapabilitiesForm from './CapabilitiesForm';
import RestoreUnsaved from './RestoreUnsaved';
import { editUser, selectStep, setNumberOfSteps } from '../../redux/stepWizardReducer';
import { UserType } from '../../types';
import { FormikValues } from 'formik';

const STEPS = [
  {
    name: 'Account',
    component: <AccountForm />,
  },
  {
    name: 'Profile',
    component: <ProfileForm />,
  },

  {
    name: 'Contacts',
    component: <ContactsForm />,
  },
  {
    name: 'Skills',
    component: <CapabilitiesForm />,
  },
];

const StepWizard: FC<StepWizardPropsType> = ({ edit = false }) => {
  const currentStep: number = useSelector(
    ({ stepWizard: { currentStep } }: StateType) => currentStep,
  );

  useEffect(() => {
    dispatch(setNumberOfSteps(STEPS.length));
  }, [STEPS]);

  const dispatch = useDispatch();
  const selectStepHandler = (step: number) => {
    dispatch(selectStep(step));
  };

  return (
    <div>
      <Tabs>
        {STEPS.map(({ name }, index) => (
          <TabPanel
            key={name}
            name={`${index + 1}. ${name}`}
            active={currentStep === index}
            selectStep={() => selectStepHandler(index)}
            disabled={currentStep < index}
          />
        ))}
      </Tabs>
      <div>
        {!edit && <RestoreUnsaved />}
        {STEPS[currentStep].component}
      </div>
    </div>
  );
};

type StepWizardPropsType = {
  edit?: boolean;
};

export default StepWizard;

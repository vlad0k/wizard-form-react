import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import Tabs from './Tabs';
import TabPanel from './TabPanel';
import AccountForm from './AccountForm';
import ProfileForm from './ProfileForm';
import ContactsForm from './ContactsForm';
import CapabilitiesForm from './CapabilitiesForm';
import RestoreUnsaved from './RestoreUnsaved';
import { editUser, selectStep } from '../../redux/formReducer';

const STEPS = [
  {
    name: 'Account',
    render: <AccountForm />,
  },
  {
    name: 'Profile',
    render: <ProfileForm />,
  },
  {
    name: 'Contacts',
    render: <ContactsForm />,
  },
  {
    name: 'Skills',
    render: <CapabilitiesForm />,
  },
];

const StepWizard: FC<StepWizardPropsType> = ({ edit = false }) => {
  const currentStep = useSelector((state: StateType) => state.form.currentStep);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(editUser(edit));
  }, [dispatch]);

  return (
    <div>
      <Tabs>
        {STEPS.map(({ name }, index) => (
          <TabPanel key={index} name={name} value={index} active={currentStep === index} />
        ))}
      </Tabs>
      <div>
        {!edit && <RestoreUnsaved />}
        {STEPS[currentStep].render}
      </div>
    </div>
  );
};

type StepWizardPropsType = {
  edit?: boolean;
};

export default StepWizard;

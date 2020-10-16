import React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import Tabs from './Tabs';
import TabPanel from './TabPanel';
import AccountForm from './AccountForm';
import ProfileForm from './ProfileForm';
import ContactsForm from './ContactsForm';
import CapabilitiesForm from './CapabilitiesForm';
import RestoreUnsaved from './RestoreUnsaved';

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

const StepWizard = () => {
  const currentStep = useSelector((state: StateType) => state.addForm.currentStep);
  const formState = localStorage.getItem('formState');
  return (
    <div>
      <Tabs>
        {STEPS.map(({ name }, index) => (
          <TabPanel key={index} name={name} value={index} active={currentStep === index} />
        ))}
      </Tabs>
      <div>
        {currentStep === 0 && formState && <RestoreUnsaved />}
        {STEPS[currentStep].render}
      </div>
    </div>
  );
};

export default StepWizard;

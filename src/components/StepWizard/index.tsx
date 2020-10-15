import React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import Tabs from './Tabs';
import TabPanel from './TabPanel';
import FieldError from '../ui/FieldError';
import MySelect from '../ui/SelectField';
import TextArea from '../ui/TextArea';
import { SkillOptionType } from '../../types';
import Checkbox from '../ui/CheckBox';
import AccountForm from "./AccountForm";
import ProfileForm from "./ProfileForm";
import ContactsForm from './ContactsForm';
import CapabilitiesForm from './CapabilitiesForm';

const STEPS = [
  {
    name: 'Account',
    render: <AccountForm />
  },
  {
    name: 'Profile',
    render: <ProfileForm/>
  },
  {
    name: 'Contacts',
    render: <ContactsForm/>
  },
  {
    name: 'Skills',
    render: (
      <CapabilitiesForm/>
    ),
  },
];

const StepWizard = () => {
  const { currentStep, initialValues } = useSelector((state: StateType) => {
    const { currentStep, ...initialValues } = state.addForm;
    return { currentStep, initialValues };
  });

  return (
    <div>
      <Tabs>
        {STEPS.map(({ name }, index) => (
          <TabPanel key={index} name={name} value={index} active={currentStep === index} />
        ))}
      </Tabs>
      {STEPS[currentStep].render}
    </div>
  );
};

export default StepWizard;

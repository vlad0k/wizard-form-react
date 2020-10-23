import React, { FC } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import AccountForm from './AccountForm';
import CapabilitiesForm from './CapabilitiesForm';
import ContactsForm from './ContactsForm';
import ProfileForm from './ProfileForm';
import RestoreUnsaved from './RestoreUnsaved';
import TabPanel from './TabPanel';
import Tabs from './Tabs';

const STEPS = [
  {
    name: 'Account',
    url: 'account',
    component: AccountForm,
  },
  {
    name: 'Profile',
    url: 'profile',
    component: ProfileForm,
  },

  {
    name: 'Contacts',
    url: 'contacts',
    component: ContactsForm,
  },
  {
    name: 'Capabilities',
    url: 'capabilities',
    component: CapabilitiesForm,
  },
];

const StepWizard: FC<StepWizardPropsType> = ({ editMode = false }) => {
  const { step } = useParams();
  const currentStepIndex = STEPS.findIndex(({ url }) => url === step);
  const tabSelectHandler = () => {};
  return (
    <div>
      <Tabs>
        {STEPS.map(({ name, url }, index) => (
          <TabPanel
            key={name}
            name={`${index + 1}. ${name}`}
            disabled={index > currentStepIndex}
            value={url}
            isActive={index === currentStepIndex}
            onSelect={tabSelectHandler}
          />
        ))}
      </Tabs>
    </div>
  );
};

type StepWizardPropsType = {
  editMode?: boolean;
};

export default StepWizard;

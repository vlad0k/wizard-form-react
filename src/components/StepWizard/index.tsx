import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';

import AccountForm from './AccountForm';
import CapabilitiesForm from './CapabilitiesForm';
import ContactsForm from './ContactsForm';
import ProfileForm from './ProfileForm';
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
  const match = useRouteMatch();
  const currentTab = match.url.split('/').pop();

  return (
    <div>
      <Tabs>
        {STEPS.map(({ name, url }, index) => (
          <TabPanel
            key={name}
            name={`${index + 1}. ${name}`}
            disabled={false}
            editMode={true}
            to={url}
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

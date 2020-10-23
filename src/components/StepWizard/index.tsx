import React from 'react';
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

const StepWizard = () => {
  const match = useRouteMatch();

  return (
    <div>
      <Tabs>
        {STEPS.map(({ name, url }, index) => (
          <TabPanel
            key={name}
            name={`${index + 1}. ${name}`}
            active={match.url === url}
            disabled={false}
            editMode={true}
            to={url}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default StepWizard;

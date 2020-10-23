import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import { StateType } from '../../redux/store';
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
  const match = useRouteMatch();
  const history = useHistory();
  const form = useSelector((state: StateType) => state.stepWizard.form);

  return (
    <div>
      <Tabs>
        {STEPS.map(({ name, url }, index) => (
          <TabPanel key={name} name={`${index + 1}. ${name}`} disabled={false} to={url} />
        ))}
      </Tabs>
      <Switch>
        {STEPS.map(({ component: Component, url }, index) => {
          const isFinish = index + 1 === STEPS.length;

          const nextUrl = !isFinish ? match.url + '/' + STEPS[index + 1].url : '';
          const prevUrl = index !== 0 ? match.url + '/' + STEPS[index - 1].url : '';

          return (
            <Route key={url} path={`${match.url}/${url}`}>
              {url === STEPS[0].url && <RestoreUnsaved />}
              <Component
                initialValues={form}
                nextUrl={nextUrl}
                prevUrl={prevUrl}
                isFinish={isFinish}
                isEditMode={editMode}
              />
            </Route>
          );
        })}

        <Route path={match.url} exact>
          <Redirect to={`${match.url}/${STEPS[0].url}`} />
        </Route>
      </Switch>
    </div>
  );
};

type StepWizardPropsType = {
  editMode?: boolean;
};

export default StepWizard;

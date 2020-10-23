import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';

import { initiateStepWizard, selectStep } from '../../redux/stepWizardReducer';
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
  const { currentStep, form } = useSelector(({ stepWizard: { currentStep, form } }: StateType) => ({
    currentStep,
    form,
  }));

  const match = useRouteMatch();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const initialStep = STEPS.find((step) => pathname.split('/').pop() === step.url);
    dispatch(
      initiateStepWizard(initialStep ? STEPS.indexOf(initialStep) : 0, STEPS.length, editMode),
    );
  }, [dispatch, editMode]);

  return (
    <div>
      <Tabs>
        {STEPS.map(({ name, url }, index) => (
          <TabPanel
            key={name}
            name={`${index + 1}. ${name}`}
            active={currentStep === index}
            selectStep={() => dispatch(selectStep(index))}
            disabled={currentStep < index}
            editMode={editMode}
            to={url}
          />
        ))}
      </Tabs>
      <Switch>
        {STEPS.map(({ component: Component, url }) => (
          <Route key={url} path={`${match.path}/${url}`}>
            <Component initialValues={form} />)
          </Route>
        ))}

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

import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HashRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

import { StateType } from '../../redux/store';
import { getHashParam } from '../../utils/hashRouteUtils';
import AccountForm from './AccountForm';
import CapabilitiesForm from './CapabilitiesForm';
import ContactsForm from './ContactsForm';
import NavigationButtons from './NavigationButtons';
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

const getCurrentStepByHash = (hash: string) => {
  const index = STEPS.findIndex(({ url }) => url === getHashParam(hash));
  return index === -1 ? 0 : index;
};

const StepWizard: FC<StepWizardPropsType> = ({ editMode = false }) => {
  const form = useSelector((state: StateType) => state.stepWizard.form);
  const { pathname, hash } = useLocation();
  const [currentStep, setCurrentStep] = useState(getCurrentStepByHash(hash));

  useEffect(() => {
    setCurrentStep(getCurrentStepByHash(hash));
  }, [hash]);

  return (
    <div>
      {!getHashParam(hash) && <Redirect to={pathname + '#' + STEPS[0].url} />}
      <Tabs>
        {STEPS.map(({ name, url }, index) => (
          <TabPanel
            key={url}
            name={`${index + 1} ${name}`}
            disabled={!editMode && index > currentStep}
            url={url}
          />
        ))}
      </Tabs>
      {
        STEPS.map(({ component: Component }, index) => {
          const isFinish = index + 1 === STEPS.length;
          return (
            <Component
              key={index}
              initialValues={form}
              isEditMode={editMode}
              isFinish={isFinish}
              navButtons={
                <NavigationButtons
                  nextUrl={!isFinish ? `${pathname}#${STEPS[index + 1].url}` : ''}
                  prevUrl={index !== 0 ? `${pathname}#${STEPS[index - 1].url}` : ''}
                  isFinish={isFinish}
                  isEditMode={editMode}
                />
              }
            />
          );
        })[currentStep]
      }
    </div>
  );
};

type StepWizardPropsType = {
  editMode?: boolean;
};

export default StepWizard;

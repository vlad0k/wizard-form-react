import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

import { StateType } from '../../redux/store';
import ageValidator from '../../utils/dateYearSubstract';
import { getHashParam } from '../../utils/hashRouteUtils';
import Yup from '../../yup';
import AccountForm from './AccountForm';
import CapabilitiesForm from './CapabilitiesForm';
import ContactsForm from './ContactsForm';
import FormLayout from './FormLayout';
import ProfileForm from './ProfileForm';
import RestoreUnsaved from './RestoreUnsaved';
import TabPanel from './TabPanel';
import Tabs from './Tabs';

const STEPS = [
  {
    name: 'Account',
    url: 'account',
    component: <AccountForm />,
    validationSchema: Yup.object({
      avatar: Yup.mixed().notRequired().fileSizeInMb(),
      username: Yup.string().required('required field').uniqueUsername(),
      password: Yup.string().required('required field'),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password'), ''], "passwords don't match")
        .required('required field'),
    }),
  },
  {
    name: 'Profile',
    url: 'profile',
    component: <ProfileForm />,
    validationSchema: Yup.object({
      firstname: Yup.string().required('required field'),
      lastname: Yup.string().required('required field'),
      email: Yup.string().required('required field').email('incorrect email format').uniqueEmail(),
      birthdate: Yup.date()
        .notRequired()
        .max(ageValidator(18), 'You should be 18 years old')
        .nullable(),
      gender: Yup.string().nullable().required('please, choose your gender'),
    }),
  },

  {
    name: 'Contacts',
    url: 'contacts',
    component: <ContactsForm />,
    validationSchema: Yup.object({
      phoneNumbers: Yup.array().of(Yup.string()),
      company: Yup.string().required('required field'),
      mainLang: Yup.object().required('required field').nullable(),
    }),
  },
  {
    name: 'Capabilities',
    url: 'capabilities',
    component: <CapabilitiesForm />,
    validationSchema: Yup.object({
      skills: Yup.array()
        .of(Yup.string().required('required field'))
        .min(3, ({ min }) => `you should have al least ${min} skills`)
        .nullable(),
    }),
  },
];

const getCurrentStepByHash = (hash: string) => {
  const index = STEPS.findIndex(({ url }) => url === getHashParam(hash));
  return index === -1 ? 0 : index;
};

const StepWizard: FC<StepWizardPropsType> = ({ editMode = false }) => {
  const form = useSelector((state: StateType) => state.stepWizard.form);
  const { pathname, hash } = useLocation();
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(0);

  const createTabUrl = (index: number = 0) => pathname + '#' + STEPS[index].url;
  useEffect(() => {
    editMode || getCurrentStepByHash(hash) < currentStep
      ? setCurrentStep(getCurrentStepByHash(hash))
      : history.push(createTabUrl(currentStep));
  }, [hash]);

  const nextStep = (nextUrl: string) => {
    if (nextUrl) {
      setCurrentStep((prev) => prev + 1);
      history.push(nextUrl);
    }
  };

  const prevStep = (prevUrl: string) => {
    if (prevUrl) {
      setCurrentStep((prev) => prev - 1);
      history.push(prevUrl);
    }
  };

  return (
    <div>
      {!getHashParam(hash) && <Redirect to={createTabUrl(currentStep)} />}
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
      {getHashParam(hash) === STEPS[0].url && !editMode && <RestoreUnsaved />}
      {
        STEPS.map(({ component, url, validationSchema }, index) => {
          const isFinish = index + 1 === STEPS.length;
          return (
            <FormLayout
              key={url}
              initialValues={{ ...form, passwordRepeat: form.password }}
              isFinish={isFinish}
              isEditMode={editMode}
              nextStep={() => nextStep(!isFinish ? createTabUrl(index + 1) : '')}
              prevStep={() => prevStep(index > 0 ? createTabUrl(index - 1) : '')}
              validationSchema={validationSchema}
            >
              {component}
            </FormLayout>
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

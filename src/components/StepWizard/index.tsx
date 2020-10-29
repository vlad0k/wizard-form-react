import { Form, Formik, FormikValues } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';

import { deleteFormState, saveFormState } from '../../localStorage';
import { resetForm, submitForm } from '../../redux/stepWizardReducer';
import { StateType } from '../../redux/store';
import { addUser, updateUser } from '../../redux/usersListReducer';
import ageValidator from '../../utils/dateYearSubstract';
import { getHashParam } from '../../utils/hashRouteUtils';
import Yup from '../../yup';
import AccountForm from './AccountForm';
import CapabilitiesForm from './CapabilitiesForm';
import ContactsForm from './ContactsForm';
import classNames from './index.module.css';
import NavigationButtons from './NavigationButtons';
import ProfileForm from './ProfileForm';
import RestoreUnsaved from './RestoreUnsaved';
import TabPanel from './TabPanel';
import Tabs from './Tabs';

const REQUIRED_FIELD_MESSAGE = 'required field';

const STEPS = [
  {
    name: 'Account',
    url: 'account',
    component: <AccountForm />,
    validationSchema: Yup.object({
      avatar: Yup.mixed().notRequired().fileSizeInMb().nullable(),
      username: Yup.string().required(REQUIRED_FIELD_MESSAGE).uniqueUsername(),
      password: Yup.string().required(REQUIRED_FIELD_MESSAGE),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password'), ''], "passwords don't match")
        .required(REQUIRED_FIELD_MESSAGE),
    }),
  },
  {
    name: 'Profile',
    url: 'profile',
    component: <ProfileForm />,
    validationSchema: Yup.object({
      firstname: Yup.string().required(REQUIRED_FIELD_MESSAGE),
      lastname: Yup.string().required(REQUIRED_FIELD_MESSAGE),
      email: Yup.string()
        .required(REQUIRED_FIELD_MESSAGE)
        .email('incorrect email format')
        .uniqueEmail(),
      birthdate: Yup.date()
        .required(REQUIRED_FIELD_MESSAGE)
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
      company: Yup.string().required(REQUIRED_FIELD_MESSAGE),
      mainLang: Yup.object().required(REQUIRED_FIELD_MESSAGE).nullable(),
    }),
  },
  {
    name: 'Capabilities',
    url: 'capabilities',
    component: <CapabilitiesForm />,
    validationSchema: Yup.object({
      skills: Yup.array()
        .of(Yup.string().required(REQUIRED_FIELD_MESSAGE))
        .min(3, ({ min }) => `you should have al least ${min} skills`),
    }),
  },
];

const getCurrentStepByHash = (hash: string) => {
  const index = STEPS.findIndex(({ url }) => url === getHashParam(hash));
  return index === -1 ? 0 : index;
};

const StepWizard: FC<StepWizardPropsType> = ({ editMode = false }) => {
  const { pathname, hash } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const [currentStep, setCurrentStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState([0]);

  const form = useSelector((state: StateType) => state.stepWizard.form);
  const dispatch = useDispatch();

  const createTabUrl = (index: number = 0) => pathname + '#' + STEPS[index].url;
  useEffect(() => {
    editMode || visitedSteps.includes(getCurrentStepByHash(hash))
      ? setCurrentStep(getCurrentStepByHash(hash))
      : history.push(createTabUrl(currentStep));
  }, [hash]);

  const nextStep = (values: FormikValues, nextUrl: string, isFinish: boolean = false) => {
    if (!editMode) {
      if (!isFinish) {
        dispatch(submitForm(values));
        saveFormState({ ...form, ...values });
        setVisitedSteps((prevSteps) => {
          const nextStep = currentStep + 1;
          const newVisiteSteps = [...prevSteps, nextStep];
          setCurrentStep(nextStep);
          return newVisiteSteps;
        });
        history.push(nextUrl);
      } else {
        dispatch(addUser({ ...form, ...values }));
        dispatch(resetForm());
        deleteFormState();
        history.push('/users');
      }
    } else {
      dispatch(updateUser(+id, { ...form, ...values }));
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
            disabled={!editMode && !visitedSteps.includes(index)}
            url={url}
          />
        ))}
      </Tabs>
      {getHashParam(hash) === STEPS[0].url && !editMode && <RestoreUnsaved />}
      {
        STEPS.map(({ component, url, validationSchema }, index) => {
          const isFinish = index + 1 === STEPS.length;
          const nextUrl = !isFinish ? createTabUrl(index + 1) : '';
          const prevUrl = index > 0 ? createTabUrl(index - 1) : '';
          return (
            <div key={url} className={classNames.formWrapper}>
              <Formik
                initialValues={{ ...form, passwordRepeat: form.password }}
                onSubmit={(values) => nextStep(values, nextUrl, isFinish)}
                validationSchema={validationSchema}
                enableReinitialize
              >
                <Form className={classNames.form}>
                  <div className={classNames.columns}>{component}</div>

                  <NavigationButtons
                    prevStep={() => prevStep(prevUrl)}
                    isFinish={isFinish}
                    isEditMode={editMode}
                    isFirstStep={prevUrl ? false : true}
                  />
                </Form>
              </Formik>
            </div>
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

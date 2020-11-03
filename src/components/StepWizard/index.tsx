import { Form, Formik, FormikValues } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { deleteFormState, saveFormState } from '../../localStorage';
import { resetForm, submitForm } from '../../redux/stepWizardReducer';
import { StateType } from '../../redux/store';
import { addUser, updateUser } from '../../redux/usersListReducer';
import { getHashParam } from '../../utils/hashRouteUtils';
import AccountForm, { validationSchema as accountValidationSchema } from './AccountForm';
import CapabilitiesForm, {
  validationSchema as capabilitiesValidationSchema,
} from './CapabilitiesForm';
import ContactsForm, { validationSchema as contactsValidationSchema } from './ContactsForm';
import classNames from './index.module.css';
import NavigationButtons from './NavigationButtons';
import ProfileForm, { validationSchema as profileValidationSchema } from './ProfileForm';
import RestoreUnsaved from './RestoreUnsaved';
import TabPanel from './TabPanel';
import Tabs from './Tabs';

const STEPS = [
  {
    name: 'Account',
    url: 'account',
    component: <AccountForm />,
    validationSchema: accountValidationSchema,
  },
  {
    name: 'Profile',
    url: 'profile',
    component: <ProfileForm />,
    validationSchema: profileValidationSchema,
  },

  {
    name: 'Contacts',
    url: 'contacts',
    component: <ContactsForm />,
    validationSchema: contactsValidationSchema,
  },
  {
    name: 'Capabilities',
    url: 'capabilities',
    component: <CapabilitiesForm />,
    validationSchema: capabilitiesValidationSchema,
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
  const [showRestoreMessage, setShowRestoreMessage] = useState(!editMode);

  const form = useSelector((state: StateType) => state.stepWizard.form);
  const dispatch: ThunkDispatch<StateType, void, AnyAction> = useDispatch();

  const createTabUrl = (index: number = 0) => pathname + '#' + STEPS[index].url;
  useEffect(() => {
    editMode || visitedSteps.includes(getCurrentStepByHash(hash))
      ? setCurrentStep(getCurrentStepByHash(hash))
      : history.push(createTabUrl(currentStep));
  }, [hash, currentStep, visitedSteps]);

  const nextStep = ({ values, stepNumber, isFinish = false }: NextStepParams) => {
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
        setShowRestoreMessage(false);
        history.push(createTabUrl(stepNumber + 1));
      } else {
        dispatch(addUser({ ...form, ...values })).then(() => {
          dispatch(resetForm());
          deleteFormState();
          history.push('/users');
        });
      }
    } else {
      dispatch(updateUser(+id, { ...form, ...values }));
    }
  };

  const prevStep = (stepNumber: number) => {
    if (stepNumber > 0) {
      setCurrentStep((prev) => prev - 1);
      history.push(createTabUrl(stepNumber - 1));
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
      {showRestoreMessage && <RestoreUnsaved />}
      {
        STEPS.map(({ component, url, validationSchema }, index) => {
          const isFinish = index + 1 === STEPS.length;
          const isFirstStep = index === 0;

          return (
            <div key={url} className={classNames.formWrapper}>
              <Formik
                initialValues={{ ...form, passwordRepeat: form.password }}
                onSubmit={(values) => nextStep({ values, stepNumber: index, isFinish })}
                validationSchema={validationSchema(editMode, id)}
                enableReinitialize
                validateOnChange={false}
                validateOnBlur={false}
              >
                <Form className={classNames.form}>
                  <div className={classNames.columns}>{component}</div>

                  <NavigationButtons
                    prevStep={() => prevStep(index)}
                    isFinish={isFinish}
                    isEditMode={editMode}
                    isFirstStep={isFirstStep}
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

type NextStepParams = {
  values: FormikValues;
  stepNumber: number;
  isFinish: boolean;
};

export default StepWizard;

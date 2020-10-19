import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import Tabs from './Tabs';
import TabPanel from './TabPanel';
import AccountForm from './AccountForm';
import ProfileForm from './ProfileForm';
import ContactsForm from './ContactsForm';
import CapabilitiesForm from './CapabilitiesForm';
import RestoreUnsaved from './RestoreUnsaved';
import { initiateStepWizard, selectStep } from '../../redux/stepWizardReducer';

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initiateStepWizard(STEPS.length, editMode));
  }, [dispatch, editMode]);

  return (
    <div>
      <Tabs>
        {STEPS.map(({ name }, index) => (
          <TabPanel
            key={name}
            name={`${index + 1}. ${name}`}
            active={currentStep === index}
            selectStep={() => dispatch(selectStep(index))}
            disabled={currentStep < index}
            editMode={editMode}
          />
        ))}
      </Tabs>
      <div>
        {!editMode && <RestoreUnsaved />}
        {STEPS[currentStep].component}
        {
          STEPS.map(({ name, component: Component }, index) => <Component initialValues={form} />)[
            currentStep
          ]
        }
        )
      </div>
    </div>
  );
};

type StepWizardPropsType = {
  editMode?: boolean;
};

export default StepWizard;

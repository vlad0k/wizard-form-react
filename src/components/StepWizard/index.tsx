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
import { selectStep, setNumberOfSteps } from '../../redux/stepWizardReducer';

const STEPS = [
  {
    name: 'Account',
    component: <AccountForm />,
  },
  {
    name: 'Profile',
    component: <ProfileForm />,
  },

  {
    name: 'Contacts',
    component: <ContactsForm />,
  },
  {
    name: 'Skills',
    component: <CapabilitiesForm />,
  },
];

const StepWizard: FC<StepWizardPropsType> = ({ edit = false }) => {
  const currentStep: number = useSelector(
    ({ stepWizard: { currentStep } }: StateType) => currentStep,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNumberOfSteps(STEPS.length));
  }, [dispatch]);

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
          />
        ))}
      </Tabs>
      <div>
        {!edit && <RestoreUnsaved />}
        {STEPS[currentStep].component}
      </div>
    </div>
  );
};

type StepWizardPropsType = {
  edit?: boolean;
};

export default StepWizard;

import React from 'react';
import Tabs from './Tabs';
import classNames from './index.module.css';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';

const tabs = ['Account', 'Profile', 'Contacts', 'Capabilities'];

const StepWizard = () => {
  let currentStep: number = useSelector((state: StateType) => state.addForm.currentStep);

  const tabKeys = [
    {
      name: 'account',
      value: <Step1Form />,
    },
    {
      name: 'profile',
      value: <Step2Form />,
    },
    {
      name: 'contacts',
      value: <Step3Form />,
    },
    {
      name: 'capabilities',
      value: <Step4Form />,
    },
  ];

  const tab = tabKeys.filter(
    (t: typeof tabKeys[0]) => t.name === tabs[currentStep - 1].toLowerCase(),
  );
  return (
    <>
      <Tabs value={currentStep} tabs={tabs} />
      <div className={classNames.rectangle}>{tab[0].value}</div>
    </>
  );
};

export default StepWizard;

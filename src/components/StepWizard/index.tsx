import React from 'react';
import Tabs from './Tabs';
import classNames from './index.module.css';
import Avatar from '../ui/Avatar';
import FilePicker from '../ui/FilePicker';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import Step3Form from './Step3Form';
import addIcon from '../../assets/icons/add.svg';
import Step4Form from './Step4Form';

const Step1 = () => (
  <div className={classNames.twoColumns}>
    <div className={classNames.addUserPhoto}>
      <Avatar />
      <FilePicker name={'avatarupload'}>
        <img src={addIcon} alt="add avatar" />
        add avatar
      </FilePicker>
    </div>

    <div className={classNames.formWrapper}>
      <Step1Form />
    </div>
  </div>
);

const tabs = ['Account', 'Profile', 'Contacts', 'Capabilities'];

const StepWizard = () => {
  let currentStep: number = useSelector((state: StateType) => state.addForm.currentStep);

  const tabKeys = [
    {
      name: 'account',
      value: <Step1 />,
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
  console.log(tab);
  return (
    <>
      <Tabs value={currentStep} tabs={tabs} />
      <div className={classNames.rectangle}>{tab[0].value}</div>
    </>
  );
};

export default StepWizard;

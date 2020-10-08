import React, { FC } from 'react';
import Tabs from './Tabs';
import classNames from './index.module.css';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';
import { useParams } from 'react-router-dom';
import { UrlParamTypes } from '../../pages/UserInfoPage';
import { selectStep } from '../../redux/addFormReducer';
import { importUsers } from '../../redux/usersListReducer';

const tabs = ['Account', 'Profile', 'Contacts', 'Capabilities'];

const StepWizard: FC<StepWizarPropsType> = ({ mode = 'add' }) => {
  const { id } = useParams<UrlParamTypes>();
  let currentStep: number = useSelector((state: StateType) => state.addForm.currentStep);
  let initialState = useSelector((state: StateType) => {
    if (mode === 'add') return state.addForm;
    else return state.users.users.filter((u) => u.id === +id)[0];
  });

  if (!initialState) return <div />;
  const tabKeys = [
    {
      name: 'account',
      value: (
        <Step1Form
          initialValues={{
            username: initialState.username,
            password: initialState.password,
            passwordRepeat: initialState.password,
            avatar: initialState.avatar,
          }}
        />
      ),
    },
    {
      name: 'profile',
      value: (
        <Step2Form
          initialValues={{
            firstname: initialState.firstname,
            lastname: initialState.lastname,
            email: initialState.email,
            adress: initialState.adress,
            gender: initialState.gender,
            birthdate: initialState.birthdate,
          }}
        />
      ),
    },
    {
      name: 'contacts',
      value: (
        <Step3Form
          initialValues={{
            company: initialState.company,
            facebook: initialState.facebook,
            github: initialState.github,
            mainLang: initialState.mainLang,
            fax: initialState.fax,
            phoneNumbers: initialState.phoneNumbers,
          }}
        />
      ),
    },
    {
      name: 'capabilities',
      value: (
        <Step4Form
          initialValues={{
            skills: initialState.skills,
            additionalInfo: initialState.additionalInfo,
            hobbies: initialState.hobbies,
          }}
          editId={+id}
        />
      ),
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

type StepWizarPropsType = {
  mode: 'add' | 'edit';
};

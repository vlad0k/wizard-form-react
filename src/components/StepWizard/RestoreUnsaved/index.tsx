import React, { FC } from 'react';
import classNames from './index.module.css';
import Button from '../../ui/Button';
import { ButtonAppearance } from '../../../types';
import { submitForm } from '../../../redux/addFormReducer';
import { useDispatch } from 'react-redux';
import closeIcon from '../../../assets/icons/close.png';

const RestoreUnsaved: FC = () => {
  const dispatch = useDispatch();
  const closeButtonHandler = () => {
    localStorage.removeItem('formState');
  };

  const continueButtonHandler = () => {
    const formState = localStorage.getItem('formState');
    dispatch(submitForm(JSON.parse(formState ? formState : '')));
  };

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.container}>
        You have an unsaved user data. Do you want to complete it?
        <Button onClick={continueButtonHandler} appearance={ButtonAppearance.text}>
          <span>Continue</span>
        </Button>
      </div>

      <Button onClick={closeButtonHandler} appearance={ButtonAppearance.text}>
        <img src={closeIcon} alt={'close'} />
      </Button>
    </div>
  );
};

export default RestoreUnsaved;

import React, { FC, useEffect, useState } from 'react';
import classNames from './index.module.css';
import Button from '../../ui/Button';
import { ButtonAppearance } from '../../../types';
import closeIcon from '../../../assets/icons/close.png';
import { StateType } from '../../../redux/store';
import { deleteFormState, getFormState } from '../../../localStorage';
import { useDispatch } from 'react-redux';
import { loadSavedForm } from '../../../redux/stepWizardReducer';

const RestoreUnsaved: FC = () => {
  const [savedFormState, setSavedFormState] = useState<StateType | undefined>(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    const formState = getFormState();
    setSavedFormState(formState);
  }, []);

  const continueButtonHandler = () => {
    dispatch(loadSavedForm(savedFormState));
    deleteFormState();
    setSavedFormState(undefined);
  };

  const closeButtonHandler = () => {
    deleteFormState();
    setSavedFormState(undefined);
  };

  return (
    <>
      {savedFormState && (
        <div className={classNames.wrapper}>
          <div className={classNames.container}>
            You have an unsaved user data. Do you want to complete it?
            <Button appearance={ButtonAppearance.text} onClick={continueButtonHandler}>
              <span>Continue</span>
            </Button>
          </div>

          <Button appearance={ButtonAppearance.text} onClick={closeButtonHandler}>
            <img src={closeIcon} alt={'close'} />
          </Button>
        </div>
      )}
    </>
  );
};

export default RestoreUnsaved;

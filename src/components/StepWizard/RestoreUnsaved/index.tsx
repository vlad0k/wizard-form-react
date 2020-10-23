import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import closeIcon from '../../../assets/icons/close.png';
import { deleteFormState, getFormState } from '../../../localStorage';
import { loadSavedForm } from '../../../redux/stepWizardReducer';
import { StateType } from '../../../redux/store';
import { ButtonAppearance } from '../../../types';
import Button from '../../ui/Button';
import classNames from './index.module.css';

const RestoreUnsaved: FC = () => {
  const [savedFormState, setSavedFormState] = useState<StateType | undefined>(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    const formState = getFormState();
    setSavedFormState(formState);
  }, []);

  const continueButtonHandler = () => {
    dispatch(loadSavedForm({ ...savedFormState, avatar: undefined }));
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
            <img src={closeIcon} alt="close" />
          </Button>
        </div>
      )}
    </>
  );
};

export default RestoreUnsaved;

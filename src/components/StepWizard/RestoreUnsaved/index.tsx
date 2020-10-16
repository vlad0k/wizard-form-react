import React, { FC, useEffect, useState } from 'react';
import classNames from './index.module.css';
import Button from '../../ui/Button';
import { ButtonAppearance } from '../../../types';
import { submitForm } from '../../../redux/addFormReducer';
import { useDispatch } from 'react-redux';
import closeIcon from '../../../assets/icons/close.png';
import db from '../../../db/db';
import { StateType } from '../../../redux/store';

const RestoreUnsaved: FC = () => {
  const [formStateFromDb, setFormStateFromDb] = useState<StateType | undefined>(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    db.table('formState')
      .toCollection()
      .first()
      .then((formState) => setFormStateFromDb(formState));
  }, []);

  const closeButtonHandler = () => {
    setFormStateFromDb(undefined);
    db.table('formState').clear();
  };

  const continueButtonHandler = () => {
    formStateFromDb && dispatch(submitForm({ ...formStateFromDb }));
    setFormStateFromDb(undefined);
  };
  return (
    <>
      {formStateFromDb && (
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
      )}
    </>
  );
};

export default RestoreUnsaved;

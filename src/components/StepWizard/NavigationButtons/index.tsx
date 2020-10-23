import { useFormikContext } from 'formik';
import { resolve } from 'path';
import React, { FC } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import { PreviousStep, submitForm } from '../../../redux/stepWizardReducer';
import { ButtonAppearance } from '../../../types';
import Button from '../../ui/Button';
import classNames from './index.module.css';

const NavigationButtons: FC<NavigationButtonsPropsType> = ({
  nextUrl,
  prevUrl,
  isEditMode = false,
  isFinish = false,
}) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { validateForm, submitForm } = useFormikContext();
  const forwardButtonHandler = () => {
    validateForm()
      .then((errors) => {
        if (!Object.keys(errors).length) {
          return submitForm();
        }
        return new Promise((resolve, reject) => reject());
      })
      .then(() => (nextUrl ? history.push(nextUrl) : history.push('/users')));
  };

  return (
    <>
      {!isEditMode ? (
        <div className={classNames.buttons}>
          {isFinish && (
            <Button onClick={forwardButtonHandler} appearance={ButtonAppearance.finish}>
              Finish
            </Button>
          )}
          {nextUrl && <Button onClick={forwardButtonHandler}>Forward</Button>}
          {prevUrl && (
            <Link to={prevUrl}>
              <Button appearance={ButtonAppearance.secondary} type="button">
                Back
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className={classNames.buttons}>
          <Button>Save</Button>
        </div>
      )}
    </>
  );
};

type NavigationButtonsPropsType = {
  nextUrl?: string;
  prevUrl?: string;
  isEditMode?: boolean;
  isFinish?: boolean;
};

export default NavigationButtons;

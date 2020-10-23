import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { PreviousStep } from '../../../redux/stepWizardReducer';
import { ButtonAppearance } from '../../../types';
import Button from '../../ui/Button';
import classNames from './index.module.css';

const NavigationButtons: FC<NavigationButtonsPropsType> = ({
  nextUrl,
  prevUrl,
  isEditMode = false,
  isFinish = false,
}) => {
  const dispatch = useDispatch();

  const backButtonHandler = () => {
    dispatch(PreviousStep());
  };
  const { values, submitForm } = useFormikContext();

  return (
    <>
      {!isEditMode ? (
        <div className={classNames.buttons}>
          {isFinish && <Button appearance={ButtonAppearance.finish}>Finish</Button>}
          {nextUrl && (
            <Link to={nextUrl}>
              <Button>Forward</Button>
            </Link>
          )}
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
  isEditMode?: string;
  isFinish?: boolean;
};

export default NavigationButtons;

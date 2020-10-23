import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PreviousStep } from '../../../redux/stepWizardReducer';
import { StateType } from '../../../redux/store';
import { ButtonAppearance } from '../../../types';
import Button from '../../ui/Button';
import classNames from './index.module.css';

const NavigationButtons: FC<NavigationButtonsPropsType> = () => {
  const { currentStep, numberOfSteps, isEditMode } = useSelector(
    ({ stepWizard: { currentStep, numberOfSteps, isEditMode } }: StateType) => ({
      currentStep,
      numberOfSteps,
      isEditMode,
    }),
  );
  const dispatch = useDispatch();

  const backButtonHandler = () => {
    dispatch(PreviousStep());
  };

  return (
    <>
      {!isEditMode ? (
        <div className={classNames.buttons}>
          {currentStep === numberOfSteps - 1 ? (
            <Button appearance={ButtonAppearance.finish}>Finish</Button>
          ) : (
            <Button>Forward</Button>
          )}
          {currentStep > 0 && (
            <Button
              appearance={ButtonAppearance.secondary}
              onClick={backButtonHandler}
              type="button"
            >
              Back
            </Button>
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

type NavigationButtonsPropsType = {};

export default NavigationButtons;

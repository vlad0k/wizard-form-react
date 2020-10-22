import React, { FC } from 'react';
import classNames from './index.module.css';
import Button from '../../ui/Button';
import { ButtonAppearance } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { previosStep } from '../../../redux/stepWizardReducer';
import { StateType } from '../../../redux/store';

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
    dispatch(previosStep());
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

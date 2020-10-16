import React from 'react';
import classNames from './index.module.css';
import Button from '../../ui/Button';
import { ButtonAppearance } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { previosStep } from '../../../redux/stepWizardReducer';
import { StateType } from '../../../redux/store';

const NavigationButtons = () => {
  const { currentStep, numberOfSteps } = useSelector(
    ({ stepWizard: { currentStep, numberOfSteps } }: StateType) => ({
      currentStep,
      numberOfSteps,
    }),
  );
  const dispatch = useDispatch();

  const backButtonHandler = () => {
    dispatch(previosStep());
  };

  return (
    <div className={classNames.buttons}>
      {currentStep === numberOfSteps - 1 ? (
        <Button appearance={ButtonAppearance.finish}>Finish</Button>
      ) : (
        <Button>Forward</Button>
      )}
      {currentStep > 0 && (
        <Button appearance={ButtonAppearance.secondary} onClick={backButtonHandler} type="button">
          Back
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;

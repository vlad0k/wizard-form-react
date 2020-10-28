import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { ButtonAppearance } from '../../../types';
import Button from '../../ui/Button';
import classNames from './index.module.css';

const NavigationButtons: FC<NavigationButtonsPropsType> = ({
  isEditMode = false,
  isFinish = false,
  prevStep = () => {},
  isFirstStep = false,
}) => (
  <>
    {!isEditMode ? (
      <div className={classNames.buttons}>
        {isFinish ? (
          <Button appearance={ButtonAppearance.finish}>Finish</Button>
        ) : (
          <Button>Forward</Button>
        )}
        {!isFirstStep && (
          <Button onClick={prevStep} appearance={ButtonAppearance.secondary} type="button">
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

type NavigationButtonsPropsType = {
  prevUrl?: string;
  isEditMode?: boolean;
  isFinish?: boolean;
  isFirstStep?: boolean;
  prevStep: () => void;
};

export default NavigationButtons;

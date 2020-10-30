import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { StateType } from '../../../redux/store';
import { ButtonAppearance } from '../../../types';
import Button from '../../ui/Button';
import Preloader from '../../ui/Preloader';
import classNames from './index.module.css';

const NavigationButtons: FC<NavigationButtonsPropsType> = ({
  isEditMode = false,
  isFinish = false,
  prevStep = () => {},
  isFirstStep = false,
}) => {
  const addUserPending = useSelector(({ users }: StateType) => users.addUserPending);
  return (
    <>
      {!isEditMode ? (
        <div className={classNames.buttons}>
          {isFinish ? (
            <div className={classNames.finishWrapper}>
              <Button appearance={ButtonAppearance.finish}>Finish</Button>
              {!addUserPending ? '' : <Preloader size="small" />}
            </div>
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
};

type NavigationButtonsPropsType = {
  prevUrl?: string;
  isEditMode?: boolean;
  isFinish?: boolean;
  isFirstStep?: boolean;
  prevStep: () => void;
};

export default NavigationButtons;

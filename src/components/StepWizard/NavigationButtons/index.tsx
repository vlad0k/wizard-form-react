import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { ButtonAppearance } from '../../../types';
import Button from '../../ui/Button';
import classNames from './index.module.css';

const NavigationButtons: FC<NavigationButtonsPropsType> = ({
  prevUrl,
  isEditMode = false,
  isFinish = false,
}) => (
  <>
    {!isEditMode ? (
      <div className={classNames.buttons}>
        {isFinish ? (
          <Button appearance={ButtonAppearance.finish}>Finish</Button>
        ) : (
          <Button>Forward</Button>
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

type NavigationButtonsPropsType = {
  prevUrl?: string;
  isEditMode?: boolean;
  isFinish?: boolean;
};

export default NavigationButtons;

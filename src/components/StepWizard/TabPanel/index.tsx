import React, { FC } from 'react';
import classNames from './index.module.css';
import classNamesCombine from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/store';
import { selectStep } from '../../../redux/formReducer';

const TabPanel: FC<TopTabProps> = ({ active, name, value }) => {
  const { currentStep, isEditMode } = useSelector(
    ({ form: { currentStep, isEditMode } }: StateType) => ({
      currentStep,
      isEditMode,
    }),
  );

  const dispatch = useDispatch();

  const tabClickHandler = () => {
    if (isEditMode) {
      dispatch(selectStep(value));
    }
  };

  const tabClassName = classNamesCombine(classNames.tab, {
    [classNames.active]: active,
    [classNames.visited]: !isEditMode && value > currentStep,
  });

  return (
    <div className={tabClassName} onClick={tabClickHandler}>
      {value + 1}. {name}
    </div>
  );
};

export default TabPanel;

type TopTabProps = {
  value: number;
  name: string;
  active?: boolean;
};

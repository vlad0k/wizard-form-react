import React from "react";
import classNames from "./index.module.css";
import classNamesCombine from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../../redux/store";
import { selectStep } from "../../../redux/addFormReducer";

const Tab = ({ active, name, value }: TopTabProps) => {
  const currentStep = useSelector(
    (state: StateType) => state.addForm.currentStep
  );

  const dispatch = useDispatch();

  const tabClickHandler = () => {
    dispatch(selectStep(value));
  };

  const tabClassName = classNamesCombine({
    [classNames.tab]: true,
    [classNames.active]: active,
    [classNames.visited]: value < currentStep,
  });

  return (
    <div className={tabClassName} onClick={tabClickHandler}>
      {value}. {name}
    </div>
  );
};

export default Tab;

type TopTabProps = {
  value: number;
  name: string;
  active?: boolean;
};

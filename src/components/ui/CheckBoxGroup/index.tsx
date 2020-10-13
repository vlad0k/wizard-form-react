import React from 'react';
import classNames from './index.module.css';
import Checkbox from '../CheckBox';

const CheckBoxGroup = ({ checkboxes, name }: CheckBoxGroupPropsType) => {
  return (
    <div>
      <span className={classNames.checkboxLabel}> My Hobbies</span>
      {checkboxes.map(({ name, label }, index) => (
        <Checkbox key={index} name={name} label={label} />
      ))}
    </div>
  );
};

export default CheckBoxGroup;

type CheckBoxGroupPropsType = {
  checkboxes: CheckBoxtype[];
  name: string;
};

type CheckBoxtype = {
  name: string;
  label: string;
};

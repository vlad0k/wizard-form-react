import React from 'react';
import classNames from './index.module.css';
import Checkbox from './CheckBox';

const CheckBoxGroup = ({ group }: CheckBoxGroupPropsType) => {
  return (
    <div>
      <label className={classNames.checkboxLabel}> My Hobbies</label>
      {group.map((c: CheckBoxtype, i) => (
        <Checkbox key={i} name={c.name} label={c.label} />
      ))}
    </div>
  );
};

export default CheckBoxGroup;

type CheckBoxGroupPropsType = {
  group: CheckBoxtype[];
};

interface CheckBoxtype {
  name: string;
  label: string;
}

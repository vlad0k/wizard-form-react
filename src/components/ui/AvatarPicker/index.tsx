import React, { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import classNames from './index.module.css';
import { Field, FieldProps } from 'formik';
import Avatar from '../Avatar';
import addIcon from '../../../assets/icons/add.svg';

const AvatarPicker = ({ name }: AvatarPickerProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const mouseDownHandler = () => {
    setIsPressed(true);
  };
  const mouseUpHandler = () => {
    setIsPressed(false);
  };

  return (
    <Field name={name}>
      {({ field: { name, value }, form: { setFieldValue } }: FieldProps) => {
        const fileInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
          const {
            target: { files },
          } = event;
          setFieldValue(name, files && files[0]);
        };
        return (
          <label
            htmlFor={name}
            className={cn(classNames.upload, { [classNames.pressed]: isPressed })}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
          >
            <div className={classNames.addUserPhoto}>
              <Avatar image={value && URL.createObjectURL(value)} />
              <div className={classNames.label}>
                <img src={addIcon} alt="add avatar" />
                add avatar
              </div>
            </div>
            <input type="file" name={name} id={name} onChange={fileInputChangeHandler} />
          </label>
        );
      }}
    </Field>
  );
};

export default AvatarPicker;

type AvatarPickerProps = {
  name: string;
};

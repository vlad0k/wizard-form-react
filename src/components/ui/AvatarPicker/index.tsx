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
        const avatarSrc = value && URL.createObjectURL(value);

        const fileInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
          const { target } = event;
          const file = target.files ? target.files[0] : undefined;
          setFieldValue(name, file);
        };
        return (
          <label
            htmlFor={name}
            className={cn(classNames.upload, {
              [classNames.pressed]: isPressed,
            })}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
          >
            <div className={classNames.addUserPhoto}>
              <Avatar image={avatarSrc} />
              <div>
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

import React, { useState } from 'react';
import cn from 'classnames';
import classNames from './index.module.css';
import { Field, FieldProps } from 'formik';
import Avatar from '../Avatar';
import addIcon from '../../../assets/icons/add.svg';
import FieldError from '../FieldError';
import DropZone from './DropZone';
import ImageCrop from './ImageCrop';

const AvatarPicker = ({ name }: AvatarPickerProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);

  const mouseDownHandler = () => {
    setIsPressed(true);
  };
  const mouseUpHandler = () => {
    setIsPressed(false);
  };

  return (
    <>
      <Field name={name}>
        {({
          field: { name, value },
          form: { setFieldValue, values, setFieldTouched },
        }: FieldProps) => {
          const setField = (file: File) => {
            console.log(file);
            setFieldValue(name, file);
            setFieldTouched(name);
          };
          const handleChange = (file: File) => {
            setImage(file);
          };

          return (
            <label
              htmlFor={name}
              className={classNames.upload}
              onMouseDown={mouseDownHandler}
              onMouseUp={mouseUpHandler}
            >
              {image && (
                <ImageCrop image={image} setField={setField} onClose={() => setImage(undefined)} />
              )}

              <DropZone handleChange={handleChange} name={name}>
                <div className={classNames.addUserPhoto}>
                  <Avatar image={value && URL.createObjectURL(value)} />
                  <div className={cn(classNames.label, { [classNames.pressed]: isPressed })}>
                    <img src={addIcon} alt="add avatar" />
                    add avatar
                  </div>
                </div>
              </DropZone>
            </label>
          );
        }}
      </Field>
      <FieldError name={name} />
    </>
  );
};

export default AvatarPicker;

type AvatarPickerProps = {
  name: string;
};

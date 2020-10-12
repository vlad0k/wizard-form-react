import React from 'react';
import { FieldArrayRenderProps } from 'formik';
import classNames from './index.module.css';
import InputField from '../../ui/InputField';
import Button from '../../ui/Button';
import minusIcon from '../../../assets/icons/minus.svg';
import addIcon from '../../../assets/icons/add.svg';
import { ButtonAppearance } from '../../../types';

const MAX_NUMBER_OF_PHONE_INPUTS = 3;

const PhoneInputs = (props: FieldArrayRenderProps) => {
  const {
    push,
    remove,
    form: {
      values: { phoneNumbers = [''] },
    },
  } = props;

  return (
    <>
      {phoneNumbers.map((phone: string, index: number) => (
        <div className={classNames.phones} key={index}>
          <InputField name={`phoneNumbers[${index}]`} label={`Phone #${index + 1}`} />
          {index > 0 && (
            <Button
              appearance={ButtonAppearance.Text}
              type={'button'}
              onClick={() => remove(index)}
            >
              <img src={minusIcon} alt="remove phone number input" />
            </Button>
          )}
        </div>
      ))}

      {phoneNumbers.length < MAX_NUMBER_OF_PHONE_INPUTS && (
        <Button appearance={ButtonAppearance.Text} type={'button'} onClick={() => push('')}>
          <img src={addIcon} alt="add phone number" />
          add phone number
        </Button>
      )}
    </>
  );
};

export default PhoneInputs;

import React from 'react';
import InputMask from 'react-input-mask';

const PhoneInput = () => {
  return (
    <InputMask mask="99/99/9999" value={props.value} onChange={props.onChange}>
      {(inputProps) => <input {...inputProps} type="tel" disableUnderline />}
    </InputMask>
  );
};

export default PhoneInput;

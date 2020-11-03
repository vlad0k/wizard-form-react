import React, { FC } from 'react';

import { HOBBIES_CHECKBOX_GROUP, SKILLS_SELECT_OPTIONS } from '../../../formOptions';
import Checkbox from '../../ui/CheckBox';
import FieldError from '../../ui/FieldError';
import SelectField from '../../ui/SelectField';
import TextArea from '../../ui/TextArea';

const MAX_LENGTH_OF_TEXTAREA = 300;

const CapabilitiesForm: FC = () => (
  <>
    <div>
      <SelectField
        name="skills"
        options={SKILLS_SELECT_OPTIONS}
        label="Skills"
        isMulti
        isRequiredField
      />
      <TextArea name="additionalInfo" label="Additional Info" maxlength={MAX_LENGTH_OF_TEXTAREA} />
    </div>
    <div role="group">
      <span>Hobbies:</span>
      {HOBBIES_CHECKBOX_GROUP.map(({ value, label }) => (
        <Checkbox key={value} name="hobbies" value={value} label={label} />
      ))}
      <FieldError name="hobbies" />
    </div>
  </>
);

export default CapabilitiesForm;

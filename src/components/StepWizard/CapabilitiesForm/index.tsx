import React, { FC } from 'react';

import {
  HOBBIES_CHECKBOX_GROUP,
  REQUIRED_FIELD_MESSAGE,
  SKILLS_SELECT_OPTIONS,
} from '../../../formOptions';
import Yup from '../../../yup';
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

export const validationSchema = () =>
  Yup.object({
    skills: Yup.array()
      .of(Yup.string().required(REQUIRED_FIELD_MESSAGE))
      .min(3, ({ min }) => `you should have al least ${min} skills`),
  });

export default CapabilitiesForm;

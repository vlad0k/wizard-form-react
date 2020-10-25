import { FormikValues } from 'formik';
import React, { FC, ReactNode } from 'react';
import * as Yup from 'yup';

import { SkillOptionType } from '../../../types';
import Checkbox from '../../ui/CheckBox';
import FieldError from '../../ui/FieldError';
import MySelect from '../../ui/SelectField';
import TextArea from '../../ui/TextArea';
import FormLayout from '../FormLayout';
import NavigationButtons from '../NavigationButtons';

const MAX_LENGTH_OF_TEXTAREA = 300;

export const SKILLS_SELECT_OPTIONS: SkillOptionType[] = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'Javascript' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'jquery', label: 'jQuery' },
  { value: 'nodejs', label: 'NodeJS' },
  { value: 'python', label: 'Python' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby-on-rails', label: 'Ruby On Rails' },
  { value: 'sql', label: 'SQL' },
  { value: 'backbonejs', label: 'BackboneJS' },
  { value: 'web-design', label: 'Web Design' },
  { value: 'project-management', label: 'Project management' },
  { value: 'git', label: 'Git' },
  { value: 'docker', label: 'Docker' },
  { value: 'aws-lambda', label: 'AWS Lambda' },
  { value: 'firebase', label: 'Firebase' },
];

export const HOBBIES_CHECKBOX_GROUP = [
  { value: 'sport', label: 'Sport, fitness, aerobica and staff like that' },
  { value: 'gaming', label: 'I just want to play games, I’m not living in this life' },
  { value: 'nothing', label: 'I’m a female... I’m doing nothing. Every day.' },
  { value: 'guitar', label: 'Guitar, guitar and guitar again. I’m fall in love with it.' },
  { value: 'nohobbie', label: 'WTF is “hobbies”???' },
];

const CapabilitiesForm: FC<CapabilitiesFormPropsType> = ({
  initialValues,
  isFinish = false,
  isEditMode = false,
  navButtons,
}) => {
  const validationSchema = Yup.object({
    skills: Yup.array()
      .of(Yup.string().required('required field'))
      .min(3, ({ min }) => `you should have al least ${min} skills`),
  });

  return (
    <FormLayout
      initialValues={initialValues}
      validationSchema={validationSchema}
      isFinish={isFinish}
      isEditMode={isEditMode}
    >
      <div>
        <MySelect name="skills" options={SKILLS_SELECT_OPTIONS} label="Skills" isMulti />
        <TextArea
          name="additionalInfo"
          label="Additional Info"
          maxlength={MAX_LENGTH_OF_TEXTAREA}
        />
      </div>
      <div role="group">
        <span>Hobbies:</span>
        {HOBBIES_CHECKBOX_GROUP.map(({ value, label }) => (
          <Checkbox key={value} name="hobbies" value={value} label={label} />
        ))}
        <FieldError name="hobbies" />
        {navButtons}
      </div>
    </FormLayout>
  );
};

export default CapabilitiesForm;

type CapabilitiesFormPropsType = {
  initialValues: FormikValues;
  isFinish?: boolean;
  isEditMode?: boolean;
  navButtons: ReactNode;
};

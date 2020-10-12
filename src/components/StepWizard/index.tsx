import React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import Tabs from './Tabs';
import TabPanel from './TabPanel';
import FormLayout from './FormLayout';
import AvatarPicker from '../ui/AvatarPicker';
import InputField from '../ui/InputField';
import DatePicker from '../ui/DatePicker';
import { FieldArray } from 'formik';
import FieldError from '../ui/FieldError';
import RadioGroup from '../ui/RadioGroup';
import Select, { OptionType } from '../ui/Select';
import PhoneInputs from './PhoneInputs';
import MySelect from '../ui/Select';
import TextArea from '../ui/TextArea';
import CheckBoxGroup from '../ui/CheckBoxGroup';
import { SkillOptionType } from '../../types';
import LocationPicker from '../ui/LocationPicker';
import PhoneInput from '../ui/PhoneInput';

const languageSelectOptions: OptionType[] = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Russian' },
  { value: 'ua', label: 'Ukrainian' },
];

const multiSelectOptions: SkillOptionType[] = [
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

const checkBoxGroup = [
  { name: 'sport', label: 'Sport, fitness, aerobica and staff like that' },
  { name: 'gaming', label: 'I just want to play games, I’m not living in this life' },
  { name: 'nothing', label: 'I’m a female... I’m doing nothing. Every day.' },
  { name: 'guitar', label: 'Guitar, guitar and guitar again. I’m fall in love with it.' },
  { name: 'nohobbie', label: 'WTF is “hobbies”???' },
];

const MAX_LENGTH_OF_TEXTAREA = 300;

const steps = [
  {
    name: 'Account',
    render: (
      <>
        <div>
          <AvatarPicker name={'avatar'} />
        </div>
        <div>
          <InputField name="username" label="User Name" />
          <InputField name="password" label="Password" type="password" />
          <InputField name="passwordRepeat" label="Repeat Password" type="password" />
        </div>
      </>
    ),
  },
  {
    name: 'Profile',
    render: (
      <>
        <div>
          <InputField name="firstname" label="First Name" />
          <InputField name="lastname" label="Last Name" />
          <DatePicker name="birthdate" />
        </div>
        <div>
          <InputField name="email" label="Email" />
          <LocationPicker name="adress" label={'Address'} />
          <RadioGroup
            name="gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
          />
          <FieldError name="gender" />
        </div>
      </>
    ),
  },
  {
    name: 'Contacts',
    render: (
      <>
        <div>
          <InputField name="company" label="Company" />
          <InputField name="github" label="GitHub Link" />
          <InputField name="facebook" label="Facebook Link" />
          <Select name="mainLang" options={languageSelectOptions} label="Main Language" />
        </div>

        <div>
          <InputField name="fax" label="Fax" />
          <FieldArray name="phoneNumbers">{PhoneInputs}</FieldArray>
        </div>
      </>
    ),
  },
  {
    name: 'Skills',
    render: (
      <>
        <div>
          <MySelect name="skills" options={multiSelectOptions} label="Skills" isMulti />
          <TextArea
            name="additionalInfo"
            label="Additional Info"
            maxlength={MAX_LENGTH_OF_TEXTAREA}
          />
        </div>
        <div>
          <CheckBoxGroup group={checkBoxGroup} />
        </div>
      </>
    ),
  },
];

const StepWizard = () => {
  const { currentStep, initialValues } = useSelector((state: StateType) => {
    const { currentStep, ...initialValues } = state.addForm;
    return { currentStep, initialValues };
  });

  return (
    <div>
      <Tabs>
        {steps.map(({ name }, index) => (
          <TabPanel key={index} name={name} value={index} active={currentStep === index} />
        ))}
      </Tabs>
      <FormLayout
        initialValues={{ ...initialValues, passwordRepeat: '' }}
        numberOfSteps={steps.length}
        currentStep={currentStep}
      >
        {steps.map(({ render }, index) => currentStep === index && render)[currentStep]}
      </FormLayout>
    </div>
  );
};

export default StepWizard;

import React from 'react';
import classNames from './index.module.css';
import { Formik, Form } from 'formik';
import TextArea from '../../ui/TextArea';
import Checkbox from '../../ui/CheckBox';
import MySelect from '../../ui/Select';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, step4FormSubmit } from '../../../redux/addFormReducer';
import { StateType } from '../../../redux/store';
import db from '../../../db/db';

interface Values {
  skills: SkillOptionType[];
  additionalInfo: '';
  hobbies: string[];
}

const initialValues: Values = {
  skills: [],
  additionalInfo: '',
  hobbies: ['sport'],
};

export type SkillOptionType = {
  value: string;
  label: string;
};

const multiSelectOptions: SkillOptionType[] = [
  'HTML',
  'CSS',
  'Javascript',
  'React',
  'Angular',
  'jQuery',
  'NodeJS',
  'Python',
  'PHP',
  'Ruby On Rails',
  'SQL',
  'BackboneJS',
  'Web Design',
  'Project management',
  'Git',
  'Docker',
  'AWS Lambda',
  'Firebase',
].map((el: string) => ({ value: el.toLowerCase(), label: el }));

const Step4Form = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: StateType) => {
    const { currentStep, ...formState } = state.addForm;
    return formState;
  });

  const submitForm = (values: Values) => {
    const { skills = [], additionalInfo, hobbies = [] } = values;
    const skillsRes = skills.map((skill: SkillOptionType) => skill.value);
    dispatch(step4FormSubmit({ skills: skillsRes, additionalInfo, hobbies }));
    db.users.add({ ...formState, skills: skillsRes, additionalInfo, hobbies });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitForm}>
      <Form className={classNames.form}>
        <div className={classNames.column}>
          <MySelect name="skills" isMulti options={multiSelectOptions} label="Skills" />
          <TextArea name="additionalInfo" label="Additional Info" maxlength={300} />
        </div>
        <div className={[classNames.column, classNames.checkBoxGroup].join('')}>
          <label className={classNames.checkboxLabel}> My Hobbies</label>
          <Checkbox name="sport" label="Sport, fitness, aerobica and staff like that" />
          <Checkbox name="gaming" label="I just want to play games, I’m not living in this life" />
          <Checkbox name="nothing" label="I’m a female... I’m doing nothing. Every day." />
          <Checkbox
            name="guitar"
            label="Guitar, guitar and guitar again. I’m fall in love with it."
          />
          <Checkbox name="nohobbie" label="WTF is “hobbies”???" />
          <div className={classNames.buttons}>
            <Button appearance="secondary" type="button" onClick={() => dispatch(goBack())}>
              Back
            </Button>
            <Button appearance="finish">Finish</Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Step4Form;

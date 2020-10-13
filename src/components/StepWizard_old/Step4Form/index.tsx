import React, { FC } from 'react';
import classNames from './index.module.css';
import { Form, Formik } from 'formik';
import TextArea from '../../ui/TextArea';
import MySelect from '../../ui/SelectField';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, step4FormSubmit } from '../../../redux/addFormReducer';
import { StateType } from '../../../redux/store';
import db from '../../../db/db';
import * as Yup from 'yup';
import { importUsers } from '../../../redux/usersListReducer';
// import CheckBoxGroup from '../../ui/CheckBoxGroup';
import { ButtonAppearance, UserType } from '../../../types';
import cn from 'classnames/dedupe';

interface Values {
  skills: string[];
  additionalInfo: string;
  hobbies: string[];
}

export type SkillOptionType = {
  value: string;
  label: string;
};

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

const validateScema = Yup.object({
  skills: Yup.array()
    .of(Yup.string().required('required field'))
    .min(3, 'you should have al least 3 skills'),
});

const MAX_LENGTH_OF_TEXTAREA = 300;

const Step4Form: FC<Step4FormPropsType> = ({ initialValues, editId = null }) => {
  const dispatch = useDispatch();
  const formState = useSelector((state: StateType) => {
    const { currentStep, ...formState } = state.addForm;
    return formState;
  });

  const backButtonClickHandler = () => dispatch(goBack());

  const submitForm = (values: Values) => {
    dispatch(step4FormSubmit(values));
    db.table('users').add({ ...formState, ...values });

    const getUsersFromDb = async () => {
      const users: UserType[] = await db.table('users').toArray();
      dispatch(importUsers(users));
    };
    getUsersFromDb();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={submitForm} validationSchema={validateScema}>
      <Form className={classNames.form}>
        <div className={classNames.column}>
          <MySelect name="skills" options={multiSelectOptions} label="Skills" isMulti />
          <TextArea
            name="additionalInfo"
            label="Additional Info"
            maxlength={MAX_LENGTH_OF_TEXTAREA}
          />
        </div>
        <div className={cn(classNames.column, classNames.checkBoxGroup)}>
          {/*<CheckBoxGroup checkboxes={checkBoxGroup} />*/}
          <div className={classNames.buttons}>
            <Button
              appearance={ButtonAppearance.secondary}
              type="button"
              onClick={backButtonClickHandler}
            >
              Back
            </Button>
            <Button appearance={ButtonAppearance.finish}>Finish</Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Step4Form;

type Step4FormPropsType = {
  initialValues: Values;
  editId?: number | null;
};

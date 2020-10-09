import React, { FC } from 'react';
import classNames from './index.module.css';
import { Formik, Form } from 'formik';
import TextArea from '../../ui/TextArea';
import MySelect from '../../ui/Select';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, step4FormSubmit } from '../../../redux/addFormReducer';
import { StateType } from '../../../redux/store';
import db from '../../../db/db';
import * as Yup from 'yup';
import { importUsers, UserType } from '../../../redux/usersListReducer';
import CheckBoxGroup from '../../ui/CheckBoxGroup';

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

const Step4Form: FC<Step4FormPropsType> = ({ initialValues, editId = null }) => {
  const dispatch = useDispatch();
  const formState = useSelector((state: StateType) => {
    const { currentStep, ...formState } = state.addForm;
    return formState;
  });

  const submitForm = (values: Values) => {
    const { skills = [], additionalInfo, hobbies = [] } = values;
    dispatch(step4FormSubmit({ skills, additionalInfo, hobbies }));
    if (editId) {
      db.table('users').update(editId, { ...formState, skills, additionalInfo, hobbies });
    } else {
      db.table('users').add({ ...formState, skills, additionalInfo, hobbies });
    }
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
          <MySelect name="skills" isMulti options={multiSelectOptions} label="Skills" />
          <TextArea name="additionalInfo" label="Additional Info" maxlength={300} />
        </div>
        <div className={[classNames.column, classNames.checkBoxGroup].join(' ')}>
          <CheckBoxGroup group={checkBoxGroup} />
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

type Step4FormPropsType = {
  initialValues: Values;
  editId?: number | null;
};

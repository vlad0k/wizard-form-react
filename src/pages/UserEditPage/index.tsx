import React, { useEffect } from 'react';
import PageLayout from '../../components/PageLayout';
import { useParams } from 'react-router-dom';
import StepWizard from '../../components/StepWizard';
import { UrlParamTypes } from '../../types';
import { getUser } from '../../db';
import { useDispatch } from 'react-redux';
import { submitStep } from '../../redux/stepWizardReducer';

const UserEditPage = () => {
  const { id } = useParams<UrlParamTypes>();
  const dispatch = useDispatch();

  useEffect(() => {
    getUser(id).then((user) => {
      console.log(user);
      const {
        avatar,
        username,
        password,
        firstname,
        lastname,
        birthdate,
        email,
        adress,
        gender,
        company,
        facebook,
        github,
        mainLang,
        fax,
        phoneNumbers,
        skills,
        additionalInfo,
        hobbies,
      } = user;

      dispatch(
        submitStep({
          avatar,
          username,
          password,
          firstname,
          lastname,
          birthdate,
          email,
          adress,
          gender,
          company,
          facebook,
          github,
          mainLang,
          fax,
          phoneNumbers,
          skills,
          additionalInfo,
          hobbies,
        }),
      );
    });
  }, [dispatch, id]);

  return (
    <PageLayout name="Edit User" backLink={`/users/${id}`} backLabel="User Profile">
      <StepWizard editMode />
    </PageLayout>
  );
};

export default UserEditPage;

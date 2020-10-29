import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageLayout from '../../../components/PageLayout';
import StepWizard from '../../../components/StepWizard/';
import { getUser } from '../../../db';
import { submitForm } from '../../../redux/stepWizardReducer';
import { UrlParamTypes } from '../../../types';

const UserEditPage = () => {
  const { id } = useParams<UrlParamTypes>();
  const dispatch = useDispatch();

  useEffect(() => {
    getUser(id).then(
      ({
        avatar,
        username,
        password,
        firstname,
        lastname,
        birthdate,
        email,
        address,
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
      }) => {
        dispatch(
          submitForm({
            avatar,
            username,
            password,
            firstname,
            lastname,
            birthdate,
            email,
            address,
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
      },
    );
  }, [dispatch, id]);

  return (
    <PageLayout name="Edit User" backLink={`/users/${id}`} backLabel="User Profile">
      <StepWizard editMode />
    </PageLayout>
  );
};

export default UserEditPage;

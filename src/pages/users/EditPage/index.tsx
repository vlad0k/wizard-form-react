import React, { useEffect, useState } from 'react';
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
  const [isExhistingUser, setIsExhistingUser] = useState(false);

  useEffect(() => {
    getUser(id).then((user) => {
      if (Object.keys(user).length === 0) {
        return;
      }
      setIsExhistingUser(true);
      const {
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
      } = user;
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
    });
  }, [dispatch, id]);

  return (
    <PageLayout name="Edit User" backLink={`/users/${id}`} backLabel="User Profile">
      {isExhistingUser ? <StepWizard editMode /> : 'No user with such id'}
    </PageLayout>
  );
};

export default UserEditPage;

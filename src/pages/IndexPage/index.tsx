import React from 'react';

import PageLayout from '../../components/PageLayout';
import { useDispatch } from 'react-redux';
import Button from '../../components/ui/Button';
import { generateUsers } from '../../redux/usersListReducer';
import Search from '../../components/Search';

const IndexPage = () => {
  const dispatch = useDispatch();

  const generateButtonHandler = () => {
    dispatch(generateUsers());
  };
  return (
    <PageLayout name={''}>
      <Search />
      <Button onClick={generateButtonHandler}>Generate Users</Button>
    </PageLayout>
  );
};

export default IndexPage;

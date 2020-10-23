import React from 'react';
import { useDispatch } from 'react-redux';

import PageLayout from '../../components/PageLayout';
import Search from '../../components/Search';
import Button from '../../components/ui/Button';
import { generateUsers } from '../../redux/usersListReducer';
import classNames from './index.module.css';

const IndexPage = () => {
  const dispatch = useDispatch();

  const generateButtonHandler = () => {
    dispatch(generateUsers());
  };

  return (
    <PageLayout name="Search Users">
      <Search />
      <div className={classNames.generate}>
        <Button onClick={generateButtonHandler}>Generate Users</Button>
      </div>
    </PageLayout>
  );
};

export default IndexPage;

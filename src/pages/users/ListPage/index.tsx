import React from 'react';
import UsersList from '../../../components/UsersList';
import PageLayout from '../../../components/PageLayout';

const ListOfUsersPage = () => (
  <PageLayout name={'List of users'}>
    <UsersList />
  </PageLayout>
);

export default ListOfUsersPage;

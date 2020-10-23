import React from 'react';

import PageLayout from '../../../components/PageLayout';
import UsersList from '../../../components/UsersList';

const ListOfUsersPage = () => (
  <PageLayout name={'List of users'}>
    <UsersList />
  </PageLayout>
);

export default ListOfUsersPage;

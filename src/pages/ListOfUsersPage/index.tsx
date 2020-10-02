import React from "react";
import PageHeader from "../../components/ui/PageHeader";
import UsersList from "../../components/UsersList";
const ListOfUsersPage = () => {
  return (
    <>
      <PageHeader>List of users</PageHeader>
      <UsersList />
    </>
  );
};

export default ListOfUsersPage;

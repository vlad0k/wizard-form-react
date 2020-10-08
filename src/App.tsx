import React from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './db/db';

import Header from './components/Header';
import AddUserPage from './pages/AddUserPage';
import ListOfUsersPage from './pages/ListOfUsersPage';
import db from './db/db';
import { importUsers, UserType } from './redux/usersListReducer';

function App() {
  const dispatch = useDispatch();

  const getUsersFromDb = async () => {
    const users: UserType[] = await db.table('users').toArray();
    dispatch(importUsers(users));
  };
  getUsersFromDb();

  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/new">
          <AddUserPage />
        </Route>
        <Route path="/users">
          <ListOfUsersPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;

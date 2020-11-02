import './App.css';
import 'react-notifications-component/dist/theme.css';

import React from 'react';
import ReactNotification from 'react-notifications-component';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Header from './components/Header';
import AddUserPage from './pages/users/AddPage';
import UserEditPage from './pages/users/EditPage';
import UserInfoPage from './pages/users/InfoPage';
import ListOfUsersPage from './pages/users/ListPage';

//TODO FIX Import sort
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <ReactNotification />
        <Route path="/new">
          <AddUserPage />
        </Route>
        <Route path="/users">
          <Redirect to="/users/1" />
        </Route>
        <Route path="/users/:page">
          <ListOfUsersPage />
        </Route>
        <Route path="/user/:id" exact>
          <UserInfoPage />
        </Route>
        <Route path="/edit/:id">
          <UserEditPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;

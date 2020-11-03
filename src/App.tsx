import './App.css';
import 'react-notifications-component/dist/theme.css';

import React from 'react';
import ReactNotification from 'react-notifications-component';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import AddUserPage from './pages/users/AddPage';
import UserEditPage from './pages/users/EditPage';
import UserInfoPage from './pages/users/InfoPage';
import ListOfUsersPage from './pages/users/ListPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <ReactNotification />
        <Route path="/new">
          <AddUserPage />
        </Route>
        <Route path="/users" exact>
          <ListOfUsersPage />
        </Route>
        <Route path="/users/:id" exact>
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

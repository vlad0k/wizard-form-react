import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './db';

import Header from './components/Header';
import AddUserPage from './pages/AddUserPage';
import ListOfUsersPage from './pages/ListOfUsersPage';
import UserInfoPage from './pages/UserInfoPage';
import UserEditPage from './pages/UserEditPage';
import IndexPage from './pages/IndexPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/new">
          <AddUserPage />
        </Route>
        <Route path="/users" exact>
          <ListOfUsersPage />
        </Route>
        <Route path="/users/:id" exact>
          <UserInfoPage />
        </Route>
        <Route path="/edit/:id" exact>
          <UserEditPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;

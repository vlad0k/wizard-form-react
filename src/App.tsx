import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './db';

import Header from './components/Header';
import AddUserPage from './pages/users/AddPage';
import ListOfUsersPage from './pages/users/ListPage';
import UserInfoPage from './pages/users/InfoPage';
import UserEditPage from './pages/users/EditPage';
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

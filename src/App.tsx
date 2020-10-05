import React, { useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./db/db";
import store from "./redux/store";

import Header from "./components/Header";
import AddUserPage from "./pages/AddUserPage";
import ListOfUsersPage from "./pages/ListOfUsersPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Header />
          <Route path={"/new"}>
            <AddUserPage />
          </Route>
          <Route path={"/users"}>
            <ListOfUsersPage />
          </Route>
        </Provider>
      </Router>
    </div>
  );
}

export default App;

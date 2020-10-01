import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AddUserPage from "./pages/AddUserPage/AddUserPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path={"/new"}>
          <AddUserPage />
        </Route>
        <Route path={"/users"}>
          <p style={{ margin: 100 }}>Hello!</p>
        </Route>
      </Router>
    </div>
  );
}

export default App;

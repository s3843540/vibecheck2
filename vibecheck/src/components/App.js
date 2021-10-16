import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Edit from "./Edit";
import Forum from "./Forum";
import { resetUser } from "../data/repository"; 

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  //Defining all session variables.
  const [user, setUser] = useState(null);

  const loginUser = (user) => {
    setUser(user);
  }

  const logoutUser = () => {
    resetUser();
    setUser(null);
  }

  return (
    <Router>
        <Header user={user} logoutUser={logoutUser}/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/forum" render={props => (
              <Forum {...props} user={user}/>
            )
          }>
          </Route>
          <Route exact path="/sign-up" render={props => (
              <Register {...props} loginUser={loginUser}/>
            )
          }>
          </Route>
          <Route exact path="/login" render={props => (
              <Login {...props} loginUser={loginUser}/>
            )
          }>
          </Route>
          <Route exact path="/profile" render={props => (
              <Profile {...props} user={user} logoutUser={logoutUser}/>
            )
          }>  
          </Route>
          <Route exact path="/edit" render={props => (
              <Edit {...props} user={user} loginUser={loginUser}/>
            )
          }>
          </Route>
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;
import React, { useState } from "react";
import { getUser, verifyUser } from "../data/repository";
import "./Login.css"

function Login(props) {
  //Setting up hooks.
  const [fields, setFields] = useState({username: "", password: ""})
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    //Setting inputted values to fields.
    const temp = { username: fields.username, password: fields.password };

    temp[name] = value;
    setFields(temp);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Checks if user exists in database.
    const account = await verifyUser(fields.username, fields.password);
    //When an account is found, sets session variables and redirects user to profile page.
    if(account !== null) {;
      props.loginUser(account);
      props.history.push("/profile");
      return;
    }

    //When no user is found, gives error message and resets password field.
    const temp = { ...fields };
    temp.password = "";
    setFields(temp);

    setErrorMessage("Username and/or password is invalid, please try again.");
  }

  return (
    <form class="login-form" onSubmit={handleSubmit} autoComplete="off">
        <div class="login-container">
            <h1 class="text-center">Login</h1>
            <hr/>
            <input type="text" placeholder="Enter username..." name="username" id="username" value={fields.username} onChange={handleInputChange} required/>
            <input type="password" placeholder="Enter password..." name="password" id="password" value={fields.password} onChange={handleInputChange} required/>
            <hr/>
            <button type="submit" class="loginbtn">Login</button>
            {errorMessage !== null &&
              <div class="error-text">
                <span class="text-danger ">{errorMessage}</span>
              </div>
            }
        </div>
    </form>
  );
}
export default Login;
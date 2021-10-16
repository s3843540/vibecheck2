import React, { useState } from "react";
import { setUser, createUser, months, weekdays } from "../data/repository";
import "./Register.css"

function Register(props) {
  //Modified code from Week 04 Lab/Prac.
  //Setting up hooks.
  const [fields, setFields] = useState({username: "", email: "", password: "", date: ""})
  const [errorMessage, setErrorMessage] = useState({username: "", email: "", password: ""})
  //Hook used for the sake of re-rendering page
  const [value, setValue] = useState(0);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const button = document.querySelector('button');
    
    //Regular Expression to check for correct password format.
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,}/;

    //If statement to check whether or not the provided email is in the correct format.
    if (typeof fields.email !== "undefined") {
      let atPos = fields.email.lastIndexOf('@');
      let dotPos = fields.email.lastIndexOf('.');

      //Sets error message if email is currently not in the correct format.
      if (!(atPos < dotPos && atPos > 0 && fields.email.indexOf('@@') === -1 && dotPos > 2 && (fields["email"].length - dotPos) > 2)) {
        errorMessage["email"] = "Invalid email format. Example: john@example.com";
        button.disabled = true;
      }
      else {
        errorMessage["email"] = null;
        button.disabled = false;
      }
    }

    //Sets error message if password is currently not in the correct format.
    if (typeof fields.password !== "undefined") {
      if (!passwordRegex.test(fields.password)) {
        errorMessage["password"] = "Invalid password. Must be at least 6 characters, and be a mix of uppercase and lowercase characters, numbers and punctuation.";
        button.disabled = true;
      }
      else {
        errorMessage["password"] = null;
        button.disabled = false;
      }
    }

    //Sets values to fields.
    const temp = { username: fields.username, email: fields.email, password: fields.password };

    temp[name] = value;
    
    setFields(temp);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //Creates a new variable to get current date and formats it into a string.
    var dateCreate = new Date()

    var x = weekdays[dateCreate.getDay()];
    var y = months[dateCreate.getMonth()];
    var dateString = x+' '+(dateCreate.getDate())+' '+y+' '+dateCreate.getFullYear();
    fields["date"] = dateString;

    //Sets up JSON object to be saved, with fields value and date.
    const account = {
        username: fields.username,
        email: fields.email,
        password: fields.password,
        date: dateString
      };

    //Saves the user in database, when a user with same Username is already registered
    //the function will return false.
    const flag = createUser(account);
    if (flag === false) {
      errorMessage["username"] = "Username has already been taken.";
      //Used to re-render page based on the fact the 'useState' will do so.
      setValue(value => value + 1);
    }
    else {
      //Sets session variables and redirects to user profile.
      props.loginUser(account);
      props.history.push("/profile");
      return;
    }
  }

  return (
    <form class="register-form" onSubmit={handleSubmit} autoComplete="off">
        <div class="register-container">
            <h1 class="text-center">Sign Up</h1>
            <hr/>
            <input type="text" placeholder="Enter username..." name="username" id="username" value={fields.username} onChange={handleInputChange} required/>
            {errorMessage.email !== null &&
              <div class="error-text">
                <span class="text-danger ">{errorMessage.email}</span>
              </div>}
            <input type="text" placeholder="Enter email..." name="email" id="email" value={fields.email} onChange={handleInputChange} required/>
            {errorMessage.password !== null &&
              <div class="error-text">
                <span class="text-danger ">{errorMessage.password}</span>
              </div>}
            <input type="password" placeholder="Enter password..." name="password" id="password" value={fields.password} onChange={handleInputChange} required/>
            <hr/>
            <button type="submit" class="registerbtn">Register</button>
            {errorMessage.username !== null &&
            <div class="error-text">
              <span class="text-danger ">{errorMessage.username}</span>
            </div>}
        </div>
    </form>
  );
}

export default Register;

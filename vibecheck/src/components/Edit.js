import React, { useState } from "react";
import { editUser, getUser } from "../data/repository";
import "./Edit.css"

function Edit(props) {
  //Defining hooks.
  const [fields, setFields] = useState({username: "", email: "", password: ""})
  const [errorMessage, setErrorMessage] = useState({email: "", password: ""})

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

    //Sets error message if password is current not in the correct format.
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

    //Setting values to the fields.
    const temp = { username: fields.username, email: fields.email, password: fields.password };

    temp[name] = value;
    
    setFields(temp);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //Grabs creation date of the account and current username.
    const date = props.user.date;
    const oldusername = props.user.username;

    //Sets up JSON format for user.
    const account = 
      {
        username: fields.username,
        email: fields.email,
        password: fields.password,
        date: date,
        old: oldusername
      };

    editUser(account);
    props.loginUser(account);

    props.history.push("/profile");
    return;
  }

  return (
    <form class="edit-form" onSubmit={handleSubmit} autoComplete="off">
        <div class="edit-container">
            <h1 class="text-center">Edit Profile</h1>
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
            <button type="submit" class="editbtn">Submit Changes</button>
        </div>
    </form>
  );
}

export default Edit;

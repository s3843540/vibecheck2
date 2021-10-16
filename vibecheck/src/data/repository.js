import axios from "axios";

//Modified code from Week 04 Lab/Prac.
//Modified code from Week 08 Lab/Prac
//Declares constant values.
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

async function createUser(account) {
    const response = await axios.post(API_HOST + `/api/users`, account);

    if (response === false) {
        return "Username has been taken";
    }
    return response.data;
}

function setUser(account) {
    //Sets the current user for the session in local storage.
    localStorage.setItem(USER_KEY, JSON.stringify(account.username));
}

async function getUsers() {
    const response = await axios.get(API_HOST + `/api/users/`);

    return response.data;
}

async function getUser(username) {
    const response = await axios.get(API_HOST + `/api/users/select/${username}`);

    return response.data;
}

async function editUser(account) {
    const response = await axios.post(API_HOST + `/api/users/select/${account.username}`, account);
    setUser(account);
    return response.data;
}

async function verifyUser(username, password) {
    const response = await axios.get(API_HOST + "/api/users/login", { params: {username, password } });
    const account = response.data;

    if(account !== null) {
        setUser(account);
    }

    return account;
}

function resetUser() {
    localStorage.removeItem(USER_KEY);
}

async function deleteUser(username) {
    console.log(username);
   const response = await axios.post(API_HOST + `/api/users/select/delete/${username}`, username);

   return response;
}

async function createPost(post) {
    const response = await axios.post(API_HOST + `/api/posts`, post);

    return response;
}

async function getPosts() {
    const response = await axios.get(API_HOST + "/api/posts");

    return response.data;
}

export {
    createUser,
    setUser,
    getUser,
    verifyUser,
    resetUser,
    deleteUser,
    editUser,
    createPost,
    getPosts,
    weekdays,
    months
}
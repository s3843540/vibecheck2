import React from "react";
import './Home.css'

function Home(props) {
  return (
    <div class="wrapper">
      <div class="container">
        <div class="content-1">
          <h1 class="heading text-center">Start connecting with others</h1>
          <p class="text-left">With tools that allow students to communicate with ease, simplify your University life with Vibe Check. Join other students today!</p>
          <form action="/sign-up">
            <button type="submit" class="joinBtn">Join Now</button>
          </form>
        </div>
        <div class="content-2">
          <img class="home-image" src="https://images.unsplash.com/photo-1568475745587-a98f9ec71cf4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"/>
          <div class="text-image">Vibe Check</div>
        </div>
      </div>
    </div>
  );
}

export default Home;

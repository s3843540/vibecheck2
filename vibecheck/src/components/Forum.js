import React, { useEffect, useState } from "react";
import "./Forum.css"
import { createPost, getPosts } from "../data/repository"

function Forum(props) {
    //Code modifed from Code Archive of Week 08 Lab/Prac.
    //Setting up hooks.
    const [post, setPost] = useState({text: ""});
    const [posts, setPosts] = useState([]);

    //Used from Week 08 Code Archive
    //Code to be ran after rendering
    useEffect(() => {
        async function loadPosts() {
            const allPosts = await getPosts();

            setPosts(allPosts);
        }

        loadPosts();
    }, []);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        //Setting inputted values to fields.
        const temp = { text: post.text };
    
        temp[name] = value;
        setPost(temp);
    }

    //Code used from Week 08 Code Archive
    const handleSubmit = async (event) => {
        event.preventDefault();

        //Prepares data of new post for API call.
        const currentpost = {
            text: post.text,
            username: props.user.username
        };

        createPost(currentpost);
        
        //Adds new post to current lists of posts
        setPosts([...posts, currentpost]);

        //Resets textarea
        setPost({text: ""});
      }

    return (
        <form class="forum-form" autoComplete="off" onSubmit={handleSubmit}>
            <div class="forum-container">
                <div class="forum-content">
                    {posts.length === 0 ?
                        <div class="no-posts">No posts currently</div>
                        :
                        posts.map((postList) =>
                            <div class="posts-container">
                                <div class="posts-content">
                                    <div class="posts-header">
                                        <h4>{postList.username}</h4>
                                    </div>
                                    <p>{postList.text}</p>
                                    <div class="posts-footer">
                                        <a>Reply</a>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div class="forum-post">
                    <textarea class="forum-input" placeholder="Write a post..." name="text" id="text" value={post.text} onChange={handleInputChange} maxLength="600" required></textarea>
                    <button type="submit" class="loginbtn">Post</button>
                </div>
            </div>
        </form>
    );
}

export default Forum;
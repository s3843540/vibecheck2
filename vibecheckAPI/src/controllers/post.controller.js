const db = require("../database");
//Code from Code Archive of Week 08 Lab/Prac.

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.post.findAll();

  res.json(posts);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const post = await db.post.create({
    text: req.body.text,
    username: req.body.username
  });

  res.json(post);
};

const db = require("../database");
const argon2 = require("argon2");

//Code from Code Archive of Week 08 Lab/Prac.

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.username);

  res.json(user);
};

// Select one user from the database if email and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.username);
  
  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    username: req.body.username,
    password_hash: hash,
    email: req.body.email,
    date: req.body.date
  }).catch(err => {
    console.log(err);
  });

  res.json(user);
};


exports.edit = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  const user = await db.user.update(
    {
      username: req.body.username,
      password_hash: hash,
      email: req.body.email,
    },
    {
      where: {
        username: req.body.old
      }
    }
  )

  res.json(user);
};

exports.delete = async (req, res) => {
  console.log(req.params.username);
  await db.user.destroy({
    where: {
      username: req.params.username
    }
  })
};

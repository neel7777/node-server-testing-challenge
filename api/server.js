const express = require("express");

const Users = require("../users/users-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/users", (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/users/:id", (req, res) => {
    const  id  = req.params.id;
    Users.findById(id)
      .then(user => {
          if (user ){
            res.status(200).json(user);
          }
          else {
              res.status(404).json({ message: 'no user with that id'})
          }
        
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

server.post("/users", (req, res) => {
  const UserInfo = req.body;

  Users.insert(UserInfo)
    .then(ids => {
      res.status(201).json({ message: "User created successfully" });
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = server;

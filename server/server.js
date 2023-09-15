require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.DB_PORT || 8080;

// midlleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./frontens/build")));
app.use(bodyParser.json());

const userController = require("./controller/users");

// users
app.get("/api/v1/users", (req, res) => {
  userController
    .getAllusers()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
});

app.post("/api/v1/users", (req, res) => {
  userController
    .createUsers(req.body.users)
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ error: "Bad Request" }));
});

app.put("/api/v1/users", (req, res) => {
  userController
    .updateUsers(req.body.users)
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
});


app.delete("/api/v1/users/:id", (req, res) => {
  userController
    .deleteUsers(req.params.id)
    .then((data) => {
      if (data) {
        res.status(204).end();
      } else {
        res.status(404).end("No data available");
      }
    })
    .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
});

// login
app.post("/api/v1/login", (req, res) => {
    userController.userlogin(req.body)
      .then((data) => {
        if (data.success) {
          res.status(200).json(data); 
        } else {
          res.status(401).json(data); 
        }
      })
      .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
});


app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
// const morgan = require("morgan");

const fs = require("fs");

const app = express();
const port = process.env.DB_PORT || 8080;

// midlleware
// app.use(morgan("combined"));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.use("/images", express.static(path.join(__dirname, "./images")));



const userController = require("./controller/users");
const imagesController = require("./controller/images");
const propertyListing = require("./controller/propertyListings");

const storage = multer.diskStorage({
  destination: (req, files, callback) => {
    callback(null,"./images");
  },
  filename: (req, files, callback) => {
    callback(null, `image-${Date.now()}.${files.originalname}`)
  },
});


const upload = multer({ storage: storage });



app.get("/api/v1/images", (req, res) => {
  imagesController
    .getImages()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
});
app.get("/api/v1/images/:user_id", (req, res) => {
  imagesController
    .getImagesByUser(req.params.user_id)
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
});


// Serve the images from the specified directory
app.post("/api/v1/upload", upload.array("files", 4), async (req, res) => {
  console.log("eto yung image body", req.body)
  imagesController
    .upload(req.body, req.files)
    .then((data) => res.json(data))
    .catch(
      (error) => res.status(error)
      // .catch((error) => res.status(500).json({ error: "Internal Server Error" })));
    );
});

app.put("/api/v1/images", (req, res) => {
  imagesController
    .updateImages(req.body.images)
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
});

app.delete("/api/v1/images/:image_id", (req, res) => {
  imagesController
    .deleteImages(req.params.image_id)
    .then((data) => {
      if (data) {
        res.status(204).end();
      } else {
        res.status(404).end("No data available");
      }
    })
    .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
});

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
  userController.userLogin(req.body).then((data) => res.json(data));
});

// property listings
app.get("/api/v1/listings", (req, res) => {
  propertyListing
    .getAllProperty()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
});

app.post('/api/v1/listings', (req, res) => {
  console.log("eto yun", req.body)
  propertyListing.createProperty(req.body.property_listings).then((data) => res.json(data))
})

app.put("/api/v1/listings", (req, res) => {
  propertyListing
    .updateProperty(req.body.property_listings)
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
});

app.delete("/api/v1/listings/:id", (req, res) => {
  propertyListing
    .deleteProperty(req.params.id)
    .then((data) => {
      if (data) {
        res.status(204).end();
      } else {
        res.status(404).end("No data available");
      }
    })
    .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
});
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

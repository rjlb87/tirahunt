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
const imageDirectory = path.join(__dirname, "./images");
app.use("/images", express.static(imageDirectory));
app.use(bodyParser.json());

const userController = require("./controller/users");
const imagesController = require("./controller/images");
const propertyListing = require("./controller/propertyListings");

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "images");
  },
  filename: (req, files, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      files.fieldname + "-" + uniqueSuffix + path.extname(files.originalname)
    );
  },
});
const upload = multer({ storage: storage });

app.get("/api/v1/images", (req, res) => {
  imagesController
    .images()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
});

// Serve the images from the specified directory
app.post("/api/v1/upload", upload.array("files", 4), async (req, res) => {
  imagesController
    .upload(req.body, req.files)
    .then((data) => res.json(data))
    .catch(
      (error) => res.status(error)
      // .catch((error) => res.status(500).json({ error: "Internal Server Error" })));
    );
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

app.post("/api/v1/listings", async (req, res) => {
  try {
    console.log("property:", req.body);

    // Check if the request body contains the expected property_listings data
    const propertyData = req.body.property_listings;
    if (!propertyData) {
      return res
        .status(400)
        .json({ error: "Bad Request - Missing property_listings data" });
    }

    const newProperty = await propertyListing.createProperty(propertyData);
    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

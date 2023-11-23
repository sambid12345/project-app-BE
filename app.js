const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const port = 3000;
const recipeRouter = require("./src/Routes/recipes");
const mongoose = require("mongoose");
const fs = require("fs");

const server = "127.0.0.1:27017";
const database = "app-db";

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", recipeRouter);

mongoose
  .connect(`mongodb://${server}/${database}`)
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, () => {
      console.log(`Express app running on port ${port}!`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed");
  });

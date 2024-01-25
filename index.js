require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router/auth");
const cookiesParser = require("cookie-parser");
const recipeRouter = require("./router/recipes");

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(cookiesParser());
app.use(express.json());
app.use(router);
app.use("/recipe", recipeRouter);

URL = process.env.MONGODB_URI;
mongoose
  .connect(URL)
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log("No connection");
  });

app.listen(3000 || 6010, () => {
  console.log("server is running");
});

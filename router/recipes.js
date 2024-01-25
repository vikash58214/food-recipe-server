const express = require("express");
const jwt = require("jsonwebtoken");
const RecipeModel = require("../models/Recipe");
const Usermodel = require("../models/User");
const e = require("express");

const recipeRouter = express.Router();

recipeRouter.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

recipeRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await RecipeModel.deleteOne({ _id: id });
    res.send({ success: true, message: "data deleted", data: data });
  } catch (error) {
    console.log(error);
  }
});
recipeRouter.put("/update/:id", async (req, res) => {
  try {
    const data = await RecipeModel.updateOne({ _id: req.params.id }, req.body);
    save(data);

    res.send({ message: "updated" });
  } catch (error) {
    res.send(error);
  }
});
recipeRouter.get("/my-recipe/:userID", async (req, res) => {
  try {
    const myRecipe = await RecipeModel.find({ userOwner: req.params.userID });
    if (myRecipe) {
      res.json(myRecipe);
    } else {
      res.json({ message: "not found" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

recipeRouter.post("/", async (req, res) => {
  try {
    const recipe = new RecipeModel(req.body);
    const response = await recipe.save();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});
recipeRouter.put("/saveRecipe", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const recipeid = recipe._id;
    const user = await Usermodel.findById(req.body.userID);
    const find = user.savedRecipe;

    var findd = find.includes(recipeid);
    console.log(findd);
    if (findd == true) {
      res.send("already exist");
    } else {
      user.savedRecipe.push(recipe);
      await user.save();
      res.json(user.savedRecipe);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
recipeRouter.get("/savedRecipe/:userID", async (req, res) => {
  try {
    const userr = await Usermodel.findById(req.params.userID);
    const savedRecipee = userr.savedRecipe;
    const savedRecipe = await RecipeModel.find({
      _id: savedRecipee,
    });
    res.send(savedRecipe);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = recipeRouter;

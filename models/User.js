const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: (true, { message: "Name iss required" }),
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  savedRecipe: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});

const Usermodel = new mongoose.model("User", userSchema);
module.exports = Usermodel;

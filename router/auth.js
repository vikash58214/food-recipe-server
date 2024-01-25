require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const signupSchema = require("../validator/auth-validator");
const validate = require("../middleware/validate-middleware");
const jwt = require("jsonwebtoken");
const Usermodel = require("../models/User");
const JWT_SECREAT_KEY = process.env.JWT_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECREAT_KEY, (err) => {
      if (err) {
        return res.status(400).json({ message: "invalid token" });
      }

      next();
    });
  } else {
    res.sendStatus(401);
  }
};
router.get("/user/:userID", verifyToken, async (req, res) => {
  try {
    user = await Usermodel.findById(req.params.userID);
  } catch (error) {
    console.log(error);
  }
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }
  res.status(200).json({ user });
});

router.route("/signup").post(validate(signupSchema), async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const userExist = await Usermodel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user alreay exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const userCreated = await Usermodel.create({
      name,
      email,
      phone,
      password: hashPassword,
    });
    res.send({
      userCreated,
    });
  } catch (err) {
    console.log(err._message);
    res.status(400).json({ message: err._message });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "please register first" });
    }
    const userPassword = await bcrypt.compare(password, user.password);
    if (userPassword) {
      const token = jwt.sign({ userid: user._id }, JWT_SECREAT_KEY);
      res.json({ token, userID: user._id });
      // res.cookie(String(user._id), token, {
      //   path: "/",
      //   httpOnly: true,
      // });
      // return res
      //   .status(200)
      //   .json({ message: "successfully login", user: user, token });
    } else {
      res.status(400).json({ msg: "invalid cridintials" });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;

const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userInputValidation, userModel } = require("../model/userModel");

router.post("/", async (req, res) => {
  const request = req.body;
  const { error } = userInputValidation(request);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const checkEmailInDataBase = await userModel.find({ email: req.body.email });
  console.log(checkEmailInDataBase);
  if (checkEmailInDataBase.length > 0) {
    return res.status(400).send("Email exists, try another email");
  }

  const salt = await bcrpt.genSalt(10);
  const hashedPassword = await bcrpt.hash(req.body.password, salt);
  try {
    const newuser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    
    await newuser.save();
    const token = jwt.sign({email:req.body.email},"1234")
    res.header("x-auth-token",token).send(_.pick(newuser, ["name", "email"]));
  } catch (err) {
    console.log(err.message);
    res.status(200).send(err.message);
  }
});
module.exports = router;

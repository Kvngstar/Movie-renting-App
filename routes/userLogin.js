const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrpt = require("bcrypt");
const { userModel } = require("../model/userModel");
const jwt = require("jsonwebtoken")
router.post("/", async (req, res) => {
  const userDetailInDatabase = await userModel.find({ email: req.body.email });

  if (userDetailInDatabase < 1 || userDetailInDatabase === "undefined") {
    return res.status(400).send("user is not registered");
  }

  try {
    const result = await bcrpt.compare(
      req.body.password,
      userDetailInDatabase[0].password
    );

    if (!result) {
      return res.status(400).send("password does not match");
    } else {

        
      res.status(200).send("Logged in");
    }
  } catch (err) {
    res.send(err.message);
  }
});
module.exports = router;

const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrpt = require("bcrypt");
const { userModel } = require("../model/createAccount");
const jwt = require("jsonwebtoken");
const auth = require("../authentification/JWTauth");
const customer = require("./customer");
const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: "Error-userLogin.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "Info-userLogin.log",
      level: "info",
    }), 
    new winston.transports.MongoDB({db:"mongodb://localhost:27017/Knglystores",level:"info",name:"loginAPI",collection:"log - userLogin"}),
  
    
  ],
});

router.post("/", async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("incomplete credentials");
  }
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
      logger.log("error", `An attempt to sign in to ${req.body.email} on ${new Date().toUTCString()}`);
      return res.status(400).send("password does not match");
    } 
      logger.log("info", `${req.body.email} succesfully signed in on ${new Date().toUTCString()}`);
      return res.status(200).send("You're logged-in, You will be redirected");
  
  } catch (err) {
    logger.log("error", err.message);
    return next("failed attempt");
  }
}); 

module.exports = router;

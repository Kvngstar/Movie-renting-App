const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrpt = require("bcrypt");
const { userInputValidation, userModel } = require("../model/createAccount");
const config = require("config");
const  winstonMongoDB =  require("winston-mongodb")

const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: "Error-createAccount.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "Info-createAccount.log",
      level: "info",
    }),
    new winston.transports.MongoDB 
  ],
});

router.post("/", async (req, res, next) => {
  try {
    const request = req.body;
    const { error } = userInputValidation(request);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const checkEmailInDataBase = await userModel.find({
      email: req.body.email,
    });
    console.log(checkEmailInDataBase);
    if (checkEmailInDataBase.length > 0) {
      return res.status(400).send("Email exists, try another email");
    }

    const salt = await bcrpt.genSalt(10);
    const hashedPassword = await bcrpt.hash(req.body.password, salt);
    const newuser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      admin: req.body.admin,
      password: hashedPassword,
    });

    await newuser.save();
    const token = newuser.generateAuthToken();
    logger.log(
      "info",
      `${newuser.name} with email ${
        newuser.email
      } created an account on ${new Date().toUTCString()}`
    );
    res.header("x-auth-token", token).send(_.pick(newuser, ["name", "email"]));
  } catch (err) {
    logger.log("error", `Error creating acccount - ${err.message}`);
    return next(err);
  }
});
module.exports = router;

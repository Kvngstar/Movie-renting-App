const config = require("config");
const { response } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const auth = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
   return res.status(401).send("you have no authorization to perform such action");
  }
  
  try {
    const decoded = jwt.verify(token, config.get("password"));
    if(decoded.admin == false || !decoded.admin ){
      throw new Error("You`re  not an admin");
    } 
    return  next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};
module.exports = auth;

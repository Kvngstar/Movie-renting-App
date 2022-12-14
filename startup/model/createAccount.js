const express = require("express");
const joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config")


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    validate: [
      function (v) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(v)}, "email Mismatch"
      
    ],
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength:8,
    maxLength:1024,
    required: true,
  }, 
  admin: {
    type: Boolean,
    default: false,
    required:true,
  }
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({email: this.email, admin: this.admin}, config.get('password'));
  return token;
}
const userModel = mongoose.model("registeredUsers", userSchema);
 
function userInputValidation(input) {
  const joiValidation = joi.object({
    name: joi.string().min(5).max(50).required(),
    email: joi.string()
   .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi.string().min(8).max(1024),
    confirm_password: joi.ref("password"),
    admin: joi.bool()
  });
  return joiValidation.validate(input);
}
module.exports = {
  userSchema: userSchema,
  userInputValidation: userInputValidation,
  userModel: userModel,
};

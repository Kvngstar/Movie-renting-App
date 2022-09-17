const express = require("express");
const router = express.Router();
const { userModel } = require("../model/createAccount");
const _ = require("lodash");

console.log("Iam here");

router.get("/", async (req, res) => {
  console.log("Iam inside here");
  const id = req.query.id;
  console.log(id);
  const getCustomerData = await userModel.find({ _id: id });
  return res
    .status(200)
    .send(_.pick(getCustomerData[0], ["name", "admin", "email"]));
});

module.exports = router;

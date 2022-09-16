const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { userModel } = require("../model/createAccount");


router.post("/", async (req, res) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
const getCustomerData = await userModel.find({email:req.body.email});
  return res.status(200).send(getCustomerData)})

// router.get("/:id", async (req, res) => {
//   const requestId = req.params.id;
//   console.log(requestId);
//   const id = await customerModel.findById(requestId);
//   if (id) {
//     return res.status(200).send(id.name);
//   }
//   res.status(200).send("Not found");
// });
 module.exports = router;

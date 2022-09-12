const {
  customerInputValidation,
  customerModel,
} = require("../model/customerModel");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const request = req.body;
  const { error } = customerInputValidation(request);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const newCustomer = await customerModel.create({
    name: req.body.name,
    phone: req.body.phone,
  });
  await newCustomer.save();
  res.status(200).send(newCustomer);
});

router.get("/:id",async (req,res)=>{
 const requestId = req.params.id;
  console.log(requestId)
 const id = await customerModel.findById(requestId);
 if(id){
  return res.status(200).send(id.name)
 }
 res.status(200).send("Not found")

})
router.get("/",async (req,res)=>{
 const id = await customerModel.findById();         
 res.status(200).send(id)

})
module.exports = router;
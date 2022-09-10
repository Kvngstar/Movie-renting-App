const mongoose = require("mongoose");
const joi = require("joi");
const { boolean } = require("joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  isGold: { type: Boolean, default: false, required: true },
  phone: {
    type: Number,
    min: 11,
    max: 20,
    required: true,
  },
});

const customerModel = mongoose.model("customer", customerSchema);

function customerInputValidation(input) {
  const joiValidation = joi.object({
    name: joi.alpha().string().min(5).max(50).required(),
    phone: joi.number().min(11).max(20).required()
  });
  return joiValidation.validate(input);
}
module.exports = {
  customerSchema: customerSchema,
  customerInputValidation: customerInputValidation,
  customerModel: customerModel,
};

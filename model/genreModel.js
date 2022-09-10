const mongoose = require("mongoose");
const joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
});

const genreModel = mongoose.model("genre", genreSchema);

function genreInputValidation(input) {
  const joiValidation = joi.object({
    name: joi.alpha().string().min(5).max(50).required(),
  });
  return joiValidation.validate(input);
}
module.exports = {
  genreSchema: genreSchema,
  genreInputValidation: genreInputValidation,
  genreModel: genreModel,
};

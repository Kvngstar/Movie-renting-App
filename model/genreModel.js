const mongoose = require("mongoose");
const joi = require("joi");

const movieschema = new mongoose.Schema({
    Moviename: {
     type: String,
     minLength: 5,
     maxLength: 250,
     required: true,
   },
   CopiesAvailable: {
     type: String,
     minLength: 0,
     maxLength: 200,
     required: true,
   },
   Rating: {
      type:  Number,
      min: 1,
      max: 10,
      default: 10,
   },
   AvailableFrom: {
     type: String,
     default: new Date().toUTCString(),
   
   }
   })


const movieModel =  mongoose.model("Movies", movieschema);
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  movies: movieschema,
});

const genreModel = mongoose.model("genre", genreSchema);



function genreInputValidation(input) {
  const joiValidation = joi.object({
    name: joi.string().min(5).max(50).required(),
    Moviename: joi.string().min(5).max(250).required(),
    CopiesAvailable: joi.number().min(0).max(200).required()
  });
  return joiValidation.validate(input);
}




module.exports = {
  genreSchema: genreSchema,
  genreInputValidation: genreInputValidation,
  genreModel: genreModel,
  movieModel: movieModel

};

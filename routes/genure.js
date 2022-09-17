const express = require("express");
const router = express.Router();
const {
  genreInputValidation,
  genreModel,
  movieModel,
} = require("../model/genreModel");
const mongoose = require("mongoose");
const _ = require("lodash");
const auth = require("../authentification/JWTauth");
const winston = require("winston");
const asyncMiddleWarwe = require("../model/try&catch");
     require("winston-mongodb")
const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: "Error-genre.log",  
      level: "error",
    }),
    new winston.transports.File({ filename: "Info-genre.log", level: "info" }),
    new winston.transports.MongoDB({db:"mongodb://localhost:27017/Knglystores",level:"info",name:"GenreAPI",collection:"log - genre"}),
  
  ],
});

router.get(
  "/",
  asyncMiddleWarwe(async (req, res) => {
    const getAllGenres = await genreModel
      .find({})
      .sort("name")
      .select({ name: 1, "movies.CopiesAvailable": 1 });
    res.status(200).send(getAllGenres);
  })
);
router.get(
  "/allmovies",
  asyncMiddleWarwe(async (req, res) => {
    {
      const getAllGenres = await genreModel
        .find({})
        .sort("name")
        .select("movies");
      res.status(200).send(getAllGenres);
    }
  })
);

router.post(
  "/:id",
  asyncMiddleWarwe(async (req, res) => {
    const postRequest = req.params.id;
    const objId = mongoose.Types.ObjectId.isValid(postRequest);
    if (!objId) {
      return res.status(400).send("objectId not valid");
    }

    const obj = await genreModel.find({ _id: postRequest }).select("movies");
    if (obj.length < 1) {
      return res.status(400).send("no movie available for this selected genre");
    }
    return res.status(200).send(obj);
  })
);

router.post(
  "/",
  auth,
  asyncMiddleWarwe(async (req, res) => {
    const postRequest = req.body;
    const { error } = genreInputValidation(postRequest);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const createGenure = await new genreModel({
      name: req.body.name,
      movies: new movieModel({
        Moviename: req.body.Moviename,
        CopiesAvailable: req.body.CopiesAvailable,
      }),
    });

    createGenure.save();
    logger.log(
      "info",
      `Created ~${createGenure.movies.Moviename}~ under ~${
        createGenure.name
      }~ on ~${new Date().toUTCString()}~`
    );
    res.status(200).send(createGenure);
  })
);

router.put(
  "/update/:id",
  auth,
  asyncMiddleWarwe(async (req, res) => {
    const requestId = req.params.id;
    const genreName = req.body.name;
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(404).send("invaid ID");
    }
    var update = await genreModel.findById(requestId);

    if (update) {
      const updated = await genreModel.findByIdAndUpdate(
        { _id: requestId },
        { $set: { name: genreName } },
        { new: true }
      );
      const populated = _.pick(updated, ["name", "_id"]);
      logger.log("info", `${update} was updated to ${updated}`);
      return res.status(200).send(populated);
    }
  })
);

router.delete(
  "/delete/:id",
  auth,
  asyncMiddleWarwe(async (req, res) => {
    const getId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(getId)) {
      return res.status(404).send("invalid ID");
    }

    const checkingId = await genreModel.findById(getId);
    if (!checkingId) {
      return res.status(400).send("Error!, user Not Found");
    }
    const deleteId = await genreModel.findByIdAndRemove(getId);
    logger.log("info", `${deleteId} was deleted from the DataBase`);
    return res.status(200).send(deleteId);
  })
);

module.exports = router;

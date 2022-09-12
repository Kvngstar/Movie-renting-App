const express = require("express");
const router = express.Router();
const { genreInputValidation, genreModel } = require("../model/genreModel");
const mongoose = require("mongoose");
const _ = require("lodash");
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console()
  ],
});


router.post("/", (req, res) => {
  const postRequest = req.body;

  const { error } = genreInputValidation(postRequest);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } 

  async function createGenure() {
    try {
      const createGenure = await genreModel.create({ name: req.body.name });

      createGenure.save();

      res.status(200).send(createGenure);
    } catch (er) {
      console.log(er);
    }
  }
  createGenure();
});
router.get("/", async (req, res) => {
  const getAllGenres = await genreModel.find({}).sort("name");
  res.status(200).send(getAllGenres);
});

router.delete("/delete/:id", async (req, res) => {
  const getId = req.params.id;
  const checkingId = await genreModel.findById(getId);
  if (!checkingId) {
    return res.status(400).send("Error!,user Not Found");
  }
  const deleteId = await genreModel.findByIdAndRemove(getId);
  res.status(200).send(deleteId);
});

router.put("/update/:id", async (req, res) => {
  {
    const requestId = req.params.id;
    const namee = req.body.name;
    logger.log("info","User successful logged in");
    logger.log("error","User successful logged in");
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res
        .status(200)
        .send("ID not found in the database, contact Admin");
    }
    var update = await genreModel.findById(requestId);

    if (update) {
      const updated = await genreModel.findByIdAndUpdate(
        { _id: requestId },
        { $set: { name: namee } },
        { new: true }
      );
      const populated = _.pick(updated, ["name", "_id"]);
      return res.status(200).send(populated);
    }

    res.status(400).send();
  }
});

module.exports = router;

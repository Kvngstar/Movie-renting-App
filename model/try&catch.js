const express = require("express");





module.exports = function asyncMiddleWarwe(myfunction) {
  return (req, res, next) => {
    try {
     myfunction(req,res);
    } catch (err) {
      logger.log("error", err.message);
      next(err);
    }
  };
}

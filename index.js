const errorhandler = require("./error/errorHandler");
const login = require("./routes/userLogin");
const createAccount = require("./routes/createAccount");
const customer = require("./routes/customer");
const genres = require("./routes/genure");
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const config = require("config");
const winston = require("winston");


const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: "Info-IndexPage.log",
      level: "info",
    }),
  ],
});

app.use(helmet());
app.use(express.json());
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

process.on("uncaughtException",(err)=>{
  logger.log("error",err.message)
})
process.on("unhandledRejection",(err)=>{
  logger.log("error",err.message)
  process.exit(1)
})






async function connectMongoDb() {
  try {
    await mongoose.connect(config.get("db"));
    logger.log("info", `connected to Database on ${new Date().toUTCString()}`);
  } catch (err) {
    logger.log("error", err.message);
  
  }
}
connectMongoDb();
app.use("/api/genre", genres);
app.use("/api/createAccount", createAccount);
app.use("/api/customer", customer);
app.use("/api/login", login);
app.use(errorhandler);

console.log(config.get("env"));
const server = app.listen(3000, () => {
  console.log("listening to port 3000");
});
module.exports = server
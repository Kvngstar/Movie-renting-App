const login = require("./routes/userLogin")
const user = require("./routes/user");
const customer = require("./routes/customer");
const genres = require("./routes/genure");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

async function connectMongoDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Knglystores");
    console.log("connected to DataBase");
  } catch (err) {
    console.log(err);
  }
}
connectMongoDb();

app.use(express.json());
app.use("/api/genre", genres);
app.use("/api/customer", customer);
app.use("/api/user", user);
app.use("/api/login", login);

app.listen(3000, () => {
  console.log("listening to port 3000");
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const route = require("./routes/profile");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to sumits cluster"))

  .catch((err) => {
    console.error(err);
  });
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
//
app.use("/api/profile", route);
app.get("/", (req, res) => {
  res.send("welcome to feed");
});
app.get("/profile", (req, res) => {
  res.send("welcome to profile page");
});
app.listen(8000, () => {
  console.log("backend server is running");
});

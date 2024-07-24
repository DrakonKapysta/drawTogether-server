require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const coockieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use(coockieParser());
app.use(cors());

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
};

start();

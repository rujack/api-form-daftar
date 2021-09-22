const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const authRoutes = require("./src/routes/auth");
const formRoutes = require("./src/routes/form");

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PUT,PATCH,OPTIONS",
  );
  res.append("Access-Control-Allow-HEaders", "Content-Type,Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/form", formRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://sandal123:sandal@cluster0.asykz.mongodb.net/Database?retryWrites=true&w=majority&ssl=true",
  )
  .then(() => {
    app.listen(4000, () => console.log("Connection berhasil"));
  })
  .catch((err) => console.log(err));

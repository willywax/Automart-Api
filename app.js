const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const User = require("./models/users");

const userRouter = require("./routers/users");
const carRouter = require("./routers/cars");
const orderRouter = require("./routers/orders");
const flagRouter = require("./routers/flags");

const data = require("./models/testData");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.static(`${__dirname}/UI`));

app.use(bodyParser.json());

data.populateData();

app.get("/", (req, res) => {
  res.send("Success: Last updated on" + new Date());
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/car", carRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/flag", flagRouter);

module.exports = app;

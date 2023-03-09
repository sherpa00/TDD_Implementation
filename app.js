const express = require("express");
const app = express();

const productsRoute = require("./routes/product");

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use("/",productsRoute);

module.exports = app;
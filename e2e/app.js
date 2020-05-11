require("dotenv").config()
const express = require('express');

const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);


// app.listen()

module.exports = app;

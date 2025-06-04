require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require('morgan');
const router = require('./router');
const apiPath = process.env.CUSTOM_PATH;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
(process.env.NODE_ENV === 'development') && app.use(morgan('dev'));
app.use(apiPath, router);

module.exports = app;

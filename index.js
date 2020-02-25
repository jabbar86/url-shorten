const express = require('express');
const app = express();
var bodyParser = require("body-parser");
const database = require('./utils/DBConfig');
const urlRoute = require('./routes/urlShortenRoute');
require("dotenv").config();

const PORT = process.env.PORT || 7000
app.use(bodyParser.json()); // handle application/json forms

// handle application/x-www-form-urlencoded forms
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/url',urlRoute)
app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
});
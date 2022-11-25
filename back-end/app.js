const express = require('express');
const passport = require('passport');
const cors = require('cors');
const index = require('./routes/index');
const course = require('./routes/course');
const profile = require('./routes/profile');
const cart = require('./routes/cart');
// const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests
require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env
require('./utils/db');
require('./utils/auth');

const app = express();

const PORT = 3001;
app.use(cors());

// set bodyparser
app.use(express.json());
app.use(passport.initialize());
// app.use(passport.session());

app.use('/', index);
app.use('/course', course);
app.use('/profile', profile);
app.use('/cart', cart);

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

module.exports = server;

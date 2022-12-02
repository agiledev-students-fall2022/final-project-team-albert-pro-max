const express = require('express');
const passport = require('passport');
const cors = require('cors');
const index = require('./routes/index');
const course = require('./routes/course');
const profile = require('./routes/profile');
const cart = require('./routes/cart');
const schedule = require('./routes/schedule');
const mongoose = require('mongoose');
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
app.use('/schedule', schedule);

mongoose.connection.on('connecting', () => {
    console.log("[INFO] Connecting to database...");
});

mongoose.connection.on('connected', () => {
    console.log("[INFO] Connected to database!");
});

module.exports = (async function () {
    if (process.env.NODE_ENV === 'PRODUCTION') {
        console.log("[INFO] Running <PRODUCTION> mode...");

        const connectionUrl = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_URL;
        await mongoose.connect(connectionUrl);
    } else {
        console.log("[INFO] Running <DEV> mode...");
        await mongoose.connect("mongodb://localhost/albert-pro-max-local");
    }

    const server = app.listen(PORT, () => {
        console.log(`[INFO] Listening on port ${PORT}...`);
    });

    return server;
})();

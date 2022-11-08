const express = require('express');
const cors = require('cors');
const index = require('./routes/index');
const course = require('./routes/course');
const profile = require('./routes/profile');
const cart = require('./routes/cart');
const schedule = require('./routes/schedule');

const app = express();

const PORT = 3001;
app.use(cors());

// set bodyparser
app.use(express.json());

app.use('/', index);
app.use('/course', course);
app.use('/profile', profile);
app.use('/cart', cart);
app.use('/schedule', schedule);

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

module.exports = server;

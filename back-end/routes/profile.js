const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });

router.get('/', (req, res, next) => {
    // THIS IS /profile ROUTE
    // DO YOUR MAGIC HERE
    axios
       // .get(`${process.env.API_BASE_URL+process.env.PROFILE}?count=1&key=${process.env.API_SECRET_KEY}`)
        .get("https://my.api.mockaroo.com/users.json?key=6a06c960")
        .then(apiResponse => res.json(apiResponse.data))
        .catch(err => next(err));
});

router.post('/update', (req, res) => {
    // THIS IS /profile/update ROUTE
    // DO YOUR MAGIC
});

module.exports = router;

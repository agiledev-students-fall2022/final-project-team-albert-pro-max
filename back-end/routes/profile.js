const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });

router.get('/', (req, res) => {
    // THIS IS /profile ROUTE
    // DO YOUR MAGIC HERE
    
    axios
    .get(`${process.env.API_BASE_URL}?count=5&key=${process.env.API_SECRET_KEY}`)
    .then(apiResponse => res.json(apiResponse.data))
    .catch(err => next(err));

    res.json({
        success: true,
        data: [],
        msg: "This is /profile"
    });
});

router.post('/update', (req, res) => {
    // THIS IS /profile/update ROUTE
    // DO YOUR MAGIC
});

module.exports = router;

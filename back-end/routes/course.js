const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });

router.get('/search', (req, res, next) => {
    // THIS IS /course/search ROUTE
    // DO YOUR MAGIC
    axios
        .get(`${process.env.API_BASE_URL+process.env.MAJOR}?count=3&key=${process.env.API_SECRET_KEY}`)
        .then(apiResponse => res.json(apiResponse.data))
        .catch(err => next(err));
/*
    res.json({
        success: true,
        data: [],
        msg: "This is /course/search"
    });
*/
});

router.get('/catalog', (req, res) => {
    // THIS IS /course/catalog ROUTE
    // DO YOUR MAGIC
    axios
        .get(`${process.env.API_BASE_URL+process.env.COURSE}?count=5&key=${process.env.API_SECRET_KEY}`)
        .then(apiResponse => res.json(apiResponse.data))
        .catch(err => next(err));
});

router.get('/details', (req, res) => {
    // THIS IS /course/details ROUTE
    // DO YOUR MAGIC
});

router.post('/details/rating', (req, res) => {
    // THIS IS /course/details/rating ROUTE
    // DO YOUR MAGIC
});

module.exports = router;

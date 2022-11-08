const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });

router.get('/search', (req, res) => {
    // THIS IS /course/search ROUTE
    // DO YOUR MAGIC

    res.json({
        success: true,
        data: [],
        msg: "This is /course/search"
    });
});

router.get('/catalog', (req, res) => {
    // THIS IS /course/catalog ROUTE
    // DO YOUR MAGIC
    axios
        .get(`${process.env.API_BASE_URL}?count=5&key=${process.env.API_SECRET_KEY}`)
        .then(apiResponse => res.json(apiResponse.data))
        .catch(err => next(err));
});

router.get('/details', (req, res) => {
    // THIS IS /course/details ROUTE
    // DO YOUR MAGIC
    const course_id = req.query.id;

    if (!course_id) {
        res.status(400).send("Missing param: id");
    } else {
        axios
            .get(`${process.env.API_COURSE_DETAILS}&id=${course_id}`)
            .then(apiResponse => res.json(apiResponse.data))
            .catch(err => res.send(err));
    }
});

router.post('/details/rating', (req, res) => {
    // THIS IS /course/details/rating ROUTE
    // DO YOUR MAGIC
});

module.exports = router;

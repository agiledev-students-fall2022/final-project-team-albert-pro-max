const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });

router.get('/', (req, res, next) => {
    axios
        .get(`${process.env.API_BASE_URL + process.env.COURSE_FOR_CART}?count=5&key=${process.env.API_SECRET_KEY}`)
        .then(data => {
            const inCart = data.data.filter(function (el) {
                return el.in_cart === true;
            });
            res.json(inCart);

        })
        .catch(err => next(err));
});

router.get('/watch', (req, res, next) => {
    axios
        .get(`${process.env.API_BASE_URL + process.env.COURSE_FOR_CART}?count=5&key=${process.env.API_SECRET_KEY}`)
        .then(data => {
            const watch = data.data.filter(function (el) {
                return el.in_cart === true &&
                    el.watch === true;
            });
            res.json(watch);

        })
        .catch(err => next(err));
});

router.get('/show', (req, res, next) => {
    // THIS IS /cart/show ROUTE
    // DO YOUR MAGIC
    axios
        .get(`${process.env.API_BASE_URL + process.env.COURSE_FOR_CART}?count=5&key=${process.env.API_SECRET_KEY}`)
        .then(apiResponse => {
            const show = apiResponse.data.filter(ele => {
                return ele.in_cart === true && ele.show === true;
            });
            res.json(show);
        })
        .catch(err => next(err));
});

module.exports = router;

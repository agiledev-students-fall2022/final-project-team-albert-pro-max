const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });

router.get('/', (req, res) => {
    axios
        .get(`${process.env.API_BASE_URL+process.env.COURSE_FOR_CART}?count=5&key=${process.env.API_SECRET_KEY}`)
        .then(data => {
            const in_cart = data.data.filter(function (el) {
                return el.in_cart == true 
              });
            res.json(in_cart)
     
        })
        .catch(err => next(err));
});

router.get('/watch', (req, res) => {
    axios
        .get(`${process.env.API_BASE_URL+process.env.COURSE_FOR_CART}?count=5&key=${process.env.API_SECRET_KEY}`)
        .then(data => {
            const watch = data.data.filter(function (el) {
                return el.in_cart == true &&
                        el.watch == true
              });
            res.json(watch)
     
        })
        .catch(err => next(err));
});

router.get('/show', (req, res) => {
    // THIS IS /cart/show ROUTE
    // DO YOUR MAGIC
});

module.exports = router;

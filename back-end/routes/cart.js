const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const { course, recitation, user } = require('../utils/db.js');
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

router.post('/add', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { courseId, recitationId } = req.body;

    const userAddedCourses = req.user.cart.map(ele => ele.course.toString());

    if (userAddedCourses.indexOf(courseId) !== -1) {
        res.json({ success: true, message: "Course already in cart" });
    } else {
        const cartItem = {
            course: courseId,
            recitation: recitationId,
            watch: false,
            show: false
        };

        const updateResult = await user.updateOne({
            _id: req.user._id,
        }, {
            $push: {
                cart: cartItem
            }
        });

        if (updateResult.acknowledged) {
            res.json({ success: true, message: "Added to shopping cart" });
        } else {
            res.json({ success: false, message: "Database error occurred" });
        }
    }
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

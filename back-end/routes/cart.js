const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const { course, recitation, user } = require('../utils/db.js');
require("dotenv").config({ silent: true });

router.get('/', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const userResult = await user.findOne(req.user._id).populate(["cart.course", "cart.recitation"]);

    res.json({ cart: userResult.cart });
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

router.post('/watch', passport.authenticate("jwt", { session: false }), async (req, res) => {
    // Handle change watch
});

router.post('/show', passport.authenticate("jwt", { session: false }), async (req, res) => {
    // Handle change show
});

module.exports = router;

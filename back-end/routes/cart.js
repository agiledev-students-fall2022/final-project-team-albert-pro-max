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
        res.json({ success: true, message: "Course already in cart!" });
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
            res.json({ success: true, message: "Added to shopping cart!" });
        } else {
            res.json({ success: false, message: "Database error occurred" });
        }
    }
});

router.post('/watch', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { cartItemId, newWatch } = req.body;

    const updateResult = await user.updateOne(
        {
            _id: req.user._id,
            cart: {
                $elemMatch: { _id: cartItemId }
            },
        },
        { $set: { "cart.$.watch": newWatch } }
    );

    if (updateResult.acknowledged) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

router.post('/show', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { cartItemId, newShow } = req.body;

    const updateResult = await user.updateOne(
        {
            _id: req.user._id,
            cart: {
                $elemMatch: { _id: cartItemId }
            },
        },
        { $set: { "cart.$.show": newShow } }
    );

    if (updateResult.acknowledged) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

router.post('/', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { cartItemId } = req.body;

    const updateResult = await user.update(
        {_id: req.user._id},
        {$pull: { 'cart': { _id: cartItemId } }
        }
    );

    if (updateResult.acknowledged) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

module.exports = router;

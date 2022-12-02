const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });
const passport = require('passport');
const jwt = require("jsonwebtoken"),
    passportJWT = require("passport-jwt"),
    ExtractJWT = passportJWT.ExtractJwt;
const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
const { user } = require('../utils/db.js');

router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    // THIS IS /profile ROUTE
    res.json({
        success: true,
        user: {
            id: req.user.username,
            username: req.user.username,
            email: req.user.email
        },
        message:
            "Congratulations: you have accessed this route because you have a valid JWT token!",
    });
});

router.post('/update/username', passport.authenticate("jwt", { session: false }), (req, res) => {
    // THIS IS /profile/update ROUTE
    // DO YOUR MAGIC

    user.updateOne({_id: req.user.id}, {username: req.body.newUsername}, (err, docs) => {
        if(err) {
            res.json({success: false});
        } else {
            console.log("Updated Docs : ", docs);
            res.json({
                success: true, 
                msg: `${req.body.field} successfully updated`
            });
        }
    });
});

router.post('/update/password', passport.authenticate("jwt", { session: false }), (req, res) => {
    // THIS IS /profile/update ROUTE
    // DO YOUR MAGIC

    user.findOne({_id: req.user.id}, (err, user) => {
        if(err) {
            res.json({success: false});
        } else {
            user.setPassword(req.body.newPassword, function(err, user) {
                if(err) {
                    res.json({success: false});
                } else {
                    res.json({
                        success: true, 
                        msg: `${req.body.field} successfully updated`
                    });
                }
            });
        }
    });
});

router.post('/update/email', passport.authenticate("jwt", { session: false }), (req, res) => {
    // THIS IS /profile/update ROUTE
    // DO YOUR MAGIC

    user.updateOne({_id: req.user.id}, {email: req.body.newEmail}, (err, docs) => {
        if(err) {
            res.json({success: false});
        } else {
            console.log("Updated Docs : ", docs);
            res.json({
                success: true, 
                msg: `${req.body.field} successfully updated`
            });
        }
    });
});

module.exports = router;

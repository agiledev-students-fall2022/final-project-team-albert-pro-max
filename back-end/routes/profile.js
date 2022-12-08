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
            // console.log("Updated Docs : ", docs);
            res.json({
                success: true, 
                msg: "username is successfully updated"
            });
        }
    });
});

router.post('/update/password', passport.authenticate("jwt", { session: false }), (req, res) => {
    // THIS IS /profile/update ROUTE
    // DO YOUR MAGIC

    user.findOne({_id: req.user.id}, (err, user1) => {
        if(err) {
            res.json({success: false});
        } else {
            user1.setPassword(req.body.newPassword, (err, user) => {
                if(err) {
                    res.json({
                        success: false, 
                        msg: "invalid password!"
                    });
                } else {
                    user.updateOne({_id:users._id},{hash:users.hash,salt:users.salt},(err,result)=>{
                        //console.log(users._id)
                        if(err) {
                            res.json({success: false});
                        } else {
                            //console.log("enter here: succeeded in updating password??");
                            res.json({
                                success: true, 
                                msg: "password is successfully updated"
                            });
                        }
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
            // console.log("Updated Docs : ", docs);
            res.json({
                success: true, 
                msg: "email is successfully updated"
            });
        }
    });
});

module.exports = router;

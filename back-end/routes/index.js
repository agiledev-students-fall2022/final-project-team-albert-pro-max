const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require("jsonwebtoken"),
    passportJWT = require("passport-jwt"),
    ExtractJWT = passportJWT.ExtractJwt;
require("dotenv").config();
const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
}

const mongoose = require('mongoose');
require('../utils/db');
const User = mongoose.model("User");

router.get('/', (req, res) => {
    // THIS IS / ROUTE
    // DO YOUR MAGIC

    res.json({
        success: true,
        data: [],
        msg: "This is /"
    });
});

router.get('/register', (req, res) => {
    res.json({success: true, user: req.body});
});

router.post('/register', (req, res) => {
    // THIS IS /register ROUTE
    // DO YOUR MAGIC
    const {username, password, email} = req.body;
    console.log(req.body);
    User.register(new User({username, email }), password, (err, user) => {
        if (err) {
            console.log(err);
            res.json({ error: 1, message: 'Your registration information is not valid' });
        } else {
            passport.authenticate('local')(req, res, function () {
                // console.log("enter here, authentication", user);
                const payload = { id: user.id } // some data we'll encode into the token
                const token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({ success: true, username: user.username, token: token })
                // res.json({ success: 1});
            });
        }
      });
});

router.post('/login', (req, res, next) => {
    // THIS IS /login ROUTE
    // DO YOUR MAGIC
    passport.authenticate('local', (err, user) => {
        if(user) {
          req.logIn(user, (err) => {
            const payload = { id: user.id } // some data we'll encode into the token
            const token = jwt.sign(payload, jwtOptions.secretOrKey) // create a signed token
            res.json({ success: true, username: user.username, token: token }) // send the token to the client to store
          });
        } else {
            res
            .status(401)
            .json({ success: false, message: `login failed` });
        }
      })(req, res, next);
});

router.get('/logout', (req, res) => {
    // THIS IS /logout ROUTE
    // DO YOUR MAGIC
    res.json({sucess: 'Logout Successfully'});
});

module.exports = router;
